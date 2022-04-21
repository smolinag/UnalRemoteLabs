import React, {useEffect} from 'react';

import {Option} from '../../containers/Users/types';
import {useListOrganizationsQuery} from '../../graphql/generated/schema';
import {DropdownComponent} from '../UI';

interface Props {
	value?: string;
	onSelect?: (id: string, value: string) => void;
	disabled?: boolean;
}

const intial_org = {
	id: 'd80b954b-9477-4061-aa8a-c14c5711143b',
	value: 'Unal Manizales'
};

const OrganizationSelector: React.FC<Props> = ({value, onSelect, disabled}) => {
	const [selectedOrganizationId, setSelectedOrganizationId] = React.useState<string>(value ?? intial_org.id);
	const [organizations, setOrganizations] = React.useState<Option[]>([]);
	const {data: organizationsInfo} = useListOrganizationsQuery();

	useEffect(() => {
		if (value) setSelectedOrganizationId(value);
	}, [value]);

	useEffect(() => {
		if (organizationsInfo?.listOrganizations != null) {
			const organizationsList = organizationsInfo.listOrganizations.items.map((obj) => {
				return {
					id: obj ? obj.id : '',
					value: obj ? obj.name : ''
				};
			});
			setOrganizations(organizationsList);
		}
	}, [organizationsInfo]);

	const handleOnValueChange = (value: string, id: string) => {
		setSelectedOrganizationId(id);
		if (onSelect) onSelect(id, value);
	};

	const getValue = (id: string) => {
		const organization = organizations.find((obj) => obj.id === id);
		return organization?.value;
	};

	return (
		<DropdownComponent
			text="Sede"
			options={organizations}
			onValueChange={(value, id) => {
				handleOnValueChange(value, id);
			}}
			value={getValue(selectedOrganizationId) ?? ''}
			disabled={disabled}
		/>
	);
};
export default OrganizationSelector;
