import React from 'react';
import {Row} from 'react-bootstrap';

import classes from './shared.module.scss';

interface Props {
	name?: string | null;
	description?: string | null;
	duration?: number | null;
}

const LabTitle: React.FC<Props> = ({description, duration, name}) => {
	return (
		<Row className={classes.section}>
			<h3 className={classes.title}>{name ?? 'Práctica de laboratorio'}</h3>
			<span>Descripción: {description}</span>
			<span>Duración: {duration ? duration : '-'} segundos</span>
		</Row>
	);
};

export default LabTitle;
