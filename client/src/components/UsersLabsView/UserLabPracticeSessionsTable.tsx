import React, {useState, useContext} from 'react';
import Row from 'react-bootstrap/Row';
import {IoEnter, IoPencil, IoTrash, IoDocumentText} from 'react-icons/io5';
import {TiCancel} from 'react-icons/ti';
import {useNavigate} from 'react-router-dom';

import {UserLabPracticeSession, LabPracticeSession} from '../../containers/UserLabPracticeSessionsList/types';
import {Groups} from '../../generalUtils/groups';
import {validateGroupFunction} from '../../generalUtils/ValidateGroup';
import {
	useDeleteLabPracticeSessionMutation,
	useListUsersByLabPracticeSessionLazyQuery,
	useSendEmailMutation
} from '../../graphql/generated/schema';
import {useAuthContext} from '../../GroupProvider';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {Table, ModalComponent} from '../UI/index';
import classes from './UserLabPracticeSessionsTable.module.scss';

interface Props {
	userLabPracticeSession?: UserLabPracticeSession[];
	labPracticeSession?: LabPracticeSession[];
	onSuccessSessionDelete: (session: LabPracticeSession) => void;
}

const COLUMNS_USER_SESSIONS = [
	'Laboratorio',
	'Práctica',
	'Descripción',
	'Sesión',
	'Duración',
	'Inicio',
	'Finalización',
	'Ingreso',
	'Ingresar'
];

const COLUMNS_SESSIONS = [
	'Práctica',
	'Descripción',
	'Sesión',
	'Duración',
	'Inicio',
	'Finalización',
	'Ingresar',
	'Asistencia',
	'Editar',
	'Eliminar'
];

// const TIME_TO_ENTER_TO_PRACTICE = 15;

const showDate = (date: string) => {
	if (date.length > 0) {
		let minutes: string = new Date(date).getMinutes().toString();

		if (new Date(date).getMinutes().toString().length === 1) {
			minutes = `0${new Date(date).getMinutes()}`;
		}
		return `${new Date(date).toDateString()} - ${new Date(date).getHours()}:${minutes}`;
	} else {
		return '-';
	}
};

