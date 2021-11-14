import React from 'react';
import {Row} from 'react-bootstrap';

import {Switch} from '../../components/UI/index';
import classes from './Commands.module.scss';
import sharedClasses from './shared.module.scss';

// TODO Extend with other type of commands
export interface Command {
	label: string;
	id: string;
	value: boolean;
}

interface Props {
	commands: Command[];
	onCommandChange?: (value: boolean, id: string) => void;
}

const getCommand = ({id, label, value}: Command, handler: (value: boolean, id: string) => void): JSX.Element => {
	return (
		<div key={id} className={classes.command}>
			<Switch label={label} state={value} onToggle={(newValue) => handler(newValue, id)} />
		</div>
	);
};

const Commands: React.FC<Props> = ({commands, onCommandChange}) => {
	const handleCommandChange = (value: boolean, id: string): void => {
		if (onCommandChange) {
			onCommandChange(value, id);
		}
	};

	return (
		<Row className={sharedClasses.section}>
			<h4 className={sharedClasses.title}>Comandos de entrada</h4>
			<Row>
				<div className={classes.commands}>{commands.map((command) => getCommand(command, handleCommandChange))}</div>
			</Row>
		</Row>
	);
};

export default Commands;
