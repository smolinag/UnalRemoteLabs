import React from 'react';
import Row from 'react-bootstrap/Row';

import {LoadingContainer} from '../../components/UI';
import {UserLabPracticeSessionsTable} from '../../components/UsersLabsView';
import {useListUserLabPracticeSessionsQuery} from '../../graphql/generated/schema';
import {UserLabPracticeSession} from './types';

export const DUMMY_DATA: UserLabPracticeSession[] = [
	{
		id: '3cb63bd4-ffae-4ed6-b1ca-c54f0773a573',
		sessionStartDate: '',
		sessionEndDate: '',
		labPracticeSession: {
			id: '93a1909e-eef3-421c-9cca-22396177f39c',
			startDate: '2022-01-17T11:25:00-05:00',
			endDate: '2022-01-17T17:00:00-05:00',
			labPracticeInfo: {
				id: '7f735a8d-2d46-466f-a40e-49a32d891654',
				practiceInfoName: 'test456',
				practiceInfoDescription: 'test456',
				practiceInfoDuration: 60,
				laboratory: {
					id: 'f3094551-bdd7-4j1b-b2e7-721bb993e138',
					name: 'Máquinas I',
					description: 'Laboratorio de Maquinas I'
				}
			}
		}
	},
	{
		id: '3cb63bd4-ffae-4ew6-b1ca-c54f0773a573',
		sessionStartDate: '',
		sessionEndDate: '',
		labPracticeSession: {
			id: '93a1909e-eef3-421c-9cce-22396177f39c',
			startDate: '2022-02-01T16:00:00-07:00',
			endDate: '2022-01-01T16:00:00-07:00',
			labPracticeInfo: {
				id: '6e2bdc2c-7e30-40b9-99ef-eate1d19a8cf',
				practiceInfoName: 'test456',
				practiceInfoDescription: 'test456',
				practiceInfoDuration: 60,
				laboratory: {
					id: 'f3094551-bdd7-4j1b-b2e7-721bb993e138',
					name: 'Máquinas I',
					description: 'Laboratorio de Maquinas I'
				}
			}
		}
	},
	{
		id: '3cb63bd4-ffae-4ew6-b1ca-c54f0773a573',
		sessionStartDate: '2021-11-01T16:01:00-05:00',
		sessionEndDate: '2021-11-01T16:49:00-05:00',
		labPracticeSession: {
			id: '93a1909e-eef3-421c-9cce-22396177f39c',
			startDate: '2021-11-01T16:00:00-05:00',
			endDate: '2021-11-01T15:00:00-05:00',
			labPracticeInfo: {
				id: '6e2bdc2c-7e30-40b9-99ef-eate1d19a8cf',
				practiceInfoName: 'test456',
				practiceInfoDescription: 'test456',
				practiceInfoDuration: 60,
				laboratory: {
					id: 'f3094551-bdd7-4j1b-b2e7-721bb9935t78',
					name: 'Máquinas II',
					description: 'Laboratorio de Maquinas II'
				}
			}
		}
	},
	{
		id: '3cb63bd4-ffae-4ew6-b1ca-c54f0773a573',
		sessionStartDate: '2021-11-01T16:01:00-05:00',
		sessionEndDate: '2021-11-01T16:49:00-05:00',
		labPracticeSession: {
			id: '93a1909e-eef3-421c-9cce-22396177f39c',
			startDate: '2021-11-01T16:00:00-05:00',
			endDate: '2021-11-01T15:00:00-05:00',
			labPracticeInfo: {
				id: '6e2bdc2c-7e30-40b9-99ef-eate1d19a8cf',
				practiceInfoName: 'test456',
				practiceInfoDescription: 'test456',
				practiceInfoDuration: 60,
				laboratory: {
					id: 'f3094551-bdd7-4j1b-b2e7-721bb9935t78',
					name: 'Máquinas II',
					description: 'Laboratorio de Maquinas II'
				}
			}
		}
	},
	{
		id: '3cb63bd4-ffae-4ew6-b1ca-c54f0773a573',
		sessionStartDate: '2021-11-01T16:01:00-05:00',
		sessionEndDate: '2021-11-01T16:49:00-05:00',
		labPracticeSession: {
			id: '93a1909e-eef3-421c-9cce-22396177f39c',
			startDate: '2021-11-01T16:00:00-05:00',
			endDate: '2021-11-01T15:00:00-05:00',
			labPracticeInfo: {
				id: '6e2bdc2c-7e30-40b9-99ef-eate1d19a8cf',
				practiceInfoName: 'test456',
				practiceInfoDescription: 'test456',
				practiceInfoDuration: 60,
				laboratory: {
					id: 'f3094551-bdd7-4j1b-b2e7-721bb9935t78',
					name: 'Máquinas II',
					description: 'Laboratorio de Maquinas II'
				}
			}
		}
	},
	{
		id: '3cb63bd4-ffae-4ew6-b1ca-c54f0773a573',
		sessionStartDate: '2021-11-01T16:01:00-05:00',
		sessionEndDate: '2021-11-01T16:49:00-05:00',
		labPracticeSession: {
			id: '93a1909e-eef3-421c-9cce-22396177f39c',
			startDate: '2021-11-01T16:00:00-05:00',
			endDate: '2021-11-01T15:00:00-05:00',
			labPracticeInfo: {
				id: '6e2bdc2c-7e30-40b9-99ef-eate1d19a8cf',
				practiceInfoName: 'test456',
				practiceInfoDescription: 'test456',
				practiceInfoDuration: 60,
				laboratory: {
					id: 'f3094551-bdd7-4j1b-b2e7-721bb9935t78',
					name: 'Máquinas II',
					description: 'Laboratorio de Maquinas II'
				}
			}
		}
	},
	{
		id: '3cb63bd4-ffae-4ew6-b1ca-c54f0773a573',
		sessionStartDate: '2021-11-01T16:01:00-05:00',
		sessionEndDate: '2021-11-01T16:49:00-05:00',
		labPracticeSession: {
			id: '93a1909e-eef3-421c-9cce-22396177f39c',
			startDate: '2021-11-01T16:00:00-05:00',
			endDate: '2021-11-01T15:00:00-05:00',
			labPracticeInfo: {
				id: '6e2bdc2c-7e30-40b9-99ef-eate1d19a8cf',
				practiceInfoName: 'test456',
				practiceInfoDescription: 'test456',
				practiceInfoDuration: 60,
				laboratory: {
					id: 'f3094551-bdd7-4j1b-b2e7-721bb9935t78',
					name: 'Máquinas II',
					description: 'Laboratorio de Maquinas II'
				}
			}
		}
	},
	{
		id: '3cb63bd4-ffae-4ew6-b1ca-c54f0773a573',
		sessionStartDate: '2021-11-01T16:01:00-05:00',
		sessionEndDate: '2021-11-01T16:49:00-05:00',
		labPracticeSession: {
			id: '93a1909e-eef3-421c-9cce-22396177f39c',
			startDate: '2021-11-01T16:00:00-05:00',
			endDate: '2021-11-01T15:00:00-05:00',
			labPracticeInfo: {
				id: '6e2bdc2c-7e30-40b9-99ef-eate1d19a8cf',
				practiceInfoName: 'test456',
				practiceInfoDescription: 'test456',
				practiceInfoDuration: 60,
				laboratory: {
					id: 'f3094551-bdd7-4j1b-b2e7-721bb9935t78',
					name: 'Máquinas II',
					description: 'Laboratorio de Maquinas II'
				}
			}
		}
	}
];

