import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {IoRefreshOutline} from 'react-icons/io5';

import classes from './LabVideo.module.scss';

interface Props {
	videoUrl: string;
	onVideoUrlRefresh: () => void;
}

const LabVideo: React.FC<Props> = ({videoUrl, onVideoUrlRefresh}) => {
	return (
		<div>
			<h4 className="title row" style={{display: 'flex', flexDirection: 'row'}}>
				<Col xs={3}>
					<div>Video</div>
				</Col>
				<Col xs={3}>
					<IoRefreshOutline key={'RefreshVideo'} className={classes.icon} onClick={() => onVideoUrlRefresh()} />
				</Col>
			</h4>

			<Row>
				<div className="video-responsive">
					<iframe
						width="600"
						height="380"
						src={`https://www.youtube.com/embed/` + videoUrl}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						title="Video práctica de laboratorio"
					/>
				</div>
			</Row>
		</div>
	);
};

export default LabVideo;
