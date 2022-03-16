import React, {useContext, useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

import {LabSemesterData, EmailsInputWithTable} from '../../components/LabSemester/index';
import {Button, LoadingContainer} from '../../components/UI';
import {
	useGetLaboratoryQuery,
	useCreateLabSemesterMutation,
	useSendEmailMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {LabSemester, Laboratory, Params, ErrorIdentifier, LocationStateCreation} from './types';

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

const LabSemesterCreation: React.FC<unknown> = () => {
	const navigate = useNavigate();

	const [labSemester, setLabSemester] = useState<LabSemester>(initialLabSemester);
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<ErrorIdentifier[]>([]);

	const location = useLocation();
	const laboratoryID = (location.state as LocationStateCreation)?.laboratoryID;
	const {data: laboratoryData, loading: loadingLaboratoryData} = useGetLaboratoryQuery({variables: {id: laboratoryID}});
	const [laboratory, setLaboratory] = useState<Laboratory>(initialLaboratory);

	const [createLabSemester] = useCreateLabSemesterMutation();
	const [sendEmail] = useSendEmailMutation();

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	useEffect(() => {
		if (laboratoryData?.getLaboratory != null) {
			const lab = laboratoryData.getLaboratory;
			setLaboratory({id: lab.id, name: lab.name});
		}
		setLoading(loadingLaboratoryData);
	}, [laboratoryData]);

	const onStudentEmailHandleChange = (emails: Array<string>) => {
		setLabSemester({...labSemester, studentEmailList: emails});
	};

	const onMonitorsEmailHandleChange = (emails: Array<string>) => {
		setLabSemester({...labSemester, monitorEmailList: emails});
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

	const createLaboratorySemester = async () => {
		const hasError = checkErrorMessage();

		if (!hasError) {
			setLoading(true);

			try {
				const {data: labPracticeData} = await createLabSemester({
					variables: {
						input: {
							laboratoryID,
							semesterName: labSemester.semesterName,
							description: labSemester.description,
							professor: labSemester.professor,
							studentEmailList: JSON.stringify(labSemester.studentEmailList),
							monitorEmailList: JSON.stringify(labSemester.monitorEmailList),
							createdBy: '1'
						}
					}
				});

				if (!labPracticeData?.createLabSemester?.id) {
					throw Error('Error insertando Lab Semester');
				} else {
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
					});
				}

				showSuccessBanner(`El semestre de laboratorio ${labSemester.semesterName} fue creado exitosamente`);
				setLabSemester(initialLabSemester);
			} catch (error) {
				showErrorBanner(`Error en la creación del semestre de laboratorio ${labSemester.semesterName}`);
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
					<h3 className="title">Creación de Semestre de laboratorio de {laboratory.name}</h3>
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
