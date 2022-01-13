import React from 'react';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';

import {LaboratoriesTable} from '../../components/Laboratory';
import {Button, LoadingContainer} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {Laboratory} from '../../containers/Laboratory/types';
import {useListLaboratoriesQuery} from '../../graphql/generated/schema';

const LaboratoriesList: React.FC<unknown> = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = React.useState<boolean>(true);
	const [labs, setLabs] = React.useState<Laboratory[]>([]);
	const {data} = useListLaboratoriesQuery();

	React.useEffect(() => {
		setLoading(true);

		if (data && data.listLaboratorys?.items) {
			const labsList: Laboratory[] = data?.listLaboratorys?.items.map((obj) => {
				return {
					id: obj.id,
					name: obj.name,
					description: obj.description ? obj.description : '',
					organizationId: obj.organizationID,
					version: obj._version
				};
			});
			setLabs(labsList);
		}

		setLoading(false);
	}, [data]);

	const handleLaboratoryAction = (index: number, action: Action) => {
		switch (action) {
			case Action.Edit:
				labs[index].id;
				navigate('/lab-edition', {state: {laboratoryId: labs[index].id}});
				break;
		}
	};

	return (
		<LoadingContainer loading={loading}>
			<Row className="section">
				<h3 className="title">Laboratorios</h3>
			</Row>
			<Row className="section">
				<LaboratoriesTable data={labs} onAction={handleLaboratoryAction} />
			</Row>
			<Row className="section">
				<div className="justifyEnd">
					<Button loading={false} onClick={() => navigate('/lab-creation')}>
						Crear
					</Button>
				</div>
			</Row>
		</LoadingContainer>
	);
};

export default LaboratoriesList;
