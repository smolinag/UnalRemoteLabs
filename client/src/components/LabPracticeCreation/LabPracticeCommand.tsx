import React from 'react';
import Row from 'react-bootstrap/Row';

import {
	LabPracticeCommandInfo,
	Params,
	ErrorIdentifier,
	LabPracticeParameterInfo,
	OutputInfo
} from '../../containers/LabPractice/types';
import {Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	command: LabPracticeCommandInfo;
	onValueChange?: (value: string, id: string) => void;
	errors: ErrorIdentifier[];
	onValueEdit?: (
		paramType: string,
		value: string,
		command?: LabPracticeCommandInfo,
		parameter?: LabPracticeParameterInfo,
		output?: OutputInfo
	) => void;
	modal?: boolean;
}

const LabPracticeCommand: React.FC<Props> = ({command, onValueChange, onValueEdit, errors, modal = false}) => {
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
			{!modal ? <h3 className="title">Commandos de la práctica de laboratorio</h3> : null}

			{!modal ? <h5>Información de los comandos</h5> : <h5>Información del comando</h5>}

			<div className={classes.options}>
				<Input
					type="text"
					placeholder="Nombre"
					required
					value={command.commandName}
					tooltip="Ingrese el nombre del comando"
					onValueChange={(value) =>
						onValueChange
							? onValueChange(value, Params.CommandName)
							: onValueEdit && onValueEdit(Params.CommandName, value, command)
					}
					error={checkErrorMessage(!modal ? Params.CommandName : Params.ModalCommandName)}
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={command.commandDescription}
					tooltip="Ingrese la descripción del comando"
					onValueChange={(value) =>
						onValueChange
							? onValueChange(value, Params.CommandDescription)
							: onValueEdit && onValueEdit(Params.CommandDescription, value, command)
					}
				/>
			</div>
		</Row>
	);
};

export default LabPracticeCommand;
