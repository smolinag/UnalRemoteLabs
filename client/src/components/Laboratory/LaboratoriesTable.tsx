import React from 'react';
import Row from 'react-bootstrap/Row';

import {Laboratory} from '../../containers/Laboratory/types';
import {Table} from '../UI/index';
import {Action} from '../UI/Table/Table';

interface Props {
	data: Laboratory[];
	onAction?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = ['Nombre', 'Descripción'];

const mapOutput = ({name, description}: Laboratory): (string | React.ReactNode)[] => [name, description];

const LaboratoriesTable: React.FC<Props> = ({data, onAction}) => {
	return (
		<Row className="section">
			<Table
				headers={COLUMNS}
				data={data.map(mapOutput)}
				overflow
				stickyHeader
				maxHeight={'400px'}
				editable
				removable
				onAction={onAction}
			/>
		</Row>
	);
};

export default LaboratoriesTable;
