import cloneDeep from 'lodash/cloneDeep';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import classes from './ComplexCommand.module.scss';

export interface Parameter {
	label: string;
	name: string;
	id: string;
	value: number;
	maxValue: number;
	minValue: number;
	order: number;
}

interface Props {
	onExecute: (id: string, parameters: Parameter[]) => void;
	label: string;
	parameters: Parameter[];
	commandId: string;
}

const ComplexCommand: React.FC<Props> = ({onExecute, label, parameters, commandId}) => {
	const [formParametersValues, setFormParametersValues] = useState<Parameter[]>(parameters);

	const handleParameterValueChange = (newValue: number, id: string) => {
		setFormParametersValues((currentState) => {
			const stateCopy = cloneDeep(currentState);

			const parameterToUpdate = stateCopy.find((parameter) => parameter.id === id);

			if (parameterToUpdate) {
				parameterToUpdate.value = newValue;
			}

			return stateCopy;
		});
	};

	return (
		<div className={classes.container}>
			<Button variant="green" className={classes.button} onClick={() => onExecute(commandId, formParametersValues)}>
				{label}
			</Button>
			{formParametersValues.map((parameter) => (
				<InputGroup key={parameter.id} className={`input-group ${classes.inputGroup}`}>
					<InputGroup.Text className={classes.command_name}>{parameter.label}</InputGroup.Text>
					<Form.Control
						type="number"
						className={classes.input}
						value={parameter.value}
						max={parameter.maxValue}
						min={parameter.minValue}
						onChange={(evt) => handleParameterValueChange(Number(evt.target.value), parameter.id)}
					/>
				</InputGroup>
			))}
		</div>
	);
};

export default ComplexCommand;
