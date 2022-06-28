import React, {useState, useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';

import EmailsInput from '../../components/LabSemester/EmailsInput';
import {UserType} from '../../containers/Users/types';
import {isEmail} from '../../generalUtils/EmailUtils';
import {Groups} from '../../generalUtils/groups';
import {useGetUserByEmailQuery, Role} from '../../graphql/generated/schema';
import {useAuthContext} from '../../GroupProvider';
import {Table} from '../UI';
import {Action} from '../UI/Table/Table';
import classes from './shared.module.scss';

interface Props {
	emails: Array<string>;
	maxEmails?: number;
	role: Role;
	onHandleChange: (emails: Array<string>) => void;
	setLoading?: (isLoading: boolean) => void;
	students?: boolean;
}

const USER_TYPES: UserType[] = [
	{id: '0', value: 'Profesores', role: Role.Professors},
	{id: '1', value: 'Monitores', role: Role.Monitors},
	{id: '2', value: 'Estudiantes', role: Role.Students}
];

const EmailsInputWithTable: React.FC<Props> = ({emails, maxEmails, role, onHandleChange, setLoading, students}) => {
	const {group} = useAuthContext();
	const [emailList, setEmailList] = useState<Array<string>>([]);
	const [emailsValue, setEmailsValue] = useState<string>('');
	const [emailError, setEmailError] = useState<string | null>(null);

	const {refetch: getUserByEmail} = useGetUserByEmailQuery({skip: true, notifyOnNetworkStatusChange: true});

	useEffect(() => {
		setEmailList(emails);
	}, [emails]);

	const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (['Tab', 'Enter', ',', ';'].includes(e.key)) {
			e.preventDefault();
			const email: string = emailsValue.trim();
			const valid = await isValid(email);
			if (email && valid) {
				const newEmails = [...emailList, email];
				setEmailList(newEmails);
				onHandleChange(newEmails);
				setEmailsValue('');
			}
		}
	};

	const handleOnClick = async () => {
		const email: string = emailsValue.trim();
		const valid = await isValid(email);
		if (email && valid) {
			const newEmails = [...emailList, email];
			setEmailList(newEmails);
			onHandleChange(newEmails);
			setEmailsValue('');
		}
	};

	const handlePaste = async (evt: React.ClipboardEvent<HTMLInputElement>) => {
		evt.preventDefault();

		const paste: string = evt.clipboardData.getData('text');
		/* eslint-disable no-useless-escape */
		const incomingEmails: string[] | null = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

		if (incomingEmails) {
			const newEmails = [...emailList];
			for (const email of incomingEmails) {
				const valid = await isValid(email);
				if (email && valid) {
					newEmails.push(email);
				}
			}

			setEmailList(newEmails);
			onHandleChange(newEmails);
			setEmailsValue('');
		}
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
				setEmailList(emailList.filter((email) => email !== row[0]));
				onHandleChange(emailList.filter((email) => email !== row[0]));
				break;
			case Action.DeleteAll:
				setEmailError(null);
				setEmailList([]);
				onHandleChange([]);
				break;
		}
	};

	const isValid = async (email: string) => {
		let error = null;
		if (!isEmail(email)) {
			error = `${email} no es un correo válido.`;
		}
		if (isInList(email)) {
			error = `${email} ya ha sido agregado.`;
		}

		if (setLoading) setLoading(true);
		const {roleMatch, userRole} = await doesRoleMatch(email).finally(() => {
			if (setLoading) setLoading(false);
		});
		if (!roleMatch) {
			error = `El correo ${email} ya existe en el sistema y corresponde a un usuario con rol ${getUserTypeValue(
				userRole ?? Role.Students
			)}`;
		}
		if (maxEmails !== undefined && emails.length >= maxEmails) {
			error = `El numero máximo de correos que se puede ingresar es ${maxEmails}`;
		}

		if (error) {
			setEmailError(error);
			return false;
		}

		return true;
	};

	const getUserTypeValue = (role: Role) => {
		const userType = USER_TYPES.find((obj) => obj.role === role);
		return userType?.value;
	};

	const doesRoleMatch = async (email: string) => {
		let roleMatch = true;
		let userRole = null;

		const {data} = await getUserByEmail({
			email
		});
		if (data?.getUserByEmail) {
			const items = data?.getUserByEmail?.items?.filter((item) => item !== null && item._deleted !== true);
			if (items.length > 0) {
				if (items[0]?.role !== role) {
					userRole = items[0]?.role;
					roleMatch = false;
				}
			}
		}

		return {roleMatch, userRole};
	};

	const isInList = (email: string) => {
		return emailList.includes(email);
	};

	return (
		<>
			<Row>
				{students && (group === Groups.AdminsGroup || group === Groups.ProfessorsGroup || group === Groups.MonitorsGroup) ? (
					<EmailsInput
						value={emailsValue}
						error={emailError}
						handleKeyDown={handleKeyDown}
						handlePaste={handlePaste}
						handleEmailChange={handleEmailChange}
						handleOnClick={handleOnClick}
					/>
				) : null}
			</Row>
			<Row>
				<Col sm={8} className={classes.table}>
					{emailList.length > 0 && (
						<Table
							headers={['']}
							data={mapEmails(emailList)}
							onAction={handleTableAction}
							removable={group === Groups.AdminsGroup}
							hasRemoveAll
							overflow
							stickyHeader
							maxHeight={'400px'}
						/>
					)}
				</Col>
			</Row>
		</>
	);
};
export default EmailsInputWithTable;
