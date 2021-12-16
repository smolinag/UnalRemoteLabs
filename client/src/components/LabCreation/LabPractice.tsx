import React from 'react';
import Row from 'react-bootstrap/Row';

import {Identifier} from '../../containers/LabCreationView/Identifiers';
import {LabPracticeInfo} from '../../containers/LabCreationView/types';
import {Input} from '../UI';
import classes from './shared.module.scss';


interface Props {
	practice: LabPracticeInfo;
	onValueChange: (value: string, id: string) => void;
}

const LabPractice: React.FC<Props> = ({onValueChange, practice}) => {
	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Información de la práctica de laboratorio</h3>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder='Nombre'
					required
					value={practice.practiceInfoName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={(value) => onValueChange(value, Identifier.Name)}
				/>
				<Input
					type="text"
					placeholder='Descripción'
					value={practice.practiceInfoDescription}
					onValueChange={(value) => onValueChange(value, Identifier.Description)}
				/>
				<Input
					type="number"
					placeholder='Duración'
					required
					value={practice.practiceInfoDuration}
					tooltip="Ingrese la duración que tendrá la sesión en minutos"
					unit='minutos'
					onValueChange={(value) => onValueChange(value, Identifier.Duration)}
				/>
			</div>
		</Row>
	);
};

export default LabPractice;
