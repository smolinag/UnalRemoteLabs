import React, {useState, useContext, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import {useNavigate, useLocation} from 'react-router-dom';

import {LabSemesterTable} from '../../components/LabSemester';
import {Button, LoadingContainer, ModalComponent} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {Groups} from '../../generalUtils/groups';
import {ValidateGroupComponent} from '../../generalUtils/ValidateGroup';
import {
	useListLabSemestersByLaboratoryIdQuery,
	useDeleteLabSemesterMutation,
	useGetLaboratoryQuery,
	useListUserLabSemestersByUserIdQuery,
	useListUserLabSemestersBySemesterIdQuery,
	Role
} from '../../graphql/generated/schema';
import {useAuthContext} from '../../GroupProvider';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {LabSemester, Laboratory, LocationStateList} from './types';

const initialLabSemester: LabSemester = {
	id: '',
	semesterName: '',
	description: '',
	professorEmailList: [],
	monitorEmailList: [],
	studentEmailList: []
};

const LabSemesterList: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const {group, userId: userID} = useAuthContext();

	const laboratoryID = (location.state as LocationStateList)?.laboratoryID;

	const [loading, setLoading] = useState<boolean>(true);
	const [displayModal, setDisplayModal] = useState<boolean>(false);
	const [labSemesters, setLabSemesters] = useState<Array<LabSemester>>([]);
	const [laboratory, setLaboratory] = useState<Laboratory>();

	const {data: userLabSemesterByUserIdData, loading: loadingLabSemesterByUserIdData} =
		useListUserLabSemestersByUserIdQuery({
			variables: {userID: userID},
			fetchPolicy: 'network-only'
		});

	const {data: laboratoryByIdData, loading: loadingLaboratoryByIdData} = useGetLaboratoryQuery({
		variables: {id: laboratoryID},
		fetchPolicy: 'network-only'
	});

	const {data: labSemestersByLaboratoryIdData, loading: loadinglabSemestersByLaboratoryId} =
		useListLabSemestersByLaboratoryIdQuery({
			variables: {laboratoryID: laboratoryID},
			fetchPolicy: 'network-only'
		});

	useEffect(() => {
		(async () => {
			let labSemesterList: Array<LabSemester> = [];
			if (
				(userID && group === Groups.StudentsGroup) ||
				group === Groups.MonitorsGroup ||
				group === Groups.ProfessorsGroup
			) {
				if (userLabSemesterByUserIdData && userLabSemesterByUserIdData.listUserLabSemesters?.items) {
					labSemesterList = userLabSemesterByUserIdData.listUserLabSemesters?.items
						.filter((obj) => obj && !obj._deleted && !obj.labsemester._deleted)
						.map((obj) => {
							const labSemester = obj?.labsemester;
							return {
								id: labSemester ? labSemester.id : '',
								semesterName: labSemester?.semesterName ? labSemester.semesterName : '',
								description: labSemester?.description ? labSemester.description : null,
								professorEmailList: [],
								monitorEmailList: [],
								studentEmailList: [],
								version: labSemester?._version ? labSemester._version : null,
								deleted: labSemester?._deleted ? labSemester._deleted : null,
								laboratoryId: labSemester?.Laboratory?.id ? labSemester?.Laboratory.id : '',
								laboratoryName: labSemester?.Laboratory?.name ? labSemester?.Laboratory.name : ''
							};
						});
				}
			} else if (laboratoryID && group === Groups.AdminsGroup) {
				if (laboratoryByIdData && laboratoryByIdData?.getLaboratory != null) {
					const lab = laboratoryByIdData.getLaboratory;
					setLaboratory({id: lab.id, name: lab.name, organizationID: lab.organizationID});
				}

				if (labSemestersByLaboratoryIdData && labSemestersByLaboratoryIdData.listLabSemesters?.items) {
					labSemesterList = labSemestersByLaboratoryIdData.listLabSemesters?.items
						.filter((obj) => obj && !obj._deleted)
						.map((obj) => {
							return {
								id: obj ? obj.id : '',
								semesterName: obj?.semesterName ? obj.semesterName : '',
								description: obj?.description ? obj.description : null,
								professorEmailList: [],
								monitorEmailList: [],
								studentEmailList: [],
								version: obj?._version ? obj._version : null,
								deleted: obj?._deleted ? obj._deleted : null,
								laboratoryID: obj?.laboratoryID ? obj?.laboratoryID : ''
							};
						});
				}
			}
			// Add professors to the semester list
			const updateLabSemesters: Array<LabSemester> = [];
			for (const semester of labSemesterList) {
				const profesor = await getLabSemesterProffesor(semester.id ?? '');
				if (profesor != null) {
					updateLabSemesters.push({...semester, professorEmailList: [profesor]});
				} else {
					updateLabSemesters.push({...semester});
				}
			}
			setLabSemesters(updateLabSemesters);
			setLoading(loadingLabSemesterByUserIdData || loadingLaboratoryByIdData || loadinglabSemestersByLaboratoryId);
		})();
	}, [userLabSemesterByUserIdData, laboratoryByIdData, labSemestersByLaboratoryIdData]);

	const {refetch: getUserLabSemesterBySemesterId} = useListUserLabSemestersBySemesterIdQuery({
		fetchPolicy: 'network-only'
	});

	const getLabSemesterProffesor = async (labsemesterID: string) => {
		const {data: userLabSemester} = await getUserLabSemesterBySemesterId({
			semesterID: labsemesterID
		});
		const userLabSemesterRecords = userLabSemester.listUserLabSemesters?.items?.filter(
			(userLabSemester) => userLabSemester && userLabSemester._deleted !== true
		);

		const emailList = userLabSemesterRecords
			?.filter((obj) => obj && obj._deleted !== true && obj.user.role === Role.Professors)
			.map((obj) => obj?.user.email ?? '');

		let professor = null;
		if (emailList && emailList.length > 0) {
			professor = emailList[0];
		}

		return professor;
	};

	const [labSemesterToDelete, setLabSemesterToDelete] = useState<LabSemester>(initialLabSemester);
	const [deleteLabSemester] = useDeleteLabSemesterMutation();
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const handleLabSemesterAction = (index: number, action: Action) => {
		switch (action) {
			case Action.Edit:
				navigate('/lab-semester-edition', {state: {labSemesterID: labSemesters[index].id}});
				break;
			case Action.Delete:
				setDisplayModal(true);
				setLabSemesterToDelete(labSemesters[index]);
				break;
		}
	};

	const handleDisplayModal = (display: boolean) => {
		setDisplayModal(display);
		setLabSemesterToDelete(initialLabSemester);
	};

	const handleDelete = async () => {
		if (labSemesterToDelete && labSemesterToDelete?.id) {
			await deleteLabSemester({
				variables: {
					input: {
						id: labSemesterToDelete?.id,
						_version: labSemesterToDelete.version
					}
				}
			})
				.then(async (response) => {
					const deletedLabSemester = response.data?.deleteLabSemester;
					if (deletedLabSemester?._deleted) {
						setLabSemesters(labSemesters.filter((obj) => obj.id !== deletedLabSemester?.id));
					}
					setDisplayModal(false);
					showSuccessBanner(
						`El semestre de laboratorio ${deletedLabSemester?.semesterName} fue eliminado exitosamente`
					);
				})
				.catch((error) => {
					setDisplayModal(false);
					showErrorBanner(`No se pudo eliminar el semestre de laboratorio ${labSemesterToDelete.semesterName}`);
				});
		}
	};

	return (
		<LoadingContainer loading={loading}>
			<ModalComponent
				display={displayModal}
				onDisplay={handleDisplayModal}
				onSave={handleDelete}
				title={labSemesterToDelete?.semesterName ? labSemesterToDelete?.semesterName : ''}>
				<div>Está seguro de borrar el semestre de laboratorio {labSemesterToDelete?.semesterName}?</div>
			</ModalComponent>
			<ValidateGroupComponent groups={[Groups.AdminsGroup]}>
				<Row className="section">
					<h3 className="title">{`Semestres de Laboratorio ${laboratory?.name}`}</h3>{' '}
				</Row>
			</ValidateGroupComponent>
			<ValidateGroupComponent groups={[Groups.ProfessorsGroup, Groups.MonitorsGroup, Groups.StudentsGroup]}>
				<Row className="section">
					<h3 className="title">Semestres de Laboratorio</h3>{' '}
				</Row>
			</ValidateGroupComponent>

			<Row className="section">
				<LabSemesterTable data={labSemesters} onAction={handleLabSemesterAction} userId={userID} />
			</Row>
			<ValidateGroupComponent groups={[Groups.AdminsGroup, Groups.ProfessorsGroup]}>
				<Row className="section">
					<div className="justifyEnd">
						<Button loading={false} onClick={() => navigate('/lab-semester-creation', {state: {laboratoryID}})}>
							Crear
						</Button>
					</div>
				</Row>
			</ValidateGroupComponent>
		</LoadingContainer>
	);
};

export default LabSemesterList;
