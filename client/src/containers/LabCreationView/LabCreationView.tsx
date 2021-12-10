import React from 'react';
import {Row} from 'react-bootstrap';

import {
	LabPractice,
	LabPracticeCommand,
	LabPracticeCommandTable,
	LabPracticeOutput,
	LabPracticeOuputTable
} from '../../components/LabCreation';
import {Button} from '../../components/UI';
import {Justify} from '../../components/UI/Button/Button';
import {
	useOnCreateLabPracticeMutation,
	useOnCreateLabPracticeCommandMutation,
	useOnCreateLabPracticeParameterMutation,
	useOnCreateLabPracticeOutputMutation
} from '../../graphql/generated/schema';
import {Identifiers} from './Identifiers';
import classes from './LabCreationView.module.scss';

const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';

interface action {
	type: string;
	payload: string;
}

export interface LabPracticeInfo extends LabPracticeCommandInfo, OutputInfo {
	practiceInfoName: string;
	practiceInfoDescription: string;
	practiceInfoDuration: string;
}

export interface LabPracticeCommandInfo extends LabPracticeParameterInfo {
	commandName: string;
	commandDescription: string;
}

export interface LabPracticeParameterInfo {
	parameterName: string;
	parameterDescription: string;
	parameterDefaultValue: string;
	parameterUnit: string;
	parameterMaxValue: string;
	parameterMinValue: string;
	parameterRegex: string;
}

export interface OutputInfo {
	outputType: string;
	ouputName: string;
	outputDescription: string;
	outputUnit: string;
}

function reducer(state: LabPracticeInfo, action: action): LabPracticeInfo {
	switch (action.type) {
		case Identifiers.NAME:
			return {...state, practiceInfoName: action.payload};
		case Identifiers.DESCRIPTION:
			return {...state, practiceInfoDescription: action.payload};
		case Identifiers.DURATION:
			return {...state, practiceInfoDuration: action.payload};
		case Identifiers.COMMANDNAME:
			return {...state, commandName: action.payload};
		case Identifiers.COMMANDDESCRIPTION:
			return {...state, commandDescription: action.payload};
		case Identifiers.PARAMETERNAME:
			return {...state, parameterName: action.payload};
		case Identifiers.PARAMETERDESCRIPTION:
			return {...state, parameterDescription: action.payload};
		case Identifiers.PARAMETERDEFAULTVALUE:
			return {...state, parameterDefaultValue: action.payload};
		case Identifiers.PARAMETERUNIT:
			return {...state, parameterUnit: action.payload};
		case Identifiers.PARAMETERMAXVALUE:
			return {...state, parameterMaxValue: action.payload};
		case Identifiers.PARAMETERMINVALUE:
			return {...state, parameterMinValue: action.payload};
		case Identifiers.PARAMETERREGEX:
			return {...state, parameterRegex: action.payload};
		case Identifiers.OUTPUTTYPE:
			return {...state, outputType: action.payload};
		case Identifiers.OUTPUTNAME:
			return {...state, ouputName: action.payload};
		case Identifiers.OUTPUTDESCRIPTION:
			return {...state, outputDescription: action.payload};
		case Identifiers.OUTPUTUNIT:
			return {...state, outputUnit: action.payload};
		default:
			return state;
	}
}

const initialCommands: LabPracticeInfo = {
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
	const [practice, dispatch] = React.useReducer(reducer, initialCommands);
	const [commandsList, setCommandsList] = React.useState<LabPracticeCommandInfo[]>([]);
	const [outputsList, setOutputsList] = React.useState<LabPracticeInfo[]>([]);

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

				if(labPracticeCommandData?.createLabPracticeCommand && labPracticeCommandData.createLabPracticeCommand.id) {
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
	};

	return (
		<>
			{/* <LoadingContainer loading={false}> */}
			<LabPractice practice={practice} onValueChange={practiceChange} />

			<LabPracticeCommand practice={practice} onValueChange={practiceChange} />

			<Button loading={false} justify={Justify.JUSTIFY_CENTER} onClick={() => addCommand(practice)}>
				Añadir
			</Button>

			{commandsList.length > 0 && <LabPracticeCommandTable data={commandsList} />}

			<LabPracticeOutput practice={practice} onValueChange={practiceChange} />

			<Button loading={false} justify={Justify.JUSTIFY_CENTER} onClick={() => addOutput(practice)}>
				Añadir
			</Button>

			{outputsList.length > 0 && <LabPracticeOuputTable data={outputsList} />}

			<Row className={classes.section}>
				<Button loading={false} justify={Justify.JUSTIFY_END} onClick={createPractice}>
					Guardar
				</Button>
			</Row>
			{/* </LoadingContainer> */}
		</>
	);
};

export default LabCreationView;
