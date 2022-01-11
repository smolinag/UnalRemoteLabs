import React from 'react';
import Row from 'react-bootstrap/Row';

import {LoadingContainer} from '../../components/UI';
import {LabsCards} from '../../components/UsersLabsView';
import {UserLabPracticeSession} from '../../containers/UserListLaboratories/types';
import {useGetUserLabPracticesQuery} from '../../graphql/generated/schema';

export const DUMMY_DATA: UserLabPracticeSession[] = [
	{
		id: '3cb63bd4-ffae-4ed6-b1ca-c54f0773a573',
		sessionStartDate: '',
		sessionEndDate: '',
		labPracticeSession: {
			id: '93a1909e-eef3-421c-9cca-22396177f39c',
			startDate: '2022-01-10T16:25:00-05:00',
			endDate: '2022-01-10T17:00:00-05:00',
			labPracticeInfo: {
				id: '6e2bdc2c-7e30-40b9-99ef-ea7c1d19a8cf',
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
// const USER_ID = 'a0a202e4-10c9-4c51-bbc3-905ee73818ac';

const UserListLaboratories: React.FC<unknown> = () => {
   const [loading, setLoading] = React.useState<boolean>(true)
   const {data, loading: retrievingInfo} = useGetUserLabPracticesQuery();

   console.warn(data)

   React.useEffect(() => {
      console.warn(retrievingInfo)
      
      setLoading(false)
   }, [])

	return (
		<LoadingContainer loading={loading}>
			<Row className="section">
				<h3 className="title">Laboratorios</h3>
			</Row>
			<Row className="section">
				<LabsCards laboratories={DUMMY_DATA} />
			</Row>
		</LoadingContainer>
	);
};

export default UserListLaboratories;
