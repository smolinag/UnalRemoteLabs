import React from 'react';
import Row from 'react-bootstrap/Row';

import {OutputInfo} from '../../containers/LabCreationView/types';
import {Table} from '../UI/index';
import classes from './shared.module.scss';

interface Props {
	data: OutputInfo[];
	onValueChange?: (value: string, id: string) => void;
}

const COLUMNS = [
	'Tipo de salida',
	'Nombre',
	'Descripción',
	'Unidad'
];

const LabPracticeOutputTable: React.FC<Props> = ({data, onValueChange}) => {
	const mapOutput = ({
      outputType,
      outputName: outputName,
      outputDescription,
      outputUnit
	}: OutputInfo): [string, string, string, string] => [
		outputType as string,
		outputName as string,
		outputDescription as string,
		outputUnit as string
	];

	return (
		<Row className={classes.section}>
			<h5>Comandos añadidos</h5>
			<Table headers={COLUMNS} data={data.map(mapOutput)} overflow stickyHeader maxHeight={'400px'} />
		</Row>
	);
};

export default LabPracticeOutputTable;
