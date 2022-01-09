import React from 'react';
import Row from 'react-bootstrap/Row';

import {
	LabPracticeParameterInfo,
	Params,
	LabPracticeCommandInfo,
	ErrorIdentifier
} from '../../containers/LabCreationView/types';
import {Input, DropdownComponent} from '../UI';
import {Option} from '../UI/DropdownComponent/DropdownComponent';
import classes from './shared.module.scss';

interface Props {
	parameter: LabPracticeParameterInfo;
	commands: LabPracticeCommandInfo[];
	onValueChange: (value: string, id: Params) => void;
	errors: ErrorIdentifier[];
}

const initialCommand: Option = {id: 'Comando', value: 'Comando'};

const LabPracticeParameters: React.FC<Props> = ({parameter, commands, onValueChange, errors}) => {
	const [command, setCommand] = React.useState<Option>(initialCommand);

	const handleSelectCommand = (value: string) => {
		setCommand({value, id: value});
		onValueChange(value, Params.SelectedCommand);
	};

	const checkErrorMessage = (parameter: string): boolean => {
		let message = false;
		errors.map((error) => {
			if (error.identifier === parameter) {
				message = true;
			}
		});

		return message;
	};

	return (
		<Row className="section">
			<h5>Parámetros del comando</h5>
			<div className={classes.options}>
				<DropdownComponent
					text="Comando"
					options={commands.map((command) => {
						return {value: command.commandName, id: command.commandDescription};
					})}
					onValueChange={(value) => {
						handleSelectCommand(value);
					}}
					value={command.value}
				/>
				<Input
					type="text"
					placeholder="Nombre"
					value={parameter.parameterName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={(value) => onValueChange(value, Params.ParameterName)}
					error={checkErrorMessage(Params.ParameterName)}
					required
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={parameter.parameterDescription}
					onValueChange={(value) => onValueChange(value, Params.ParameterDescription)}
				/>

				<Input
					type="number"
					placeholder="Valor por defecto"
					value={parameter.parameterDefaultValue}
					onValueChange={(value) => onValueChange(value, Params.ParameterDefaultValue)}
					error={checkErrorMessage(Params.ParameterDefaultValue)}
					required
				/>

				<Input
					type="text"
					placeholder="Unidad"
					value={parameter.parameterUnit}
					onValueChange={(value) => onValueChange(value, Params.ParameterUnit)}
				/>

				<Input
					type="number"
					placeholder="Valor mínimo"
					value={parameter.parameterMinValue}
					onValueChange={(value) => onValueChange(value, Params.ParameterMinValue)}
				/>

				<Input
					type="number"
					placeholder="Valor máximo"
					value={parameter.parameterMaxValue}
					onValueChange={(value) => onValueChange(value, Params.ParameterMaxValue)}
				/>

				<Input
					type="string"
					placeholder="Expresión regular"
					value={parameter.parameterRegex}
					onValueChange={(value) => onValueChange(value, Params.ParameterRegex)}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeParameters;
