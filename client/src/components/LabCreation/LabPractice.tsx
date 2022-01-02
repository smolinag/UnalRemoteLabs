import React from 'react';
import Row from 'react-bootstrap/Row';

import {Params, LabPracticeInfo, ErrorIdentifier} from '../../containers/LabCreationView/types';
import {Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	practice: LabPracticeInfo;
	onValueChange: (value: string, id: string) => void;
	errors: ErrorIdentifier[];
}

const LabPractice: React.FC<Props> = ({onValueChange, practice, errors}) => {
	const checkErrorMessage = (parameter: string): boolean => {
		let message = false;
		errors.map((error) => {
			if(error.identifier === parameter) {
				message = true;
			} 
		});

		return message;
	};

	return (
		<Row className="section">
			<h3 className="title">Información de la práctica de laboratorio</h3>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder="Nombre"
					required
					value={practice.practiceInfoName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={(value) => onValueChange(value, Params.Name)}
					error={checkErrorMessage(Params.Name)}
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={practice.practiceInfoDescription}
					onValueChange={(value) => onValueChange(value, Params.Description)}
				/>
				<Input
					type="number"
					placeholder="Duración"
					required
					value={practice.practiceInfoDuration}
					tooltip="Ingrese la duración que tendrá la sesión en minutos"
					unit="minutos"
					onValueChange={(value) => onValueChange(value, Params.Duration)}
					error={checkErrorMessage(Params.Duration)}
				/>
			</div>
		</Row>
	);
};

export default LabPractice;
