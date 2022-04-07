import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeCommandInfo} from '../../containers/LabPractice/types';
import {Table} from '../UI/index';
import { Action } from '../UI/Table/Table';

interface Props {
	data: LabPracticeCommandInfo[];
	onAction?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = [
	'Nombre del comando',
	'Descripción del comando',
	'Posición'
];

const mapOutput = ({
	commandName,
	commandDescription,
	order
}: LabPracticeCommandInfo): string[] => [
	commandName,
	commandDescription,
	order.toString()
];

const LabPracticeCommandTable: React.FC<Props> = ({data, onAction}) => {

	return (
		<Row className="section">
			<h5>Comandos añadidos</h5>
			<Table headers={COLUMNS} data={data.map(mapOutput)} overflow stickyHeader maxHeight={'400px'} editable removable onAction={onAction}/>
		</Row>
	);
};

export default LabPracticeCommandTable;
