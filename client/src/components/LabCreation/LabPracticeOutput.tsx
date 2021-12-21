import React from 'react';
import Row from 'react-bootstrap/Row';

import {OutputInfo, Identifier} from '../../containers/LabCreationView/types';
import {Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	output: OutputInfo;
	onValueChange: (value: string, id: string) => void;
}

const LabPracticeOutput: React.FC<Props> = ({onValueChange, output}) => {

	return (
		<Row className="section">
			<h3 className="title">Parámetros de salida de la práctica</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder='Nombre'
					value={output.outputName}
					tooltip="Ingrese el nombre del parámetro de salida"
					onValueChange={(value) => onValueChange(value, Identifier.OutputName)}
				/>
				<Input
					type="text"
					placeholder='Descripción'
					value={output.outputDescription}
					tooltip="Ingrese la descripción del parámetro de salida"
					onValueChange={(value) => onValueChange(value, Identifier.OutputDescription)}
				/>
				<Input
					type="text"
					placeholder='Unidad'
					value={output.outputUnit}
					onValueChange={(value) => onValueChange(value, Identifier.OutputUnit)}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeOutput;
