import React, {useState, useEffect, useRef, useCallback} from 'react';

import {LabTitle, Commands, LabOutputs} from '../../components/Lab';
import {Command} from '../../components/Lab/Commands/Commands';
import {LoadingContainer} from '../../components/UI/index';
import {
	useGetLabPracticeQuery,
	useGetLabPracticeCommandQuery,
	useGetLabPracticeOutputQuery,
	useUpdateLabPracticeSessionCommandMutation,
	// useOnUpdateLabPracticeSessionCommandSubscription,
	usePublishMqttMessageMutation,
	useOnUpdateLabPracticeSessionOutputSubscription,
	Maybe
} from '../../graphql/generated/schema';

const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';
// const SESSION_ID = '93a1909e-eef3-421c-9cca-22396177f39c'; //TODO despues debemos crear un context, y pedir toda esta informacion antes de renderizar la app (getInitialData o algo asi)
const COMMAND_NAME_PREFIX = 'cmd';

// REVISAR LOS TIPOS DE LOS PARÁMETROS

interface OutputListDto {
	id: Maybe<string> | undefined;
	name: Maybe<string> | undefined;
	value: Maybe<string> | undefined;
}

// enum CommandExecutionState {
// 	Success = 'success',
// 	Pending = 'pending'
// }

const COMMAND_EXECUTION_TIMEOUT = 5000;

const mapOutput = ({name, value}: OutputListDto): [string, string] => [name as string, value as string];

const LabView: React.FC<unknown> = () => {
	const [labCommands, setLabCommands] = useState<Command[]>([]);
	const [isExecutingCommand, setIsExecutingCommand] = useState<boolean>(false);
	const [outputs, setOutputs] = useState<OutputListDto[]>([]);
	const commandExecutionTimeout = useRef<NodeJS.Timeout>();
	// TODO Deberiamos pasar esto a context?
	const [labPracticeSessionId, setLabPracticeSessionId] = useState<string>();

	const {data: practiceInfo, loading} = useGetLabPracticeQuery({variables: {id: PRACTICE_ID}});
	const {data: practiceOutputs} = useGetLabPracticeOutputQuery();
	const {data: labCommandsData} = useGetLabPracticeCommandQuery();
	const [updateLabPracticeSessionCommand] = useUpdateLabPracticeSessionCommandMutation({});
	const [publishMqttMessageMutation] = usePublishMqttMessageMutation({});

	const {data: updatedSessionOutput} = useOnUpdateLabPracticeSessionOutputSubscription();

	useEffect(() => {
		if (labCommandsData?.listLabPracticeCommands?.items != null) {
			const commands: Command[] = labCommandsData.listLabPracticeCommands.items
				.filter((command) => command?.name && command.name.startsWith(COMMAND_NAME_PREFIX))
				.map((command) => {
					return {
						name: command?.name as string,
						id: command?.id as string,
						parameters: command?.LabPracticeParameters?.items?.map((parameter) => ({
							label: (parameter?.labelName ?? parameter?.name) as string,
							id: parameter?.id as string,
							value: Number(parameter?.defaultValue as string)
						})),
						label: (command?.labelName ?? command?.name) as string
					};
				});

			setLabCommands(commands);
		}
	}, [labCommandsData]);

	useEffect(() => {
		const receivedOutputs = practiceOutputs?.listLabPracticeOutputs?.items;
		if (receivedOutputs) {
			const outputs: OutputListDto[] = receivedOutputs.map((output) => ({
				id: output?.id as string,
				name: output?.name as string,
				value: '-'
			}));
			setOutputs(outputs);
		}
	}, [practiceOutputs]);

	useEffect(() => {
		const sessionData = practiceInfo?.getLabPractice?.LabPracticeSessions?.items?.[0];
		if (sessionData) {
			setLabPracticeSessionId(sessionData.id);
		}
	}, [practiceInfo]);

	useEffect(() => {
		const updatedSessionOutputData = updatedSessionOutput?.onCreateLabPracticeSessionOutput;
		if (!updatedSessionOutputData) {
			return;
		}

		const outputToUpdateIndex = outputs.findIndex(
			(output: OutputListDto) => output.id === updatedSessionOutputData.labpracticeoutputID
		);

		if (outputToUpdateIndex < 0) {
			return;
		}

		setOutputs((oldOutputs) => {
			oldOutputs[outputToUpdateIndex] = {
				...oldOutputs[outputToUpdateIndex],
				value: updatedSessionOutputData.value ?? '-'
			};

			return oldOutputs;
		});
	}, [updatedSessionOutput]);

	const handleCommandChange = useCallback(
		() =>
			async ({parameters, name}: Command, id: string) => {
				try {
					setIsExecutingCommand(true);
					const {data} = await updateLabPracticeSessionCommand({
						variables: {
							input: {
								labpracticesessionID: labPracticeSessionId,
								labpracticecommandID: id,
								parameters: JSON.stringify([parameters][0]),
								status: 'pending'
							}
						}
					});

					const mqttMessage = {
						name,
						params: [parameters],
						uuid: data?.createLabPracticeSessionCommand?.id
					};

					await publishMqttMessageMutation({
						variables: {input: {message: JSON.stringify(mqttMessage), topic: 'topic_in'}}
					});

					commandExecutionTimeout.current = setTimeout(() => {
						setIsExecutingCommand(false);
					}, COMMAND_EXECUTION_TIMEOUT);
				} catch (error) {
					console.error('no se pudo ejecutar el comando', error);
					setIsExecutingCommand(false);
				}
			},
		[]
	);

	return (
		<LoadingContainer loading={loading}>
			<LabTitle
				name={practiceInfo?.getLabPractice?.name}
				description={practiceInfo?.getLabPractice?.description}
				duration={practiceInfo?.getLabPractice?.duration}
			/>
			<LoadingContainer loading={isExecutingCommand}>
				<Commands commands={labCommands} onCommandChange={handleCommandChange} />
			</LoadingContainer>
			<LabOutputs data={outputs.map(mapOutput)} />
		</LoadingContainer>
	);
};

export default LabView;
