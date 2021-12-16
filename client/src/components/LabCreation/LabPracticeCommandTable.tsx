import React from 'react';
import Row from 'react-bootstrap/Row';

import {LabPracticeCommandInfo} from '../../containers/LabCreationView/types';
import {Table} from '../UI/index';
import classes from './shared.module.scss';

interface Props {
	data: LabPracticeCommandInfo[];
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
}: LabPracticeCommandInfo): string[] => [
	commandName,
	commandDescription,
	parameterName,
	parameterDescription,
	parameterDefaultValue,
	parameterUnit,
	parameterMaxValue,
	parameterMinValue,
	parameterRegex
];

const LabPracticeCommandTable: React.FC<Props> = ({data, onValueChange}) => {

	return (
		<Row className={classes.section}>
			<h5>Comandos añadidos</h5>
			<Table headers={COLUMNS} data={data.map(mapOutput)} overflow stickyHeader maxHeight={'400px'} />
		</Row>
	);
};

export default LabPracticeCommandTable;
