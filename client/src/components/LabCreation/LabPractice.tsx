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

const LabPractice: React.FC<Props> = ({onValueChange, practice}) => {
	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Información de la práctica de laboratorio</h3>
			<div className={classes.options}>
				<Input
					id={Identifiers.NAME}
					type="text"
					placeholder={'Nombre'}
					value={practice.practiceInfoName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={onValueChange}
				/>
				<Input
					id={Identifiers.DESCRIPTION}
					type="text"
					placeholder={'Descripción'}
					value={practice.practiceInfoDescription}
					onValueChange={onValueChange}
				/>
				<Input
					id={Identifiers.DURATION}
					type="number"
					placeholder={'Duración'}
					value={practice.practiceInfoDuration}
					tooltip="Ingrese la duración que tendrá la sesión en minutos"
					unit
					onValueChange={onValueChange}
				/>
			</div>
		</Row>
	);
};

export default LabPractice;
