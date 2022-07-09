import React from 'react';
import Row from 'react-bootstrap/Row';
import {useLocation} from 'react-router-dom';

import {LoadingContainer} from '../../components/UI';
import {UserLabPracticeSessionsTable} from '../../components/UsersLabsView';
import {
	useGetLaboratoryQuery,
	useListLabPracticeSessionsQuery,
	useListUserLabPracticeSessionsQuery
} from '../../graphql/generated/schema';
import {initialLaboratoryValue} from '../Laboratory/LaboratoryEdition';
import {Laboratory} from '../Laboratory/types';
import {LocationState} from '../LabPracticeList/LabPracticeList';
import {LabPracticeSession, UserLabPracticeSession} from './types';

const UserLabPracticeSessionsList: React.FC = () => {
	const [loading, setLoading] = React.useState<boolean>(true);
	const [userLabPracticeSessionsList, setUserLabPracticeSessionsList] = React.useState<UserLabPracticeSession[]>([]);
	const [labPracticeSessionsList, setLabPracticeSessionsList] = React.useState<LabPracticeSession[]>([]);
	const [laboratory, setLaboratory] = React.useState<Laboratory>(initialLaboratoryValue);

	const location = useLocation();
	const labId = (location.state as LocationState)?.labId;
	const labSemesterId = (location.state as LocationState)?.labSemesterId;
	const userId = (location.state as LocationState)?.userId;

	if (!userId && labSemesterId) {
		useListLabPracticeSessionsQuery({
			variables: {labSemesterID: labSemesterId},
			fetchPolicy: 'network-only',
			onCompleted: (data) => {
				const receivedList = data?.listLabPracticeSessions?.items.filter(
					(session) => !session?._deleted && !session?.LabPractice?._deleted
				);

				if (receivedList && receivedList.length > 0) {
					const list: LabPracticeSession[] = receivedList.map((session) => ({
						id: session?.id ? session.id : '',
						startDate: session?.startDate ? session.startDate : '',
						endDate: session?.endDate ? session.endDate : '',
						version: session?._version ? session._version : null,
						description: session?.description ? session.description : '',
						labSemesterInfo: {
							id: session?.LabSemester?.id ? session.LabSemester.id : '',
							name: session?.LabSemester?.semesterName ? session.LabSemester.semesterName : '',
							description: session?.LabSemester?.description ? session.LabSemester.description : '',
							laboratory: session?.LabSemester?.Laboratory?.name
						},
						labPracticeInfo: {
							id: session?.LabPractice?.id ? session.LabPractice?.id : '',
							practiceInfoName: session?.LabPractice?.name ? session?.LabPractice?.name : '',
							practiceInfoDescription: session?.LabPractice?.description ? session?.LabPractice?.description : '',
							practiceInfoDuration: session?.LabPractice?.duration ? session?.LabPractice?.duration : 0,
							laboratory: {
								id: session?.LabPractice?.Laboratory?.id ? session?.LabPractice?.Laboratory?.id : '',
								name: session?.LabPractice?.Laboratory?.name ? session?.LabPractice?.Laboratory?.name : '',
								description: session?.LabPractice?.Laboratory?.description
									? session?.LabPractice?.Laboratory?.description
									: ''
							},
							labPracticeDeviceId: session?.LabPractice?.LabPracticeDeviceId
								? session.LabPractice.LabPracticeDeviceId
								: ''
						}
					}));
					setLabPracticeSessionsList(list);
				}

				setLoading(false);
			}
		});

		useGetLaboratoryQuery({
			variables: {id: labId},
			onCompleted: (data) => {
				if (data?.getLaboratory != null) {
					const lab = data.getLaboratory;

					setLaboratory({
						id: lab.id,
						name: lab.name,
						description: lab.description ? lab.description : '',
						organizationId: lab.organizationID,
						version: lab._version
					});
				}
			}
		});
	} else if (userId) {
		useListUserLabPracticeSessionsQuery({
			variables: {id: userId ? userId : ''},
			fetchPolicy: 'network-only',
			onCompleted: (data) => {
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
								name: session?.LabPracticeSession?.LabSemester?.semesterName
									? session.LabPracticeSession.LabSemester.semesterName
									: '',
								description: session?.LabPracticeSession?.LabSemester?.description
									? session.LabPracticeSession.LabSemester.description
									: ''
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
								labPracticeDeviceId: session?.LabPracticeSession?.LabPractice?.LabPracticeDeviceId
							}
						}
					}));

					setUserLabPracticeSessionsList(list);
				}

				setLoading(false);
			}
		});
	}

	const handleSuccessSessionDelete = (session: LabPracticeSession) => {
		//Remove deleted session from labPracticeSessionsList state
		setLabPracticeSessionsList(labPracticeSessionsList.filter((item) => item.id !== session.id));
	};

	return (
		<LoadingContainer loading={loading}>
			<Row className="section">
				<h3 className="title">Sesiones de prácticas {`del laboratorio ${laboratory.name}`}</h3>
			</Row>
			<Row className="section">
				<UserLabPracticeSessionsTable
					userLabPracticeSession={userLabPracticeSessionsList}
					labPracticeSession={labPracticeSessionsList}
					onSuccessSessionDelete={handleSuccessSessionDelete}
				/>
			</Row>
		</LoadingContainer>
	);
};

export default UserLabPracticeSessionsList;
