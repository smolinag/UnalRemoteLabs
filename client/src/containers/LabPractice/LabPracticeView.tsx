import React, {useState, useEffect, useRef, useContext} from 'react';
// import {useLocation} from 'react-router-dom';

import {LabTitle, Commands, LabOutputs} from '../../components/Lab';
import {Command, CommandSession} from '../../components/Lab/Commands/Commands';
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
	// useListLabPracticeSessionCommandsQuery,
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';

// const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';
const PRACTICE_ID = '52698b41-6586-4fa8-b024-a134892a0a59';
const SESSION_ID = '2974b73d-dbc3-4bd4-b3c9-8c7d3e6b343d'; //TODO despues debemos crear un context, y pedir toda esta informacion antes de renderizar la app (getInitialData o algo asi)
const DEVICE_ID = 'b13743e4-8951-4e97-9392-d7f07c910f30';
// const COMMAND_NAME_PREFIX = 'cmd';

interface OutputListDto {
	id: string;
	name: string;
	value: string;
}

export enum Status {
	Pending = 'pending',
	Success = 'success',
	Failure = 'failure'
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
	const [executedCommands, setExecutedCommands] = useState<CommandSession[]>([]);
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
	// const {data: commandsSessions} = useListLabPracticeSessionCommandsQuery();

	const {data: updatedSessionCommand} = useOnUpdateLabPracticeSessionCommandBySessionIdSubscription({
		variables: {id: SESSION_ID}
	});
	const {data: updatedSessionOutput} = useOnLabOutputListenSubscription({variables: {id: DEVICE_ID}});

	// const data1 = [
	// 	{
	// 		id: '247f05ab-34a6-4d0d-9621-2953e53466e0',
	// 		executionDate: '',
	// 		status: 'pending',
	// 		command: 'Electrodo B Circular',
	// 		parameters: '',
	// 		labpracticeSessionID: '93a1909e-eef3-421c-9cca-22396177f39c',
	// 		labpracticeCommandID: '924552b6-87e7-4fab-8dbb-bde2da558957'
	// 	},
	// 	{
	// 		id: '09873f12-a151-47ed-aed1-1453a6754384',
	// 		executionDate: '',
	// 		status: 'pending',
	// 		command: 'Electrodo B Plano',
	// 		parameters: '',
	// 		labpracticeSessionID: '93a1909e-eef3-421c-9cca-22396177f39c',
	// 		labpracticeCommandID: '8b464580-4297-486f-9f1e-a06d627f9b3e'
	// 	},
	// 	{
	// 		id: '6e0a44a6-527a-4b92-856d-ee49773c54a9',
	// 		executionDate: '',
	// 		status: 'pending',
	// 		command: 'Electrodo A Circular',
	// 		parameters: '',
	// 		labpracticeSessionID: '93a1909e-eef3-421c-9cca-22396177f39c',
	// 		labpracticeCommandID: '89cd34ec-cf44-4a35-ac37-9860788b7333'
	// 	},
	// 	{
	// 		id: '34920937-86d4-423f-852e-0e32c46475fb',
	// 		executionDate: '',
	// 		status: 'pending',
	// 		command: 'Electrodo B Circular',
	// 		parameters: '',
	// 		labpracticeSessionID: '93a1909e-eef3-421c-9cca-22396177f39c',
	// 		labpracticeCommandID: '924552b6-87e7-4fab-8dbb-bde2da558957'
	// 	},
	// 	{
	// 		id: 'b2e0275f-4f29-4573-b37c-f1694c784590',
	// 		executionDate: '',
	// 		status: 'pending',
	// 		command: 'Medir',
	// 		parameters: '{"id":"281bf321-de6b-40c4-b180-17119c8d3895","label":"Posicion X","value":3}',
	// 		labpracticeSessionID: '93a1909e-eef3-421c-9cca-22396177f39c',
	// 		labpracticeCommandID: '710cf63d-00e5-40dd-8d93-ad9fe29beae7'
	// 	},
	// 	{
	// 		id: '5a1d91b0-53f7-4ce4-b392-0a1925f098a5',
	// 		executionDate: '',
	// 		status: 'pending',
	// 		command: 'Medir',
	// 		parameters: '{"id":"281bf321-de6b-40c4-b180-17119c8d3895","label":"Posicion X","value":3}',
	// 		labpracticeSessionID: '93a1909e-eef3-421c-9cca-22396177f39c',
	// 		labpracticeCommandID: '710cf63d-00e5-40dd-8d93-ad9fe29beae7'
	// 	},
	// 	{
	// 		id: '7d37ea93-9dec-4d54-8485-65d3364d8174',
	// 		executionDate: '',
	// 		status: 'pending',
	// 		command: 'Electrodo B Plano',
	// 		parameters: '',
	// 		labpracticeSessionID: '93a1909e-eef3-421c-9cca-22396177f39c',
	// 		labpracticeCommandID: '8b464580-4297-486f-9f1e-a06d627f9b3e'
	// 	}
	// ];

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
								value: Number((parameter?.defaultValue as string) ?? 0),
								maxValue: Number(parameter?.maxValue ?? 0),
								minValue: Number(parameter?.minValue ?? 0)
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

		if (updatedCommand) {
			const commandLabel = labCommands.find((command) => command.id === updatedCommand.labpracticecommandID);

			if (updatedCommand.status === Status.Success) {
				const command = executedCommands.filter((obj) => obj.id === updatedCommand?.id);

				let exeCommands = executedCommands;

				const rowIndex = exeCommands.findIndex((obj) => obj.id === command[0].id);

				exeCommands = exeCommands
					.slice(0, rowIndex)
					.concat(exeCommands.slice(rowIndex + 1, executedCommands.length + 1));

				exeCommands.unshift({
					id: updatedCommand?.id ? updatedCommand?.id : '',
					executionDate: updatedCommand?.executionDate ? (`${new Date(updatedCommand?.executionDate).toDateString()} - ${new Date(updatedCommand?.executionDate).toLocaleTimeString()}`) : '',
					labpracticeCommandID: updatedCommand?.labpracticecommandID ? updatedCommand?.labpracticecommandID : '',
					labpracticeSessionID: updatedCommand?.labpracticesessionID ? updatedCommand?.labpracticesessionID : '',
					parameters: updatedCommand?.parameters ? updatedCommand?.parameters : '',
					status: updatedCommand?.status ? updatedCommand?.status : '',
					command: command[0].command
				});

				setExecutedCommands(exeCommands);

				showSuccessBanner(`El comando ${commandLabel?.name ?? ''} fue correctamente ejecutado`);
			} else {
				showErrorBanner(`No se pudo ejecutar el comando ${commandLabel?.name ?? ''}`);
			}
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
						status: Status.Pending,
						requestDate: new Date()
					}
				}
			});

			const exeCommand = executedCommands;
			exeCommand.unshift({
				id: data?.createLabPracticeSessionCommand?.id ? data?.createLabPracticeSessionCommand?.id : '',
				executionDate: '',
				labpracticeCommandID: id,
				labpracticeSessionID: labPracticeSessionId,
				parameters: JSON.stringify(parameters[0]),
				status: Status.Pending,
				command: name
			});
			setExecutedCommands(exeCommand);

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
				<Commands commands={labCommands} onCommandChange={handleCommandChange} data={executedCommands} />
			</LoadingContainer>
			<LabOutputs data={outputs.map(mapOutput)} />
		</LoadingContainer>
	);
};

export default LabPracticeView;
