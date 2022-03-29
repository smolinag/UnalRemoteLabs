import React, {useState, useContext} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Groups } from '../../generalUtils/groups';
import ValidateGroup from '../../generalUtils/ValidateGroup';
import {useUpdateLabPracticeSessionMutation, useGetLabPracticeSessionQuery} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import Button from '../UI/Button/Button';

export interface Session {
	id: string;
	videoUrlCode: string;
	startDate: string;
	endDate: string;
	description: string;
	professor: string;
}

interface Props {
	name?: string | null;
	description?: string | null;
	duration?: number | null;
	isVideoUrlInputEnabled?: boolean | null;
	laPracticeSessionId: string;
	sessionInformation: Session;
}

const LabTitle: React.FC<Props> = ({
	description,
	duration,
	name,
	isVideoUrlInputEnabled,
	laPracticeSessionId,
	sessionInformation
}) => {
	const [videoUrl, setVideoUrl] = useState('');
	const [loading, setLoading] = useState(false);

	const {data: labSessionData} = useGetLabPracticeSessionQuery({variables: {id: laPracticeSessionId}});
	const [updateLabPracticeSession] = useUpdateLabPracticeSessionMutation({});

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const handleVideoUrlChange = (value: string) => {
		setVideoUrl(value);
	};

	const handleLabPracticeSessionUpdate = async () => {
		try {
			setLoading(true);
			await updateLabPracticeSession({
				variables: {
					input: {
						id: laPracticeSessionId,
						videoUrlCode: videoUrl,
						_version: labSessionData?.getLabPracticeSession?._version
					}
				}
			});
			showSuccessBanner(`El código del video  ${videoUrl ?? ''} fue correctamente guardado`);
		} catch (e) {
			showErrorBanner(`No se pudo guardar el código del video  ${videoUrl ?? ''}`);
		} finally {
			setLoading(false);
		}
	};

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
				<Row>
					<span>
						Inicio:
						{`${new Date(sessionInformation?.startDate).toDateString()} - ${new Date(
							sessionInformation?.startDate
						).toLocaleTimeString()}`}
					</span>
				</Row>
				<Row>
					<span>
						Finalización:{' '}
						{`${new Date(sessionInformation?.endDate).toDateString()} - ${new Date(
							sessionInformation?.endDate
						).toLocaleTimeString()}`}
					</span>
				</Row>
				<Row>
					<span>Profesor: {sessionInformation.professor ? sessionInformation.professor : '-'}</span>
				</Row>
			</Col>
			{/* <ValidateGroup groups={[Groups.MonitorsGroup]}> */}
				{isVideoUrlInputEnabled ? (
					<Col sm={6}>
						<Row>
							<span>Código de vídeo: </span>
						</Row>
						<Row style={{display: 'flex', alignItems: 'center'}}>
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
			{/* </ValidateGroup> */}
		</Row>
	);
};

export default LabTitle;
