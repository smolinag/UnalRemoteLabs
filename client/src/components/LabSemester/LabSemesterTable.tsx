import React from 'react';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';

import {LabSemester} from '../../containers/LabSemester/types';
import {Table} from '../UI/index';
import {Action} from '../UI/Table/Table';

interface Props {
	data: LabSemester[];
	onAction?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = ['Semestre', 'Descripción', 'Profesor', 'Programar', 'Sesiones'];

const LabSemesterTable: React.FC<Props> = ({data, onAction}) => {
	const navigate = useNavigate();

	const mapOutput = ({
		semesterName,
		description,
		professorEmailList,
		laboratoryID,
		id
	}: LabSemester): (string | React.ReactNode)[] => [
		semesterName,
		description,
		professorEmailList,
		redirectToLabPractice(laboratoryID ? laboratoryID : '', id ? id : ''),
		redirectToLabPracticeSession(laboratoryID ? laboratoryID : '', id ? id : '')
	];

	const redirectToLabPractice = (labId: string, labSemesterId: string) => {
		return (
			<p
				className="links"
				onClick={() =>
					navigate('/lab-practices', {
						state: {labId, labSemesterId}
					})
				}>
				Programar Prácticas
			</p>
		);
	};

	const redirectToLabPracticeSession = (labId: string, labSemesterId: string) => {
		return (
			<p
				className="links"
				onClick={() =>
					navigate('/user-labs-sessions', {
						state: {labId, labSemesterId}
					})
				}>
				Sesiones
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

export default LabSemesterTable;
