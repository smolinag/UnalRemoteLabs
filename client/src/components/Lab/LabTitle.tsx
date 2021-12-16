import React from 'react';
import Row from 'react-bootstrap/Row';

interface Props {
	name?: string | null;
	description?: string | null;
	duration?: number | null;
}

const LabTitle: React.FC<Props> = ({description, duration, name}) => {
	return (
		<Row className="section">
			<h3 className="title">{name ?? 'Práctica de laboratorio'}</h3>
			<span>Descripción: {description}</span>
			<span>Duración: {duration ? duration : '-'} minutos</span>
		</Row>
	);
};

export default LabTitle;
