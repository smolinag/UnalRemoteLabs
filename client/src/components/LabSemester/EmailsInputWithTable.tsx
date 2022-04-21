import React, {useState, useEffect} from 'react';
import {Col, Row} from 'react-bootstrap';

import EmailsInput from '../../components/LabSemester/EmailsInput';
import {isEmail} from '../../generalUtils/EmailUtils';
import {Table} from '../UI';
import {Action} from '../UI/Table/Table';
import classes from './shared.module.scss';

interface Props {
	emails: Array<string>;
	onHandleChange: (emails: Array<string>) => void;
}

const EmailsInputWithTable: React.FC<Props> = ({emails, onHandleChange}) => {
	const [emailList, setEmailList] = useState<Array<string>>([]);
	const [emailsValue, setEmailsValue] = useState<string>('');
	const [emailError, setEmailError] = useState<string | null>(null);

	useEffect(() => {
		setEmailList(emails);
	}, [emails]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (['Tab', 'Enter', ',', ';'].includes(e.key)) {
			e.preventDefault();
			const email: string = emailsValue.trim();
			if (email && isValid(email)) {
				const newEmails = [...emailList, email];
				setEmailList(newEmails);
				onHandleChange(newEmails);
				setEmailsValue('');
			}
		}
	};

	const handleOnClick = () => {
		const email: string = emailsValue.trim();
		if (email && isValid(email)) {
			const newEmails = [...emailList, email];
			setEmailList(newEmails);
			onHandleChange(newEmails);
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
			const newEmails = [...emailList, ...toBeAdded];
			setEmailList(newEmails);
			onHandleChange(newEmails);
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

	const isInList = (email: string) => {
		return emailList.includes(email);
	};

	return (
		<>
			<Row>
				<EmailsInput
					value={emailsValue}
					error={emailError}
					handleKeyDown={handleKeyDown}
					handlePaste={handlePaste}
					handleEmailChange={handleEmailChange}
					handleOnClick={handleOnClick}
				/>
			</Row>
			<Row>
				<Col sm={8} className={classes.table}>
					{emailList.length > 0 && (
						<Table
							headers={['']}
							data={mapEmails(emailList)}
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
		</>
	);
};
export default EmailsInputWithTable;
