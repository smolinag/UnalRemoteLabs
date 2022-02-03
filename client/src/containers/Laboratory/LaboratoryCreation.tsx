import React, {useContext, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import {LaboratoryInfo} from '../../components/Laboratory/index';
import {Button, LoadingContainer} from '../../components/UI';
import {useListOrganizationsQuery, useCreateLaboratoryMutation} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {Laboratory, Organization, Params} from './types';

const initialLaboratoryValue: Laboratory = {
	name: '',
	description: '',
	organizationId: '',
	version: null
};

const LaboratoryCreation: React.FC<unknown> = () => {
	const navigate = useNavigate();

	const [laboratory, setLaboratory] = React.useState<Laboratory>(initialLaboratoryValue);
	const [organizations, setOrganizations] = React.useState<Organization[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [errors, setErrors] = React.useState<string[]>([]);

	const {data: organizationsInfo} = useListOrganizationsQuery();
	const [createLaboratory] = useCreateLaboratoryMutation({});
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	useEffect(() => {
		if (organizationsInfo?.listOrganizations != null) {
			const organizationsList: Organization[] = [];

			organizationsInfo.listOrganizations.items.forEach((obj) => {
				if (obj) {
					organizationsList.push({
						id: obj.id,
						name: obj.name
					});
				}
			});

			setOrganizations(organizationsList);
		}
	}, [organizationsInfo]);

	const handleInfoChange = (value: string, id: string) => {
		setLaboratory((previousState) => {
			switch (id) {
				case Params.Name:
					return {...previousState, name: value};
				case Params.Description:
					return {...previousState, description: value};
				case Params.Organization:
					return {...previousState, organizationId: value};
				default:
					return previousState;
			}
		});
	};

	const checkErrorMessage = () => {
		let hasError = false;

		if (laboratory.name.length === 0 || laboratory.organizationId.length === 0) {
			hasError = true;
		}

		setErrors((previousState: string[]) => {
			const notName = errors.filter((error) => error === Params.Name).length === 1;
			const notOrganization = errors.filter((error) => error === Params.Organization).length === 1;

			if (!notName && laboratory.name.length === 0) {
				previousState.push(Params.Name);
			} else if (notName && laboratory.name.length > 0) {
				const index = errors.findIndex((error) => error === Params.Name);
				return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
			}

			if (!notOrganization && laboratory.organizationId.length === 0) {
				previousState.push(Params.Organization);
			} else if (notOrganization && laboratory.organizationId.length > 0) {
				const index = errors.findIndex((error) => error === Params.Organization);
				return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
			}

			return [...previousState];
		});

		return hasError;
	};

	const handleSave = async () => {
		const hasError = checkErrorMessage();
		if (!hasError) {
			setLoading(true);
			try {
				const {data: laboratoryData} = await createLaboratory({
					variables: {
						input: {
							name: laboratory.name,
							description: laboratory.description,
							organizationID: laboratory.organizationId,
							createdBy: '12'
						}
					}
				});

				if (!laboratoryData?.createLaboratory?.id) {
					throw Error('');
				}
				showSuccessBanner(`El laboratorio ${laboratory.name} fue creado exitosamente`);
				setLaboratory({
					name: laboratoryData.createLaboratory?.name,
					description: laboratoryData.createLaboratory?.description ? laboratoryData.createLaboratory?.description : '',
					organizationId: laboratoryData.createLaboratory?.organizationID,
					version: laboratoryData.createLaboratory?._version
				});
				navigate('/lab-edition', {state: {laboratoryId: laboratoryData.createLaboratory?.id}});
			} catch (error) {
				showErrorBanner(`Error en la creación del laboratorio ${laboratory.name}`);
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<Container fluid>
			<LoadingContainer loading={loading}>
				<LaboratoryInfo
					laboratory={laboratory}
					organizations={organizations}
					onValueChange={handleInfoChange}
					errors={errors}
				/>
				<div className="justifyEnd">
					<Button loading={false} onClick={() => handleSave()}>
						Guardar
					</Button>
				</div>
			</LoadingContainer>
		</Container>
	);
};

export default LaboratoryCreation;
