import React from 'react';
import Row from 'react-bootstrap/Row';

import {Params, LabPracticeInfo, ErrorIdentifier} from '../../containers/LabPractice/types';
import {TextLabel, Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	practice: LabPracticeInfo;
	labName: string;
	onValueChange: (value: string, id: string) => void;
	errors: ErrorIdentifier[];
}

const LabPractice: React.FC<Props> = ({onValueChange, practice, labName, errors}) => {
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
		<Row className="section">
			<h3 className="title">Información de la práctica de laboratorio</h3>
			<div className={classes.options}>
				<TextLabel placeholder="Laboratorio" value={labName ?? ''} />

				<Input
					type="text"
					placeholder="Nombre"
					required
					value={practice.practiceInfoName}
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
					unit="minutos"
					onValueChange={(value) => onValueChange(value, Params.Duration)}
					error={checkErrorMessage(Params.Duration)}
				/>
				{practice.id ? (
					<Input
						type="text"
						placeholder="Dispositivo"
						value={practice.deviceId}
						onValueChange={(value) => onValueChange(value, Params.DeviceId)}
					/>
				) : (
					<TextLabel placeholder="Dispositivo" value={practice.deviceId} />
				)}
			</div>
		</Row>
	);
};

export default LabPractice;
