import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import {Button} from '../../components/UI';

const LabTemp: React.FC<unknown> = () => {
	const navigate = useNavigate();

	const createPractice = () => {
		navigate('/create-lab-semester', {state: {laboratoryId: 'f3094551-bdd7-411b-b2e7-721bb993e138'}});
	};

	return (
		<Container fluid>
			<Row>
				<h3 />
				<Col>
					<Button loading={false} onClick={createPractice}>
						Crear Semestre
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default LabTemp;
