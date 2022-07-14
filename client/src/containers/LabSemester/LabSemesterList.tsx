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
	useSendEmailMutation,
	useListUserLabSemestersByUserIdQuery
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
	const {group} = useAuthContext();

	const laboratoryID = (location.state as LocationStateList)?.laboratoryID;
	const userID: string = (location.state as LocationStateList)?.userId;

	const [loading, setLoading] = useState<boolean>(true);
	const [displayModal, setDisplayModal] = useState<boolean>(false);
	const [labSemesters, setLabSemesters] = useState<Array<LabSemester>>([]);
	const [laboratory, setLaboratory] = useState<Laboratory>();

	const {refetch: getLabSemestersByUserId} = useListUserLabSemestersByUserIdQuery({
		skip: true,
		notifyOnNetworkStatusChange: true
	});

	const {refetch: getLaboratoryById} = useGetLaboratoryQuery({
		skip: true,
		notifyOnNetworkStatusChange: true
	});

	const {refetch: getLabSemestersByLaboratoryId} = useListLabSemestersByLaboratoryIdQuery({
		skip: true,
		notifyOnNetworkStatusChange: true
	});

	const aGetLabSemetersUsersByUserId = async (userID: string) => {
		const {data} = await getLabSemestersByUserId({
			userID
		});
		if (data && data.listUserLabSemesters?.items) {
			const labsList: Array<LabSemester> = data.listUserLabSemesters?.items
				.filter((obj) => obj && !obj._deleted)
				.map((obj) => {
					const labSemester = obj?.labsemester;
					return {
						id: labSemester ? labSemester.id : '',
						semesterName: labSemester?.semesterName ? labSemester.semesterName : '',
						description: labSemester?.description ? labSemester.description : null,
						professorEmailList: new Array(1).fill(labSemester?.professor ? labSemester.professor : ''),
						monitorEmailList: labSemester?.monitorEmailList ? labSemester.monitorEmailList : [],
						studentEmailList: labSemester?.studentEmailList ? labSemester.studentEmailList : [],
						version: labSemester?._version ? labSemester._version : null,
						deleted: labSemester?._deleted ? labSemester._deleted : null,
						laboratoryID: labSemester?.Laboratory?.id ? labSemester?.Laboratory.id : '',
						laboratory: labSemester?.Laboratory?.name ? labSemester?.Laboratory.name : ''
					};
				});
			setLabSemesters(labsList);
		}
	};

	const aGetLabSemestersByLaboratoryId = async (laboratoryID: string) => {
		const {data} = await getLabSemestersByLaboratoryId({laboratoryID});
		if (data && data.listLabSemesters?.items) {
			const labsList: Array<LabSemester> = data.listLabSemesters?.items
				.filter((obj) => obj && !obj._deleted)
				.map((obj) => {
					return {
						id: obj ? obj.id : '',
						semesterName: obj?.semesterName ? obj.semesterName : '',
						description: obj?.description ? obj.description : null,
						professorEmailList: new Array(1).fill(obj?.professor ? obj.professor : ''),
						monitorEmailList: obj?.monitorEmailList ? obj.monitorEmailList : [],
						studentEmailList: obj?.studentEmailList ? obj.studentEmailList : [],
						version: obj?._version ? obj._version : null,
						deleted: obj?._deleted ? obj._deleted : null,
						laboratoryID: obj?.laboratoryID ? obj?.laboratoryID : ''
					};
				});
			setLabSemesters(labsList);
		}
	};

	const aGetLaboratoryById = async (id: string) => {
		const {data} = await getLaboratoryById({id});
		if (data && data?.getLaboratory != null) {
			const lab = data.getLaboratory;
			setLaboratory({id: lab.id, name: lab.name, organizationID: lab.organizationID});
		}
	};

	useEffect(() => {
		// TODO Cuando se hace refresh el grupo viene ''
		console.log(group);
		if (
			(userID && group === Groups.StudentsGroup) ||
			group === Groups.MonitorsGroup ||
			group === Groups.ProfessorsGroup
		) {
			aGetLabSemetersUsersByUserId(userID);
		} else if (laboratoryID && group === Groups.AdminsGroup) {
			aGetLaboratoryById(laboratoryID);
			aGetLabSemestersByLaboratoryId(laboratoryID);
		}
		setLoading(false);
	}, []);

	const [labSemesterToDelete, setLabSemesterToDelete] = useState<LabSemester>(initialLabSemester);
	const [deleteLabSemester] = useDeleteLabSemesterMutation();
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);
	const [sendEmail] = useSendEmailMutation();

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

					const labSemester = labSemesters.filter((labSemester) => labSemester.id === labSemesterToDelete?.id)[0];

					await sendEmail({
						variables: {
							input: {
								topic: `Eliminación del semestre ${labSemesterToDelete?.semesterName}`,
								emailList: labSemester.studentEmailList.toString(),
								message: `Estimado usuario\n\nEl sistema de Laboratorios remotos de la Universidad Nacional de Colombia le informa que se ha eliminado el semestre: ${labSemesterToDelete?.semesterName}.`
							}
						}
					});
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
			<Row className="section">
				<h3 className="title">Semestres{laboratoryID ? ` de Laboratorio ${laboratory?.name}` : ''}</h3>
			</Row>
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
