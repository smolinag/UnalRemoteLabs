import React from 'react';
import {Row} from 'react-bootstrap';

import {RadioGroup} from '../../components/UI/index';
import sharedClasses from './shared.module.scss';

// TODO Extend with other type of commands
// REVISAR LOS TIPOS DE LOS PARÁMETROS
export interface Command {
	id: string;
	name: string;
	label: string;
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
	onCommandChange: (command: Command, id: string) => void;
}

const getActiveCommandId = (commands: Command[]): string | null => {
	const activeCommand = commands.find((command) => {
		if (command.parameters) {
			return command.parameters.value;
		}
	});
	return activeCommand?.id ?? null;
};

const Commands: React.FC<Props> = ({commands, onCommandChange}) => {
	const handleCommandChange = (commandId: string) => {
		const command = commands.find(({id}) => id === commandId);
		if (command) {
			onCommandChange({...command, parameters: {...command.parameters, value: true}} as Command, command.id);
		}
	};
	return (
		<Row className={sharedClasses.section}>
			<h4 className={sharedClasses.title}>Comandos de entrada</h4>
			<Row>
				<RadioGroup
					selectedEntryValue={getActiveCommandId(commands)}
					entries={commands.map(({label, id}) => ({label, value: id}))}
					onChange={handleCommandChange}
				/>
			</Row>
		</Row>
	);
};

export default Commands;
