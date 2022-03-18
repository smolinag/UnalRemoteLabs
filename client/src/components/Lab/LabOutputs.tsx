import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {Maybe} from '../../graphql/generated/schema';
import {Table} from '../UI';

type Data = [string, string | number][];

export interface Output {
	id: Maybe<string>;
	name: Maybe<string> | undefined;
	value: Maybe<string>;
}

interface Props {
	data: Data;
}

const COLUMNS = ['Salida', 'Valores'];

const LabOutputs: React.FC<Props> = ({data}) => {
	return (
		<Row className="section">
			<h4 className="title">Parámetros de salida</h4>
			<Row>
				<Col md={6}>
					<div className="video-responsive">
						<iframe
							width="100%"
							height="480"
							src={`https://www.youtube.com/embed/oTXNDKmoTUk`}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							title="Embedded youtube"
						/>
					</div>
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
