import React from 'react';
import {Row} from 'react-bootstrap';

import classes from './Commands.module.scss';
import ComplexCommand, {Parameter} from './ComplexCommand/ComplexCommand';
import SimpleCommand from './SimpleCommand/SimpleCommand';

// TODO Extend with other type of commands
// REVISAR LOS TIPOS DE LOS PARÁMETROS
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
			onCommandChange({...command, parameters: {...command.parameters, value: true}} as Command, command.id);
		}
	};

	// const handleCommandChange = async ({parameters, name}: Command, id: string) => {
	// 	try {
	// 		setIsExecutingCommand(true);
	// 		const {data} = await updateLabPracticeSessionCommand({
	// 			variables: {
	// 				input: {
	// 					labpracticesessionID: labPracticeSessionId,
	// 					labpracticecommandID: id,
	// 					parameters: JSON.stringify([parameters][0]),
	// 					status: 'pending'
	// 				}
	// 			}
	// 		});

	// 		const mqttMessage = {
	// 			name,
	// 			params: [parameters],
	// 			uuid: data?.createLabPracticeSessionCommand?.id
	// 		};

	// 		await publishMqttMessageMutation({variables: {input: {message: JSON.stringify(mqttMessage), topic: 'topic_in'}}});

	// 		commandExecutionTimeout.current = setTimeout(() => {
	// 			setIsExecutingCommand(false);
	// 		}, COMMAND_EXECUTION_TIMEOUT);
	// 	} catch (error) {
	// 		console.error('no se pudo ejecutar el comando', error);
	// 		setIsExecutingCommand(false);
	// 	}
	// };

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
