import React, {useContext} from 'react';
import Row from 'react-bootstrap/Row';

import LabPractice from '../../components/LabCreation/LabPractice';
import LabPracticeCommand from '../../components/LabCreation/LabPracticeCommand';
import LabPracticeCommandTable from '../../components/LabCreation/LabPracticeCommandTable';
import LabPracticeOutput from '../../components/LabCreation/LabPracticeOutput';
import LabPracticeOutputTable from '../../components/LabCreation/LabPracticeOutputTable';
import {Button, LoadingContainer} from '../../components/UI';
import {
	useOnCreateLabPracticeMutation,
	useOnCreateLabPracticeCommandMutation,
	useOnCreateLabPracticeParameterMutation,
	useOnCreateLabPracticeOutputMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import classes from './LabCreationView.module.scss';
import {LabPracticeInfo, LabPracticeCommandInfo, Identifier} from './types';

const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';
interface Action {
	type: string;
	payload: string;
}
function reducer(state: LabPracticeInfo, action: Action): LabPracticeInfo {
	switch (action.type) {
		case Identifier.Name:
			return {...state, practiceInfoName: action.payload};
		case Identifier.Description:
			return {...state, practiceInfoDescription: action.payload};
		case Identifier.Duration:
			return {...state, practiceInfoDuration: action.payload};
		case Identifier.CommandName:
			return {...state, commandName: action.payload};
		case Identifier.CommandDescription:
			return {...state, commandDescription: action.payload};
		case Identifier.ParameterName:
			return {...state, parameterName: action.payload};
		case Identifier.ParameterDescription:
			return {...state, parameterDescription: action.payload};
		case Identifier.ParameterDefaultValue:
			return {...state, parameterDefaultValue: action.payload};
		case Identifier.ParameterUnit:
			return {...state, parameterUnit: action.payload};
		case Identifier.ParameterMaxValue:
			return {...state, parameterMaxValue: action.payload};
		case Identifier.ParameterMinValue:
			return {...state, parameterMinValue: action.payload};
		case Identifier.ParameterRegex:
			return {...state, parameterRegex: action.payload};
		case Identifier.OutputType:
			return {...state, outputType: action.payload};
		case Identifier.OutputName:
			return {...state, outputName: action.payload};
		case Identifier.OutputDescription:
			return {...state, outputDescription: action.payload};
		case Identifier.OutputUnit:
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
	outputType: 'string',
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

						return Promise.all([
							createLabPracticeParameter({
								variables: {
									input: {
										labpracticecommandID: commandId,
										labpracticeID: labPracticeData.createLabPractice?.id,
										name: command.parameterName,
										description: command.parameterDescription,
										defaultValue: command.parameterDefaultValue,
										minValue: parseInt(command.parameterMinValue),
										maxValue: parseInt(command.parameterMaxValue),
										regex: command.parameterRegex
									}
								}
							})
						]);
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
								// outputType: obj.outputType,
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
				<Row className="section">
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
