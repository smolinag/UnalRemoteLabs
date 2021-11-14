import React from 'react';
import {Row, Col} from 'react-bootstrap';

import {Table} from '../UI/index';
import classes from './shared.module.scss';

type Data = [string, string | number][];

interface Props {
	data: Data;
}

const COLUMNS = ['Salida', 'Valores'];

const LabOutputs: React.FC<Props> = ({data}) => {
	return (
		<Row className={classes.section}>
			<h4 className={classes.title}>Parámetros de salida</h4>
			<Row>
				<Col md={6}>
					<h5>Imágen tiempo real</h5>
				</Col>
				<Col md={6}>
					<h5>Datos</h5>
					<Table headers={COLUMNS} data={data} overflow stickyHeader maxHeight={'400px'} />
				</Col>
			</Row>
		</Row>
	);
};

export default LabOutputs;
