import React from 'react';
import {Row} from 'react-bootstrap';

import {Switch} from '../../components/UI/index';
import {Maybe} from '../../graphql/generated/schema';
import classes from './Commands.module.scss';
import sharedClasses from './shared.module.scss';

// TODO Extend with other type of commands
// REVISAR LOS TIPOS DE LOS PARÁMETROS
export interface Command {
	id: Maybe<string>;
	name: Maybe<string>;
	label: Maybe<string>;
	parameters: ParameterDto | undefined | null;
}

// REVISAR LOS TIPOS DE LOS PARÁMETROS
export interface ParameterDto {
	name: string | undefined | null;
	value: boolean | undefined | null;
	id: string;
}

interface Props {
	commands: Command[];
	onCommandChange?: (command: Command, id: string) => void;
}

const getCommand = (command: Command, handler: (command: Command, id: string) => void): JSX.Element => {
	return (
		<div key={command.id} className={classes.command}>
			<Switch
				label={command.label}
				state={command.parameters?.value}
				onToggle={(newValue) =>
					handler({...command, parameters: {...command.parameters, value: newValue}} as Command, `${command.id}`)
				}
			/>
		</div>
	);
};

const Commands: React.FC<Props> = ({commands, onCommandChange}) => {
	const handleCommandChange = (command: Command, id: string): void => {
		if (onCommandChange) {
			onCommandChange(command, id);
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
