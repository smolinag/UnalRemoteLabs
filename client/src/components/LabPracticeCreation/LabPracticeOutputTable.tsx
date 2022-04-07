import React from 'react';
import Row from 'react-bootstrap/Row';

import {OutputInfo} from '../../containers/LabPractice/types';
import {Table} from '../UI/index';
import { Action } from '../UI/Table/Table';

interface Props {
	data: OutputInfo[];
	onAction?: (rowIndex: number, action: Action) => void;
}

const COLUMNS = [
	'Nombre',
	'Descripción',
	'Unidad', 
	'Posición'
];

const LabPracticeOutputTable: React.FC<Props> = ({data, onAction}) => {
	const mapOutput = ({
      outputName,
      outputDescription,
      outputUnit,
		order
	}: OutputInfo): string[] => [
		outputName,
		outputDescription,
		outputUnit ?? '',
		order.toString()
	];

	return (
		<Row className="section">
			<h5>Parámetros de salida añadidos</h5>
			<Table headers={COLUMNS} data={data.map(mapOutput)} overflow stickyHeader maxHeight={'400px'} editable removable onAction={onAction}/>
		</Row>
	);
};

export default LabPracticeOutputTable;
