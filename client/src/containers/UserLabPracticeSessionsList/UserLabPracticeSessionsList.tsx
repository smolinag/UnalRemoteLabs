import React, {useEffect} from 'react';
import Row from 'react-bootstrap/Row';

import {LoadingContainer} from '../../components/UI';
import {UserLabPracticeSessionsTable} from '../../components/UsersLabsView';
import {useListUserLabPracticeSessionsQuery} from '../../graphql/generated/schema';
import {UserLabPracticeSession} from './types';

const USER_ID = 'a0a202e4-10c9-4c51-bbc3-905ee73818ac';

const UserLabPracticeSessionsList: React.FC<unknown> = () => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const [userLabPracticeSessionsList, setUserLabPracticeSessionsList] = React.useState<UserLabPracticeSession[]>();

	const {data, loading: retrievingInfo} = useListUserLabPracticeSessionsQuery({variables: {id: USER_ID}});

	useEffect(() => {
		const receivedList = data?.listUserLabPracticeSessions?.items.filter(
			(session) =>
				!session?._deleted &&
				!session?.LabPracticeSession?._deleted &&
				!session?.LabPracticeSession?.LabPractice?._deleted
		);
		if (receivedList && receivedList.length > 0) {
			const list: UserLabPracticeSession[] = receivedList.map((session) => ({
				id: session ? session.id : '',
				sessionStartDate: session?.sessionStartDate ? session?.sessionStartDate : '',
				sessionEndDate: session?.sessionEndDate ? session.sessionEndDate : '',
				version: session?._version ? session._version : null,
				labPracticeSession: {
					id: session?.LabPracticeSession?.id ? session.LabPracticeSession?.id : '',
					startDate: session?.LabPracticeSession?.startDate ? session.LabPracticeSession?.startDate : '',
					endDate: session?.LabPracticeSession?.endDate ? session.LabPracticeSession?.endDate : '',
					version: session?.LabPracticeSession?._version ? session.LabPracticeSession._version : null,
					description: session?.LabPracticeSession?.description ? session.LabPracticeSession?.description : '',
					labSemesterInfo: {
						id: session?.LabPracticeSession?.LabSemester?.id ? session.LabPracticeSession.LabSemester.id : '',
						name: session?.LabPracticeSession?.LabSemester?.semesterName ? session.LabPracticeSession.LabSemester.semesterName : '',
						description: session?.LabPracticeSession?.LabSemester?.description ? session.LabPracticeSession.LabSemester.description : '',
					},
					labPracticeInfo: {
						id: session?.LabPracticeSession?.LabPractice?.id ? session.LabPracticeSession?.LabPractice?.id : '',
						practiceInfoName: session?.LabPracticeSession?.LabPractice?.name
							? session?.LabPracticeSession?.LabPractice?.name
							: '',
						practiceInfoDescription: session?.LabPracticeSession?.LabPractice?.description
							? session?.LabPracticeSession?.LabPractice?.description
							: '',
						practiceInfoDuration: session?.LabPracticeSession?.LabPractice?.duration
							? session?.LabPracticeSession?.LabPractice?.duration
							: 0,
						laboratory: {
							id: session?.LabPracticeSession?.LabPractice?.Laboratory?.id
								? session?.LabPracticeSession?.LabPractice?.Laboratory?.id
								: '',
							name: session?.LabPracticeSession?.LabPractice?.Laboratory?.name
								? session?.LabPracticeSession?.LabPractice?.Laboratory?.name
								: '',
							description: session?.LabPracticeSession?.LabPractice?.Laboratory?.description
								? session?.LabPracticeSession?.LabPractice?.Laboratory?.description
								: ''
						},
						labPracticeDeviceId: session?.LabPracticeSession?.LabPractice?.LabPracticeDevice?.id
					}
				}
			}));
			setUserLabPracticeSessionsList(list);
		}
		setLoading(retrievingInfo);

		return () => {
			setUserLabPracticeSessionsList(undefined);
		};
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
