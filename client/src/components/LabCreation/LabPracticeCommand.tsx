import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeCommandInfo, Params, ErrorIdentifier} from '../../containers/LabCreationView/types';
import {Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	command: LabPracticeCommandInfo;
	onValueChange: (value: string, id: string) => void;
	errors: ErrorIdentifier[];
}

const LabPracticeCommand: React.FC<Props> = ({command, onValueChange, errors}) => {
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
			<h3 className="title">Commandos de la práctica de laboratorio</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder='Nombre'
					required
					value={command.commandName}
					tooltip="Ingrese el nombre del comando"
					onValueChange={(value) => onValueChange(value, Params.CommandName)}
					error={checkErrorMessage(Params.CommandName)}
				/>
				<Input
					type="text"
					placeholder='Descripción'
					value={command.commandDescription}
					tooltip="Ingrese la descripción del comando"
					onValueChange={(value) => onValueChange(value, Params.CommandDescription)}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeCommand;
