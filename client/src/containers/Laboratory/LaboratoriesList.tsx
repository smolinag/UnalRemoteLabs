import React, {useContext} from 'react';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';

import {LaboratoriesTable} from '../../components/Laboratory';
import {Button, LoadingContainer, ModalComponent} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {Laboratory} from '../../containers/Laboratory/types';
import {useListLaboratoriesQuery, useDeleteLaboratoryMutation} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';

const LaboratoriesList: React.FC<unknown> = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = React.useState<boolean>(true);
	const [displayModal, setDisplayModal] = React.useState<boolean>(false);
	const [lab, setLab] = React.useState<Laboratory>();

	const [labs, setLabs] = React.useState<Laboratory[]>([]);
	const {data, loading: retrievingInfo} = useListLaboratoriesQuery();
	const [deleteLaboratory] = useDeleteLaboratoryMutation({});
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	let selectedIndex = 0;

	React.useEffect(() => {
		if (data && data.listLaboratorys?.items) {
			const labsList: Laboratory[]  = []
			data?.listLaboratorys?.items.forEach((obj) => {
				if (obj && !obj._deleted) {
					labsList.push({
						id: obj.id,
						name: obj.name,
						description: obj.description ? obj.description : '',
						organizationId: obj.organizationID,
						version: obj._version
					})
				}
			});
			setLabs(labsList);
		}

		setLoading(retrievingInfo);
	}, [data]);

	const handleLaboratoryAction = (index: number, action: Action) => {
		switch (action) {
			case Action.Edit:
				labs[index].id;
				navigate('/lab-edition', {state: {laboratoryId: labs[index].id}});
				break;
			case Action.Delete:
				setDisplayModal(true);
				setLab(labs[index]);
				selectedIndex = index;
				break;
		}
	};

	const handleDisplayModal = (display: boolean) => {
		setDisplayModal(display);
		setLab({
			id: '',
			name: '',
			description: '',
			organizationId: '',
			version: null
		});
	};

	const handleSaveEdit = () => {
		if (lab?.id) {
			deleteLaboratory({
				variables: {
					input: {
						id: lab?.id,
						_version: lab.version
					}
				}
			})
				.then((response) => {
					if (response.data?.deleteLaboratory?._deleted) {
						setLabs((previousState) => {
							return previousState
								.slice(0, selectedIndex)
								.concat(previousState.slice(selectedIndex + 1, labs.length + 1));
						});
					}
					setDisplayModal(false);
					showSuccessBanner(`El laboratorio ${lab.name} fue eliminado exitosamente`);
				})
				.catch((error) => {
					setDisplayModal(false);
					showErrorBanner(`No se pudo eliminar el laboratprio ${lab.name}`);
				});
		}
	};

	return (
		<LoadingContainer loading={loading}>
			{
				<ModalComponent
					display={displayModal}
					onDisplay={handleDisplayModal}
					onSave={handleSaveEdit}
					title={lab?.name ? lab?.name : ''}>
					<div>Está seguro de borrar el laboratorio {lab?.name}?</div>
				</ModalComponent>
			}
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
