import React from 'react';
import Row from 'react-bootstrap/Row';

import {
	LabPracticeParameterInfo,
	Params,
	LabPracticeCommandInfo,
	ErrorIdentifier,
	OutputInfo
} from '../../containers/LabPractice/types';
import {Input, DropdownComponent} from '../UI';
import {Option} from '../UI/DropdownComponent/DropdownComponent';
import classes from './shared.module.scss';

interface Props {
	parameter: LabPracticeParameterInfo;
	commands: LabPracticeCommandInfo[];
	onValueChange?: (value: string, id: Params) => void;
	errors: ErrorIdentifier[];
	onValueEdit?: (
		paramType: string,
		value: string,
		command?: LabPracticeCommandInfo,
		parameter?: LabPracticeParameterInfo,
		output?: OutputInfo
	) => void;
}

const initialCommand: Option = {id: '', value: 'Comando'};

const LabPracticeParameters: React.FC<Props> = ({parameter, commands, onValueChange, onValueEdit, errors}) => {
	const [command, setCommand] = React.useState<Option>(initialCommand);

	React.useEffect(() => {
		if (parameter.selectedCommandName === '') {
			setCommand(initialCommand);
		}
	}, [parameter.selectedCommandName]);

	const handleSelectCommand = (value: string) => {
		setCommand({value, id: value});
		onValueChange
			? onValueChange(value, Params.SelectedCommand)
			: onValueEdit && onValueEdit(Params.SelectedCommand, value, undefined, parameter);
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
					error={checkErrorMessage(Params.SelectedCommand)}
				/>
				<Input
					type="text"
					placeholder="Nombre"
					value={parameter.parameterName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={(value) =>
						onValueChange
							? onValueChange(value, Params.ParameterName)
							: onValueEdit && onValueEdit(Params.ParameterName, value, undefined, parameter)
					}
					error={checkErrorMessage(Params.ParameterName)}
					required
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={parameter.parameterDescription}
					onValueChange={(value) =>
						onValueChange
							? onValueChange(value, Params.ParameterDescription)
							: onValueEdit && onValueEdit(Params.ParameterDescription, value, undefined, parameter)
					}
				/>

				<Input
					type="number"
					placeholder="Valor por defecto"
					value={parameter.parameterDefaultValue}
					onValueChange={(value) =>
						onValueChange
							? onValueChange(value, Params.ParameterDefaultValue)
							: onValueEdit && onValueEdit(Params.ParameterDefaultValue, value, undefined, parameter)
					}
					error={checkErrorMessage(Params.ParameterDefaultValue)}
					required
				/>

				<Input
					type="number"
					placeholder="Valor mínimo"
					value={parameter.parameterMinValue}
					onValueChange={(value) =>
						onValueChange
							? onValueChange(value, Params.ParameterMinValue)
							: onValueEdit && onValueEdit(Params.ParameterMinValue, value, undefined, parameter)
					}
				/>

				<Input
					type="number"
					placeholder="Valor máximo"
					value={parameter.parameterMaxValue}
					onValueChange={(value) =>
						onValueChange
							? onValueChange(value, Params.ParameterMaxValue)
							: onValueEdit && onValueEdit(Params.ParameterMaxValue, value, undefined, parameter)
					}
				/>

				<Input
					type="string"
					placeholder="Expresión regular"
					value={parameter.parameterRegex}
					onValueChange={(value) =>
						onValueChange
							? onValueChange(value, Params.ParameterRegex)
							: onValueEdit && onValueEdit(Params.ParameterRegex, value, undefined, parameter)
					}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeParameters;
