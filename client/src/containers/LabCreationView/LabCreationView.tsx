import React from 'react';
import {Row} from 'react-bootstrap';

import {LabPractice, LabPracticeCommand, LabPracticeOutput} from '../../components/LabCreation';
import {Button, LoadingContainer} from '../../components/UI';
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
	ouputName: string;
	outputDescription: string;
}

function reducer(practice: PracticeInfo, action: action): PracticeInfo {
	switch (action.type) {
		case Identifiers.NAME:
			return {...practice, practiceInfoName: action.payload};
		case Identifiers.DESCRIPTION:
			return {...practice, practiceInfoDescription: action.payload};
		case Identifiers.DURATION:
			return {...practice, practiceInfoDuration: action.payload};
		case Identifiers.COMMANDNAME:
			return {...practice, commandName: action.payload};
		case Identifiers.COMMANDDESCRIPTION:
			return {...practice, commandDescription: action.payload};
		case Identifiers.PARAMETERNAME:
			return {...practice, parameterName: action.payload};
		case Identifiers.PARAMETERDESCRIPTION:
			return {...practice, parameterDescription: action.payload};
		case Identifiers.PARAMETERDEFAULTVALUE:
			return {...practice, parameterDefaultValue: action.payload};
		case Identifiers.PARAMETERUNIT:
			return {...practice, parameterUnit: action.payload};
		case Identifiers.PARAMETERMAXVALUE:
			return {...practice, parameterMaxValue: action.payload};
		case Identifiers.PARAMETERMINVALUE:
			return {...practice, parameterMinValue: action.payload};
		case Identifiers.PARAMETERREGEX:
			return {...practice, parameterRegex: action.payload};
		case Identifiers.OUTPUTNAME:
			return {...practice, ouputName: action.payload};
		case Identifiers.OUTPUTDESCRIPTION:
			return {...practice, outputDescription: action.payload};
		default:
			return practice;
	}
}

const initialValue: PracticeInfo = {
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
	ouputName: '',
	outputDescription: ''
};

const LabCreationView: React.FC<unknown> = () => {
	const [practice, dispatch] = React.useReducer(reducer, initialValue);

	const practiceChange = (value: string, id: string) => {
		dispatch({type: id, payload: value});
	};

	return (
		<>
			<LoadingContainer loading={false}>
				<LabPractice practice={practice} onValueChange={practiceChange} />

				<LabPracticeCommand practice={practice} onValueChange={practiceChange} />

				<LabPracticeOutput practice={practice} onValueChange={practiceChange} />

				<Row className={classes.section}>
					<Button loading={false} justifyEnd>
						Guardar
					</Button>
				</Row>
			</LoadingContainer>
		</>
	);
};

export default LabCreationView;
