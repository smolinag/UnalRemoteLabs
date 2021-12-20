import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeCommandInfo, Identifier} from '../../containers/LabCreationView/types';
import {Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	command: LabPracticeCommandInfo;
	onValueChange: (value: string, id: string) => void;
}

const LabPracticeCommand: React.FC<Props> = ({command, onValueChange}) => {
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
					onValueChange={(value) => onValueChange(value, Identifier.CommandName)}
				/>
				<Input
					type="text"
					placeholder='Descripción'
					required
					value={command.commandDescription}
					tooltip="Ingrese la descripción del comando"
					onValueChange={(value) => onValueChange(value, Identifier.CommandDescription)}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeCommand;
