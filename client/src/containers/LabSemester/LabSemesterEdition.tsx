import React, {useContext, useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

import {LabSemesterData, EmailsInputWithTable} from '../../components/LabSemester/index';
import {Button, LoadingContainer} from '../../components/UI';
import {
	useGetLaboratoryQuery,
	useGetLabSemesterQuery,
	useUpdateLabSemesterMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {LabSemester, Laboratory, Params, ErrorIdentifier, LocationStateEdition} from './types';

const initialLabSemester: LabSemester = {
	semesterName: '',
	description: null,
	professor: '',
	monitorEmailList: [],
	studentEmailList: []
};

const initialLaboratory: Laboratory = {
	name: null
};

const LabSemesterEdition: React.FC = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<ErrorIdentifier[]>([]);

	const [laboratory, setLaboratory] = useState<Laboratory>(initialLaboratory);
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

	const [updateLabSemester] = useUpdateLabSemesterMutation();

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	useEffect(() => {
		if (laboratoryData?.getLaboratory != null) {
			const lab = laboratoryData.getLaboratory;
			setLaboratory({id: lab.id, name: lab.name});
		}
		setLoading(loadingLaboratoryData);
	}, [laboratoryData]);

	useEffect(() => {
		if (labSemesterData?.getLabSemester != null) {
			const labSemester = labSemesterData.getLabSemester;
			setLabSemester({
				id: labSemester.id,
				semesterName: labSemester.semesterName,
				description: labSemester.description ? labSemester.description : null,
				professor: labSemester.professor,
				monitorEmailList: JSON.parse(labSemester.monitorEmailList),
				studentEmailList: JSON.parse(labSemester.studentEmailList),
				version: labSemester._version,
				deleted: labSemester._deleted
			});
		}
		setLoading(loadingLabSemesterData);
	}, [labSemesterData]);

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
							professor: labSemester.professor,
							monitorEmailList: JSON.stringify(labSemester.monitorEmailList),
							studentEmailList: JSON.stringify(labSemester.studentEmailList),
							laboratoryID: labSemester.laboratoryID,
							_version: labSemester.version
						}
					}
				});

				if (!labPracticeData?.updateLabSemester?.id) {
					throw Error('Error actualizando Lab Semester');
				}

				showSuccessBanner(`El semestre de laboratorio ${labSemester.semesterName} fue actualizado exitosamente`);
				setLabSemester(initialLabSemester);
			} catch (error) {
				console.error(error);
				showErrorBanner(`Error en la actualización del semestre de laboratorio ${labSemester.semesterName}`);
			} finally {
				setLoading(false);
				navigate('/lab-semesters', {state: {laboratoryID}});
			}
		}
	};

	return (
		<Container fluid>
			<LoadingContainer loading={loading}>
				<Row className="section">
					<h3 className="title">Edición de Semestre de laboratorio de {laboratory.name}</h3>
					<LabSemesterData labSemesterValue={labSemester} handleChange={onLabSemesterChange} errors={errors} />
				</Row>
				<Row className="section">
					<h3 className="title">Monitores</h3>
					<EmailsInputWithTable emails={labSemester.monitorEmailList} onHandleChange={onMonitorsEmailHandleChange} />
				</Row>
				<Row className="section">
					<h3 className="title">Estudiantes</h3>
					<EmailsInputWithTable emails={labSemester.studentEmailList} onHandleChange={onStudentEmailHandleChange} />
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
