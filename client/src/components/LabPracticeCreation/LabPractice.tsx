import React from 'react';
import Row from 'react-bootstrap/Row';

import {Params, LabPracticeInfo, ErrorIdentifier, LaboratoryInfo} from '../../containers/LabPractice/types';
import {DropdownComponent, Input} from '../UI';
import {Option} from '../UI/DropdownComponent/DropdownComponent';
import classes from './shared.module.scss';

interface Props {
	practice: LabPracticeInfo;
	laboratories: LaboratoryInfo[];
	onValueChange: (value: string, id: string) => void;
	errors: ErrorIdentifier[];
}

const initialLaboratory: Option = {id: '', value: 'Laboratorio'};

const LabPractice: React.FC<Props> = ({onValueChange, practice, laboratories, errors}) => {
	const [laboratory, setLaboratory] = React.useState<Option>(initialLaboratory);

	React.useEffect(() => {
		const lab = laboratories.filter((lab) => lab.id === practice.laboratoryId)[0];
		if (lab) {
			setLaboratory({
				id: lab.id,
				value: lab.name
			});
		}
	}, [laboratories]);

	const handleSelectCommand = (value: string, id: string) => {
		setLaboratory({value, id});
		onValueChange(id, Params.Laboratory);
	};

	const checkErrorMessage = (parameter: string): boolean => {
		let message = false;
		errors.map((error) => {
			if (error.identifier === parameter) {
				message = true;
			}
		});

		return message;
	};

	return (
		<Row className="section">
			<h3 className="title">Información de la práctica de laboratorio</h3>
			<div className={classes.options}>
				<DropdownComponent
					text="Laboratorio"
					options={laboratories.map((laboratory) => {
						return {value: laboratory.name, id: laboratory.id};
					})}
					onValueChange={(value, id) => {
						handleSelectCommand(value, id);
					}}
					value={laboratory.value}
					error={checkErrorMessage(Params.Laboratory)}
					required
				/>
				<Input
					type="text"
					placeholder="Nombre"
					required
					value={practice.practiceInfoName}
					tooltip="Ingrese el nombre del laboratorio"
					onValueChange={(value) => onValueChange(value, Params.Name)}
					error={checkErrorMessage(Params.Name)}
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={practice.practiceInfoDescription}
					onValueChange={(value) => onValueChange(value, Params.Description)}
				/>
				<Input
					type="number"
					placeholder="Duración"
					required
					value={practice.practiceInfoDuration}
					tooltip="Ingrese la duración que tendrá la sesión en minutos"
					unit="minutos"
					onValueChange={(value) => onValueChange(value, Params.Duration)}
					error={checkErrorMessage(Params.Duration)}
				/>
			</div>
		</Row>
	);
};

export default LabPractice;
