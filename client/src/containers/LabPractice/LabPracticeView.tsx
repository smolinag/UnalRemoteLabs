import orderBy from 'lodash/orderBy';
import React, {useState, useEffect, useContext} from 'react';
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
	useOnLabOutputListenSubscription,
	useGetLabPracticeSessionQuery
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
	order: number;
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

const initCommand = {
	id: '',
	executionDate: '',
	labpracticeCommandID: '',
	labpracticeSessionID: '',
	parameters: '',
	status: 'Status.Pending',
	command: ''
};

const LabPracticeView: React.FC<unknown> = () => {
	const [labCommands, setLabCommands] = useState<Command[]>([]);
	const [isExecutingCommand, setIsExecutingCommand] = useState<boolean>(false);
	const [executedCommands, setExecutedCommands] = useState<CommandSession[]>([]);
	const [executedCommand, setExecutedCommand] = useState<CommandSession>(initCommand);

	const [outputs, setOutputs] = useState<OutputListDto[]>([]);
	const [labSessionVideoUrl, setlabSessionVideoUrl] = useState('');
	// const commandExecutionTimeout = useRef<NodeJS.Timeout>();

	// TODO Deberiamos pasar esto a context?
	const [labPracticeSessionId, setLabPracticeSessionId] = useState<string>(SESSION_ID);
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	// const location = useLocation();
	// const labPracticeId = (location.state as LocationState)?.labPracticeId;
	// const deviceId = (location.state as LocationState)?.deviceId;

	const {data: practiceInfo, loading} = useGetLabPracticeQuery({variables: {id: PRACTICE_ID}});
	const {data: practiceOutputs} = useListLabPracticeOutputsQuery({variables: {id: PRACTICE_ID}});
	const {data: labCommandsData} = useListLabPracticeCommandsQuery({variables: {id: PRACTICE_ID}});
	const {data: labSessionData} = useGetLabPracticeSessionQuery({variables: {id: SESSION_ID}});
	const [createLabPracticeSessionCommand] = useCreateLabPracticeSessionCommandMutation({});
	const [publishMqttMessageMutation] = usePublishMqttMessageMutation({});

	const {data: updatedSessionCommand} = useOnUpdateLabPracticeSessionCommandBySessionIdSubscription({
		variables: {id: SESSION_ID}
	});
	const {data: updatedSessionOutput} = useOnLabOutputListenSubscription({variables: {id: DEVICE_ID}});

	useEffect(() => {
		if (labCommandsData?.listLabPracticeCommands?.items != null) {
			let commandIndex = 0;
			let labCommands: Command[] = labCommandsData?.listLabPracticeCommands?.items
				.filter((command) => !command?._deleted)
				.map((command): Command => {
					let parameterIndex = 0;
					let parameters = command?.LabPracticeParameters?.items
						?.filter((parameter) => !parameter?._deleted)
						.map((parameter): Parameter => {
							return {
								id: parameter?.id as string,
								label: (parameter?.labelName ?? parameter?.name) as string,
								value: Number((parameter?.defaultValue as string) ?? 0),
								maxValue: Number(parameter?.maxValue ?? 0),
								minValue: Number(parameter?.minValue ?? 0),
								order: Number(parameter?.order) ?? parameterIndex++
							};
						});

					parameters = orderBy(parameters, 'order', 'asc');
					return {
						id: command?.id as string,
						name: command?.name as string,
						label: (command?.labelName ?? command?.name) as string,
						parameters,
						order: command?.order ?? commandIndex++
					};
				});

			labCommands = orderBy(labCommands, 'order', 'asc');
			setLabCommands(labCommands);
		}
	}, [labCommandsData]);

	useEffect(() => {
		const receivedOutputs = practiceOutputs?.listLabPracticeOutputs?.items;
		if (receivedOutputs) {
			let ouputs = 0;
			const outputs: OutputListDto[] = receivedOutputs.map((output) => ({
				id: output?.id as string,
				name: output?.name as string,
				value: '-',
				order: output?.order ?? ouputs++
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
		const videoUrl = labSessionData?.getLabPracticeSession?.videoUrlCode
			? labSessionData.getLabPracticeSession.videoUrlCode
			: '';
		setlabSessionVideoUrl(videoUrl);
	}, [labSessionData]);

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
					executionDate: updatedCommand?.executionDate
						? `${new Date(updatedCommand?.executionDate).toDateString()} - ${new Date(
								updatedCommand?.executionDate
						  ).toLocaleTimeString()}`
						: '',
					labpracticeCommandID: updatedCommand?.labpracticecommandID ? updatedCommand?.labpracticecommandID : '',
					labpracticeSessionID: updatedCommand?.labpracticesessionID ? updatedCommand?.labpracticesessionID : '',
					parameters: updatedCommand?.parameters ? updatedCommand?.parameters : '',
					status: updatedCommand?.status ? updatedCommand?.status : '',
					command: command[0].command
				});

				setExecutedCommands(exeCommands);

				setExecutedCommand({
					id: updatedCommand?.id ? updatedCommand?.id : '',
					executionDate: updatedCommand?.executionDate
						? `${new Date(updatedCommand?.executionDate).toDateString()} - ${new Date(
								updatedCommand?.executionDate
						  ).toLocaleTimeString()}`
						: '',
					labpracticeCommandID: updatedCommand?.labpracticecommandID ? updatedCommand?.labpracticecommandID : '',
					labpracticeSessionID: updatedCommand?.labpracticesessionID ? updatedCommand?.labpracticesessionID : '',
					parameters: updatedCommand?.parameters ? updatedCommand?.parameters : '',
					status: updatedCommand?.status ? updatedCommand?.status : '',
					command: command[0].command
				});

				showSuccessBanner(`El comando ${commandLabel?.name ?? ''} fue correctamente ejecutado`);
			} else {
				showErrorBanner(`No se pudo ejecutar el comando ${commandLabel?.name ?? ''}`);
			}
		}
	}, [updatedSessionCommand]);

	useEffect(() => {
		let commandExecutionTimeout: NodeJS.Timeout
		
		if (executedCommand.status === Status.Pending) {
			commandExecutionTimeout = setTimeout(() => {
				setIsExecutingCommand(false);
				showErrorBanner(`No se pudo ejecutar el comando ${executedCommand.command}`);
			}, COMMAND_EXECUTION_TIMEOUT);
		} else if(executedCommand.status === Status.Success) {
			setIsExecutingCommand(false);
		}

		return () => {
			if (commandExecutionTimeout) {
				clearTimeout(commandExecutionTimeout);
			}
		};
	}, [executedCommand]);

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

			setExecutedCommand({
				id: data?.createLabPracticeSessionCommand?.id ? data?.createLabPracticeSessionCommand?.id : '',
				executionDate: '',
				labpracticeCommandID: id,
				labpracticeSessionID: labPracticeSessionId,
				parameters: JSON.stringify(parameters[0]),
				status: Status.Pending,
				command: name
			});

			const mqttMessage = {
				name,
				params: parameters,
				uuid: data?.createLabPracticeSessionCommand?.id,
				type: 'command'
			};

			await publishMqttMessageMutation({
				variables: {input: {message: JSON.stringify(mqttMessage), topic: `${DEVICE_ID}/topic_in`}}
			});
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
				isVideoUrlInputEnabled={true}
				laPracticeSessionId={SESSION_ID}
			/>
			<LoadingContainer loading={isExecutingCommand}>
				<Commands commands={labCommands} onCommandChange={handleCommandChange} data={executedCommands} />
			</LoadingContainer>
			<LabOutputs data={outputs.map(mapOutput)} videoUrl={labSessionVideoUrl} />
		</LoadingContainer>
	);
};

export default LabPracticeView;
