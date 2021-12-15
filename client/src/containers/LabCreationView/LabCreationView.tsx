import React, {useContext} from 'react';
import Row from 'react-bootstrap/Row';

import {
	LabPractice,
	LabPracticeCommand,
	LabPracticeCommandTable,
	LabPracticeOutput,
	LabPracticeOutputTable
} from '../../components/LabCreation';
import {Button, LoadingContainer} from '../../components/UI';
import {
	useOnCreateLabPracticeMutation,
	useOnCreateLabPracticeCommandMutation,
	useOnCreateLabPracticeParameterMutation,
	useOnCreateLabPracticeOutputMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {Identifier} from './Identifiers';
import classes from './LabCreationView.module.scss';
import {LabPracticeInfo, LabPracticeCommandInfo} from './types';

const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';
interface Action {
	type: string;
	payload: string;
}
function reducer(state: LabPracticeInfo, action: Action): LabPracticeInfo {
	switch (action.type) {
		case Identifier.NAME:
			return {...state, practiceInfoName: action.payload};
		case Identifier.DESCRIPTION:
			return {...state, practiceInfoDescription: action.payload};
		case Identifier.DURATION:
			return {...state, practiceInfoDuration: action.payload};
		case Identifier.COMMAND_NAME:
			return {...state, commandName: action.payload};
		case Identifier.COMMAND_DESCRIPTION:
			return {...state, commandDescription: action.payload};
		case Identifier.PARAMETER_NAME:
			return {...state, parameterName: action.payload};
		case Identifier.PARAMETER_DESCRIPTION:
			return {...state, parameterDescription: action.payload};
		case Identifier.PARAMETER_DEFAULT_VALUE:
			return {...state, parameterDefaultValue: action.payload};
		case Identifier.PARAMETER_UNIT:
			return {...state, parameterUnit: action.payload};
		case Identifier.PARAMETER_MAX_VALUE:
			return {...state, parameterMaxValue: action.payload};
		case Identifier.PARAMETER_MIN_VALUE:
			return {...state, parameterMinValue: action.payload};
		case Identifier.PARAMETER_REGEX:
			return {...state, parameterRegex: action.payload};
		case Identifier.OUTPUT_TYPE:
			return {...state, outputType: action.payload};
		case Identifier.OUTPUT_NAME:
			return {...state, outputName: action.payload};
		case Identifier.OUTPUT_DESCRIPTION:
			return {...state, outputDescription: action.payload};
		case Identifier.OUTPUT_UNIT:
			return {...state, outputUnit: action.payload};
		default:
			return state;
	}
}
const initialCommand: LabPracticeInfo = {
	practiceInfoName: '',
	practiceInfoDescription: '',
	practiceInfoDuration: ',',
	commandName: '',
	commandDescription: '',
	parameterName: '',
	parameterDescription: '',
	parameterDefaultValue: '',
	parameterUnit: '',
	parameterMaxValue: '',
	parameterMinValue: '',
	parameterRegex: '',
	outputType: '',
	outputName: '',
	outputDescription: '',
	outputUnit: '',
	parameters: []
};
const LabCreationView: React.FC<unknown> = () => {
	const [practice, dispatch] = React.useReducer(reducer, initialCommand);
	const [commandsList, setCommandsList] = React.useState<LabPracticeCommandInfo[]>([]);
	const [outputsList, setOutputsList] = React.useState<LabPracticeInfo[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);

	const [createLabPractice] = useOnCreateLabPracticeMutation({});
	const [createLabPracticeCommand] = useOnCreateLabPracticeCommandMutation({});
	const [createLabPracticeParameter] = useOnCreateLabPracticeParameterMutation({});
	const [createLabPracticeOutput] = useOnCreateLabPracticeOutputMutation({});
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const practiceChange = (value: string, id: string) => {
		dispatch({type: id, payload: value});
	};

	const addCommand = (practice: LabPracticeInfo): void => {
		setCommandsList((previousState) => {
			const commandsList = previousState.concat(practice);
			return commandsList;
		});
	};

	const addOutput = (practice: LabPracticeInfo): void => {
		setOutputsList((previousState) => {
			const outputsList = previousState.concat(practice);
			return outputsList;
		});
	};

	const createPractice = async () => {
		setLoading(true);
		const {data: labPracticeData} = await createLabPractice({
			variables: {
				input: {
					laboratoryID: PRACTICE_ID,
					name: practice.practiceInfoName,
					description: practice.practiceInfoDescription,
					duration: parseInt(practice.practiceInfoDuration)
				}
			}
		});
		if (!labPracticeData?.createLabPractice?.id) {
			return;
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const creationPromises: Promise<any>[] = [];
		if (commandsList.length > 0) {
			creationPromises.concat(
				commandsList.map((command) =>
					createLabPracticeCommand({
						variables: {
							input: {
								labpracticeID: labPracticeData.createLabPractice?.id,
								name: command.commandName,
								description: command.commandDescription
							}
						}
					}).then((commandData) => {
						const commandId = commandData?.data?.createLabPracticeCommand?.id;
						if (!commandId) {
							return;
						}
						return Promise.all(
							command.parameters.map((param) =>
								createLabPracticeParameter({
									variables: {
										input: {
											labpracticecommandID: commandId,
											labpracticeID: labPracticeData.createLabPractice?.id,
											name: param.parameterName,
											description: param.parameterDescription,
											defaultValue: param.parameterDefaultValue,
											minValue: parseInt(param.parameterMinValue),
											maxValue: parseInt(param.parameterMaxValue),
											regex: param.parameterRegex
										}
									}
								})
							)
						);
					})
				)
			);
		}
		if (outputsList.length > 0) {
			creationPromises.concat(
				outputsList.map(async (obj) =>
					createLabPracticeOutput({
						variables: {
							input: {
								labpracticeID: labPracticeData.createLabPractice?.id,
								outputType: obj.outputType,
								name: obj.outputName,
								description: obj.outputDescription,
								units: JSON.stringify(obj.outputUnit)
							}
						}
					})
				)
			);
		}
		try {
			await Promise.all(creationPromises);
			showSuccessBanner(`La práctica ${labPracticeData.createLabPractice.name} fue creada exitosamente`);
		} catch (error) {
			showErrorBanner(`Error en la creación de la práctica ${labPracticeData.createLabPractice.name}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<LoadingContainer loading={loading}>
				<LabPractice practice={practice} onValueChange={practiceChange} />
				<LabPracticeCommand practice={practice} onValueChange={practiceChange} />
				<div className={classes.justifyCenter}>
					<Button loading={false} onClick={() => addCommand(practice)}>
						Añadir
					</Button>
				</div>
				{commandsList.length > 0 && <LabPracticeCommandTable data={commandsList} />}
				<LabPracticeOutput practice={practice} onValueChange={practiceChange} />
				<div className={classes.justifyCenter}>
					<Button loading={false} onClick={() => addOutput(practice)}>
						Añadir
					</Button>
				</div>
				{outputsList.length > 0 && <LabPracticeOutputTable data={outputsList} />}
				<Row className={classes.section}>
					<div className={classes.justifyEnd}>
						<Button loading={loading} onClick={createPractice}>
							Guardar
						</Button>
					</div>
				</Row>
			</LoadingContainer>
		</>
	);
};

export default LabCreationView;
