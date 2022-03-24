import React, {useState, useContext} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useUpdateLabPracticeSessionMutation, useGetLabPracticeSessionQuery } from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import Button from '../UI/Button/Button';

interface Props {
	name?: string | null;
	description?: string | null;
	duration?: number | null;
	isVideoUrlInputEnabled?: boolean | null;
	laPracticeSessionId: string;
}

const LabTitle: React.FC<Props> = ({description, duration, name, isVideoUrlInputEnabled, laPracticeSessionId}) => {
	const [videoUrl, setVideoUrl] = useState('');
	const [loading, setLoading] = useState(false);

	const {data: labSessionData} = useGetLabPracticeSessionQuery({variables: {id: laPracticeSessionId}});
	const [updateLabPracticeSession] = useUpdateLabPracticeSessionMutation({});

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const handleVideoUrlChange = (value: string) => {
		setVideoUrl(value);
	};

	console.log(labSessionData)

	const handleLabPracticeSessionUpdate = async() => {
		try{
			setLoading(true);
			console.log(laPracticeSessionId)
			console.log(videoUrl)
			const data = await updateLabPracticeSession({
				variables:{
					input:{
						id: laPracticeSessionId,
						videoUrlCode: videoUrl,
						_version: labSessionData?.getLabPracticeSession?._version
					}
				}
			})
			console.log(data)
			showSuccessBanner(`El código del video  ${videoUrl ?? ''} fue correctamente guardado`);
		} catch(e){
			showErrorBanner(`No se pudo guardar el código del video  ${videoUrl ?? ''}`);
		}	finally{
			setLoading(false);
		}	
	}

	return (
		<Row className="section">
			<h3 className="title">{name ?? 'Práctica de laboratorio'}</h3>
			<Col sm={4}>
				<Row>
					<span>Descripción: {description}</span>
				</Row>
				<Row>
					<span>Duración: {duration ? duration : '-'} minutos</span>
				</Row>
			</Col>
			{isVideoUrlInputEnabled ? (
				<Col sm={6}>
					<Row>
						<span>Código de vídeo: </span>
					</Row>
					<Row style={{display: 'flex',  alignItems: 'center'}}>
						<Col xs={4}>
							<input
								type="text"
								placeholder="Código"
								value={videoUrl}
								onChange={(e) => handleVideoUrlChange(e.target.value)}
							/>
						</Col>
						<Col xs={3}>
							<Button loading={loading} onClick={handleLabPracticeSessionUpdate}>
								Guardar
							</Button>
						</Col>
					</Row>
				</Col>
			) : (
				<></>
			)}
		</Row>
	);
};

export default LabTitle;
