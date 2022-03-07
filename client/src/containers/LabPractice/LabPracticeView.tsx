import React, {useState, useEffect, useRef, useContext} from 'react';
// import {useLocation} from 'react-router-dom';

import {LabTitle, Commands, LabOutputs} from '../../components/Lab';
import {Command} from '../../components/Lab/Commands/Commands';
import {Parameter} from '../../components/Lab/Commands/ComplexCommand/ComplexCommand';
import {LoadingContainer} from '../../components/UI';
import {
	useGetLabPracticeQuery,
	useListLabPracticeCommandsQuery,
	useListLabPracticeOutputsQuery,
	useCreateLabPracticeSessionCommandMutation,
	useOnUpdateLabPracticeSessionCommandBySessionIdSubscription,
	usePublishMqttMessageMutation,
	useOnLabOutputListenSubscription
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';

// const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';
const PRACTICE_ID = 'f4ed1552-4719-4652-9f94-b516337fd578';
const SESSION_ID = '93a1909e-eef3-421c-9cca-22396177f39c'; //TODO despues debemos crear un context, y pedir toda esta informacion antes de renderizar la app (getInitialData o algo asi)
const DEVICE_ID = 'cb24b961-da14-4e80-8ce2-050feb952b77';
// const COMMAND_NAME_PREFIX = 'cmd';

// REVISAR LOS TIPOS DE LOS PARÁMETROS

interface OutputListDto {
	id: string;
	name: string;
	value: string;
}

enum CommandExecutionState {
	Success = 'success',
	Error = 'error',
	Pending = 'pending'
}

export interface LocationState {
	labPracticeId: string;
	deviceId: string;
}

const COMMAND_EXECUTION_TIMEOUT = 10000;

const mapOutput = ({name, value}: OutputListDto): [string, string] => [name as string, value as string];

const LabPracticeView: React.FC<unknown> = () => {
	const [labCommands, setLabCommands] = useState<Command[]>([]);
	const [isExecutingCommand, setIsExecutingCommand] = useState<boolean>(false);
	const [outputs, setOutputs] = useState<OutputListDto[]>([]);
	const commandExecutionTimeout = useRef<NodeJS.Timeout>();
	// TODO Deberiamos pasar esto a context?
	const [labPracticeSessionId, setLabPracticeSessionId] = useState<string>(SESSION_ID);
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	// const location = useLocation();
	// const labPracticeId = (location.state as LocationState)?.labPracticeId;
	// const deviceId = (location.state as LocationState)?.deviceId;

	const {data: practiceInfo, loading} = useGetLabPracticeQuery({variables: {id: PRACTICE_ID}});
	const {data: practiceOutputs} = useListLabPracticeOutputsQuery({variables: {id: PRACTICE_ID}});
	const {data: labCommandsData} = useListLabPracticeCommandsQuery({variables: {id: PRACTICE_ID}});
	const [createLabPracticeSessionCommand] = useCreateLabPracticeSessionCommandMutation({});
	const [publishMqttMessageMutation] = usePublishMqttMessageMutation({});

	const {data: updatedSessionCommand} = useOnUpdateLabPracticeSessionCommandBySessionIdSubscription({
		variables: {id: SESSION_ID}
	});
	const {data: updatedSessionOutput} = useOnLabOutputListenSubscription({variables: {id: DEVICE_ID}});

	useEffect(() => {
		if (labCommandsData?.listLabPracticeCommands?.items != null) {
			const labCommands: Command[] = labCommandsData?.listLabPracticeCommands?.items
				.filter((command) => !command?._deleted)
				.map((command): Command => {
					const parameters = command?.LabPracticeParameters?.items
						?.filter((parameter) => !parameter?._deleted)
						.map((parameter): Parameter => {
							return {
								id: parameter?.id as string,
								label: (parameter?.labelName ?? parameter?.name) as string,
								value: Number((parameter?.defaultValue as string) ?? 0)
							};
						});

					return {
						id: command?.id as string,
						name: command?.name as string,
						label: (command?.labelName ?? command?.name) as string,
						parameters
					};
				});
			setLabCommands(labCommands);
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
		const updatedSessionOutputData = updatedSessionOutput?.onLabOutputListen;
		if (!updatedSessionOutputData) {
			return;
		}

		const outputToUpdateIndex = outputs.findIndex(
			(output: OutputListDto) => output.id === updatedSessionOutputData.labPracticeOutputID
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

	useEffect(() => {
		const updatedCommand = updatedSessionCommand?.onUpdateLabPracticeSessionCommandBySessionID;
		if (!updatedCommand || updatedCommand.status === CommandExecutionState.Pending) {
			return;
		}
		setIsExecutingCommand(false);
		const commandLabel = labCommands.find((command) => command.id === updatedCommand.labpracticecommandID);
		if (updatedCommand.status === CommandExecutionState.Success) {
			showSuccessBanner(`El comando ${commandLabel?.name ?? ''} fue correctamente ejecutado`);
		} else {
			showErrorBanner(`No se pudo ejecutar el comando ${commandLabel?.name ?? ''}`);
		}
	}, [updatedSessionCommand]);

	const handleCommandChange = async ({parameters = [], name, label}: Command, id: string) => {
		try {
			setIsExecutingCommand(true);
			const {data} = await createLabPracticeSessionCommand({
				variables: {
					input: {
						labpracticesessionID: labPracticeSessionId,
						labpracticecommandID: id,
						parameters: JSON.stringify(parameters[0]),
						status: 'pending',
						requestDate: new Date()
					}
				}
			});

			const mqttMessage = {
				name,
				params: parameters,
				uuid: data?.createLabPracticeSessionCommand?.id
			};

			await publishMqttMessageMutation({
				variables: {input: {message: JSON.stringify(mqttMessage), topic: `${DEVICE_ID}/topic_in`}}
			});

			commandExecutionTimeout.current = setTimeout(() => {
				setIsExecutingCommand(false);
				showErrorBanner(`No se pudo ejecutar el comando ${label}`);
			}, COMMAND_EXECUTION_TIMEOUT);
		} catch (error) {
			console.error('no se pudo ejecutar el comando', error);
			setIsExecutingCommand(false);
		}
	};

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

export default LabPracticeView;
