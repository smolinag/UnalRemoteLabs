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
	onCommandChange?: (value: ParameterDto, id: string) => void;
}

const getCommand = (
	{id, label, parameters}: Command,
	handler: (params: ParameterDto, id: string) => void
): JSX.Element => {
	return (
		<div key={id} className={classes.command}>
			<Switch
				label={label}
				state={parameters?.value}
				onToggle={(newValue) => handler({...parameters, value: newValue} as ParameterDto, `${id}`)}
			/>
		</div>
	);
};

const Commands: React.FC<Props> = ({commands, onCommandChange}) => {
	const handleCommandChange = (value: ParameterDto, id: string): void => {
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
