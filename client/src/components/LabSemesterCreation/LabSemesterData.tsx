import React from 'react';

import {Params, LabSemesterInfo, ErrorIdentifier} from '../../containers/LabSemesterCreationView/types';
import {Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	semesterInfo: LabSemesterInfo;
	onValueChange: (value: string, id: string) => void;
	errors: ErrorIdentifier[];
}

const LabSemesterData: React.FC<Props> = ({semesterInfo, onValueChange, errors}) => {
	const checkErrorMessage = (parameter: string): boolean => {
		let message = false;
		errors.map((error) => {
			if (error.identifier === parameter) {
				message = true;
			}
		});

		return message;
	};

	return (
		<>
			<h3 className="title">Creación de Semestre. Laboratorio de {semesterInfo.laboratoryName}</h3>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder="Nombre"
					required
					value={semesterInfo.semesterName}
					tooltip="Ingrese el nombre del semestre"
					onValueChange={(value) => onValueChange(value, Params.Name)}
					error={checkErrorMessage(Params.Name)}
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={semesterInfo.semesterDescription ?? ''}
					onValueChange={(value) => onValueChange(value, Params.Description)}
				/>
			</div>
		</>
	);
};

export default LabSemesterData;
