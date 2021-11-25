import React from 'react';
import {Row} from 'react-bootstrap';

import classes from '../Lab/shared.module.scss';
import {Input, DropdownComponent} from '../UI';

interface Props {
	commandName: string;
	commandDescription: string;
	parameterName: string;
	parameterDescription: string;
	parameterDefaultValue: string | number;
	parameterUnit: string;
	parameterMaxValue: string;
	parameterMinValue: string;
	parameterRegex: string;
	onValueChange?: (value: string, id: string) => void;
}

const LabPracticeCommand: React.FC<Props> = ({
	onValueChange,
	commandName,
	commandDescription,
	parameterName,
	parameterDescription,
	parameterDefaultValue,
	parameterUnit,
	parameterMaxValue,
	parameterMinValue,
	parameterRegex
}) => {
	const [defaultValueType] = React.useState<string>('string');
	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Commandos de la práctica de laboratorio</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
				<Input
					id="commandName"
					type="text"
					placeholder={'Nombre'}
					value={commandName}
					tooltip="Ingrese el nombre del comando"
					onValueChange={onValueChange}
				/>
				<Input
					id="commandDescription"
					type="text"
					placeholder={'Descripción'}
					value={commandDescription}
					tooltip="Ingrese la descripción del comando"
					onValueChange={onValueChange}
				/>
			</div>

			<h5>Parámetros del comando</h5>
			<div className={classes.options}>
				<Input
					id="parameterName"
					type="text"
					placeholder={'Nombre'}
					value={parameterName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={onValueChange}
				/>
				<Input
					id="parameterDescription"
					type="text"
					placeholder={'Descripción'}
					value={parameterDescription}
					onValueChange={onValueChange}
				/>

				{/* componente dropdown para elegir el tipo de valor por defecto*/}
				<DropdownComponent
					text="Comando"
					options={[
						{value: 'number', label: 'numero'},
						{value: 'string', label: 'string'}
					]}
					tooltip=""
				/>
				<Input
					id="parameterDefaultValue"
					type={defaultValueType}
					placeholder={'Valor por defecto'}
					value={parameterDefaultValue}
					onValueChange={onValueChange}
				/>

				<Input
					id="parameterUnit"
					type="text"
					placeholder={'Unidad'}
					value={parameterUnit}
					onValueChange={onValueChange}
				/>

				<Input
					id="parameterMaxValue"
					type="number"
					placeholder={'Valor máximo'}
					value={parameterMaxValue}
					onValueChange={onValueChange}
				/>
				<Input
					id="parameterMinValue"
					type="number"
					placeholder={'Valor mínimo'}
					value={parameterMinValue}
					onValueChange={onValueChange}
				/>

				<Input
					id="parameterRegex"
					type="string"
					placeholder={'Expresión regular'}
					value={parameterRegex}
					onValueChange={onValueChange}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeCommand;
