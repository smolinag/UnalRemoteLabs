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
import {Identifiers} from './Identifiers';
import classes from './LabCreationView.module.scss';

interface action {
	type: string;
	payload: string;
}

export interface PracticeInfo {
	practiceInfoName: string;
	practiceInfoDescription: string;
	practiceInfoDuration: string;
	commandName: string;
	commandDescription: string;
	parameterName: string;
	parameterDescription: string;
	parameterDefaultValue: string;
	parameterUnit: string;
	parameterMaxValue: string;
	parameterMinValue: string;
	parameterRegex: string;
	outputType: string;
	ouputName: string;
	outputDescription: string;
	outputUnit: string;
}

export interface CommandInfo {
	commandName: string;
	commandDescription: string;
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

function reducer(state: PracticeInfo, action: action): PracticeInfo {
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

const initialCommands: PracticeInfo = {
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
	const [commandsList, setCommandsList] = React.useState<PracticeInfo[]>([]);
	const [outputsList, setOutputsList] = React.useState<PracticeInfo[]>([]);

	const practiceChange = (value: string, id: string) => {
		dispatch({type: id, payload: value});
	};

	const addCommand = (practice: PracticeInfo): void => {
		setCommandsList((previousState) => {
			const commandsList = previousState.concat(practice);
			return commandsList;
		});
	};

	const addOutput = (practice: PracticeInfo): void => {
		setOutputsList((previousState) => {
			const outputsList = previousState.concat(practice);
			return outputsList;
		});
	};

	const createPractice = (): void => {
		console.warn(practice);
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
