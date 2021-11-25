import React from 'react';
import {Row} from 'react-bootstrap';

import classes from '../Lab/shared.module.scss';
import {Input} from '../UI';

interface Props {
	name: string;
	description: string;
	duration: string;
	onValueChange?: (value: string, id: string) => void;
}

const LabPractice: React.FC<Props> = ({onValueChange, name, description, duration}) => {
	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Información de la práctica de laboratorio</h3>
			<div className={classes.options}>
				<Input
					id="name"
					type="text"
					placeholder={'Nombre'}
					value={name}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={onValueChange}
				/>
				<Input
					id="description"
					type="text"
					placeholder={'Descripción'}
					value={description}
					onValueChange={onValueChange}
				/>
				<Input
					id="duration"
					type="number"
					placeholder={'Duración'}
					value={duration}
					tooltip="Ingrese la duración que tendrá la sesión en minutos"
					unit
					onValueChange={onValueChange}
				/>
			</div>
		</Row>
	);
};

export default LabPractice;
