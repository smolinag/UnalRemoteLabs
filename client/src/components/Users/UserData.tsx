import React, {useState, useEffect} from 'react';

import {Params, User, ErrorIdentifier, Role} from '../../containers/Users/types';
import {Input} from '../UI';
import {OrganizationSelector, UserTypeSelector} from './index';
import classes from './shared.module.scss';

interface Props {
	userValue: User;
	handleChange: (user: User) => void;
	errors: ErrorIdentifier[];
	organizationDisabled?: boolean;
	userTypeDisabled?: boolean;
}
const initialUser: User = {
	id: '',
	organizationID: '',
	name: '',
	identificationNumber: '',
	email: '',
	role: Role.Students
};

const UserData: React.FC<Props> = ({
	userValue,
	handleChange,
	errors,
	organizationDisabled = false,
	userTypeDisabled = false
}) => {
	const [user, setUser] = useState<User>(initialUser);

	useEffect(() => {
		setUser(userValue);
	}, [userValue]);

	const checkErrorMessage = (parameter: string): boolean => {
		let message = false;
		errors.map((error) => {
			if (error.identifier === parameter) {
				message = true;
			}
		});

		return message;
	};

	const handleOnSelectOrganization = (id: string, value: string) => {
		const newState = {...user, organizationID: id};
		setUser(newState);
		handleChange(newState);
	};

	const handleOnSelectUserType = (id: string, value: string, role: Role) => {
		const newState = {...user, role};
		setUser(newState);
		handleChange(newState);
	};

	const onValueChange = (value: string, id: string) => {
		let newState = null;

		switch (id) {
			case Params.Name:
				newState = {...user, name: value};
				break;
			case Params.IdentificationNumber:
				newState = {...user, identificationNumber: value};
				break;
			case Params.Email:
				newState = {...user, email: value};
				break;
			case Params.Phone:
				newState = {...user, phone: value};
				break;
			default:
				return user;
		}
		setUser(newState);
		handleChange(newState);
	};

	return (
		<>
			<div className={classes.options}>
				<OrganizationSelector
					value={user.organizationID}
					onSelect={handleOnSelectOrganization}
					disabled={organizationDisabled}
				/>
				<UserTypeSelector value={user.role} onSelect={handleOnSelectUserType} disabled={userTypeDisabled} />
				<Input
					type="text"
					placeholder="Nombre"
					value={user.name ?? ''}
					onValueChange={(value) => onValueChange(value, Params.Name)}
				/>
				<Input
					type="text"
					placeholder="Numero de identificación"
					value={user.identificationNumber ?? ''}
					onValueChange={(value) => onValueChange(value, Params.IdentificationNumber)}
				/>
				<Input
					type="text"
					placeholder="Email"
					required
					value={user.email ?? ''}
					onValueChange={(value) => onValueChange(value, Params.Email)}
					error={checkErrorMessage(Params.Email)}
				/>
				<Input
					type="text"
					placeholder="Telefono"
					value={user.phone ?? ''}
					onValueChange={(value) => onValueChange(value, Params.Phone)}
				/>
			</div>
		</>
	);
};

export default UserData;
