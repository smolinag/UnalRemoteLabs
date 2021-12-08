import React from 'react';
import {Row} from 'react-bootstrap';

import {CommandInfo} from '../../containers/LabCreationView/LabCreationView';
import {Table} from '../UI/index';
import classes from './shared.module.scss';

interface Props {
	data: CommandInfo[];
	onValueChange?: (value: string, id: string) => void;
}

const COLUMNS = [
	'Nombre del comando',
	'Descripción del comando',
	'Nombre del parámetro',
	'Descripción del parámetro',
	'Valor por defecto',
	'Unidad',
	'Valor máximo',
	'Valor mínimo',
	'Expresión regular'
];

const LabPracticeCommandTable: React.FC<Props> = ({data, onValueChange}) => {
	const mapOutput = ({
		commandName,
		commandDescription,
		parameterName,
		parameterDescription,
		parameterDefaultValue,
		parameterUnit,
		parameterMaxValue,
		parameterMinValue,
		parameterRegex
	}: CommandInfo): [string, string, string, string, string, string, string, string, string] => [
		commandName as string,
		commandDescription as string,
		parameterName as string,
		parameterDescription as string,
		parameterDefaultValue as string,
		parameterUnit as string,
		parameterMaxValue as string,
		parameterMinValue as string,
		parameterRegex as string
	];

	return (
		<Row className={classes.section}>
			<h5>Comandos añadidos</h5>
			<Table headers={COLUMNS} data={data.map(mapOutput)} overflow stickyHeader maxHeight={'400px'} />
		</Row>
	);
};

export default LabPracticeCommandTable;
