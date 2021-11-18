import React, {useState, useEffect} from 'react';

import {LabTitle, Commands, LabOutputs} from '../../components/Lab';
import {Command, ParameterDto} from '../../components/Lab/Commands';
import {LoadingContainer} from '../../components/UI/index';
import {
	useGetLabPracticeQuery,
	useGetLabPracticeCommandQuery,
	useGetLabPracticeOutputQuery,
	useUpdateLabPracticeSessionCommandMutation,
	useOnUpdateLabPracticeSessionCommandSubscription,
	usePublishMqttMessageMutation,
	useOnUpdateLabPracticeSessionOutputSubscription,
	Maybe
} from '../../graphql/generated/schema';

const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';
const SESSION_ID = '93a1909e-eef3-421c-9cca-22396177f39c'; //TODO despues debemos crear un context, y pedir toda esta informacion antes de renderizar la app (getInitialData o algo asi)
const COMMAND_NAME_PREFIX = 'cmd';

// REVISAR LOS TIPOS DE LOS PARÁMETROS
interface CommandListDto {
	id: Maybe<string>;
	name: Maybe<string>;
	parameters: ParameterDto | undefined | null;
}

interface OutputListDto {
	id: Maybe<string> | undefined;
	name: Maybe<string> | undefined;
	value: Maybe<string> | undefined;
}

const mapCommand = ({id, name, parameters}: CommandListDto): Command => {
	return {
		id,
		label: name,
		name,
		parameters
	};
};

const LabView: React.FC<unknown> = () => {
	const [labCommands, setLabCommands] = useState<CommandListDto[]>([]);
	const [outputs, setOutputs] = useState<OutputListDto[]>([]);
	// TODO Deberiamos pasar esto a context?
	const [labPracticeSessionId, setLabPracticeSessionId] = useState<string>();

	const {data: practiceInfo, loading} = useGetLabPracticeQuery({variables: {id: PRACTICE_ID}});
	const {data: practiceOutputs} = useGetLabPracticeOutputQuery();
	const {data: labCommandsData} = useGetLabPracticeCommandQuery();
	const [updateLabPracticeSessionCommand] = useUpdateLabPracticeSessionCommandMutation({});
	const [publishMqttMessageMutation] = usePublishMqttMessageMutation({});
	const {data: updatedSessionCommands} = useOnUpdateLabPracticeSessionCommandSubscription({
		variables: {id: SESSION_ID}
	});

	const {data: updatedSessionOutput} = useOnUpdateLabPracticeSessionOutputSubscription();

	useEffect(() => {
		// REFACTORIZAR FUNCIÓN, TENIENDO EN CUENTA LOS TIPOS DE LOS
		// DE LOS PARÁMETROS RETORNADOS DESDE EL BE
		if (labCommandsData?.listLabPracticeCommands?.items != null) {
			const commands: CommandListDto[] = labCommandsData.listLabPracticeCommands.items
				.filter(({name}) => name && name.startsWith(COMMAND_NAME_PREFIX))
				.map((command) => {
					const parameter = command.LabPracticeParameters?.items[0];
					return {
						name: command.name as string,
						id: command.id,
						parameters: {name: parameter?.name, id: parameter?.id as string, value: false}
					};
				});

			setLabCommands(commands);
		}
	}, [labCommandsData]);

	useEffect(() => {
		const sessionData = practiceInfo?.getLabPractice?.LabPracticeSessions?.items[0];
		if (sessionData) {
			setLabPracticeSessionId(sessionData.id);
		}

		const practiceOutput = practiceOutputs?.listLabPracticeOutputs?.items;
		if (practiceOutput) {
			const practiceOutputDto: OutputListDto[] = practiceOutput.map((obj) => {
				return {
					id: obj.id,
					name: obj.name,
					value: null
				};
			});
			setOutputs(practiceOutputDto);
		}
	}, [practiceInfo]);

	useEffect(() => {
		// const practiceId = updatedSessionOutput?.onCreateLabPracticeSessionOutput?.labpracticeoutputID;
		const outputValue: OutputListDto[] = outputs

		// if(updatedSessionOutput?.onCreateLabPracticeSessionOutput?.labpracticeoutputID) {
		// 	const practiceOutput = practiceOutputs?.listLabPracticeOutputs?.items.filter((practiceOutput) => {practiceOutput.name === practiceId})[0];
		// 	outputValue.push({
		// 		id: practiceOutput.id,
		// 		name: practiceOutput.name,
		// 		value: updatedSessionOutput?.onCreateLabPracticeSessionOutput?.value
		// 	})
		// }

		setOutputs(outputValue)
	}, [updatedSessionOutput]);

	useEffect(() => {
		const newCommand = updatedSessionCommands?.onCreateLabPracticeSessionCommandBySessionID;

		if (!newCommand) {
			return;
		}
		setLabCommands((oldCommands) => {
			const commandToUpdateIndex = oldCommands.findIndex((command) => command.id === newCommand.labpracticecommandID);
			if (commandToUpdateIndex < 0) {
				return oldCommands;
			}
			oldCommands[commandToUpdateIndex] = {
				...oldCommands[commandToUpdateIndex],
				parameters: JSON.parse(newCommand.parameters)
			};

			return oldCommands;
		});
	}, [updatedSessionCommands]);

	const handleCommandChange = async ({parameters, name}: Command, id: string) => {
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
			params: parameters,
			uuid: data?.createLabPracticeSessionCommand?.id
		};

		publishMqttMessageMutation({variables: {input: {message: JSON.stringify(mqttMessage), topic: 'topic_1'}}});
	};

	return (
		<LoadingContainer loading={loading}>
			<LabTitle
				name={practiceInfo?.getLabPractice?.name}
				description={practiceInfo?.getLabPractice?.description}
				duration={practiceInfo?.getLabPractice?.duration}
			/>

			<Commands commands={labCommands.map(mapCommand)} onCommandChange={handleCommandChange} />
			<LabOutputs data={[['test', 'test']] as [string, string][]} />
		</LoadingContainer>
	);
};

export default LabView;
