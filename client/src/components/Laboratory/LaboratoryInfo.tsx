import React from 'react';
import Row from 'react-bootstrap/Row';

import {Laboratory, Organization, Params} from '../../containers/Laboratory/types';
import classes from '../LabPracticeCreation/shared.module.scss';
import {DropdownComponent, Input} from '../UI';
import {Option} from '../UI/DropdownComponent/DropdownComponent';

interface Props {
	laboratory: Laboratory;
	organizations: Organization[];
	onValueChange: (value: string, id: string) => void;
	errors: string[];
}

const initialOrganization: Option = {id: '', value: 'Organización'};

const LaboratoryInfo: React.FC<Props> = ({onValueChange, laboratory, organizations, errors}) => {
	const [organization, setOrganization] = React.useState<Option>(initialOrganization);

	const checkErrorMessage = (parameter: string): boolean => {
		let message = false;
		errors.map((error) => {
			if (error === parameter) {
				message = true;
			}
		});

		return message;
	};

	React.useEffect(() => {
		if (laboratory.organizationId) {
			if (organizations.length > 0) {
				const org = organizations.filter((obj) => obj.id === laboratory.organizationId)[0];
				setOrganization({
					id: org.id,
					value: org.name
				});
			}
		}
	}, [laboratory.organizationId, organizations]);

	const handleSelectCommand = (value: string, id: string) => {
		setOrganization({value, id: id});
		onValueChange(id, Params.Organization);
	};

	return (
		<Row className="section">
			<h3 className="title">Información de la práctica de laboratorio</h3>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder="Nombre"
					required
					value={laboratory.name}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={(value) => onValueChange(value, Params.Name)}
					error={checkErrorMessage(Params.Name)}
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={laboratory.description ? laboratory.description : ''}
					onValueChange={(value) => onValueChange(value, Params.Description)}
				/>
				<DropdownComponent
					text="Organización"
					options={organizations.map((organization) => {
						return {value: organization.name, id: organization.id};
					})}
					onValueChange={(value, id) => {
						handleSelectCommand(value, id);
					}}
					value={organization.value}
					error={checkErrorMessage(Params.Organization)}
					required
				/>
			</div>
		</Row>
	);
};

export default LaboratoryInfo;
