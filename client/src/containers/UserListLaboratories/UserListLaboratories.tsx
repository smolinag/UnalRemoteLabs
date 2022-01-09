import React from 'react';
import Row from 'react-bootstrap/Row';

import {LoadingContainer} from '../../components/UI';

const UserListLaboratories: React.FC<unknown> = () => {
	const [loading, setLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<LoadingContainer loading={loading}>
			<Row className="section">
				<h3 className="title">Laboratorios</h3>
			</Row>
			<Row className="section">
				<h3 className="title">Laboratorios</h3>
			</Row>
		</LoadingContainer>
	);
};

export default UserListLaboratories;
