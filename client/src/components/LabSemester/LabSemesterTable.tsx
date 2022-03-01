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

const COLUMNS = ['Semestre', 'Descripción', 'Profesor', 'Prácticas', 'Sesiones'];

const LabSemesterTable: React.FC<Props> = ({data, onAction}) => {
	const navigate = useNavigate();

	const mapOutput = ({semesterName, description, professor, laboratoryID, id}: LabSemester): (string | React.ReactNode)[] => [
		semesterName,
		description,
		professor,
		redirectToLabPractice(laboratoryID ? laboratoryID : "", id ? id : ""),
		redirectToLabPracticeSession(id ? id : "")
	];

	const redirectToLabPractice = (labId: string, labSemesterId: string) => {
		return (
			<a
				href=""
				onClick={() =>
					navigate('/lab-practices', {
						state: {labId, labSemesterId}
					})
				}>
				Prácticas
			</a>
		);
	};

	const redirectToLabPracticeSession = (labSemesterId: string) => {
		console.log(labSemesterId)
		return (
			<a
				href=""
				// onClick={() =>
				// 	navigate('/lab-practices', {
				// 		state: {labId, labSemesterId}
				// 	})
				// }
				>
				Sesiones
			</a>
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