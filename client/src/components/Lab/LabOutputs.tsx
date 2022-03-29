import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {Maybe} from '../../graphql/generated/schema';
import {Table} from '../UI';
import { CommandSession } from './Commands/Commands';

type Data = [string, string | number][];

export interface Output {
	id: Maybe<string>;
	name: Maybe<string> | undefined;
	value: Maybe<string>;
}

interface Props {
	dataOutput: Data;
	dataCommands: CommandSession[];
}

const COLUMNS_OUTPUTS = ['Salida', 'Valores'];

const mapOutput = ({status, executionDate, command, parameters}: CommandSession): string[] => [
	executionDate,
	command,
	status,
	parameters && `${JSON.parse(parameters).label.toString()} ${JSON.parse(parameters).value.toString()}`
];

const COLUMNS_COMMANDS = ['Fecha de ejecución', 'Comando', 'Estado', 'Parámetro'];

const LabOutputs: React.FC<Props> = ({dataOutput, dataCommands}) => {
	return (
		<Row className="section">
			<Col md={6}>
				<h4 className="title">Datos de salida</h4>
				<Row>
					<Table headers={COLUMNS_OUTPUTS} data={dataOutput} overflow stickyHeader maxHeight={'400px'} />
				</Row>
			</Col>
			<Col md={6}>
				<h4 className="title">Histórico de comandos</h4>
				<Row>
					<Table
						headers={COLUMNS_COMMANDS}
						data={dataCommands.length > 0 ? dataCommands.map(mapOutput) : []}
						overflow
						stickyHeader
						maxHeight={'400px'}
					/>
				</Row>
			</Col>
		</Row>
	);
};

export default LabOutputs;
