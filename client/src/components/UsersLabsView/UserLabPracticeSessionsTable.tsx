import React, {useState, useContext} from 'react';
import Row from 'react-bootstrap/Row';
import {IoEnter, IoPencil, IoTrash} from 'react-icons/io5';
import {useNavigate} from 'react-router-dom';

import {UserLabPracticeSession, LabPracticeSession} from '../../containers/UserLabPracticeSessionsList/types';
import {useDeleteLabPracticeSessionMutation} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {Table, ModalComponent} from '../UI/index';
import {Action} from '../UI/Table/Table';
import classes from './UserLabPracticeSessionsTable.module.scss';

interface Props {
	laboratories?: UserLabPracticeSession[];
	onAction?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = [
	'Laboratorio',
	'Práctica',
	'Descripción',
	'Duración',
	'Inicio de la práctica',
	'Fin de la práctica',
	'Ingreso a la práctica',
	'Finalización de la práctica',
	'Ingresar',
	'Editar',
	'Eliminar'
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

const UserLabPracticeSessionsTable: React.FC<Props> = ({laboratories, onAction}) => {
	const navigate = useNavigate();
	const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
	const [labSession, setLabSession] = useState<LabPracticeSession>();

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const [deleteLabPracticeSession] = useDeleteLabPracticeSessionMutation({});

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
		labPracticeSession.labPracticeInfo.practiceInfoName,
		labPracticeSession.labPracticeInfo.practiceInfoDescription,
		`${labPracticeSession.labPracticeInfo.practiceInfoDuration} minutos`,
		showDate(labPracticeSession.startDate),
		showDate(labPracticeSession.endDate),
		showDate(sessionStartDate),
		showDate(sessionEndDate),
		redirectToSession(labPracticeSession),
		redirectEdit(labPracticeSession),
		warnDelete(labPracticeSession)
	];

	const redirectToSession = (labPracticeSession: LabPracticeSession) => {
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
					onClick={() => navigate('/lab-practice', {state: {labPracticeId: labPracticeSession.labPracticeInfo.id}})}
				/>
			);
		} else {
			return null;
		}
	};

	const redirectEdit = (labPracticeSession: LabPracticeSession) => {
		return (
			<IoPencil
				key={labPracticeSession.labPracticeInfo.laboratory.name}
				className={classes.actionIcon}
				onClick={() =>
					navigate('/create-lab-practice-session', {
						state: {
							id: labPracticeSession.id,
							_version: labPracticeSession.version,
							startDate: labPracticeSession.startDate,
							endDate: labPracticeSession.endDate,
							description: labPracticeSession.description,
							labPracticeName: labPracticeSession.labPracticeInfo?.practiceInfoName ? labPracticeSession.labPracticeInfo.practiceInfoName : "--",
							duration: labPracticeSession.labPracticeInfo?.practiceInfoDuration ? labPracticeSession.labPracticeInfo.practiceInfoDuration : "--",
							semesterId: labPracticeSession.labSemesterInfo?.id ? labPracticeSession.labSemesterInfo.id : "--",
						}
					})
				}
			/>
		);
	};

	const warnDelete = (labPracticeSession: LabPracticeSession) => {
		return (
			<IoTrash
				key={labPracticeSession.labPracticeInfo.laboratory.name}
				className={classes.actionIcon}
				onClick={() => onDeleteAccept(labPracticeSession)}
			/>
		);
	};

	const onDeleteAccept = (labPracticeSession: LabPracticeSession) => {
		setLabSession(labPracticeSession);
		setDeleteModalVisible(true);
	};

	const handleDisplayModal = (display: boolean) => {
		setDeleteModalVisible(display);
	};

	const handleDeleteAccept = async () => {
		if (labSession) {
			try {
				const {data: labSessionDelete} = await deleteLabPracticeSession({
					variables: {
						input: {
							id: labSession.id,
							_version: labSession.version
						}
					}
				});
				if (!labSessionDelete?.deleteLabPracticeSession?.id) {
					throw Error('');
				}
				showSuccessBanner(
					`La sesión del laboratorio ${labSession.labPracticeInfo.practiceInfoName} fue eliminada exitosamente`
				);
			} catch (ex) {
				showErrorBanner(
					`Error en la eliminación de la sesión del laboratorio ${labSession.labPracticeInfo.practiceInfoName}`
				);
			}
		}
		setDeleteModalVisible(false);
	};

	return (
		<Row className="section">
			<ModalComponent
				title={
					labSession?.labPracticeInfo?.practiceInfoName ? labSession.labPracticeInfo.practiceInfoName : 'Laboratorio '
				}
				display={deleteModalVisible}
				onDisplay={handleDisplayModal}
				onSave={handleDeleteAccept}>
				<div>{'¿Desea eliminar la sesión de la práctica de laboratorio programada?'}</div>
			</ModalComponent>
			<Table headers={COLUMNS} data={laboratories.map(mapOutput)} overflow stickyHeader onAction={onAction} />
		</Row>
	);
};

export default UserLabPracticeSessionsTable;
