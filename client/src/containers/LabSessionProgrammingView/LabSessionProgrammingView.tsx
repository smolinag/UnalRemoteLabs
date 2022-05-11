import React, {useState, useContext, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

import LabSessionData from '../../components/LabSessionProgramming/LabSessionData';
import {LoadingContainer, Button, Table} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {
	useGetLabPracticeQuery,
	useCreateLabPracticeSessionMutation,
	useListUsersBySemesterQuery,
	useCreateUserLabPracticeSessionMutation,
	useSendEmailMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import classes from './LabSessionProgrammingView.module.scss';
import {LabSessionInfo, LabPracticeInfo, SessionUser} from './types';

export interface LocationState {
	labPracticeId: string;
	labSemesterId: string;
}

const LabSessionProgrammingView: React.FC<unknown> = () => {
	const location = useLocation();
	const labSession = location.state as LabSessionInfo;
	const labPracticeId = (location.state as LocationState)?.labPracticeId;
	const labSemesterId = (location.state as LocationState)?.labSemesterId;

	const [labPracticeInfo, setLabPracticeInfo] = useState<LabPracticeInfo>({id: '', name: '', duration: 0});
	const [labSessionInfo, setSessionInfo] = useState<LabSessionInfo>(labSession);
	const [loading, setLoading] = useState<boolean>(false);
	const [studentList, setStudentList] = useState<SessionUser[]>([]);

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const [createLabPracticeSession] = useCreateLabPracticeSessionMutation({});
	const [createUserLabPracticeSession] = useCreateUserLabPracticeSessionMutation({});
	const {data: labPracticeData} = useGetLabPracticeQuery({variables: {id: labPracticeId}});
	const {data: semesterUsers} = useListUsersBySemesterQuery({variables: {id: labSemesterId}});
	const [sendEmail] = useSendEmailMutation();

	useEffect(() => {
		if (labPracticeData?.getLabPractice) {
			setLabPracticeInfo({
				id: labPracticeData.getLabPractice.id,
				name: labPracticeData.getLabPractice.name,
				description: labPracticeData.getLabPractice.description ? labPracticeData.getLabPractice.description : '',
				duration: labPracticeData.getLabPractice.duration
			});
		}
	}, [labPracticeData]);

	useEffect(() => {
		const semesterUserList = semesterUsers?.getLabSemester?.users?.items;
		if (semesterUserList) {
			const data = semesterUserList.map((item) => {
				return {name: item?.user?.name ?? '', id: item ? item.user.id : '', email: item ? item.user.email : ''};
			});

			setStudentList(data);
		}
	}, [semesterUsers]);

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
		setLoading(true);
		try {
			const {data: labPracticeSessionData} = await createLabPracticeSession({
				variables: {
					input: {
						labpracticeID: labPracticeId,
						labSemesterID: labSemesterId,
						description: labSessionInfo.description,
						startDate: labSessionInfo.startDate,
						endDate: new Date(labSessionInfo.startDate.getTime() + labPracticeInfo.duration * 60000),
						createdBy: '1'
					}
				}
			});
			if (!labPracticeSessionData?.createLabPracticeSession?.id) {
				throw Error('');
			} else {
				for (const student of studentList) {
					const {data: userLabPracticeSessionData} = await createUserLabPracticeSession({
						variables: {
							input: {
								userID: student.id,
								labpracticesessionID: labPracticeSessionData.createLabPracticeSession.id
							}
						}
					});
					if (!userLabPracticeSessionData?.createUserLabPracticeSession?.id) {
						throw Error('');
					} else {
						await sendEmail({
							variables: {
								input: {
									topic: 'Registro a sesión de laboratorio ' + labPracticeInfo.name,
									emailList: JSON.stringify(studentList.map((item) => item.email)),
									message:
										'Estimado usuario\n\nEl sistema de Laboratorios remotos de la Universidad Nacional de Colombia le informa que se ha programado una sesión de laboratorio para la práctica ' +
										labPracticeInfo.name +
										' para la fecha: ' +
										labSessionInfo.startDate.toLocaleString() +
										'.\nPara ingresar use el siguiente link: www.laboratoriosremotos.com'
								}
							}
						});
					}
				}
			}

			showSuccessBanner(`La sesión del laboratorio ${labPracticeInfo.name} fue creada exitosamente`);
		} catch (ex) {
			console.error(ex);
			showErrorBanner(`Error en la creación de la sesión del laboratorio ${labPracticeInfo.name}`);
		} finally {
			setLoading(false);
		}
	};

	const mapStudentsForTable = (students: Array<SessionUser>) => {
		const data: string[][] = [];
		students.forEach((item) => {
			data.push([item.name, item.email]);
		});
		return data;
	};

	const handleTableAction = (index: number, action: Action, row: React.ReactNode[] = []) => {
		switch (action) {
			case Action.Delete:
				setStudentList(studentList.filter((student) => student.name !== row[0]));
				break;
			case Action.DeleteAll:
				setStudentList([]);
				break;
		}
	};

	return (
		<Container fluid>
			<LoadingContainer loading={loading}>
				<Row className="section">
					<LabSessionData
						practiceInfo={labPracticeInfo}
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
							data={mapStudentsForTable(studentList)}
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
						<Button loading={loading} onClick={createLabSession}>
							Guardar
						</Button>
					</Col>
				</Row>
			</LoadingContainer>
		</Container>
	);
};
export default LabSessionProgrammingView;
