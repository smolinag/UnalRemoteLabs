import React, {useState, useEffect} from 'react';

import {Params, LabSemester, ErrorIdentifier, Laboratory} from '../../containers/LabSemester/types';
import {Groups} from '../../generalUtils/groups';
import {ValidateGroupComponent} from '../../generalUtils/ValidateGroup';
import {useAuthContext} from '../../GroupProvider';
import {DropdownComponent, Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	labSemesterValue: LabSemester;
	handleChange: (labSemester: LabSemester) => void;
	errors: ErrorIdentifier[];
	laboratories: Laboratory[];
}

const initialLabSemester: LabSemester = {
	semesterName: '',
	description: null,
	professorEmailList: [],
	monitorEmailList: [],
	studentEmailList: []
};

const LabSemesterData: React.FC<Props> = ({labSemesterValue, handleChange, errors, laboratories}) => {
	const {group} = useAuthContext();
	const [labSemester, setLabSemester] = useState<LabSemester>(initialLabSemester);

	useEffect(() => {
		setLabSemester(labSemesterValue);
	}, [labSemesterValue]);

	const checkErrorMessage = (parameter: string): boolean => {
		let message = false;
		errors.map((error) => {
			if (error.identifier === parameter) {
				message = true;
			}
		});

		return message;
	};

	const onValueChange = (value: string, id: string, labId?: string) => {
		let newState = null;

		switch (id) {
			case Params.Name:
				newState = {...labSemester, semesterName: value};
				break;
			case Params.Description:
				newState = {...labSemester, description: value};
				break;
			case Params.Laboratory:
				newState = {...labSemester, laboratoryID: labId, laboratory: value};
				break;
			default:
				return labSemester;
		}
		setLabSemester(newState);
		handleChange(newState);
	};

	return (
		<>
			<div className={classes.options}>
				<ValidateGroupComponent groups={[Groups.ProfessorsGroup]}>
					<DropdownComponent
						text="Laboratorio"
						options={laboratories.map((lab) => {
							return {value: lab.name ? lab.name : '', id: lab.id ? lab.id : ''};
						})}
						onValueChange={(value, id) => {
							onValueChange(value, Params.Laboratory, id);
						}}
						value={labSemester.laboratory ? labSemester.laboratory : ''}
						// error={checkErrorMessage(Params.)}
					/>
				</ValidateGroupComponent>
				<Input
					type="text"
					placeholder="Nombre"
					required
					value={labSemester.semesterName}
					tooltip="Ingrese el nombre del semestre"
					onValueChange={(value) => onValueChange(value, Params.Name)}
					error={checkErrorMessage(Params.Name)}
					disabled={group === Groups.MonitorsGroup}
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={labSemester.description ?? ''}
					onValueChange={(value) => onValueChange(value, Params.Description)}
					disabled={group === Groups.MonitorsGroup}
				/>
			</div>
		</>
	);
};

export default LabSemesterData;
