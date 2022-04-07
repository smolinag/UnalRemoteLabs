import {Storage} from 'aws-amplify';
import React, {useState, useContext} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {useUpdateLabPracticeSessionMutation, useGetLabPracticeSessionQuery} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import Button from '../UI/Button/Button';

interface Props {
	name?: string | null;
	description?: string | null;
	duration?: number | null;
	isVideoUrlInputEnabled?: boolean | null;
	laPracticeSessionId: string;
	guideFileName?: string | null;
}

const LabTitle: React.FC<Props> = ({
	description,
	duration,
	name,
	isVideoUrlInputEnabled,
	laPracticeSessionId,
	guideFileName
}) => {
	const [videoUrl, setVideoUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const [downloadingGuideFile, setDownloadingGuideFile] = useState(false);

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

	const handleDownloadGuideFile = async () => {
		if (guideFileName) {
			try {
				setDownloadingGuideFile(true);
				const data = await Storage.get(guideFileName, {download: true});
				if (data?.Body) {
					downloadBlob(data.Body as Blob, guideFileName);
				}
				setDownloadingGuideFile(false);
			} catch (e) {
				console.error('Error downloading S3 file', e);
			}
		}
	};

	const downloadBlob = async (blob: Blob, filename: string) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename || 'download';
		const clickHandler = () => {
			setTimeout(() => {
				URL.revokeObjectURL(url);
				a.removeEventListener('click', clickHandler);
			}, 150);
		};
		a.addEventListener('click', clickHandler, false);
		a.click();
		return a;
	};

	return (
		<Row className="section">
			<h3 className="title">{name ?? 'Práctica de laboratorio'}</h3>
			<Col sm={3}>
				<Row>
					<span>Descripción: {description}</span>
				</Row>
				<Row>
					<span>Duración: {duration ? duration : '-'} minutos</span>
				</Row>
			</Col>
			<Col sm={4}>
				<Row>
					<span>Guía de práctica: </span>
				</Row>
				<Row style={{display: 'flex', alignItems: 'center'}}>
					<Col xs={4}>
						<span>{guideFileName} </span>
					</Col>
					<Col xs={3}>
						<Button loading={downloadingGuideFile} onClick={handleDownloadGuideFile}>
							Descargar
						</Button>
					</Col>
				</Row>
			</Col>
			{isVideoUrlInputEnabled ? (
				<Col sm={5}>
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
		</Row>
	);
};

export default LabTitle;
