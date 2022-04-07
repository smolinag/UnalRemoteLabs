import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {IoRefreshOutline} from 'react-icons/io5';

import { LoadingContainer } from '../../UI';
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
	videoUrl: string;
	onVideoUrlRefresh: () => void;
	isExecutingCommand: boolean;
}

const Commands: React.FC<Props> = ({commands, onCommandChange, videoUrl, onVideoUrlRefresh, isExecutingCommand}) => {
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
			<Col md={7}>
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
			</Col>
			<Col md={5}>
				<h4 className="title row" style={{display: 'flex', flexDirection: 'row'}}>
					<Col xs={3}>
						<div>Video</div>
					</Col>
					<Col xs={3}>
						<IoRefreshOutline key={'RefreshVideo'} className={classes.icon} onClick={() => onVideoUrlRefresh()} />
					</Col>
				</h4>

				<Row>
					<div className="video-responsive">
						<iframe
							width="100%"
							height="380"
							src={`https://www.youtube.com/embed/` + videoUrl}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							title="Video práctica de laboratorio"
						/>
					</div>
				</Row>
			</Col>
		</Row>
	);
};

export default Commands;
