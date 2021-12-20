import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeParameterInfo, Identifier, LabPracticeCommandInfo} from '../../containers/LabCreationView/types';
import {Input, DropdownComponent} from '../UI';
import {Option} from '../UI/DropdownComponent/DropdownComponent';
import classes from './shared.module.scss';

interface Props {
	parameter: LabPracticeParameterInfo;
	commands: LabPracticeCommandInfo[];
	onValueChange: (value: string, id: string) => void;
}

enum Types {
	string = 'string',
	number = 'number'
}

const typesArray = [
	{id: Types.number, value: 'numero'},
	{id: Types.string, value: 'string'}
];

const initialCommand: Option = {id: 'Comando', value: 'Comando'};

const LabPracticeParameters: React.FC<Props> = ({parameter, commands, onValueChange}) => {
	const [command, setCommand] = React.useState<Option>(initialCommand);
	const [valueType, setValueType] = React.useState<Option>(typesArray[0]);

	const handleSelectCommand = (value: string) => {
		setCommand({value, id: value});
	};

	const handleSelectType = (id: string, value: string) => {
		setValueType({value: id, id: value});
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
						onValueChange(value, Identifier.SelectedCommand)
						handleSelectCommand(value)
					}}
					value={command.value}
				/>
				<Input
					type="text"
					placeholder="Nombre"
					value={parameter.parameterName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={(value) => onValueChange(value, Identifier.ParameterName)}
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={parameter.parameterDescription}
					onValueChange={(value) => onValueChange(value, Identifier.ParameterDescription)}
				/>

				{/* componente dropdown para elegir el tipo de valor por defecto*/}
				<DropdownComponent text="Comando" options={typesArray} onValueChange={handleSelectType} value={valueType.value} />
				<Input
					type={valueType.id}
					placeholder="Valor por defecto"
					value={parameter.parameterDefaultValue}
					onValueChange={(value) => onValueChange(value, Identifier.ParameterDefaultValue)}
				/>

				<Input
					type="text"
					placeholder="Unidad"
					value={parameter.parameterUnit}
					onValueChange={(value) => onValueChange(value, Identifier.ParameterUnit)}
				/>

				{valueType.id === Types.number && (
					<>
						<Input
							type="number"
							placeholder="Valor máximo"
							value={parameter.parameterMaxValue}
							onValueChange={(value) => onValueChange(value, Identifier.ParameterMaxValue)}
						/>
						<Input
							type="number"
							placeholder="Valor mínimo"
							value={parameter.parameterMinValue}
							onValueChange={(value) => onValueChange(value, Identifier.ParameterMinValue)}
						/>
					</>
				)}

				<Input
					type="string"
					placeholder="Expresión regular"
					value={parameter.parameterRegex}
					onValueChange={(value) => onValueChange(value, Identifier.ParameterRegex)}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeParameters;
