import React, {useContext, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

import EmailsInput from '../../components/LabSemesterCreation/EmailsInput';
import {LabSemesterData} from '../../components/LabSemesterCreation/index';
import {Button, LoadingContainer, Table} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {useGetLaboratoryQuery, useCreateLabSemesterMutation} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import classes from './LabSemesterCreationView.module.scss';
import {LabSemesterInfo, Params, ErrorIdentifier, LocationState} from './types';

const initialLabSemesterInfo: LabSemesterInfo = {
	laboratoryName: '',
	semesterName: '',
	semesterDescription: null
};

const LabSemesterCreationView: React.FC<unknown> = () => {
	const [labSemesterInfo, setLabSemesterInfo] = React.useState<LabSemesterInfo>(initialLabSemesterInfo);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [errors, setErrors] = React.useState<ErrorIdentifier[]>([]);

	const [emails, setEmails] = React.useState<Array<string>>([]);
	const [emailsValue, setEmailsValue] = React.useState<string>('');
	const [emailError, setEmailError] = React.useState<string | null>(null);

	const location = useLocation();
	const laboratoryId = (location.state as LocationState)?.laboratoryId;
	const {data: laboratory} = useGetLaboratoryQuery({variables: {id: laboratoryId}});

	const [createLabSemester] = useCreateLabSemesterMutation({});

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	useEffect(() => {
		if (laboratory?.getLaboratory != null) {
			const lab = laboratory.getLaboratory;
			setLabSemesterInfo({...labSemesterInfo, laboratoryName: lab.name});
		}
	}, [laboratory]);

	const onLabSemesterChange = (value: string, id: string) => {
		setLabSemesterInfo((previousState) => {
			switch (id) {
				case Params.Name:
					return {...previousState, semesterName: value};
				case Params.Description:
					return {...previousState, semesterDescription: value};

				default:
					return previousState;
			}
		});
	};

	const checkErrorMessage = () => {
		let hasError = false;

		if (labSemesterInfo.semesterName.length === 0) {
			hasError = true;
		}

		setErrors((previousState: ErrorIdentifier[]) => {
			const notAddedName = errors.filter((error) => error.identifier === Params.Name).length === 1;

			if (!notAddedName && labSemesterInfo.semesterName.length === 0) {
				previousState.push({
					identifier: Params.Name
				});
			} else if (notAddedName && labSemesterInfo.semesterName.length > 0) {
				const index = errors.findIndex((error) => error.identifier === Params.Name);
				return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
			}

			return [...previousState];
		});

		return hasError;
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (['Tab', 'Enter', ',', ';'].includes(e.key)) {
			e.preventDefault();
			const email: string = emailsValue.trim();
			if (email && isValid(email)) {
				const newEmails = [...emails, email];
				setEmails(newEmails);
				setEmailsValue('');
			}
		}
	};

	const handleOnClick = () => {
		const email: string = emailsValue.trim();
		if (email && isValid(email)) {
			const newEmails = [...emails, email];
			setEmails(newEmails);
			setEmailsValue('');
		}
	};

	const handlePaste = (evt: React.ClipboardEvent<HTMLInputElement>) => {
		evt.preventDefault();

		const paste: string = evt.clipboardData.getData('text');
		/* eslint-disable no-useless-escape */
		const incomingEmails: string[] | null = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

		if (incomingEmails) {
			const toBeAdded = incomingEmails.filter((email) => !isInList(email));
			const newEmails = [...emails, ...toBeAdded];
			setEmails(newEmails);
		}
	};

	const isValid = (email: string) => {
		let error = null;
		if (!isEmail(email)) {
			error = `${email} no es un correo válido.`;
		}
		if (isInList(email)) {
			error = `${email} ya ha sido agregado.`;
		}
		if (error) {
			setEmailError(error);
			return false;
		}
		return true;
	};

	const isEmail = (email: string) => {
		return /[\w\d.-]+@[\w\d.-]+\.[\w\d.-]+/.test(email);
	};

	const isInList = (email: string) => {
		return emails.includes(email);
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailsValue(e.target.value);
		setEmailError(null);
	};

	const mapEmails = (emails: Array<string>) => {
		const data: string[][] = [];
		emails.forEach((email) => {
			data.push([email]);
		});
		return data;
	};

	const handleTableAction = (index: number, action: Action, row: React.ReactNode[] = []) => {
		switch (action) {
			case Action.Delete:
				setEmailError(null);
				setEmails(emails.filter((email) => email !== row[0]));
				break;
			case Action.DeleteAll:
				setEmailError(null);
				setEmails([]);
				break;
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
							laboratoryID: laboratoryId,
							semesterName: labSemesterInfo.semesterName,
							emailUserList: JSON.stringify(emails),
							description: labSemesterInfo.semesterDescription,
							createdBy: '1'
						}
					}
				});

				if (!labPracticeData?.createLabSemester?.id) {
					throw Error('');
				}

				showSuccessBanner(`El semestre de laboratorio ${labSemesterInfo.semesterName} fue creado exitosamente`);
				setLabSemesterInfo({
					laboratoryName: labSemesterInfo.laboratoryName,
					semesterName: '',
					semesterDescription: null
				});
				setEmails([]);
			} catch (error) {
				showErrorBanner(`Error en la creación del semestre de laboratorio ${labSemesterInfo.semesterName}`);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<Container fluid>
			<LoadingContainer loading={loading}>
				<Row className="section">
					<LabSemesterData semesterInfo={labSemesterInfo} onValueChange={onLabSemesterChange} errors={errors} />
				</Row>
				<Row className="section">
					<h3 className="title">Estudiantes</h3>
					<Col className={classes.options}>
						<EmailsInput
							value={emailsValue}
							error={emailError}
							handleKeyDown={handleKeyDown}
							handlePaste={handlePaste}
							handleEmailChange={handleEmailChange}
							handleOnClick={handleOnClick}
						/>
					</Col>
				</Row>
				<br />
				<Row>
					<Col sm={8} className={classes.table}>
						{emails.length > 0 && (
							<Table
								headers={['']}
								data={mapEmails(emails)}
								onAction={handleTableAction}
								removable
								hasRemoveAll
								overflow
								stickyHeader
								maxHeight={'400px'}
							/>
						)}
					</Col>
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

export default LabSemesterCreationView;
