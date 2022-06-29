import React from 'react';
import {Row} from 'react-bootstrap';

import {LoadingContainer} from '../../UI';
import classes from './Commands.module.scss';
import ComplexCommand, {Parameter} from './ComplexCommand/ComplexCommand';
import SimpleCommand from './SimpleCommand/SimpleCommand';

export interface Command {
	id: string;
	name: string;
	label: string;
	parameters?: Parameter[];
	order: number;
}

export interface CommandSession {
	id: string;
	labpracticeCommandID: string;
	labpracticeSessionID: string;
	command: string;
	status: string;
	executionDate: string;
	parameters: string;
}

interface Props {
	commands: Command[];
	onCommandChange: (command: Command, id: string) => void;
	isExecutingCommand: boolean;
}

const Commands: React.FC<Props> = ({commands, onCommandChange, isExecutingCommand}) => {
	const handleCommandChange = (commandId: string) => {
		const command = commands.find(({id}) => id === commandId);

		if (command) {
			onCommandChange({...command}, command.id);
		}
	};

	const handleParameterChange = (commandId: string, parameters: Parameter[]) => {
		const command = commands.find(({id}) => id === commandId);

		if (command) {
			onCommandChange({...command, parameters}, command.id);
		}
	};

	return (
		<div>
			<h4 className="title">Comandos de entrada</h4>
			<LoadingContainer loading={isExecutingCommand}>
				<Row className={`${classes.margin}`} style={{justifyContent: 'center'}}>
					{commands.map(({label, id, parameters}, index) =>
						parameters && parameters?.length > 0 ? (
							<ComplexCommand
								label={label}
								parameters={parameters}
								onExecute={handleParameterChange}
								key={index}
								commandId={id}
							/>
						) : (
							<SimpleCommand label={label} onExecute={() => handleCommandChange(id)} key={index} />
						)
					)}
				</Row>
			</LoadingContainer>
		</div>
	);
};

export default Commands;
