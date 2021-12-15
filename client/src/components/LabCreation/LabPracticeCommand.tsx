import React from 'react';
import Row from 'react-bootstrap/Row';

import {Identifier} from '../../containers/LabCreationView/Identifiers';
import {LabPracticeInfo} from '../../containers/LabCreationView/types';
import {Input, DropdownComponent} from '../UI';
import {Option} from '../UI/DropdownComponent/DropdownComponent';
import classes from './shared.module.scss';

interface Props {
	practice: LabPracticeInfo;
	onValueChange?: (value: string, id: string) => void;
}

const enum Types {
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
					id={Identifier.COMMAND_NAME}
					type="text"
					placeholder='Nombre'
					required
					value={practice.commandName}
					tooltip="Ingrese el nombre del comando"
					onValueChange={onValueChange}
				/>
				<Input
					id={Identifier.COMMAND_DESCRIPTION}
					type="text"
					placeholder='Descripción'
					required
					value={practice.commandDescription}
					tooltip="Ingrese la descripción del comando"
					onValueChange={onValueChange}
				/>
			</div>

			<h5>Parámetros del comando</h5>
			<div className={classes.options}>
				<Input
					id={Identifier.PARAMETER_NAME}
					type="text"
					placeholder='Nombre'
					value={practice.parameterName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={onValueChange}
				/>
				<Input
					id={Identifier.PARAMETER_DESCRIPTION}
					type="text"
					placeholder='Descripción'
					value={practice.parameterDescription}
					onValueChange={onValueChange}
				/>

				{/* componente dropdown para elegir el tipo de valor por defecto*/}
				<DropdownComponent
					text="Comando"
					options={typesArray}
					onValueChange={handleSelect}
					value={valueType.value}
				/>
				<Input
					id={Identifier.PARAMETER_DEFAULT_VALUE}
					type={valueType.id}
					placeholder='Valor por defecto'
					value={practice.parameterDefaultValue}
					onValueChange={onValueChange}
				/>

				<Input
					id={Identifier.PARAMETER_UNIT}
					type="text"
					placeholder='Unidad'
					value={practice.parameterUnit}
					onValueChange={onValueChange}
				/>

				{valueType.id === Types.number && (
					<>
						<Input
							id={Identifier.PARAMETER_MAX_VALUE}
							type="number"
							placeholder='Valor máximo'
							value={practice.parameterMaxValue}
							onValueChange={onValueChange}
						/>
						<Input
							id={Identifier.PARAMETER_MIN_VALUE}
							type="number"
							placeholder='Valor mínimo'
							value={practice.parameterMinValue}
							onValueChange={onValueChange}
						/>
					</>
				)}

				<Input
					id={Identifier.PARAMETER_REGEX}
					type="string"
					placeholder='Expresión regular'
					value={practice.parameterRegex}
					onValueChange={onValueChange}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeCommand;
