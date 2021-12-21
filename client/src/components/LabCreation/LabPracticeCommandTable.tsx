import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeCommandInfo} from '../../containers/LabCreationView/types';
import {Table} from '../UI/index';
import { Action } from '../UI/Table/Table';

interface Props {
	data: LabPracticeCommandInfo[];
	onDelete?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = [
	'Nombre del comando',
	'Descripción del comando',
];

const mapOutput = ({
	commandName,
	commandDescription,
}: LabPracticeCommandInfo): string[] => [
	commandName,
	commandDescription,
];

const LabPracticeCommandTable: React.FC<Props> = ({data, onDelete}) => {

	return (
		<Row className="section">
			<h5>Comandos añadidos</h5>
			<Table headers={COLUMNS} data={data.map(mapOutput)} overflow stickyHeader maxHeight={'400px'} removable onAction={onDelete}/>
		</Row>
	);
};

export default LabPracticeCommandTable;
