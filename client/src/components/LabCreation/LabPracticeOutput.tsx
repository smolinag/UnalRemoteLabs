import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeInfo, Identifier} from '../../containers/LabCreationView/types';
import {Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	practice: LabPracticeInfo;
	onValueChange: (value: string, id: string) => void;
}

const LabPracticeOutput: React.FC<Props> = ({onValueChange, practice}) => {

	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Parámetros de salida de la práctica</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder='Nombre'
					value={practice.outputName}
					tooltip="Ingrese el nombre del parámetro de salida"
					onValueChange={(value) => onValueChange(value, Identifier.OutputName)}
				/>
				<Input
					type="text"
					placeholder='Descripción'
					value={practice.outputDescription}
					tooltip="Ingrese la descripción del parámetro de salida"
					onValueChange={(value) => onValueChange(value, Identifier.OutputDescription)}
				/>
				<Input
					type="text"
					placeholder='Unidad'
					value={practice.outputUnit}
					onValueChange={(value) => onValueChange(value, Identifier.OutputUnit)}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeOutput;
