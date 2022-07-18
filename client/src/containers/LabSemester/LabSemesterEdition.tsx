import React, {useContext, useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

import {LabSemesterData, EmailsInputWithTable} from '../../components/LabSemester/index';
import {Button, LoadingContainer} from '../../components/UI';
import {Groups} from '../../generalUtils/groups';
import {validateGroupFunction} from '../../generalUtils/ValidateGroup';
import {
	useGetLaboratoryQuery,
	useGetLabSemesterQuery,
	useUpdateLabSemesterMutation,
	useListUserLabSemestersBySemesterIdQuery,
	useDeleteUserLabSemesterMutation,
	useCreateUserLabSemesterMutation,
	useCreateUserMutation,
	useGetUserByEmailQuery,
	ListUserLabSemestersBySemesterIdQuery
} from '../../graphql/generated/schema';
import {useAuthContext} from '../../GroupProvider';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {Role} from '../Users/types';
import {LabSemester, Params, ErrorIdentifier, LocationStateEdition} from './types';

const initialLabSemester: LabSemester = {
	semesterName: '',
	description: null,
	professorEmailList: [],
	monitorEmailList: [],
	studentEmailList: [],
	laboratoryID: '',
	laboratoryName: '',
	laboratoryOrganizationId: ''
};

const LabSemesterEdition: React.FC = () => {
	const {group} = useAuthContext();
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<ErrorIdentifier[]>([]);

	const [labSemester, setLabSemester] = useState<LabSemester>(initialLabSemester);

	const location = useLocation();
	const labSemesterID = (location.state as LocationStateEdition)?.labSemesterID;
	const {data: labSemesterData, loading: loadingLabSemesterData} = useGetLabSemesterQuery({
		variables: {id: labSemesterID}
	});

	const laboratoryID = labSemesterData?.getLabSemester?.laboratoryID
		? labSemesterData?.getLabSemester?.laboratoryID
		: '';

	const {data: laboratoryData, loading: loadingLaboratoryData} = useGetLaboratoryQuery({
		variables: {id: laboratoryID}
	});

	const {
		data: userLabSemesterData,
		loading: loadingUserLabSemesterData,
		refetch: getUserLabSemesterBySemesterId
	} = useListUserLabSemestersBySemesterIdQuery({
		fetchPolicy: 'network-only',
		variables: {semesterID: labSemesterID}
	});

	const [updateLabSemester] = useUpdateLabSemesterMutation();

	const [createUser] = useCreateUserMutation();
	const [createUserLabSemester] = useCreateUserLabSemesterMutation();
	const {refetch: getUserByEmail} = useGetUserByEmailQuery({skip: true, fetchPolicy: 'network-only'});
	const [deleteUserLabSemester] = useDeleteUserLabSemesterMutation();

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	useEffect(() => {
		if (labSemesterData?.getLabSemester != null) {
			const labSemester = labSemesterData.getLabSemester;

			setLabSemester((prevState) => ({
				...prevState,
				id: labSemester.id,
				semesterName: labSemester.semesterName,
				description: labSemester.description ? labSemester.description : null,
				version: labSemester._version,
				deleted: labSemester._deleted
			}));
		}
		setLoading(loadingLabSemesterData);
	}, [labSemesterData]);

	useEffect(() => {
		if (laboratoryData && laboratoryData?.getLaboratory != null) {
			const lab = laboratoryData.getLaboratory;
			setLabSemester((prevState) => ({
				...prevState,
				laboratoryID: lab.id,
				laboratoryName: lab.name,
				laboratoryOrganizationId: lab.organizationID
			}));
		}
		setLoading(loadingLaboratoryData);
	}, [laboratoryData]);

	useEffect(() => {
		if (userLabSemesterData && userLabSemesterData?.listUserLabSemesters != null) {
			const professorEmailList = getEmailListByRole(userLabSemesterData, Role.Professors);
			const monitorEmailList = getEmailListByRole(userLabSemesterData, Role.Monitors);
			const studentEmailList = getEmailListByRole(userLabSemesterData, Role.Students);

			setLabSemester((prevState) => ({
				...prevState,
				professorEmailList,
				monitorEmailList,
				studentEmailList
			}));
		}
		setLoading(loadingUserLabSemesterData);
	}, [userLabSemesterData]);

	const onProfessorsEmailHandleChange = (emails: Array<string>) => {
		setLabSemester({...labSemester, professorEmailList: emails});
	};

	const onMonitorsEmailHandleChange = (emails: Array<string>) => {
		setLabSemester({...labSemester, monitorEmailList: emails});
	};

	const onStudentEmailHandleChange = (emails: Array<string>) => {
		setLabSemester({...labSemester, studentEmailList: emails});
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

	const deleteLabSemesterUser = async (id: string, version: number) => {
		if (id !== undefined && id !== null && id !== '') {
			await deleteUserLabSemester({
				variables: {
					input: {
						id: id,
						_version: version
					}
				}
			});
		}
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
							organizationID: labSemester.laboratoryOrganizationId ?? '',
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

	const updateLabSemesterUsers = async (
		labsemesterID: string,
		proffesorEmailList: Array<string>,
		studentEmailList: Array<string>,
		monitorEmailList: Array<string>
	) => {
		const {data: userLabSemester} = await getUserLabSemesterBySemesterId({
			semesterID: labsemesterID
		});

		if (proffesorEmailList !== undefined && proffesorEmailList != null) {
			const {emailsToAdd, userLabSemestersToDelete} = getRecordsToUpdate(
				userLabSemester,
				proffesorEmailList,
				Role.Professors
			);
			emailsToAdd.forEach(async (email) => {
				if (email) await createLabSemesterUser(email, Role.Professors, labsemesterID);
			});
			userLabSemestersToDelete?.forEach(async (obj) => {
				if (obj && obj.id && obj._version) await deleteLabSemesterUser(obj?.id, obj?._version);
			});
		}
		if (monitorEmailList !== undefined && monitorEmailList != null) {
			const {emailsToAdd, userLabSemestersToDelete} = getRecordsToUpdate(
				userLabSemester,
				monitorEmailList,
				Role.Monitors
			);
			emailsToAdd.forEach(async (email) => {
				if (email) await createLabSemesterUser(email, Role.Monitors, labsemesterID);
			});
			userLabSemestersToDelete?.forEach(async (obj) => {
				if (obj && obj.id && obj._version) await deleteLabSemesterUser(obj?.id, obj?._version);
			});
		}
		if (studentEmailList !== undefined && studentEmailList != null) {
			const {emailsToAdd, userLabSemestersToDelete} = getRecordsToUpdate(
				userLabSemester,
				studentEmailList,
				Role.Students
			);
			emailsToAdd.forEach(async (email) => {
				if (email) await createLabSemesterUser(email, Role.Students, labsemesterID);
			});
			userLabSemestersToDelete?.forEach(async (obj) => {
				if (obj && obj.id && obj._version) await deleteLabSemesterUser(obj?.id, obj?._version);
			});
		}
	};

	const getRecordsToUpdate = (
		userLabSemester: ListUserLabSemestersBySemesterIdQuery,
		emailList: Array<string>,
		role: Role
	) => {
		const roleLabSemesterRecords = getRecordsByRole(userLabSemester, role);

		const currentEmails = roleLabSemesterRecords?.map((obj) => obj && obj?.user).map((obj) => obj && obj.email);
		const emailsToAdd = emailList.filter((email) => email && !currentEmails?.includes(email));
		const emailsToDelete = currentEmails?.filter((email) => email && !emailList.includes(email));

		const userLabSemestersToDelete = roleLabSemesterRecords?.filter(
			(obj) => obj && emailsToDelete?.includes(obj?.user.email)
		);
		return {emailsToAdd, userLabSemestersToDelete};
	};

	const getRecordsByRole = (userLabSemester: ListUserLabSemestersBySemesterIdQuery, role: Role) => {
		const userLabSemesterRecords = userLabSemester.listUserLabSemesters?.items?.filter(
			(userLabSemester) => userLabSemester && userLabSemester._deleted !== true
		);

		const userLabSemesterRecordsByRole = userLabSemesterRecords?.filter(
			(obj) => obj && obj._deleted !== true && obj.user.role === role
		);

		return userLabSemesterRecordsByRole;
	};

	const getEmailListByRole = (userLabSemester: ListUserLabSemestersBySemesterIdQuery, role: Role): Array<string> => {
		const userLabSemesterRecords = getRecordsByRole(userLabSemester, role);
		const emailList = userLabSemesterRecords?.map((obj) => obj?.user.email ?? '');
		return emailList ?? [];
	};

	const updateLaboratorySemester = async () => {
		const hasError = checkErrorMessage();

		if (!hasError) {
			setLoading(true);
			try {
				const {data: labPracticeData} = await updateLabSemester({
					variables: {
						input: {
							id: labSemester.id ? labSemester.id : '',
							semesterName: labSemester.semesterName,
							description: labSemester.description,
							laboratoryID: labSemester.laboratoryID,
							_version: labSemester.version
						}
					}
				}).catch((error) => {
					console.log(error)
					throw Error('Error updating Lab Semester');
				});

				if (labPracticeData?.updateLabSemester?.id) {
					await updateLabSemesterUsers(
						labSemester.id ?? '',
						labSemester.professorEmailList,
						labSemester.studentEmailList,
						labSemester.monitorEmailList
					).catch((error) => {
						throw Error('Error updating Lab Semester users');
					});
				}

				showSuccessBanner(`El semestre de laboratorio ${labSemester.semesterName} fue actualizado exitosamente`);
				setLabSemester(initialLabSemester);
			} catch (error) {
				console.error(error);
				showErrorBanner(`Error en la actualización del semestre de laboratorio ${labSemester.semesterName}`);
			} finally {
				setLoading(false);
				navigate('/lab-semesters', {state: {laboratoryID: labSemester.laboratoryID}});
			}
		}
	};

	return (
		<Container fluid>
			<LoadingContainer loading={loading}>
				<Row className="section">
					<h3 className="title">Edición de Semestre de laboratorio de {labSemester.laboratoryName}</h3>
					<LabSemesterData
						labSemesterValue={labSemester}
						handleChange={onLabSemesterChange}
						errors={errors}
						laboratories={[]}
						isLabSelectVisible={false}
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
						isEmailInputVisible={validateGroupFunction(
							[Groups.AdminsGroup, Groups.ProfessorsGroup, Groups.MonitorsGroup],
							group
						)}
						isRemovableEnabled={validateGroupFunction(
							[Groups.AdminsGroup, Groups.ProfessorsGroup, Groups.MonitorsGroup],
							group
						)}
					/>
				</Row>
				<Row className="section">
					<h3 className="title" />
					<Col className="justifyEnd">
						<Button loading={loading} onClick={updateLaboratorySemester}>
							Guardar
						</Button>
					</Col>
				</Row>
			</LoadingContainer>
		</Container>
	);
};

export default LabSemesterEdition;