const UserLabPracticeSessionsTable: React.FC<Props> = ({
	userLabPracticeSession,
	labPracticeSession,
	onSuccessSessionDelete
}) => {
	const {group} = useAuthContext();
	const navigate = useNavigate();
	const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
	const [labSession, setLabSession] = useState<LabPracticeSession>();

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const [deleteLabPracticeSession] = useDeleteLabPracticeSessionMutation({});
	const [listUsersBySession] = useListUsersByLabPracticeSessionLazyQuery({});
	const [sendEmail] = useSendEmailMutation();

	if (!userLabPracticeSession || !labPracticeSession) {
		return null;
	}

	const mapOutputUserSessions = ({
		sessionStartDate,
		labPracticeSession
	}: UserLabPracticeSession): (boolean | string | React.ReactNode | number)[] => [
		<span key={labPracticeSession.labPracticeInfo.laboratory.name} style={{fontWeight: 'bold'}}>
			{labPracticeSession.labPracticeInfo.laboratory.name}
		</span>,
		labPracticeSession.labPracticeInfo.practiceInfoName,
		labPracticeSession.labPracticeInfo.practiceInfoDescription,
		labPracticeSession.description,
		`${labPracticeSession.labPracticeInfo.practiceInfoDuration} minutos`,
		showDate(labPracticeSession.startDate),
		showDate(labPracticeSession.endDate),
		showDate(sessionStartDate),
		redirectToSession(labPracticeSession)
	];

	const mapOutputLabSessions = (
		labPracticeSession: LabPracticeSession
	): (boolean | string | React.ReactNode | number)[] => [
		labPracticeSession.labPracticeInfo.practiceInfoName,
		labPracticeSession.labPracticeInfo.practiceInfoDescription,
		labPracticeSession.description,
		`${labPracticeSession.labPracticeInfo.practiceInfoDuration} minutos`,
		showDate(labPracticeSession.startDate),
		showDate(labPracticeSession.endDate),
		redirectToSession(labPracticeSession),
		downloadAttendance(labPracticeSession),
		redirectEdit(labPracticeSession),
		warnDelete(labPracticeSession)
	];

	const redirectToSession = (labPracticeSession: LabPracticeSession) => {
		/* Verificar que el usuario ingrese entre el lapsus de tiempo, el usuario puede 
		ingresar hasta el 1/4 inicial de la duración de la práctica*/
		const duration: number = labPracticeSession.labPracticeInfo.practiceInfoDuration;
		const quarter = Math.round(duration / 4);
		const quarteMilisec = quarter * 60 * 1000;

		const quarterTime = new Date(labPracticeSession.startDate).getTime() + quarteMilisec;

		if (
			new Date() < new Date(labPracticeSession.endDate) &&
			new Date() >= new Date(labPracticeSession.startDate) &&
			new Date().getTime() < quarterTime
		) {
			return (
				<IoEnter
					key={labPracticeSession.labPracticeInfo.laboratory.id}
					className={classes.actionIcon}
					onClick={() =>
						navigate('/lab-practice', {
							state: {
								labPracticeId: labPracticeSession.labPracticeInfo.id,
								deviceId: labPracticeSession.labPracticeInfo.labPracticeDeviceId,
								sessionId: labPracticeSession.id
							}
						})
					}
				/>
			);
		} else {
			return <TiCancel className={`${classes.actionIcon} ${classes.actionIconDont}`} />;
		}
	};

	const downloadAttendance = (labPracticeSession: LabPracticeSession) => {		
		return (
			<IoDocumentText
				key={labPracticeSession.labPracticeInfo.laboratory.name}
				className={classes.actionIcon}
				onClick={async () => queryUsersAttendance(labPracticeSession)}
			/>
		);
	};

	const queryUsersAttendance = async (labPracticeSession: LabPracticeSession) => {
		const {data: usersData, error: usersErrors} = await listUsersBySession({
			variables: {id: labPracticeSession.id}
		});
		if (usersErrors) {
			console.log(usersErrors);
		} else {
			if (usersData?.getLabPracticeSession?.UserLabPracticeSessions?.items) {
				const userSessions = usersData.getLabPracticeSession.UserLabPracticeSessions.items;
				const attendanceList = userSessions.map((userSession) => {
					if (userSession) {
						const sessionStart = showDate(userSession.sessionStartDate);
						const user = userSession?.User?.name ? userSession.User.name : '--';
						const email = userSession?.User?.email ? userSession.User.email : '--';
						return `${user},  ${email}, ${sessionStart}`;
					} else {
						return '';
					}
				});
				const practiceName = `Práctica: ${labPracticeSession.labPracticeInfo.practiceInfoName}\n`;
				const sessionDate = `Fecha Inicio: ${showDate(labPracticeSession.startDate)}\n`;
				const headerStr = 'Nombre, Email, Ingreso\n';
				const blob = new Blob([practiceName, sessionDate, headerStr, attendanceList.toString()]);
				const fileDownloadUrl = URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.href = fileDownloadUrl;
				link.setAttribute(
				  'download',
				  'Asistencia.txt',
				);
			
				// Append to html link element page
				document.body.appendChild(link);
			
				// Start download
				link.click();
			
				// Clean up and remove the link
				if(link.parentNode){
					link.parentNode.removeChild(link);
				}				
			} else {
				console.error('Error listUsersBySession by sessionID: ' + labPracticeSession.id);
			}
		}
	};

	const redirectEdit = (labPracticeSession: LabPracticeSession) => {
		return (
			<IoPencil
				key={labPracticeSession.labPracticeInfo.laboratory.name}
				className={classes.actionIcon}
				onClick={() =>
					navigate('/lab-practice-session-creation', {
						state: {
							id: labPracticeSession.id,
							_version: labPracticeSession.version,
							startDate: labPracticeSession.startDate,
							endDate: labPracticeSession.endDate,
							description: labPracticeSession.description,
							labPractice: {
								id: labPracticeSession.labPracticeInfo.id,
								name: labPracticeSession.labPracticeInfo?.practiceInfoName,
								duration: labPracticeSession.labPracticeInfo.practiceInfoDuration
							},
							semesterId: labPracticeSession.labSemesterInfo?.id ? labPracticeSession.labSemesterInfo.id : '--'
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
				} else {
					const {data: usersData, error: usersErrors} = await listUsersBySession({
						variables: {id: labSession.id}
					});
					if (usersErrors) {
						console.log(usersErrors);
					} else {
						if (usersData?.getLabPracticeSession?.UserLabPracticeSessions?.items) {
							const users = usersData.getLabPracticeSession.UserLabPracticeSessions.items;
							const emails = users.map((item) => item?.User?.email).filter((item1) => item1);
							if (users.length > 0) {
								//Send email to users
								await sendEmail({
									variables: {
										input: {
											topic: 'Cancelación de sesión de laboratorio ' + labSession.labPracticeInfo?.practiceInfoName,
											emailList: JSON.stringify(emails),
											message:
												'Estimado usuario\n\nEl sistema de Laboratorios remotos de la Universidad Nacional de Colombia le informa que se ha cancelado una sesión de laboratorio para la práctica ' +
												labSession.labPracticeInfo?.practiceInfoName +
												' con fecha: ' +
												labSession.startDate.toLocaleString() +
												'.\nPara ingresar use el siguiente link: www.laboratoriosremotos.com'
										}
									}
								});
							} else {
								console.log('No users to send email');
							}
							onSuccessSessionDelete(labSession);
							showSuccessBanner(
								`La sesión del laboratorio ${labSession.labPracticeInfo.practiceInfoName} fue eliminada exitosamente`
							);
						}
					}
				}
			} catch (ex) {
				showErrorBanner(
					`Error en la eliminación de la sesión del laboratorio ${labSession.labPracticeInfo.practiceInfoName}`
				);
			}
		}
		setDeleteModalVisible(false);
	};

	const filterHeadersByGroup = () => {
		switch (group) {
			case Groups.AdminsGroup:
				return COLUMNS_SESSIONS;
			default:
				return COLUMNS_USER_SESSIONS;
		}
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
			<Table
				headers={filterHeadersByGroup()}
				data={
					validateGroupFunction([Groups.AdminsGroup], group)
						? labPracticeSession.map(mapOutputLabSessions)
						: userLabPracticeSession.map(mapOutputUserSessions)
				}
				overflow
				stickyHeader
			/>
		</Row>
	);
};

export default UserLabPracticeSessionsTable;
