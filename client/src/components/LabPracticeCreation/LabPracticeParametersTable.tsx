import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeParameterInfo} from '../../containers/LabPractice/types';
import {Table} from '../UI/index';
import {Action} from '../UI/Table/Table';

interface Props {
	data: LabPracticeParameterInfo[];
	onAction?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = [
	'Comando',
	'Nombre del parámetro',
	'Descripción del parámetro',
	'Valor por defecto',
	'Valor máximo',
	'Valor mínimo',
	'Expresión regular'
];

const mapOutput = ({
	selectedCommandName,
	parameterName,
	parameterDescription,
	parameterDefaultValue,
	parameterMaxValue,
	parameterMinValue,
	parameterRegex
}: LabPracticeParameterInfo): string[] => [
	selectedCommandName,
	parameterName,
	parameterDescription,
	parameterDefaultValue,
	parameterMaxValue,
	parameterMinValue,
	parameterRegex
];

const LabPracticeParametersTable: React.FC<Props> = ({data, onAction}) => {

	return (
		<Row className="section">
			<h5>Comandos añadidos</h5>
			<Table
				headers={COLUMNS}
				data={data.map((obj) => (obj !== undefined ? mapOutput(obj) : []))}
				overflow
				stickyHeader
				maxHeight={'400px'}
				editable
				removable
				onAction={onAction}
			/>
		</Row>
	);
};

export default LabPracticeParametersTable;
