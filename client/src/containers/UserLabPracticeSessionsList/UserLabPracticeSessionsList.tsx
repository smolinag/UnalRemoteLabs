import React from 'react';
import Row from 'react-bootstrap/Row';

import {LoadingContainer} from '../../components/UI';
import {UserLabPracticeSessionsTable} from '../../components/UsersLabsView';
import {useListUserLabPracticeSessionsQuery} from '../../graphql/generated/schema';
import {UserLabPracticeSession} from './types';


const USER_ID = 'a0a202e4-10c9-4c51-bbc3-905ee73818ac'

const UserLabPracticeSessionsList: React.FC<unknown> = () => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const [userLabPracticeSessionsList, setUserLabPracticeSessionsList] = React.useState<UserLabPracticeSession[]>();

	const {data, loading: retrievingInfo} = useListUserLabPracticeSessionsQuery({variables: {id: USER_ID}});

	React.useEffect(() => {
		const receivedList = data?.listUserLabPracticeSessions?.items;
		if (receivedList && receivedList.length > 0) {
			const list: UserLabPracticeSession[] = receivedList.map((session) => ({
				id: session.id,
				sessionStartDate: session.sessionStartDate ? session.sessionStartDate : '',
				sessionEndDate: session.sessionEndDate ? session.sessionEndDate : '',
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
		setLoading(retrievingInfo);

		return () => {
			setUserLabPracticeSessionsList(undefined);
		}
	}, [data]);

	return (
		<LoadingContainer loading={loading}>
			<Row className="section">
				<h3 className="title">Sesiones de prácticas de laboratorios</h3>
			</Row>
			<Row className="section">
				<UserLabPracticeSessionsTable laboratories={userLabPracticeSessionsList} />
			</Row>
		</LoadingContainer>
	);
};

export default UserLabPracticeSessionsList;
