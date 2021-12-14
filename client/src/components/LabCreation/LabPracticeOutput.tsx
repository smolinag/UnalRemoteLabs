import React from 'react';
import Row from 'react-bootstrap/Row';

import {Identifier} from '../../containers/LabCreationView/Identifiers';
import {LabPracticeInfo} from '../../containers/LabCreationView/types';
import {Input, DropdownComponent} from '../UI';
import {Option} from '../UI/DropdownComponent/DropdownComponent';
import classes from './shared.module.scss';

interface Props {
	practice: LabPracticeInfo;
	onValueChange: (value: string, id: string) => void;
}

const TYPES = {
	string: 'string',
	number: 'number'
};

const OUTPUT_TYPE: Option[] = [
	{id: TYPES.number, value: 'numero'},
	{id: TYPES.string, value: 'string'}
];

const LabPracticeOutput: React.FC<Props> = ({onValueChange, practice}) => {

	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Parámetros de salida de la práctica</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
				<DropdownComponent
					text="Tipo de salida"
					options={OUTPUT_TYPE}
					tooltip=""
					onValueChange={(id) => onValueChange(id, Identifier.OUTPUTTYPE)}
					value={OUTPUT_TYPE[0].value}
				/>
				<Input
					id={Identifier.OUTPUTNAME}
					type="text"
					placeholder='Nombre'
					value={practice.ouputName}
					tooltip="Ingrese el nombre del parámetro de salida"
					onValueChange={onValueChange}
				/>
				<Input
					id={Identifier.OUTPUTDESCRIPTION}
					type="text"
					placeholder='Descripción'
					value={practice.outputDescription}
					tooltip="Ingrese la descripción del parámetro de salida"
					onValueChange={onValueChange}
				/>
				<Input
					id={Identifier.OUTPUTUNIT}
					type="text"
					placeholder='Unidad'
					value={practice.outputUnit}
					onValueChange={onValueChange}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeOutput;
