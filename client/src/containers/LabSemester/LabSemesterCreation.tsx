import React, {useEffect, useContext, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

import {LabSemesterData, EmailsInputWithTable} from '../../components/LabSemester/index';
import {Button, LoadingContainer} from '../../components/UI';
import {Groups} from '../../generalUtils/groups';
import {validateGroupFunction} from '../../generalUtils/ValidateGroup';
import {
	useGetLaboratoryQuery,
	useCreateLabSemesterMutation,
	useSendEmailMutation,
	useCreateUserMutation,
	useCreateUserLabSemesterMutation,
	useGetUserByEmailQuery,
	useListLaboratoriesQuery
} from '../../graphql/generated/schema';
import {useAuthContext} from '../../GroupProvider';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {Role} from '../Users/types';
import {LabSemester, Laboratory, Params, ErrorIdentifier, LocationStateCreation} from './types';

const initialLabSemester: LabSemester = {
	semesterName: '',
	description: null,
	professorEmailList: [],
	monitorEmailList: [],
	studentEmailList: [],
	laboratoryId: '',
	laboratoryName: '',
	laboratoryOrganizationId: ''
};

const LabSemesterCreation: React.FC = () => {
	const {group, userEmail} = useAuthContext();
	const navigate = useNavigate();

	const [labSemester, setLabSemester] = useState<LabSemester>(initialLabSemester);
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<ErrorIdentifier[]>([]);
	const [laboratories, setLaboratories] = useState<Laboratory[]>([]);

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const location = useLocation();
	const laboratoryID = (location.state as LocationStateCreation)?.laboratoryID;
	const {data: laboratoryData, loading: loadingLaboratoryData} = useGetLaboratoryQuery({variables: {id: laboratoryID}});

	const {data: laboratoriesData, loading: loadingLaboratoriesData} = useListLaboratoriesQuery({
		fetchPolicy: 'network-only'
	});

	const [createUser] = useCreateUserMutation();
	const [createUserLabSemester] = useCreateUserLabSemesterMutation();
	const {refetch: getUserByEmail} = useGetUserByEmailQuery({skip: true, fetchPolicy: 'network-only'});

	useEffect(() => {
		if (group === Groups.AdminsGroup) {
			if (laboratoryData && laboratoryData?.getLaboratory != null) {
				const lab = laboratoryData.getLaboratory;
				setLabSemester({
					...labSemester,
					laboratoryId: lab.id,
					laboratoryName: lab.name,
					laboratoryOrganizationId: lab.organizationID
				});
			}
		} else if (group === Groups.ProfessorsGroup) {
			if (laboratoriesData && laboratoriesData.listLaboratorys?.items) {
				const labsList: Laboratory[] = laboratoriesData?.listLaboratorys?.items
					.filter((obj) => obj && !obj._deleted)
					.map((obj) => {
						return {
							id: obj != null ? obj.id : '',
							name: obj != null ? obj.name : '',
							organizationID: obj != null ? obj.organizationID : ''
						};
					});
				setLaboratories(labsList);
				if (labsList.length > 0) {
					setLabSemester({
						...labSemester,
						professorEmailList: [userEmail],
						laboratoryId: labsList[0].id ?? '',
						laboratoryName: labsList[0].name ?? ''
					});
				}
			}
		}
		setLoading(loadingLaboratoryData || loadingLaboratoriesData);
	}, [laboratoryData, laboratoriesData]);

	const [createLabSemester] = useCreateLabSemesterMutation();
	const [sendEmail] = useSendEmailMutation();

	const onStudentEmailHandleChange = (emails: Array<string>) => {
		setLabSemester({...labSemester, studentEmailList: emails});
	};

	const onMonitorsEmailHandleChange = (emails: Array<string>) => {
		setLabSemester({...labSemester, monitorEmailList: emails});
	};

	const onProfessorsEmailHandleChange = (emails: Array<string>) => {
		setLabSemester({...labSemester, professorEmailList: emails});
	};

	const onLabSemesterChange = (labSemester: LabSemester) => {
		setLabSemester(labSemester);
	};

	const checkErrorMessage = () => {
		let hasError = false;

		if (labSemester.semesterName.length === 0) {
			hasError = true;
		}

		setErrors((previousState: ErrorIdentifier[]) => {
			const notAddedName = errors.filter((error) => error.identifier === Params.Name).length === 1;

			if (!notAddedName && labSemester.semesterName.length === 0) {
				previousState.push({
					identifier: Params.Name
				});
			} else if (notAddedName && labSemester.semesterName.length > 0) {
				const index = errors.findIndex((error) => error.identifier === Params.Name);
				return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
			}

			return [...previousState];
		});

		return hasError;
	};

	const createLabSemesterUser = async (email: string, role: Role, labSemesterId: string) => {
		const {data} = await getUserByEmail({email});
		let userId;
		if (data?.getUserByEmail) {
			const items = data?.getUserByEmail?.items?.filter((item) => item !== null && item._deleted !== true);
			if (items.length > 0) {
				userId = items[0]?.id;
			} else {
				await createUser({
					variables: {
						input: {
							organizationID: labSemester.laboratoryOrganizationId ? labSemester.laboratoryOrganizationId : '',
							role: role,
							email,
							createdBy: '1',
							updatedBy: '1'
						}
					}
				})
					.then((ans) => {
						userId = ans.data?.createUser?.id;
					})
					.catch((error) => console.error(error));
			}

			if (userId !== undefined && userId !== null && userId !== '')
				await createUserLabSemester({
					variables: {
						input: {
							userID: userId ?? '',
							labsemesterID: labSemesterId
						}
					}
				}).catch((error) => console.error(error));
		}
	};

	const createLabSemesterUsers = async (
		labsemesterID: string,
		proffesorEmailList: Array<string>,
		studentEmailList: Array<string>,
		monitorEmailList: Array<string>
	) => {
		if (proffesorEmailList !== undefined && proffesorEmailList != null && proffesorEmailList.length > 0) {
			proffesorEmailList.forEach(async (email) => {
				await createLabSemesterUser(email, Role.Professors, labsemesterID);
			});
		}
		if (monitorEmailList !== undefined && monitorEmailList != null && monitorEmailList.length > 0) {
			monitorEmailList.forEach(async (email) => {
				await createLabSemesterUser(email, Role.Monitors, labsemesterID);
			});
		}
		if (studentEmailList !== undefined && studentEmailList != null && studentEmailList.length > 0) {
			studentEmailList.forEach(async (email) => {
				await createLabSemesterUser(email, Role.Students, labsemesterID);
			});
		}
	};

	const createLaboratorySemester = async () => {
		const hasError = checkErrorMessage();

		if (!hasError) {
			setLoading(true);

			try {
				const {data: labPracticeData} = await createLabSemester({
					variables: {
						input: {
							laboratoryID: labSemester.laboratoryId ? labSemester.laboratoryId : '',
							semesterName: labSemester.semesterName,
							description: labSemester.description,
							createdBy: '1'
						}
					}
				}).catch((error) => {
					throw Error('Error insertando Lab Semester');
				});

				if (labPracticeData?.createLabSemester?.id) {
					await createLabSemesterUsers(
						labPracticeData.createLabSemester.id,
						labSemester.professorEmailList,
						labSemester.studentEmailList,
						labSemester.monitorEmailList
					).catch((error) => {
						throw Error('Error insertando Lab Semester user');
					});

					if (
						labSemester.studentEmailList !== undefined &&
						labSemester.studentEmailList != null &&
						labSemester.studentEmailList.length > 0
					) {
						await sendEmail({
							variables: {
								input: {
									topic: 'Registro a semestre de laboratorio ' + labSemester.semesterName,
									emailList: JSON.stringify(labSemester.studentEmailList),
									message:
										'Estimado usuario\n\nEl sistema de Laboratorios remotos de la Universidad Nacional de Colombia le informa que usted ha sido registrado al nuevo semestre de laboratorio ' +
										labSemester.semesterName +
										'.\nPara ingresar use el siguiente link: www.laboratoriosremotos.com'
								}
							}
						}).catch((error) => {
							throw Error('Error sending email');
						});
					}
				}

				showSuccessBanner(`El semestre de laboratorio ${labSemester.semesterName} fue creado exitosamente`);
				setLabSemester(initialLabSemester);
			} catch (error) {
				console.error(error);
				showErrorBanner(`Error en la creación del semestre de laboratorio ${labSemester.semesterName}`);
			} finally {
				setLoading(false);
				console.log(labSemester.laboratoryId);
				navigate('/lab-semesters', {state: {laboratoryID: labSemester.laboratoryId}});
			}
		}
	};

	return (
		<Container fluid>
			<LoadingContainer loading={loading}>
				<Row className="section">
					<h3 className="title">{`Creación de Semestre de laboratorio de ${labSemester.laboratoryName}`}</h3>
					<LabSemesterData
						labSemesterValue={labSemester}
						handleChange={onLabSemesterChange}
						errors={errors}
						laboratories={laboratories}
						isLabSelectVisible={true}
					/>
				</Row>
				<Row className="section">
					<h3 className="title">Profesor</h3>
					<EmailsInputWithTable
						emails={labSemester.professorEmailList}
						onHandleChange={onProfessorsEmailHandleChange}
						maxEmails={1}
						role={Role.Professors}
						setLoading={setLoading}
						isEmailInputVisible={validateGroupFunction([Groups.AdminsGroup], group)}
						isRemovableEnabled={validateGroupFunction([Groups.AdminsGroup], group)}
					/>
				</Row>
				<Row className="section">
					<h3 className="title">Monitores</h3>
					<EmailsInputWithTable
						emails={labSemester.monitorEmailList}
						onHandleChange={onMonitorsEmailHandleChange}
						role={Role.Monitors}
						setLoading={setLoading}
						isEmailInputVisible={validateGroupFunction([Groups.AdminsGroup, Groups.ProfessorsGroup], group)}
						isRemovableEnabled={validateGroupFunction([Groups.AdminsGroup, Groups.ProfessorsGroup], group)}
					/>
				</Row>
				<Row className="section">
					<h3 className="title">Estudiantes</h3>
					<EmailsInputWithTable
						emails={labSemester.studentEmailList}
						onHandleChange={onStudentEmailHandleChange}
						role={Role.Students}
						setLoading={setLoading}
						isEmailInputVisible={validateGroupFunction([Groups.AdminsGroup, Groups.ProfessorsGroup], group)}
						isRemovableEnabled={validateGroupFunction([Groups.AdminsGroup, Groups.ProfessorsGroup], group)}
					/>
				</Row>
				<Row className="section">
					<h3 className="title" />
					<Col className="justifyEnd">
						<Button loading={loading} onClick={createLaboratorySemester}>
							Guardar
						</Button>
					</Col>
				</Row>
			</LoadingContainer>
		</Container>
	);
};

export default LabSemesterCreation;
