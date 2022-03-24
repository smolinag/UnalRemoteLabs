import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {IoRefreshOutline} from 'react-icons/io5';

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
	videoUrl: string;
	onVideoUrlRefresh: () => void;
}

const COLUMNS = ['Salida', 'Valores'];

const LabOutputs: React.FC<Props> = ({data, videoUrl, onVideoUrlRefresh}) => {
	return (
		<Row className="section">
			<h4 className="title">Parámetros de salida</h4>
			<Row>
				<Col md={6}>
					<Row>
						<Col xs={3}>
							<h5>Video</h5>
						</Col>
						<Col xs={3}>
							<IoRefreshOutline
								key={"RefreshVideo"}
								onClick={() => onVideoUrlRefresh()}
							/>
						</Col>
					</Row>
					<Row>
						<div className="video-responsive">
							<iframe
								width="100%"
								height="480"
								src={`https://www.youtube.com/embed/` + videoUrl}
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								title="Video práctica de laboratorio"
							/>
						</div>
					</Row>
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
