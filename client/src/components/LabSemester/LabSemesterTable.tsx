import React from 'react';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';

import {LabSemester} from '../../containers/LabSemester/types';
import {Groups} from '../../generalUtils/groups';
import {useAuthContext} from '../../GroupProvider';
import {Table} from '../UI/index';
import {Action} from '../UI/Table/Table';

interface Props {
	data: LabSemester[];
	onAction?: (rowIndex: number, action: Action) => void;
	userId?: string;
}

const COLUMNS = ['Semestre', 'Descripción', 'Profesor', 'Programar', 'Sesiones'];
const COLUMNS_STUDENTS = ['Laboratorio', 'Semestre', 'Descripción', 'Profesor', 'Prácticas', 'Sesiones'];
const COLUMNS_MONITORS = ['Laboratorio', 'Semestre', 'Descripción', 'Profesor', 'Programar', 'Sesiones'];

const LabSemesterTable: React.FC<Props> = ({data, onAction, userId}) => {
	const {group} = useAuthContext();
	const navigate = useNavigate();

	const mapAdminOutput = ({
		semesterName,
		description,
		professorEmailList,
		laboratoryId,
		id
	}: LabSemester): (string | React.ReactNode)[] => [
		semesterName,
		description,
		professorEmailList,
		redirectToLabPractice(laboratoryId ? laboratoryId : '', id ? id : ''),
		redirectToLabPracticeSession(laboratoryId ? laboratoryId : '', id ? id : '')
	];

	const mapOutput = ({
		laboratoryName,
		semesterName,
		description,
		professorEmailList,
		laboratoryId,
		id
	}: LabSemester): (string | React.ReactNode)[] => [
		laboratoryName,
		semesterName,
		description,
		professorEmailList,
		redirectToLabPractice(laboratoryId ? laboratoryId : '', id ? id : ''),
		redirectToLabPracticeSession(laboratoryId ? laboratoryId : '', id ? id : '')
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
				Prácticas
			</p>
		);
	};

	const redirectToLabPracticeSession = (labId: string, labSemesterId: string) => {
		return (
			<p
				className="links"
				onClick={() =>
					navigate('/user-labs-sessions', {
						state: {labId, labSemesterId, userId}
					})
				}>
				Sesiones
			</p>
		);
	};

	const filterHeadersByGroup = () => {
		switch (group) {
			case Groups.StudentsGroup:
				return COLUMNS_STUDENTS;
			case Groups.MonitorsGroup:
				return COLUMNS_MONITORS;
			case Groups.ProfessorsGroup:
				return COLUMNS_MONITORS;
			default:
				return COLUMNS;
		}
	};

	/* eslint-disable @typescript-eslint/no-explicit-any */
	const filterDataByGroup = (data: any) => {
		switch (group) {
			case Groups.StudentsGroup:
				return mapOutput(data);
			case Groups.MonitorsGroup:
				return mapOutput(data);
			case Groups.ProfessorsGroup:
				return mapOutput(data);
			default:
				return mapAdminOutput(data);
		}
	};

	return (
		<Row className="section">
			<Table
				headers={filterHeadersByGroup()}
				data={data.map((obj) => filterDataByGroup(obj))}
				overflow
				stickyHeader
				maxHeight={'400px'}
				editable={group === Groups.AdminsGroup || group === Groups.ProfessorsGroup || group === Groups.MonitorsGroup}
				removable={group === Groups.AdminsGroup || group === Groups.ProfessorsGroup}
				onAction={onAction}
			/>
		</Row>
	);
};

export default LabSemesterTable;
