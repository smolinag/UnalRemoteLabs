import React from 'react';
import {Row} from 'react-bootstrap';

import classes from './Commands.module.scss';
import ComplexCommand, {Parameter} from './ComplexCommand/ComplexCommand';
import SimpleCommand from './SimpleCommand/SimpleCommand';

export interface Command {
	id: string;
	name: string;
	label: string;
	parameters?: Parameter[];
}

interface Props {
	commands: Command[];
	onCommandChange: (command: Command, id: string) => void;
}

const Commands: React.FC<Props> = ({commands, onCommandChange}) => {
	const handleCommandChange = (commandId: string, parameters?: Parameter[]) => {
		const command = commands.find(({id}) => id === commandId);
		if (command) {
			onCommandChange({...command, parameters}, command.id);
		}
	};

	return (
		<Row className="section">
			<h4 className="title">Comandos de entrada</h4>
			<div className={classes.commands}>
				{commands.map(({label, id, parameters}) =>
					parameters ? (
						<ComplexCommand
							label={label}
							parameters={parameters}
							onExecute={() => handleCommandChange(id, parameters)}
						/>
					) : (
						<SimpleCommand label={label} onExecute={() => handleCommandChange(id)} />
					)
				)}
			</div>
		</Row>
	);
};

export default Commands;
