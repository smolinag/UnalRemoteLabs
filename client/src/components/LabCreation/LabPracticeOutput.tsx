import React from 'react';
import {Row} from 'react-bootstrap';

import classes from '../Lab/shared.module.scss';
import {Input} from '../UI';

interface Props {
	text?: string;
}

const LabPracticeOutput: React.FC<Props> = (props) => {
	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>Parámetros de salida de la práctica</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
				<Input
					id="name"
					type="text"
					placeholder={'Nombre'}
					value={''}
					tooltip="Ingrese el nombre del parámetro de salida"
				/>
				<Input
					id="name"
					type="text"
					placeholder={'Descripción'}
					value={''}
					tooltip="Ingrese la descripción del parámetro de salida"
				/>
			</div>

			{/* <DropdownComponent text="Tipo de salida" options={[]} tooltip="" /> */}
		</Row>
	);
};

export default LabPracticeOutput;
