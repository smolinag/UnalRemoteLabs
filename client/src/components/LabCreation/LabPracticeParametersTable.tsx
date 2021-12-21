import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeParameterInfo} from '../../containers/LabCreationView/types';
import {Table} from '../UI/index';
import { Action } from '../UI/Table/Table';

interface Props {
	data: LabPracticeParameterInfo[];
	onDelete?: (rowIndex: number, action: Action) => void;
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

const LabPracticeParametersTable: React.FC<Props> = ({data, onDelete}) => {

	return (
		<Row className="section">
			<h5>Comandos añadidos</h5>
			<Table headers={COLUMNS} data={data.map(mapOutput)} overflow stickyHeader maxHeight={'400px'} removable onAction={onDelete}/>
		</Row>
	);
};

export default LabPracticeParametersTable;
