import orderBy from 'lodash/orderBy';
import React, {useState, useEffect, useContext} from 'react';
import {Col, Row} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';
// import {useLocation} from 'react-router-dom';

import {LabTitle, Commands, LabOutputs, LabVideo} from '../../components/Lab';
import {Command, CommandSession} from '../../components/Lab/Commands/Commands';
import {Parameter} from '../../components/Lab/Commands/ComplexCommand/ComplexCommand';
import {Session} from '../../components/Lab/LabTitle';
import {LoadingContainer} from '../../components/UI';
import {TimeConvert} from '../../generalUtils/ConvertTypes';
import {validateGroupFunction} from '../../generalUtils/ValidateGroup';
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
import {useAuthContext} from '../../GroupProvider';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';

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
	sessionId: string;
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
	professor: '',
	leaderStudent: ''
};

const LabPracticeView: React.FC = () => {
	const navigate = useNavigate();

	const [labCommands, setLabCommands] = useState<Command[]>([]);
	const [isExecutingCommand, setIsExecutingCommand] = useState<boolean>(false);
	const [executedCommands, setExecutedCommands] = useState<CommandSession[]>([]);

	const [outputs, setOutputs] = useState<OutputListDto[]>([]);
	const [sessionInformation, setSessionInformation] = useState<Session>(initSessionInformation);

	const location = useLocation();
	const labPracticeId = (location.state as LocationState)?.labPracticeId;
	const deviceId = (location.state as LocationState)?.deviceId;
	const sessionId = (location.state as LocationState)?.sessionId;

	const [outputTransition, setOutputTransition] = useState<boolean>(false);
	const [outputIndex, setOutputIndex] = useState<number>(1);

	const {userId, group} = useAuthContext(); //Get userId to check if it is the leader student, and group(role)

	// TODO Deberíamos pasar esto a context?
	const {showErrorBanner, showSuccessBanner, showWarningBanner} = useContext(notificationBannerContext);

	const {data: practiceInfo, loading} = useGetLabPracticeQuery({variables: {id: labPracticeId}});
	const {data: labSessionData, refetch} = useGetLabPracticeSessionQuery({variables: {id: sessionId}});
	const {data: labCommandsData} = useListLabPracticeCommandsQuery({variables: {id: labPracticeId}});
	const {data: sessionCommands} = useListLabPracticeSessionCommandsQuery({variables: {id: sessionId}});
	const {data: practiceOutputs} = useListLabPracticeOutputsQuery({variables: {id: labPracticeId}});
	const [createLabPracticeSessionCommand] = useCreateLabPracticeSessionCommandMutation({});
	const [updateLabPracticeSessionCommand] = useUpdateLabPracticeSessionCommandMutation({});
	const [publishMqttMessageMutation] = usePublishMqttMessageMutation({});

	const {data: updatedSessionCommand} = useOnUpdateLabPracticeSessionCommandBySessionIdSubscription({
		variables: {id: sessionId}
	});

	const {data: updatedSessionOutput} = useOnLabOutputListenSubscription({variables: {id: deviceId}});

	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (labSessionData) {
			const endDate: number = new Date(labSessionData.getLabPracticeSession?.endDate).getTime();
			const today: number = new Date().getTime();

			if (endDate - today > 0) {
				interval = setInterval(() => {
					navigate(-1);
				}, endDate - today);
			} else {
				navigate(-1);
			}
		}
		return () => clearInterval(interval);
	}, [labSessionData]);

	useEffect(() => {
		const sessionInfo = labSessionData?.getLabPracticeSession;
		setSessionInformation(() => {
			return {
				id: sessionInfo?.id ?? '',
				description: sessionInfo?.description ?? '',
				startDate: sessionInfo?.startDate,
				endDate: sessionInfo?.endDate,
				professor: sessionInfo?.LabSemester?.professor ?? '',
				videoUrlCode: sessionInfo?.videoUrlCode ?? '',
				leaderStudent: sessionInfo?.leaderUsers ?? ''
			};
		});
	}, [labSessionData]);

	useEffect(() => {
		if (labCommandsData?.listLabPracticeCommands?.items != null) {
			let commandIndex = 0;
			let labCommands: Command[] = labCommandsData?.listLabPracticeCommands?.items
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.filter((command: any) => !command?._deleted)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.map((command: any): Command => {
					let parameterIndex = 0;
					let parameters = command?.LabPracticeParameters?.items
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						?.filter((parameter: any) => !parameter?._deleted)
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						.map((parameter: any): Parameter => {
							return {
								id: parameter?.id as string,
								name: parameter?.name as string,
								label: (parameter?.labelName ?? parameter?.labelName) as string,
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
						label: (command?.labelName ?? command?.labelName) as string,
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
						command: sessionCommand?.LabPracticeCommand?.labelName ? sessionCommand?.LabPracticeCommand.labelName : ''
					};
				});
			});
		}
	}, [sessionCommands]);

	useEffect(() => {
		const receivedOutputs = practiceOutputs?.listLabPracticeOutputs?.items;
		if (receivedOutputs) {
			let outputsIndex = 0;
			const outputsArray: OutputListDto[] = receivedOutputs
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.filter((output: any) => !output?._deleted)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.map((output: any) => ({
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

		if (outputIndex % outputs.length === 0) {
			setOutputTransition(true);
		} else {
			setOutputTransition(false);
		}

		setOutputIndex(outputIndex + 1);

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
				command: commandLabel?.label ? commandLabel?.label : ''
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
				showSuccessBanner(`El comando ${commandLabel?.label ?? ''} fue correctamente ejecutado`);
			} else if (updatedCommand.status === Status.Pending) {
				showWarningBanner(
					`El práctica ${practiceInfo?.getLabPractice?.name ?? ''} se encuentra ocupada ejecutando un comando`
				);
			}
		}
	}, [updatedSessionCommand]);

	const handleCommandChange = async ({parameters = [], name}: Command, id: string) => {
		try {
			setIsExecutingCommand(true);
			const {data} = await createLabPracticeSessionCommand({
				variables: {
					input: {
						labpracticesessionID: sessionId,
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
				labpracticeSessionID: sessionId,
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
				variables: {input: {message: JSON.stringify(mqttMessage), topic: `topic_in/${deviceId}`}}
			});

			commandExecutionTimeout = setTimeout(async () => {
				setIsExecutingCommand(false);
				showErrorBanner(`No se pudo ejecutar el comando ${name}`);

				const {data: dataError} = await updateLabPracticeSessionCommand({
					variables: {
						input: {
							id: sessionCommandId ? sessionCommandId : '',
							labpracticecommandID: id,
							labpracticesessionID: sessionId,
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		refetch();
	};

	return (
		<LoadingContainer loading={loading}>
			<LabTitle
				name={practiceInfo?.getLabPractice?.name}
				description={practiceInfo?.getLabPractice?.description}
				duration={practiceInfo?.getLabPractice?.duration}
				labPracticeSessionId={sessionId}
				guideFileName={practiceInfo?.getLabPractice?.guideS3Path}
				sessionInformation={sessionInformation}
			/>
			{userId === sessionInformation.leaderStudent ||
			validateGroupFunction(['Admins', 'Professors', 'Monitors'], group) ? (
				<Row className="section">
					<Col md={7}>
						<Commands
							commands={labCommands}
							onCommandChange={handleCommandChange}
							isExecutingCommand={isExecutingCommand}
						/>
					</Col>
					<Col md={5}>
						<LabVideo videoUrl={sessionInformation.videoUrlCode} onVideoUrlRefresh={handleVideoUrlRefresh} />
					</Col>
				</Row>
			) : (
				<Row className="section">
					<LabVideo videoUrl={sessionInformation.videoUrlCode} onVideoUrlRefresh={handleVideoUrlRefresh} />
				</Row>
			)}
			<LabOutputs
				dataOutput={outputs.map(mapOutput)}
				dataCommands={executedCommands}
				outputTransition={outputTransition}
			/>
		</LoadingContainer>
	);
};

export default LabPracticeView;
