import React from 'react';
import {Row} from 'react-bootstrap';

import {Identifiers} from '../../containers/LabCreationView/Identifiers';
import {PracticeInfo} from '../../containers/LabCreationView/LabCreationView';
import {Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	practice: PracticeInfo;
	onValueChange?: (value: string, id: string) => void;
}

const LabPracticeOutput: React.FC<Props> = ({onValueChange, practice}) => {
	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Parámetros de salida de la práctica</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
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
			</div>
		</Row>
	);
};

export default LabPracticeOutput;
