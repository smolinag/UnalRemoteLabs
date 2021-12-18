import React from 'react';
import Row from 'react-bootstrap/Row';

import {OutputInfo} from '../../containers/LabCreationView/types';
import {Table} from '../UI/index';

interface Props {
	data: OutputInfo[];
	onValueChange?: (value: string, id: string) => void;
}

const COLUMNS = [
	'Nombre',
	'Descripción',
	'Unidad'
];

const LabPracticeOutputTable: React.FC<Props> = ({data, onValueChange}) => {
	const mapOutput = ({
      outputName: outputName,
      outputDescription,
      outputUnit
	}: OutputInfo): string[] => [
		outputName,
		outputDescription,
		outputUnit
	];

	return (
		<Row className="section">
			<h5>Comandos añadidos</h5>
			<Table headers={COLUMNS} data={data.map(mapOutput)} overflow stickyHeader maxHeight={'400px'} />
		</Row>
	);
};

export default LabPracticeOutputTable;
