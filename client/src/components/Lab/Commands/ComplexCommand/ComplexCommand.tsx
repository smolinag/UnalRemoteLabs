import cloneDeep from 'lodash/cloneDeep';
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import classes from './ComplexCommand.module.scss';

export interface Parameter {
	label: string;
	id: string;
	value: number;
	maxValue: number;
	minValue: number;
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
		<div style={{marginRight: '15px'}}>
			<h6 className={classes.title}>{label}</h6>
			<div className={classes.container}>
				{formParametersValues.map((parameter) => (
					<InputGroup key={parameter.id}>
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
				<Button variant="green" className={classes.button} onClick={() => onExecute(commandId, formParametersValues)}>
					Ejecutar
				</Button>
			</div>
		</div>
	);
};

export default ComplexCommand;
