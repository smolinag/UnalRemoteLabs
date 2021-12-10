import React from 'react';
import {Row} from 'react-bootstrap';

import {Identifiers} from '../../containers/LabCreationView/Identifiers';
import {LabPracticeInfo} from '../../containers/LabCreationView/LabCreationView';
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
	{value: TYPES.number, label: 'numero'},
	{value: TYPES.string, label: 'string'}
];

const LabPracticeOutput: React.FC<Props> = ({onValueChange, practice}) => {
	const [valueType] = React.useState<Option>(OUTPUT_TYPE[0]);

	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Parámetros de salida de la práctica</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
				<DropdownComponent
					text="Tipo de salida"
					options={OUTPUT_TYPE}
					tooltip=""
					onValueChange={(e) => onValueChange(e, Identifiers.OUTPUTTYPE)}
					value={valueType.label}
				/>
				<Input
					id={Identifiers.OUTPUTNAME}
					type="text"
					placeholder={'Nombre'}
					value={practice.ouputName}
					tooltip="Ingrese el nombre del parámetro de salida"
					onValueChange={onValueChange}
				/>
				<Input
					id={Identifiers.OUTPUTDESCRIPTION}
					type="text"
					placeholder={'Descripción'}
					value={practice.outputDescription}
					tooltip="Ingrese la descripción del parámetro de salida"
					onValueChange={onValueChange}
				/>
				<Input
					id={Identifiers.OUTPUTUNIT}
					type="text"
					placeholder={'Unidad'}
					value={practice.outputUnit}
					onValueChange={onValueChange}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeOutput;
