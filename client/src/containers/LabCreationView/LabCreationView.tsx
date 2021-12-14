import React from 'react';
import {Row} from 'react-bootstrap';

import {
	LabPractice,
	LabPracticeCommand,
	LabPracticeCommandTable,
	LabPracticeOutput,
	LabPracticeOuputTable
} from '../../components/LabCreation';
import {Button, LoadingContainer} from '../../components/UI';
import {
	useOnCreateLabPracticeMutation,
	useOnCreateLabPracticeCommandMutation,
	useOnCreateLabPracticeParameterMutation,
	useOnCreateLabPracticeOutputMutation
} from '../../graphql/generated/schema';
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
		case Identifier.COMMANDNAME:
			return {...state, commandName: action.payload};
		case Identifier.COMMANDDESCRIPTION:
			return {...state, commandDescription: action.payload};
		case Identifier.PARAMETERNAME:
			return {...state, parameterName: action.payload};
		case Identifier.PARAMETERDESCRIPTION:
			return {...state, parameterDescription: action.payload};
		case Identifier.PARAMETERDEFAULTVALUE:
			return {...state, parameterDefaultValue: action.payload};
		case Identifier.PARAMETERUNIT:
			return {...state, parameterUnit: action.payload};
		case Identifier.PARAMETERMAXVALUE:
			return {...state, parameterMaxValue: action.payload};
		case Identifier.PARAMETERMINVALUE:
			return {...state, parameterMinValue: action.payload};
		case Identifier.PARAMETERREGEX:
			return {...state, parameterRegex: action.payload};
		case Identifier.OUTPUTTYPE:
			return {...state, outputType: action.payload};
		case Identifier.OUTPUTNAME:
			return {...state, ouputName: action.payload};
		case Identifier.OUTPUTDESCRIPTION:
			return {...state, outputDescription: action.payload};
		case Identifier.OUTPUTUNIT:
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
	ouputName: '',
	outputDescription: '',
	outputUnit: ''
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

		if (labPracticeData?.createLabPractice && labPracticeData?.createLabPractice.id && commandsList.length > 0) {
			commandsList.map(async (obj) => {
				const {data: labPracticeCommandData} = await createLabPracticeCommand({
					variables: {
						input: {
							labpracticeID: labPracticeData.createLabPractice?.id,
							name: obj.commandName,
							description: obj.commandDescription
						}
					}
				});

				if (labPracticeCommandData?.createLabPracticeCommand && labPracticeCommandData.createLabPracticeCommand.id) {
					await createLabPracticeParameter({
						variables: {
							input: {
								labpracticecommandID: labPracticeCommandData.createLabPracticeCommand.id,
								labpracticeID: labPracticeData.createLabPractice?.id,
								name: obj.parameterName,
								description: obj.parameterDescription,
								defaultValue: obj.parameterDefaultValue,
								minValue: parseInt(obj.parameterMinValue),
								maxValue: parseInt(obj.parameterMaxValue),
								regex: obj.parameterRegex
							}
						}
					});
				}
			});
		}

		if (labPracticeData?.createLabPractice && labPracticeData?.createLabPractice.id && outputsList.length > 0) {
			outputsList.map(async (obj) => {
				await createLabPracticeOutput({
					variables: {
						input: {
							labpracticeID: labPracticeData.createLabPractice?.id,
							outputType: obj.outputType,
							name: obj.ouputName,
							description: obj.outputDescription,
							units: JSON.stringify(obj.outputUnit)
						}
					}
				});
			});
		}

		setLoading(false);
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

				{outputsList.length > 0 && <LabPracticeOuputTable data={outputsList} />}

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
