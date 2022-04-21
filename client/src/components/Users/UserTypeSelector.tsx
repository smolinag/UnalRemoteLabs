import React, {useEffect} from 'react';

import {Role, UserType} from '../../containers/Users/types';
import {DropdownComponent} from '../UI';

interface Props {
	value?: Role;
	onSelect?: (id: string, value: string, role: Role) => void;
	disabled?: boolean;
}

const USER_TYPES: UserType[] = [
	{id: '0', value: 'Profesores', role: Role.Professors},
	{id: '1', value: 'Monitores', role: Role.Monitors},
	{id: '2', value: 'Estudiantes', role: Role.Students}
];

const UserTypeSelector: React.FC<Props> = ({value, onSelect, disabled = false}) => {
	const [selectedRole, setSelectedRole] = React.useState<Role>(value ?? USER_TYPES[2].role);

	useEffect(() => {
		if (value) setSelectedRole(value);
	}, [value]);

	const handleOnValueChange = (value: string, id: string) => {
		const userType = USER_TYPES.filter((userType) => userType.id == id);
		const role = userType[0].role;
		setSelectedRole(role);
		if (onSelect) onSelect(id, value, role);
	};

	const getUserTypeValue = (role: Role) => {
		const userType = USER_TYPES.find((obj) => obj.role === role);
		return userType?.value;
	};

	return (
		<DropdownComponent
			text="Tipo de Usuario"
			options={USER_TYPES.map((userType) => {
				return {value: userType.value, id: userType.id};
			})}
			onValueChange={(value, id) => {
				handleOnValueChange(value, id);
			}}
			value={getUserTypeValue(selectedRole) ?? ''}
			disabled={disabled}
		/>
	);
};
export default UserTypeSelector;
