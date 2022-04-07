import orderBy from 'lodash/orderBy';
import React, {useState, useEffect, useContext} from 'react';
// import {useLocation} from 'react-router-dom';

import {LabTitle, Commands, LabOutputs} from '../../components/Lab';
import {Command, CommandSession} from '../../components/Lab/Commands/Commands';
import {Parameter} from '../../components/Lab/Commands/ComplexCommand/ComplexCommand';
import {Session} from '../../components/Lab/LabTitle';
import {LoadingContainer} from '../../components/UI';
import { TimeConvert } from '../../generalUtils/ConvertTypes';
import {
	useGetLabPracticeQuery,
	useListLabPracticeCommandsQuery,
	useListLabPracticeSessionCommandsQuery,
	useListLabPracticeOutputsQuery,
	useCreateLabPracticeSessionCommandMutation,
	useOnUpdateLabPracticeSessionCommandBySessionIdSubscription,
	useUpdateLabPracticeSessionCommandMutation,
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

let commandExecutionTimeout: NodeJS.Timeout;

const initSessionInformation: Session = {
	id: '',
	videoUrlCode: '',
	startDate: '',
	endDate: '',
	description: '',
	professor: ''
};

const LabPracticeView: React.FC<unknown> = () => {
	const [labCommands, setLabCommands] = useState<Command[]>([]);
	const [isExecutingCommand, setIsExecutingCommand] = useState<boolean>(false);
	const [executedCommands, setExecutedCommands] = useState<CommandSession[]>([]);

	const [outputs, setOutputs] = useState<OutputListDto[]>([]);
	const [sessionInformation, setSessionInformation] = useState<Session>(initSessionInformation);

	// TODO Deberíamos pasar esto a context?
	const [labPracticeSessionId, setLabPracticeSessionId] = useState<string>(SESSION_ID);
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	// const location = useLocation();
	// const labPracticeId = (location.state as LocationState)?.labPracticeId;
	// const deviceId = (location.state as LocationState)?.deviceId;

	const {data: practiceInfo, loading} = useGetLabPracticeQuery({variables: {id: PRACTICE_ID}});
	const {data: labSessionData, refetch} = useGetLabPracticeSessionQuery({variables: {id: SESSION_ID}});
	const {data: labCommandsData} = useListLabPracticeCommandsQuery({variables: {id: PRACTICE_ID}});
	const {data: sessionCommands} = useListLabPracticeSessionCommandsQuery({variables: {id: SESSION_ID}});
	const {data: practiceOutputs} = useListLabPracticeOutputsQuery({variables: {id: PRACTICE_ID}});
	const [createLabPracticeSessionCommand] = useCreateLabPracticeSessionCommandMutation({});
	const [updateLabPracticeSessionCommand] = useUpdateLabPracticeSessionCommandMutation({});
	const [publishMqttMessageMutation] = usePublishMqttMessageMutation({});

	const {data: updatedSessionCommand} = useOnUpdateLabPracticeSessionCommandBySessionIdSubscription({
		variables: {id: SESSION_ID}
	});
	const {data: updatedSessionOutput} = useOnLabOutputListenSubscription({variables: {id: DEVICE_ID}});

	useEffect(() => {
		const sessionData = practiceInfo?.getLabPractice?.LabPracticeSessions?.items?.[0];
		if (sessionData) {
			setLabPracticeSessionId(sessionData.id);
		}
	}, [practiceInfo]);

	useEffect(() => {
		const sessionInfo = labSessionData?.getLabPracticeSession;
		setSessionInformation(() => {
			return {
				id: sessionInfo?.id ?? '',
				description: sessionInfo?.description ?? '',
				startDate: sessionInfo?.startDate,
				endDate: sessionInfo?.endDate,
				professor: sessionInfo?.LabSemester?.professor ?? '',
				videoUrlCode: sessionInfo?.videoUrlCode ?? ''
			};
		});
	}, [labSessionData]);

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

	// Get last 5 session commands
	useEffect(() => {
		const sessionCommandsList = sessionCommands?.listLabPracticeSessionCommands?.items;

		if (sessionCommandsList && sessionCommandsList?.length > 0) {
			setExecutedCommands(() => {
				const ordererArray = orderBy(sessionCommandsList, 'requestDate', 'desc').slice(0, 5);

				return ordererArray.map((sessionCommand) => {
					return {
						id: sessionCommand?.id ? sessionCommand?.id : '',
						executionDate: TimeConvert(sessionCommand?.executionDate),
						labpracticeCommandID: sessionCommand?.labpracticecommandID ? sessionCommand?.labpracticecommandID : '',
						labpracticeSessionID: sessionCommand?.labpracticesessionID ? sessionCommand?.labpracticesessionID : '',
						parameters: sessionCommand?.parameters ? sessionCommand?.parameters : '',
						status: sessionCommand?.status ? sessionCommand?.status : '',
						command: sessionCommand?.LabPracticeCommand ? sessionCommand?.LabPracticeCommand.name : ''
					};
				});
			});
		}
	}, [sessionCommands]);

	useEffect(() => {
		const receivedOutputs = practiceOutputs?.listLabPracticeOutputs?.items;
		if (receivedOutputs) {
			let outputsIndex = 0;
			const outputsArray: OutputListDto[] = receivedOutputs.map((output) => ({
				id: output?.id as string,
				name: output?.name as string,
				value: '-',
				order: output?.order ?? outputsIndex++
			}));
			setOutputs(orderBy(outputsArray, 'order', 'asc'));
		}
	}, [practiceOutputs]);

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

			const commandUpdated = {
				id: updatedCommand?.id ? updatedCommand?.id : '',
				executionDate: TimeConvert(updatedCommand?.executionDate),
				labpracticeCommandID: updatedCommand?.labpracticecommandID ? updatedCommand?.labpracticecommandID : '',
				labpracticeSessionID: updatedCommand?.labpracticesessionID ? updatedCommand?.labpracticesessionID : '',
				parameters: updatedCommand?.parameters ? updatedCommand?.parameters : '',
				status: updatedCommand?.status ? updatedCommand?.status : '',
				command: updatedCommand?.LabPracticeCommand ? updatedCommand?.LabPracticeCommand.name : ''
			};

			clearTimeout(commandExecutionTimeout);
			setIsExecutingCommand(false);

			const command = executedCommands.filter((obj) => obj.id === updatedCommand?.id);

			if (command.length > 0) {
				let exeCommands = executedCommands;
				const rowIndex = exeCommands.findIndex((obj) => obj.id === command[0].id);

				exeCommands = exeCommands
					.slice(0, rowIndex)
					.concat(exeCommands.slice(rowIndex + 1, executedCommands.length + 1));

				exeCommands.unshift(commandUpdated);
				setExecutedCommands(exeCommands);
			} else {
				// Remove last session command item if the array length is 5
				let exeCommands = executedCommands;
				if (exeCommands.length === 5) {
					exeCommands = exeCommands.slice(0, exeCommands.length - 1);
				}
				exeCommands.unshift(commandUpdated);
				setExecutedCommands(exeCommands);
			}
			if (updatedCommand.status === Status.Success) {
				showSuccessBanner(`El comando ${commandLabel?.name ?? ''} fue correctamente ejecutado`);
			}
		}
	}, [updatedSessionCommand]);

	const handleCommandChange = async ({parameters = [], name}: Command, id: string) => {
		try {
			setIsExecutingCommand(true);
			const {data} = await createLabPracticeSessionCommand({
				variables: {
					input: {
						labpracticesessionID: labPracticeSessionId,
						labpracticecommandID: id,
						parameters: JSON.stringify(parameters[0]),
						status: Status.Pending,
						requestDate: new Date().toISOString()
					}
				}
			});

			const sessionCommandId = data?.createLabPracticeSessionCommand?.id;
			const version = data?.createLabPracticeSessionCommand?._version;

			let exeCommands = executedCommands;
			if (exeCommands.length === 5) {
				exeCommands = exeCommands.slice(0, exeCommands.length - 1);
			}

			exeCommands.unshift({
				id: data?.createLabPracticeSessionCommand?.id ? data?.createLabPracticeSessionCommand?.id : '',
				executionDate: '',
				labpracticeCommandID: id,
				labpracticeSessionID: labPracticeSessionId,
				parameters: JSON.stringify(parameters[0]),
				status: Status.Pending,
				command: name
			});

			setExecutedCommands(exeCommands);

			const mqttMessage = {
				name,
				params: parameters,
				uuid: data?.createLabPracticeSessionCommand?.id,
				type: 'command'
			};

			await publishMqttMessageMutation({
				variables: {input: {message: JSON.stringify(mqttMessage), topic: `${DEVICE_ID}/topic_in`}}
			});

			commandExecutionTimeout = setTimeout(async () => {
				setIsExecutingCommand(false);
				showErrorBanner(`No se pudo ejecutar el comando ${name}`);

				const {data: dataError} = await updateLabPracticeSessionCommand({
					variables: {
						input: {
							id: sessionCommandId ? sessionCommandId : '',
							labpracticecommandID: id,
							labpracticesessionID: labPracticeSessionId,
							parameters: JSON.stringify(parameters[0]),
							status: Status.Failure,
							requestDate: new Date().toISOString(),
							executionDate: new Date().toISOString(),
							_version: version
						}
					}
				});

				let exeCommands = executedCommands;
				if (exeCommands.length === 5) {
					exeCommands = exeCommands.slice(0, exeCommands.length - 1);
				}

				exeCommands.unshift({
					id: dataError?.updateLabPracticeSessionCommand?.id ? dataError?.updateLabPracticeSessionCommand?.id : '',
					executionDate: TimeConvert(dataError?.updateLabPracticeSessionCommand?.executionDate),
					labpracticeCommandID: dataError?.updateLabPracticeSessionCommand?.labpracticecommandID
						? dataError?.updateLabPracticeSessionCommand?.labpracticecommandID
						: '',
					labpracticeSessionID: dataError?.updateLabPracticeSessionCommand?.labpracticesessionID
						? dataError?.updateLabPracticeSessionCommand?.labpracticesessionID
						: '',
					parameters: dataError?.updateLabPracticeSessionCommand?.parameters,
					status: dataError?.updateLabPracticeSessionCommand?.status
						? dataError?.updateLabPracticeSessionCommand?.status
						: '',
					command: name
				});

				setExecutedCommands(exeCommands);
			}, COMMAND_EXECUTION_TIMEOUT);
		} catch (error) {
			console.error('no se pudo ejecutar el comando', error);
			setIsExecutingCommand(false);
		}
	};

	const handleVideoUrlRefresh = () => {
		refetch().then((response) => console.log(response));
	};

	return (
		<LoadingContainer loading={loading}>
			<LabTitle
				name={practiceInfo?.getLabPractice?.name}
				description={practiceInfo?.getLabPractice?.description}
				duration={practiceInfo?.getLabPractice?.duration}
				isVideoUrlInputEnabled={true}
				laPracticeSessionId={SESSION_ID}
				guideFileName={practiceInfo?.getLabPractice?.guideS3Path}
				sessionInformation={sessionInformation}
			/>
			<Commands
				commands={labCommands}
				onCommandChange={handleCommandChange}
				videoUrl={sessionInformation.videoUrlCode}
				onVideoUrlRefresh={handleVideoUrlRefresh}
				isExecutingCommand={isExecutingCommand}
			/>
			<LabOutputs dataOutput={outputs.map(mapOutput)} dataCommands={executedCommands} />
		</LoadingContainer>
	);
};

export default LabPracticeView;
