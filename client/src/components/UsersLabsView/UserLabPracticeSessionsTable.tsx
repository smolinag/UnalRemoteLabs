import React, {useState, useContext} from 'react';
import Row from 'react-bootstrap/Row';
import {IoEnter, IoPencil, IoTrash} from 'react-icons/io5';
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
	'Salida',
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
		sessionEndDate,
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
		showDate(sessionEndDate),
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
		redirectEdit(labPracticeSession),
		warnDelete(labPracticeSession)
	];

	const redirectToSession = (labPracticeSession: LabPracticeSession) => {
		/* Verificar que el usuario ingrese entre el lapsus de tiempo, el usuario puede 
		ingresar hasta 15 minutos después de la hora de inicio de la práctica*/

		if (
			new Date() < new Date(labPracticeSession.endDate)
			// &&
			// 	new Date() <
			// 		new Date(
			// 			new Date(labPracticeSession.startDate).setMinutes(
			// 				new Date(labPracticeSession.startDate).getMinutes() + TIME_TO_ENTER_TO_PRACTICE
			// 			)
			// 		)
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
