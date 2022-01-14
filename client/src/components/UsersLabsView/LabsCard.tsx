import React from 'react';
import Row from 'react-bootstrap/Row';
import {IoEnter} from 'react-icons/io5';
import {useNavigate} from 'react-router-dom';

import {UserLabPracticeSession, LabPracticeSession} from '../../containers/UserListLaboratories/types';
import {Table} from '../UI/index';
import {Action} from '../UI/Table/Table';
import classes from './LabsCard.module.scss';

interface Props {
	laboratories?: UserLabPracticeSession[];
	onAction?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = [
	'Laboratorio',
	'Descripción',
	'Práctica',
	'Descripción',
	'Duración',
	'Inicio de la práctica',
	'Fin de la práctica',
	'Ingreso a la práctica',
	'Finalización de la práctica',
	'Ingresar'
];

const TIME_TO_ENTER_TO_PRACTICE = 15;

const showDate = (date: string) => {
	if (date.length > 0) {
		let minutes: string = new Date(date).getMinutes().toString();

		if (new Date(date).getMinutes().toString().length === 1) {
			minutes = `0${new Date(date).getMinutes()}`;
		}
		return `${new Date(date).toDateString()} - ${new Date(date).getHours()}:${minutes}`;
	} else {
		return '';
	}
};

const LabsCard: React.FC<Props> = ({laboratories, onAction}) => {
	const navigate = useNavigate();

	if (!laboratories) {
		return null;
	}

	const mapOutput = ({
		sessionStartDate,
		sessionEndDate,
		labPracticeSession
	}: UserLabPracticeSession): (boolean | string | React.ReactNode | number)[] => [
		<span key={labPracticeSession.labPracticeInfo.laboratory.name} style={{fontWeight: 'bold'}}>
			{labPracticeSession.labPracticeInfo.laboratory.name}
		</span>,
		labPracticeSession.labPracticeInfo.laboratory.description,
		labPracticeSession.labPracticeInfo.practiceInfoName,
		labPracticeSession.labPracticeInfo.practiceInfoDescription,
		`${labPracticeSession.labPracticeInfo.practiceInfoDuration} minutos`,
		showDate(labPracticeSession.startDate),
		showDate(labPracticeSession.endDate),
		showDate(sessionStartDate),
		showDate(sessionEndDate),
		redirect(labPracticeSession)
	];

	const redirect = (labPracticeSession: LabPracticeSession) => {
		/* Verificar que el usuario ingrese entre el lapsus de tiempo, el usuario puede 
		ingresar hasta 15 minutos después de la hora de inicio de la práctica*/

		if (
			new Date() > new Date(labPracticeSession.startDate) &&
			new Date() <
				new Date(
					new Date(labPracticeSession.startDate).setMinutes(
						new Date(labPracticeSession.startDate).getMinutes() + TIME_TO_ENTER_TO_PRACTICE
					)
				)
		) {
			return (
				<IoEnter
					key={labPracticeSession.labPracticeInfo.laboratory.name}
					className={classes.actionIcon}
					onClick={() => navigate('/', {state: {labPracticeId: labPracticeSession.labPracticeInfo.id}})}
				/>
			);
		} else {
			return null;
		}
	};

	return (
		<Row className="section">
			<Table headers={COLUMNS} data={laboratories.map(mapOutput)} overflow stickyHeader onAction={onAction} />
		</Row>
	);
};

export default LabsCard;
