import React from 'react';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';

import {Laboratory} from '../../containers/Laboratory/types';
import {Table} from '../UI/index';
import {Action} from '../UI/Table/Table';

interface Props {
	data: Laboratory[];
	onAction?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = ['Nombre', 'Descripción', 'Prácticas', 'Semestres'];

const LaboratoriesTable: React.FC<Props> = ({data, onAction}) => {
	const mapOutput = ({id, name, description}: Laboratory): (string | React.ReactNode)[] => [
		name,
		description,
		redirectToLabPractice(id ? id : ''),
		redirectToLabSemester(id ? id : '')
	];

	const navigate = useNavigate();

	const redirectToLabPractice = (labId: string) => {
		return (
			<p
				className="links"
				onClick={() =>
					navigate('/lab-practices', {
						state: {labId}
					})
				}>
				Prácticas
			</p>
		);
	};

	const redirectToLabSemester = (labId: string) => {
		return (
			<p
				className="links"
				onClick={() =>
					navigate('/lab-semesters', {
						state: {laboratoryID: labId}
					})
				}>
				Semestres
			</p>
		);
	};

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
