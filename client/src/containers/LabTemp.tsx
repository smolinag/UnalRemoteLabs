import React from 'react';
import {Container, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import {Button} from '../components/UI';

const LabTemp: React.FC<unknown> = () => {
	const navigate = useNavigate();

	const createPractice = (path: string) => {
		navigate(path, {state: {laboratoryId: 'f3094551-bdd7-411b-b2e7-721bb993e138'}});
	};

	return (
		<Container fluid>
			<Row>
				<Button loading={false} onClick={() => createPractice('/labs')}>
					Laboratorios
				</Button>

				<Button loading={false} onClick={() => createPractice('/lab-semesters')}>
					Listar Semestres
				</Button>

				<Button loading={false} onClick={() => createPractice('/create-lab-practice')}>
					Crear Práctica de Laboratorio
				</Button>

				<Button loading={false} onClick={() => createPractice('/create-lab-practice-session')}>
					Crear Sesión de Práctica de Laboratorio
				</Button>

				<Button loading={false} onClick={() => createPractice('/user-labs-sessions')}>
					Sesiones de prácticas de laboratorios
				</Button>

				<Button loading={false} onClick={() => createPractice('/user-labs-sessions')}>
					Sesiones de prácticas de laboratorios
				</Button>
			</Row>
		</Container>
	);
};

export default LabTemp;