const UserLabPracticeSessionsList: React.FC<unknown> = () => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const [userLabPracticeSessionsList, setUserLabPracticeSessionsList] = React.useState<UserLabPracticeSession[]>();

	const {data, loading: retrievingInfo} = useListUserLabPracticeSessionsQuery();

	React.useEffect(() => {
		const receivedList = data?.listUserLabPracticeSessions?.items;
		if (receivedList) {
			const list: UserLabPracticeSession[] = receivedList.map((session) => ({
				id: session.id,
				sessionStartDate: session.sessionStartDate,
				sessionEndDate: session.sessionEndDate,
				labPracticeSession: {
					id: session.LabPracticeSession?.id ? session.LabPracticeSession?.id : '',
					startDate: session.LabPracticeSession?.startDate ? session.LabPracticeSession?.startDate : '',
					endDate: session.LabPracticeSession?.endDate ? session.LabPracticeSession?.endDate : '',
					labPracticeInfo: {
						id: session.LabPracticeSession?.LabPractice?.id ? session.LabPracticeSession?.LabPractice?.id : '',
						practiceInfoName: session.LabPracticeSession?.LabPractice?.name
							? session.LabPracticeSession?.LabPractice?.name
							: '',
						practiceInfoDescription: session.LabPracticeSession?.LabPractice?.description
							? session.LabPracticeSession?.LabPractice?.description
							: '',
						practiceInfoDuration: session.LabPracticeSession?.LabPractice?.duration
							? session.LabPracticeSession?.LabPractice?.duration
							: 0,
						laboratory: {
							id: session.LabPracticeSession?.LabPractice?.Laboratory?.id
								? session.LabPracticeSession?.LabPractice?.Laboratory?.id
								: '',
							name: session.LabPracticeSession?.LabPractice?.Laboratory?.name
								? session.LabPracticeSession?.LabPractice?.Laboratory?.name
								: '',
							description: session.LabPracticeSession?.LabPractice?.Laboratory?.description
								? session.LabPracticeSession?.LabPractice?.Laboratory?.description
								: ''
						}
					}
				}
			}));
			setUserLabPracticeSessionsList(list);
		}
		console.warn(userLabPracticeSessionsList);
		setLoading(retrievingInfo);
	}, [data]);

	return (
		<LoadingContainer loading={loading}>
			<Row className="section">
				<h3 className="title">Sesiones de prácticas de laboratorios</h3>
			</Row>
			<Row className="section">
				<UserLabPracticeSessionsTable laboratories={DUMMY_DATA} />
			</Row>
		</LoadingContainer>
	);
};

export default UserLabPracticeSessionsList;
