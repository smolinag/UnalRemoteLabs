import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import {Button} from '../../components/UI';

const LabTemp: React.FC<unknown> = () => {
	const navigate = useNavigate();

	const createPractice = (path: string) => {
		navigate(path, {state: {laboratoryId: 'f3094551-bdd7-411b-b2e7-721bb993e138'}});
	};

	return (
		<Container fluid>
			<Row>
				<Col>
					<Button loading={false} onClick={() => createPractice('/create-lab-semester')}>
						Crear Semestre
					</Button>
				</Col>
				<Col>
					<Button loading={false} onClick={() => createPractice('/labs')}>
						Laboratorios
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default LabTemp;
