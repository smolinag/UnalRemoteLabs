import React, {useState, useContext, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import LabSessionData from '../../components/LabSessionProgramming/LabSessionData';
import {LoadingContainer, Button} from '../../components/UI';
import {useCreateLabPracticeSessionMutation} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import classes from './LabSessionProgrammingView.module.scss';
import {LabSessionInfo} from './types';

const initialLabSessionInfo: LabSessionInfo = {
	startDate: new Date(),
	endDate: new Date(),
	description: '',
	labPracticeName: '',
	duration: '15',
	semesterId: 1
};

const LabSessionProgrammingView: React.FC<unknown> = () => {
	const [labSessionInfo, setSessionInfo] = useState<LabSessionInfo>(initialLabSessionInfo);
	const [loading, setLoading] = useState<boolean>(false);

  const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

  const [createLabPracticeSession] = useCreateLabPracticeSessionMutation({}); 

	useEffect(() => {
	})

	const onSessionDescriptionChange = (value: string) => {
		setSessionInfo((previousState) => {
			return {...previousState, description: value};
		});
	};

	const onSessionStartDateChange = (value: Date) => {
		setSessionInfo((previousState) => {
			return {...previousState, startDate: value};
		});
	};

  const createLabSession = async () => {
    setLoading(true);
    try {
      const {data: labPracticeData} = await createLabPracticeSession({
        variables: {
          input: {
            labpracticeID: '1',
            description: labSessionInfo.description,
            startDate: labSessionInfo.startDate,
            endDate: new Date(labSessionInfo.startDate.getTime() + (parseInt(labSessionInfo.duration) * 60000)),
            createdBy: '1'
          }
        }
      });
      if (!labPracticeData?.createLabPracticeSession?.id) {
        throw Error('');
      }

      showSuccessBanner(`La sesión del laboratorio ${labSessionInfo.labPracticeName} fue creada exitosamente`);
    } catch (ex){
      showErrorBanner(`Error en la creación de la sesión del laboratorio ${labSessionInfo.labPracticeName}`);
    } finally {
      setLoading(false);
    }
  };

	return (
		<Container fluid>
			<LoadingContainer loading={loading}>
				<Row className="section">
					<LabSessionData
						sessionInfo={labSessionInfo}
						onDescriptionChange={onSessionDescriptionChange}
						onStartDateChange={onSessionStartDateChange}
					/>
				</Row>
        <Row className="section">
					<h3 className="title" />
					<Col className={classes.justifyEnd}>
						<Button loading={loading} onClick={createLabSession}>
							Guardar
						</Button>
					</Col>
				</Row>
			</LoadingContainer>
		</Container>
	);
};
export default LabSessionProgrammingView;
