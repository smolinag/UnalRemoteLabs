import React, {useState, useContext, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

import LabSessionData from '../../components/LabSessionProgramming/LabSessionData';
import {LoadingContainer, Button, Table} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {
	useCreateLabPracticeSessionMutation,
	useListUsersBySemesterQuery,
	useCreateUserLabPracticeSessionMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import classes from './LabSessionProgrammingView.module.scss';
import {LabSessionInfo, SessionUser} from './types';


const LabSessionProgrammingView: React.FC<unknown> = () => {

	const location = useLocation();
	const labSession = (location.state as LabSessionInfo);

	const [labSessionInfo, setSessionInfo] = useState<LabSessionInfo>(labSession);
	const [loading, setLoading] = useState<boolean>(false);
	const [studentList, setStudentList] = useState<SessionUser[]>([]);

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const [createLabPracticeSession] = useCreateLabPracticeSessionMutation({});
	const [createUserLabPracticeSession] = useCreateUserLabPracticeSessionMutation({});
	const {data: semesterUsers} = useListUsersBySemesterQuery({variables: {id: labSessionInfo.semesterId}});

	useEffect(() => {
		const semesterUserList = semesterUsers?.getLabSemester?.users?.items;
		if (semesterUserList) {
			const data = semesterUserList.map((item) => {
				return {name: item ? item.user.name : '', id: item ? item.user.id : '', email: item ? item.user.email : ''};
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
						labpracticeID: '1',
						labSemesterID: labSessionInfo.semesterId,
						description: labSessionInfo.description,
						startDate: labSessionInfo.startDate,
						endDate: new Date(labSessionInfo.startDate.getTime() + parseInt(labSessionInfo.duration) * 60000),
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
					}
				}
			}

			showSuccessBanner(`La sesión del laboratorio ${labSessionInfo.labPracticeName} fue creada exitosamente`);
		} catch (ex) {
			console.error(ex);
			showErrorBanner(`Error en la creación de la sesión del laboratorio ${labSessionInfo.labPracticeName}`);
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
