import React from 'react';
import Row from 'react-bootstrap/Row';

import {OutputInfo, Params, ErrorIdentifier, LabPracticeCommandInfo, LabPracticeParameterInfo} from '../../containers/LabCreationView/types';
import {Input} from '../UI';
import classes from './shared.module.scss';

interface Props {
	output: OutputInfo;
	onValueChange?: (value: string, id: string) => void;
	errors: ErrorIdentifier[];
	onValueEdit?: (
		paramType: string,
		value: string,
		command?: LabPracticeCommandInfo,
		parameter?: LabPracticeParameterInfo,
		output?: OutputInfo
	) => void;
}

const LabPracticeOutput: React.FC<Props> = ({onValueChange, onValueEdit, output, errors}) => {
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
			<h3 className="title">Parámetros de salida de la práctica</h3>

			<h5>Información de los comandos</h5>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder="Nombre"
					value={output.outputName}
					tooltip="Ingrese el nombre del parámetro de salida"
					onValueChange={(value) => onValueChange ? onValueChange(value, Params.OutputName) : (onValueEdit && onValueEdit(Params.OutputName, value, undefined, undefined, output)) }
					error={checkErrorMessage(Params.OutputName)}
				/>
				<Input
					type="text"
					placeholder="Descripción"
					value={output.outputDescription}
					tooltip="Ingrese la descripción del parámetro de salida"
					onValueChange={(value) => onValueChange ? onValueChange(value, Params.OutputDescription) : (onValueEdit && onValueEdit(Params.OutputDescription, value, undefined, undefined, output)) }
				/>
				<Input
					type="text"
					placeholder="Unidad"
					value={output.outputUnit}
					onValueChange={(value) => onValueChange ? onValueChange(value, Params.OutputUnit) : (onValueEdit && onValueEdit(Params.OutputUnit, value, undefined, undefined, output)) }
				/>
			</div>
		</Row>
	);
};

export default LabPracticeOutput;
