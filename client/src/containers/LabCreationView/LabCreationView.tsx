import React from 'react';
import {Row} from 'react-bootstrap';

import classes from '../../components/Lab/shared.module.scss';
import {LabPractice, LabPracticeCommand, LabPracticeOutput} from '../../components/LabCreation';
import {Button} from '../../components/UI';

export interface Practice {
	id: string;
	name: string;
	description: string;
	duration: number;
}

const LabCreationView: React.FC<unknown> = () => {
	const [practiceInfoName, setPracticeInfoName] = React.useState<string>('');
	const [practiceInfoDescription, setPracticeInfoDescription] = React.useState<string>('');
	const [practiceInfoDuration, setPracticeInfoDuration] = React.useState<string>('');

	const [commandName, setCommandName] = React.useState<string>('');
	const [commandDescription, setCommandDescription] = React.useState<string>('');
	const [parameterName, setParameterName] = React.useState<string>('');
	const [parameterDescription, setParameterDescription] = React.useState<string>('');
	const [parameterDefaultValue, setParameterDefaultValue] = React.useState<string>('');
	const [parameterUnit, setParameterUnit] = React.useState<string>('');
	const [parameterMaxValue, setParameterMaxValue] = React.useState<string>('');
	const [parameterMinValue, setParameterMinValue] = React.useState<string>('');
	const [parameterRegex, setParameterRegex] = React.useState<string>('');

	const practiceChange = (value: string, id: string) => {
		switch (id) {
			case 'name':
				setPracticeInfoName(value);
				break;
			case 'description':
				setPracticeInfoDescription(value);
				break;
			case 'duration':
				setPracticeInfoDuration(value);
				break;

			case 'commandName':
				setCommandName(value);
				break;
			case 'commandDescription':
				setCommandDescription(value);
				break;
			case 'parameterName':
				setParameterName(value);
				break;
			case 'parameterDescription':
				setParameterDescription(value);
				break;
			case 'parameterDefaultValue':
				setParameterDefaultValue(value);
				break;
			case 'parameterUnit':
				setParameterUnit(value);
				break;
			case 'parameterMaxValue':
				setParameterMaxValue(value);
				break;
			case 'parameterMinValue':
				setParameterMinValue(value);
				break;
			case 'parameterRegex':
				setParameterRegex(value);
				break;
		}
	};

	return (
		<>
			<LabPractice
				name={practiceInfoName}
				description={practiceInfoDescription}
				duration={practiceInfoDuration}
				onValueChange={practiceChange}
			/>

			<LabPracticeCommand
				commandName={commandName}
				commandDescription={commandDescription}
				parameterName={parameterName}
				parameterDescription={parameterDescription}
				parameterDefaultValue={parameterDefaultValue}
				parameterUnit={parameterUnit}
				parameterMaxValue={parameterMaxValue}
				parameterMinValue={parameterMinValue}
				parameterRegex={parameterRegex}
				onValueChange={practiceChange}
			/>

			<LabPracticeOutput />

			<Row className={classes.section}>
				<Button loading={false} justifyEnd>
					Guardar
				</Button>
			</Row>
		</>
	);
};

export default LabCreationView;
