import React from 'react';
import {Row} from 'react-bootstrap';

import Table from '../../UI/Table/Table';
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
	data: CommandSession[];
}

const mapOutput = ({status, executionDate, command, parameters}: CommandSession): string[] => [
	executionDate,
	command,
	status,
	parameters && `${JSON.parse(parameters).label.toString()} ${JSON.parse(parameters).value.toString()}`
];

const COLUMNS = ['Fecha de ejecución', 'Comando', 'Estado', 'Parámetro'];

const Commands: React.FC<Props> = ({commands, onCommandChange, data}) => {
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
		<Row className="section">
			<h4 className="title">Comandos de entrada</h4>
			<div className='row'>
				<div className={`col-lg-8 ${classes.margin}`} style={{display: 'flex'}}>
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
				</div>
				<div className={`col-lg-4 ${classes.margin}`}>
					<h5>Histórico de comandos</h5>
					<Table
						headers={COLUMNS}
						data={data.length > 0 ? data.map(mapOutput) : []}
						overflow
						stickyHeader
						maxHeight={'400px'}
					/>
				</div>
			</div>
		</Row>
	);
};

export default Commands;
