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
}

interface Props {
	onExecute: (parameters: Parameter[]) => void;
	label: string;
	parameters: Parameter[];
}

const ComplexCommand: React.FC<Props> = ({onExecute, label, parameters}) => {
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
		<div>
			<h6 className={classes.title}>{label}</h6>
			<div className={classes.container}>
				{formParametersValues.map((parameter) => (
					<InputGroup key={parameter.id}>
						<InputGroup.Text className={classes.command_name}>{parameter.label}</InputGroup.Text>
						<Form.Control
							type="number"
							className={classes.input}
							value={parameter.value}
							onChange={(evt) => handleParameterValueChange(Number(evt.target.value), parameter.id)}
						/>
					</InputGroup>
				))}
				<Button variant="green" className={classes.button} onClick={() => onExecute(formParametersValues)}>
					ejecutar
				</Button>
			</div>
		</div>
	);
};

export default ComplexCommand;