import React from 'react';
import {Row} from 'react-bootstrap';

import {Identifiers} from '../../containers/LabCreationView/Identifiers';
import {PracticeInfo} from '../../containers/LabCreationView/LabCreationView';
import {Input, DropdownComponent} from '../UI';
import {Option} from '../UI/DropdownComponent/DropdownComponent';
import classes from './shared.module.scss';

interface Props {
	practice: PracticeInfo;
	onValueChange?: (value: string, id: string) => void;
}

const Types = {
	string: 'string',
	number: 'number'
};

const TypesArray = [
	{value: Types.number, label: 'numero'},
	{value: Types.string, label: 'string'}
];

const LabPracticeCommand: React.FC<Props> = ({practice, onValueChange}) => {
	const [valueType, setValueType] = React.useState<Option>(TypesArray[0]);

	const onSelect = (id: string, value: string) => {
		setValueType({label: id, value: value});
	};

	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Commandos de la práctica de laboratorio</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
				<Input
					id={Identifiers.COMMANDNAME}
					type="text"
					placeholder={'Nombre'}
					value={practice.commandName}
					tooltip="Ingrese el nombre del comando"
					onValueChange={onValueChange}
				/>
				<Input
					id={Identifiers.COMMANDDESCRIPTION}
					type="text"
					placeholder={'Descripción'}
					value={practice.commandDescription}
					tooltip="Ingrese la descripción del comando"
					onValueChange={onValueChange}
				/>
			</div>

			<h5>Parámetros del comando</h5>
			<div className={classes.options}>
				<Input
					id={Identifiers.PARAMETERNAME}
					type="text"
					placeholder={'Nombre'}
					value={practice.parameterName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={onValueChange}
				/>
				<Input
					id={Identifiers.PARAMETERDESCRIPTION}
					type="text"
					placeholder={'Descripción'}
					value={practice.parameterDescription}
					onValueChange={onValueChange}
				/>

				{/* componente dropdown para elegir el tipo de valor por defecto*/}
				<DropdownComponent
					text="Comando"
					options={TypesArray}
					tooltip=""
					onValueChange={onSelect}
					value={valueType.label}
				/>
				<Input
					id={Identifiers.PARAMETERDEFAULTVALUE}
					type={valueType.value}
					placeholder={'Valor por defecto'}
					value={practice.parameterDefaultValue}
					onValueChange={onValueChange}
				/>

				<Input
					id={Identifiers.PARAMETERUNIT}
					type="text"
					placeholder={'Unidad'}
					value={practice.parameterUnit}
					onValueChange={onValueChange}
				/>

				{valueType.value === Types.number && (
					<>
						<Input
							id={Identifiers.PARAMETERMAXVALUE}
							type="number"
							placeholder={'Valor máximo'}
							value={practice.parameterMaxValue}
							onValueChange={onValueChange}
						/>
						<Input
							id={Identifiers.PARAMETERMINVALUE}
							type="number"
							placeholder={'Valor mínimo'}
							value={practice.parameterMinValue}
							onValueChange={onValueChange}
						/>
					</>
				)}

				<Input
					id={Identifiers.PARAMETERREGEX}
					type="string"
					placeholder={'Expresión regular'}
					value={practice.parameterRegex}
					onValueChange={onValueChange}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeCommand;
