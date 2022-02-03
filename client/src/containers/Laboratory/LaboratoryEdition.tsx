import React, {useContext, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

import {LaboratoryInfo} from '../../components/Laboratory/index';
import {Button, LoadingContainer} from '../../components/UI';
import {
	useGetLaboratoryQuery,
	useListOrganizationsQuery,
	useUpdateLaboratoryMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {Laboratory, LocationState, Organization, Params} from './types';

const initialLaboratoryValue: Laboratory = {
	id: '',
	name: '',
	description: '',
	organizationId: '',
	version: null
};

const LaboratoryEdition: React.FC<unknown> = () => {
	const [laboratory, setLaboratory] = React.useState<Laboratory>(initialLaboratoryValue);
	const [organizations, setOrganizations] = React.useState<Organization[]>([]);
	const location = useLocation();
	const laboratoryId = (location.state as LocationState)?.laboratoryId;

	const {data: laboratoryInfo} = useGetLaboratoryQuery({variables: {id: laboratoryId}});
	const {data: organizationsInfo} = useListOrganizationsQuery();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [errors, setErrors] = React.useState<string[]>([]);

	const [updateLaboratory] = useUpdateLaboratoryMutation({});
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	useEffect(() => {
		if (laboratoryInfo?.getLaboratory != null) {
			const lab = laboratoryInfo.getLaboratory;

			setLaboratory({
				id: lab.id,
				name: lab.name,
				description: lab.description ? lab.description : '',
				organizationId: lab.organizationID,
				version: lab._version
			});
		}
	}, [laboratoryInfo]);

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
				const {data: laboratoryData} = await updateLaboratory({
					variables: {
						input: {
							id: laboratory.id ? laboratory.id : '',
							name: laboratory.name,
							description: laboratory.description,
							organizationID: laboratory.organizationId,
							_version: laboratory.version,
							createdBy: '13'
						}
					}
				});
				if (!laboratoryData?.updateLaboratory?.id) {
					throw Error('');
				}
				showSuccessBanner(`El laboratorio ${laboratoryData.updateLaboratory.name} fue editado exitosamente`);
				setLaboratory({
					id: laboratoryData.updateLaboratory?.id,
					name: laboratoryData.updateLaboratory?.name,
					description: laboratoryData.updateLaboratory?.description ? laboratoryData.updateLaboratory?.description : '',
					organizationId: laboratoryData.updateLaboratory?.organizationID,
					version: laboratoryData.updateLaboratory?._version
				});
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
					errors={[]}
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

export default LaboratoryEdition;
