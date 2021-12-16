import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeInfo, Identifier} from '../../containers/LabCreationView/types';
import {Input, DropdownComponent} from '../UI';
import {Option} from '../UI/DropdownComponent/DropdownComponent';
import classes from './shared.module.scss';

interface Props {
	practice: LabPracticeInfo;
	onValueChange: (value: string, id: string) => void;
}

enum Types {
	string = 'string',
	number = 'number'
};

const typesArray = [
	{id: Types.number, value: 'numero'},
	{id: Types.string, value: 'string'}
];

const LabPracticeCommand: React.FC<Props> = ({practice, onValueChange}) => {
	const [valueType, setValueType] = React.useState<Option>(typesArray[0]);

	const handleSelect = (id: string, value: string) => {
		setValueType({value: id, id: value});
	};

	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Commandos de la práctica de laboratorio</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder='Nombre'
					required
					value={practice.commandName}
					tooltip="Ingrese el nombre del comando"
					onValueChange={(value) => onValueChange(value, Identifier.CommandName)}
				/>
				<Input
					type="text"
					placeholder='Descripción'
					required
					value={practice.commandDescription}
					tooltip="Ingrese la descripción del comando"
					onValueChange={(value) => onValueChange(value, Identifier.CommandDescription)}
				/>
			</div>

			<h5>Parámetros del comando</h5>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder='Nombre'
					value={practice.parameterName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={(value) => onValueChange(value, Identifier.ParameterName)}
				/>
				<Input
					type="text"
					placeholder='Descripción'
					value={practice.parameterDescription}
					onValueChange={(value) => onValueChange(value, Identifier.ParameterDescription)}
				/>

				{/* componente dropdown para elegir el tipo de valor por defecto*/}
				<DropdownComponent
					text="Comando"
					options={typesArray}
					onValueChange={handleSelect}
					value={valueType.value}
				/>
				<Input
					type={valueType.id}
					placeholder='Valor por defecto'
					value={practice.parameterDefaultValue}
					onValueChange={(value) => onValueChange(value, Identifier.ParameterDefaultValue)}
				/>

				<Input
					type="text"
					placeholder='Unidad'
					value={practice.parameterUnit}
					onValueChange={(value) => onValueChange(value, Identifier.ParameterUnit)}
				/>

				{valueType.id === Types.number && (
					<>
						<Input
							type="number"
							placeholder='Valor máximo'
							value={practice.parameterMaxValue}
							onValueChange={(value) => onValueChange(value, Identifier.ParameterMaxValue)}
						/>
						<Input
							type="number"
							placeholder='Valor mínimo'
							value={practice.parameterMinValue}
							onValueChange={(value) => onValueChange(value, Identifier.ParameterMinValue)}
						/>
					</>
				)}

				<Input
					type="string"
					placeholder='Expresión regular'
					value={practice.parameterRegex}
					onValueChange={(value) => onValueChange(value, Identifier.ParameterRegex)}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeCommand;
