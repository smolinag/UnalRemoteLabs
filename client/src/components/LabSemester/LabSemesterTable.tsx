import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabSemester} from '../../containers/LabSemester/types';
import {Table} from '../UI/index';
import {Action} from '../UI/Table/Table';

interface Props {
	data: LabSemester[];
	onAction?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = ['Semestre', 'Descripción', 'Profesor'];

const mapOutput = ({semesterName, description, professor}: LabSemester): (string | React.ReactNode)[] => [
	semesterName,
	description,
	professor
];

const LabSemesterTable: React.FC<Props> = ({data, onAction}) => {
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

export default LabSemesterTable;
