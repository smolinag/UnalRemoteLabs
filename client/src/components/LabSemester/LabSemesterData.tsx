import React, {useState, useEffect} from 'react';

import {Params, LabSemester, ErrorIdentifier} from '../../containers/LabSemester/types';
import {Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	labSemesterValue: LabSemester;
	handleChange: (labSemester: LabSemester) => void;
	errors: ErrorIdentifier[];
}

const initialLabSemester: LabSemester = {
	semesterName: '',
	description: null,
	professor: '',
	monitorEmailList: [],
	studentEmailList: []
};

const LabSemesterData: React.FC<Props> = ({labSemesterValue, handleChange, errors}) => {
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

	const onValueChange = (value: string, id: string) => {
		let newState = null;

		switch (id) {
			case Params.Name:
				newState = {...labSemester, semesterName: value};
				break;
			case Params.Description:
				newState = {...labSemester, description: value};
				break;
			case Params.professor:
				newState = {...labSemester, professor: value};
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
				<Input
					type="text"
					placeholder="Nombre"
					required
					value={labSemester.semesterName}
					tooltip="Ingrese el nombre del semestre"
					onValueChange={(value) => onValueChange(value, Params.Name)}
					error={checkErrorMessage(Params.Name)}
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={labSemester.description ?? ''}
					onValueChange={(value) => onValueChange(value, Params.Description)}
				/>
				<Input
					type="text"
					placeholder="Profesor"
					required
					value={labSemester.professor ? labSemester.professor : ''}
					onValueChange={(value) => onValueChange(value, Params.professor)}
				/>
			</div>
		</>
	);
};

export default LabSemesterData;
