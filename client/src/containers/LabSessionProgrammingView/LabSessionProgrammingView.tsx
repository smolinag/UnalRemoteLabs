import React, {useState, useContext, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

import awsmobile from '../../aws-exports';
import LabSessionData from '../../components/LabSessionProgramming/LabSessionData';
import {LoadingContainer, Button, Table} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {
	useCreateLabPracticeSessionMutation,
	useUpdateLabPracticeSessionMutation,
	useListUsersBySemesterQuery,
	useListUsersByLabPracticeSessionQuery,
	useCreateUserLabPracticeSessionMutation,
	useDeleteUserLabPracticeSessionMutation,
	useSendEmailMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import classes from './LabSessionProgrammingView.module.scss';
import {LabSessionInfo, SessionUser} from './types';

export interface LocationState {
	labPracticeId: string;
	labSemesterId: string;
}

const LabSessionProgrammingView: React.FC = () => {
	const location = useLocation();
	const labSession = location.state as LabSessionInfo;

	const navigate = useNavigate();

	const [labSessionInfo, setSessionInfo] = useState<LabSessionInfo>(labSession);
	const [loading, setLoading] = useState<boolean>(false);
	const [studentList, setStudentList] = useState<SessionUser[]>([]);

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const [createLabPracticeSession] = useCreateLabPracticeSessionMutation({});
	const [updateLabPracticeSession] = useUpdateLabPracticeSessionMutation({});
	const [createUserLabPracticeSession] = useCreateUserLabPracticeSessionMutation({});
	const [deleteUserLabPracticeSession] = useDeleteUserLabPracticeSessionMutation({});
	const {data: semesterUsers} = useListUsersBySemesterQuery({variables: {id: labSession.semesterId}});
	const {data: sessionUsers} = useListUsersByLabPracticeSessionQuery({variables: {id: labSession.id ?? ''}});
	const [sendEmail] = useSendEmailMutation();

	if (!labSession.id) {
		//Create lab practice session. Load semester users by default
		useEffect(() => {
			const semesterUserList = semesterUsers?.getLabSemester?.users?.items;
			if (semesterUserList) {
				const data = semesterUserList
					.filter((item) => !item?._deleted && item?.user.role === 'Students' && !item.user._deleted)
					.map((item) => {
						return {
							userName: item?.user?.name ?? '',
							userId: item ? item.user.id : '',
							userEmail: item ? item.user.email : '',
							sessionUserDeleted: false
						};
					});
				setStudentList(data);
			}
		}, [semesterUsers]);
	} else {
		//Update lab practice session. Load session users
		useEffect(() => {
			const sessionUserList = sessionUsers?.getLabPracticeSession?.UserLabPracticeSessions?.items;
			if (sessionUserList) {
				const data = sessionUserList
					.filter((item) => !item?._deleted && item?.User?.role === 'Students' && !item.User._deleted)
					.map((item) => {
						return {
							userName: item?.User?.name ?? '',
							userId: item?.User?.id ?? '',
							userEmail: item?.User?.email ?? '',
							sessionUserid: item?.id,
							sessionUserVersion: item?._version,
							sessionUserDeleted: false
						};
					});
				setStudentList(data);
				console.log(data);
			}
		}, [sessionUsers]);
	}

	const onSessionDescriptionChange = (value: string) => {
		setSessionInfo((previousState) => {
			return {...previousState, description: value};
		});
	};

	const onSessionStartDateChange = (value: Date) => {
		setSessionInfo((previousState) => {
			return {...previousState, startDate: value};
		});
	};

	const createLabSession = async () => {
		if (labSessionInfo.labPractice) {
			setLoading(true);
			try {
				const {data: labPracticeSessionData} = await createLabPracticeSession({
					variables: {
						input: {
							labpracticeID: labSessionInfo.labPractice.id,
							labSemesterID: labSessionInfo.semesterId,
							description: labSessionInfo.description,
							startDate: labSessionInfo.startDate,
							endDate: labSession.labPractice?.duration
								? new Date(labSessionInfo.startDate.getTime() + labSession.labPractice.duration * 60000)
								: labSessionInfo.startDate,
							leaderUsers: studentList.length > 0 ? studentList[0].userId : '', //Set first student as leader by default
							createdBy: '1'
						}
					}
				});
				if (!labPracticeSessionData?.createLabPracticeSession?.id) {
					throw Error('');
				} else {
					if (studentList.length > 0) {
						for (const student of studentList) {
							try {
								const {data: userLabPracticeSessionData} = await createUserLabPracticeSession({
									variables: {
										input: {
											userID: student.userId,
											labpracticesessionID: labPracticeSessionData.createLabPracticeSession.id
										}
									}
								});
								if (!userLabPracticeSessionData?.createUserLabPracticeSession?.id) {
									throw Error('');
								}
							} catch (ex) {
								console.error(ex);
								showErrorBanner(
									`Error en la asignación del usuario ${student.userName} a la sesión del laboratorio ${labSession.labPractice?.name}`
								);
							}
						}
						try {
							await sendEmail({
								variables: {
									input: {
										topic: 'Registro a sesión de laboratorio ' + labSession.labPractice?.name,
										emailList: JSON.stringify(
											studentList.filter((student) => !student.sessionUserDeleted).map((student) => student.userEmail)
										),
										message:
											'Estimado usuario\n\nEl sistema de Laboratorios remotos de la Universidad Nacional de Colombia le informa que se ha programado una sesión de laboratorio para la práctica ' +
											labSession.labPractice?.name +
											' para la fecha: ' +
											labSessionInfo.startDate.toLocaleString() +
											'.\nPara ingresar use el siguiente link: ' +
											awsmobile.oauth.redirectSignIn
									}
								}
							});
						} catch (ex) {
							console.error(ex);
							showErrorBanner(`Error al enviar las notificaciones por correo electrónico`);
						}
					} else {
						//TODO Deal with sessions with no students
						console.log('Created session with no students');
					}
				}
				showSuccessBanner(`La sesión del laboratorio ${labSession.labPractice?.name} fue creada exitosamente`);
			} catch (ex) {
				console.error(ex);
				showErrorBanner(`Error en la creación de la sesión del laboratorio ${labSession.labPractice?.name}`);
			} finally {
				setLoading(false);
				navigate('/user-labs-sessions', {state: {labSemesterId: labSessionInfo.semesterId}});
			}
		}
	};

	const updateLabSession = async () => {
		if (labSessionInfo.id) {
			setLoading(true);
			try {
				//Update LabPracticeSession data
				const {data: labPracticeSessionData} = await updateLabPracticeSession({
					variables: {
						input: {
							id: labSessionInfo.id,
							_version: labSessionInfo._version,
							description: labSessionInfo.description,
							startDate: labSessionInfo.startDate,
							endDate: labSession.labPractice?.duration
								? new Date(new Date(labSessionInfo.startDate).getTime() + labSession.labPractice.duration * 60000)
								: labSessionInfo.startDate,
							leaderUsers: studentList.length > 0 ? studentList[0].userId : '', //Set first student as leader by default
							createdBy: '1'
						}
					}
				});
				if (!labPracticeSessionData?.updateLabPracticeSession?.id) {
					throw Error('');
				} else {
					//Check if students were removed from the list. If so delete them from UserLabPracticeSession
					studentList.forEach(async (student) => {
						try {
							if (student.sessionUserDeleted && student.sessionUserid && student.sessionUserVersion) {
								await deleteLabPracticeSessionUser(student.sessionUserid, student.sessionUserVersion);
							}
						} catch (ex) {
							console.error(ex);
							showErrorBanner(`Error al eliminar el usuario: ${student.userName} con id: ${student.userId}`);
						}
					});

					if (studentList.length > 0) {
						try {
							await sendEmail({
								variables: {
									input: {
										topic: 'Actualización de sesión de laboratorio ' + labSession.labPractice?.name,
										emailList: JSON.stringify(
											studentList.filter((student) => !student.sessionUserDeleted).map((item) => item.userEmail)
										),
										message:
											'Estimado usuario\n\nEl sistema de Laboratorios remotos de la Universidad Nacional de Colombia le informa que se ha actualizado una sesión de laboratorio para la práctica ' +
											labSession.labPractice?.name +
											' para la fecha: ' +
											labSessionInfo.startDate.toLocaleString() +
											'.\nPara ingresar use el siguiente link: ' +
											awsmobile.oauth.redirectSignIn
									}
								}
							});
						} catch (ex) {
							console.error(ex);
							showErrorBanner(`Error al enviar las notificaciones por correo electrónico`);
						}
					} else {
						//TODO Deal with sessions with no students
						console.log('Updated session with no students');
					}
				}
				showSuccessBanner(`La sesión del laboratorio ${labSession.labPractice?.name} fue actualizada exitosamente`);
			} catch (ex) {
				console.error(ex);
				showErrorBanner(`Error en la actualización de la sesión del laboratorio ${labSession.labPractice?.name}`);
			} finally {
				setLoading(false);
				navigate('/user-labs-sessions', {state: {labSemesterId: labSessionInfo.semesterId}});
			}
		}
	};

	const deleteLabPracticeSessionUser = async (id: string, version: number) => {
		if (id !== undefined && id !== null && id !== '') {
			await deleteUserLabPracticeSession({
				variables: {
					input: {
						id: id,
						_version: version
					}
				}
			});
		}
	};

	const mapStudentsForTable = (students: Array<SessionUser>) => {
		const data: string[][] = [];
		students.forEach((item) => {
			data.push([item.userName, item.userEmail]);
		});
		return data;
	};

	const handleTableAction = (index: number, action: Action, row: React.ReactNode[] = []) => {
		let studentListNew;
		switch (action) {
			case Action.Delete: {
				studentListNew = [...studentList];
				const sessionStudentToDelete = {...studentListNew[index], sessionUserDeleted: true};
				studentListNew[index] = sessionStudentToDelete;
				setStudentList(studentListNew);
				break;
			}
			case Action.DeleteAll: {
				setStudentList(
					studentList.map((student) => {
						return {...student, sessionUserDeleted: true};
					})
				);
				break;
			}
		}
	};

	return (
		<Container fluid>
			<LoadingContainer loading={loading}>
				<Row className="section">
					<LabSessionData
						sessionInfo={labSessionInfo}
						onDescriptionChange={onSessionDescriptionChange}
						onStartDateChange={onSessionStartDateChange}
					/>
				</Row>
				<Row className="section">
					<h4 className="title">Listado de estudiantes</h4>
				</Row>
				<Row className="section">
					<Col sm={8} className={classes.table}>
						<Table
							headers={['Nombre', 'Correo']}
							data={mapStudentsForTable(studentList.filter((student) => !student.sessionUserDeleted))}
							removable
							hasRemoveAll
							overflow
							stickyHeader
							maxHeight={'400px'}
							onAction={handleTableAction}
						/>
					</Col>
				</Row>
				<Row className="section">
					<h3 className="title" />
					<Col className={classes.justifyEnd}>
						<Button loading={loading} onClick={labSessionInfo.id ? updateLabSession : createLabSession}>
							Guardar
						</Button>
					</Col>
				</Row>
			</LoadingContainer>
		</Container>
	);
};
export default LabSessionProgrammingView;
