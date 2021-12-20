import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeParameterInfo} from '../../containers/LabCreationView/types';
import {Table} from '../UI/index';

interface Props {
	data: LabPracticeParameterInfo[];
	onValueChange?: (value: string, id: string) => void;
}

const COLUMNS = [
	'Comando',
	'Nombre del parámetro',
	'Descripción del parámetro',
	'Valor por defecto',
	'Unidad',
	'Valor máximo',
	'Valor mínimo',
	'Expresión regular'
];

const mapOutput = ({
	selectedCommandName,
	parameterName,
	parameterDescription,
	parameterDefaultValue,
	parameterUnit,
	parameterMaxValue,
	parameterMinValue,
	parameterRegex
}: LabPracticeParameterInfo): string[] => [
	selectedCommandName,
	parameterName,
	parameterDescription,
	parameterDefaultValue,
	parameterUnit,
	parameterMaxValue,
	parameterMinValue,
	parameterRegex
];

const LabPracticeParametersTable: React.FC<Props> = ({data, onValueChange}) => {

	return (
		<Row className="section">
			<h5>Comandos añadidos</h5>
			<Table headers={COLUMNS} data={data.map(mapOutput)} overflow stickyHeader maxHeight={'400px'} />
		</Row>
	);
};

export default LabPracticeParametersTable;
