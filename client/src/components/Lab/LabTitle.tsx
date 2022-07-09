import {Storage} from 'aws-amplify';
import React, {useState, useContext, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {Groups} from '../../generalUtils/groups';
import {ValidateGroupComponent} from '../../generalUtils/ValidateGroup';
import {
	useUpdateLabPracticeSessionMutation,
	useGetLabPracticeSessionQuery,
	useListUsersByLabPracticeSessionQuery
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {DropdownComponent, Button} from '../UI';

export interface Session {
	id: string;
	videoUrlCode: string;
	startDate: string;
	endDate: string;
	description: string;
	professor: string;
	leaderStudent: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
}

interface Props {
	name?: string | null;
	description?: string | null;
	duration?: number | null;
	labPracticeSessionId: string;
	guideFileName?: string | null;
	sessionInformation: Session;
}

const LabTitle: React.FC<Props> = ({
	description,
	duration,
	name,
	labPracticeSessionId,
	guideFileName,
	sessionInformation
}) => {
	const [videoUrl, setVideoUrl] = useState('');
	const [loadingVideoUrl, setLoadingVideoUrl] = useState(false);
	const [leaderUser, setLeaderUser] = useState<User>({id: '', name: '', email: ''});
	const [loadingLeaderUser, setLoadingLeaderUser] = useState(false);

	const [downloadingGuideFile, setDownloadingGuideFile] = useState(false);
	const [users, setUsers] = useState<User[]>([]);

	const {data: labSessionData} = useGetLabPracticeSessionQuery({variables: {id: labPracticeSessionId}});
	const {data: labSessionUsers} = useListUsersByLabPracticeSessionQuery({variables: {id: labPracticeSessionId}});
	const [updateLabPracticeSession] = useUpdateLabPracticeSessionMutation({});

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	useEffect(() => {
		const sessionUsersData = labSessionUsers?.getLabPracticeSession?.UserLabPracticeSessions?.items;
		if (sessionUsersData) {
			const sessionUsers = sessionUsersData.map((item) => {
				return {
					id: item?.User?.id ? item.User.id : '',
					name: item?.User?.name ? item.User.name : '',
					email: item?.User?.email ? item.User.email : ''
				};
			});
			setUsers(sessionUsers);
			if (labSessionData?.getLabPracticeSession?.leaderUsers) {
				const leaderUsersData = labSessionData.getLabPracticeSession.leaderUsers;
				const leaderUsers = sessionUsers.filter((item) => item.id === leaderUsersData);
				if (leaderUsers.length > 0) {
					setLeaderUser(leaderUsers[0]);
				}
			}
		}
	}, [labSessionUsers]);

	const handleVideoUrlChange = (value: string) => {
		setVideoUrl(value);
	};

	const handleLabPracticeSessionVideoUrlUpdate = async () => {
		try {
			setLoadingVideoUrl(true);
			await updateLabPracticeSession({
				variables: {
					input: {
						id: labPracticeSessionId,
						videoUrlCode: videoUrl,
						_version: labSessionData?.getLabPracticeSession?._version
					}
				}
			});
			showSuccessBanner(`El código del video  ${videoUrl ?? ''} fue correctamente guardado`);
		} catch (e) {
			showErrorBanner(`No se pudo guardar el código del video  ${videoUrl ?? ''}`);
		} finally {
			setLoadingVideoUrl(false);
		}
	};

	const handleLabPracticeSessionLeaderUserUpdate = async () => {
		try {
			setLoadingLeaderUser(true);
			await updateLabPracticeSession({
				variables: {
					input: {
						id: labPracticeSessionId,
						leaderUsers: leaderUser.id,
						_version: labSessionData?.getLabPracticeSession?._version
					}
				}
			});
			showSuccessBanner(`El lider de la práctica  ${leaderUser.name ?? ''} fue correctamente guardado`);
		} catch (e) {
			showErrorBanner(`No se pudo guardar el lider de la práctica  ${leaderUser.name ?? ''}`);
		} finally {
			setLoadingLeaderUser(false);
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

	const handleLeaderUserChange = (value: string, id: string) => {
		setLeaderUser({id: id, name: value, email: ''});
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
			<Col sm={3}>
				<Row>
					<span>Guía de práctica: </span>
				</Row>
				<Row style={{display: 'flex', alignItems: 'center'}}>
					<Col xs={6}>
						<span>{guideFileName} </span>
					</Col>
					<Col xs={3}>
						<Button loading={downloadingGuideFile} onClick={handleDownloadGuideFile}>
							Descargar
						</Button>
					</Col>
				</Row>
			</Col>
			<ValidateGroupComponent groups={[Groups.AdminsGroup, Groups.ProfessorsGroup, Groups.MonitorsGroup]}>
				<>
					{' '}
					<Col sm={3}>
						<Row>
							<span>Código de vídeo: </span>
						</Row>
						<Row style={{display: 'flex', alignItems: 'center'}}>
							<Col xs={6}>
								<input
									type="text"
									placeholder="Código"
									value={videoUrl}
									onChange={(e) => handleVideoUrlChange(e.target.value)}
									style={{width: '-webkit-fill-available'}}
								/>
							</Col>
							<Col xs={3}>
								<Button loading={loadingVideoUrl} onClick={handleLabPracticeSessionVideoUrlUpdate}>
									Guardar
								</Button>
							</Col>
						</Row>
					</Col>
					<Col sm={3}>
						<Row>
							<span>Lider de práctica: </span>
						</Row>
						<Row>
							<DropdownComponent
								simple={true}
								text="Lider de práctica"
								options={users.map((user) => {
									return {value: user.name, id: user.id};
								})}
								onValueChange={(value, id) => {
									handleLeaderUserChange(value, id);
								}}
								value={leaderUser.name}
								disabled={false}
							/>
						</Row>
						<Row style={{justifyContent: 'center'}}>
							<Button loading={loadingLeaderUser} onClick={handleLabPracticeSessionLeaderUserUpdate}>
								Guardar
							</Button>
						</Row>
					</Col>
				</>
			</ValidateGroupComponent>
		</Row>
	);
};

export default LabTitle;
