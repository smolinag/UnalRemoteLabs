import React, {useState, useEffect, useContext} from 'react';
import {Row, Col} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

import {LoadingContainer, Table, Button, ModalComponent} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {
	useListLabPracticesQuery,
	useGetLaboratoryQuery,
	useDeleteLabPracticeMutation,
	useDeleteLabPracticeCommandMutation,
	useDeleteLabPracticeOutputMutation,
	useDeleteLabPracticeParameterMutation,
	useListLabPracticeCommandsLazyQuery,
	useListLabPracticeOutputsLazyQuery
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import classes from './LabPracticeListView.module.scss';
import {LabPracticeData} from './types';

export interface LocationState {
	labId: string;
	labSemesterId?: string;
}

const LabPracticeList: React.FC = () => {
	const [labPractices, setLabPractices] = useState<LabPracticeData[]>([]);
	const [laboratoryName, setLaboratoryName] = useState<string>('');
	const [displayModal, setDisplayModal] = React.useState<boolean>(false);
	const [selLabPractice, setSelLabPractice] = useState<LabPracticeData | null>(null);

	const navigate = useNavigate();

	const location = useLocation();
	const labId = (location.state as LocationState)?.labId;
	const labSemesterId = (location.state as LocationState)?.labSemesterId;

	const {data: labData} = useGetLaboratoryQuery({variables: {id: labId}});
	const {data: labPracticesData} = useListLabPracticesQuery({variables: {id: labId}, fetchPolicy: 'network-only'});

	const [listLabPracticeCommands] = useListLabPracticeCommandsLazyQuery({});
	const [listLabPracticeOutputs] = useListLabPracticeOutputsLazyQuery({});

	const [deleteLabPractice] = useDeleteLabPracticeMutation({});
	const [deleteLabPracticeCommand] = useDeleteLabPracticeCommandMutation({});
	const [deleteLabPracticeParameter] = useDeleteLabPracticeParameterMutation({});
	const [deleteLabPracticeOutput] = useDeleteLabPracticeOutputMutation({});

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	useEffect(() => {
		setLaboratoryName(labData?.getLaboratory?.name ? labData.getLaboratory.name : '');
	}, [labData]);

	useEffect(() => {
		if (labPracticesData?.listLabPractices) {
			const labpractices: LabPracticeData[] = labPracticesData.listLabPractices.items
				.filter((item) => !item?._deleted)
				.map((item) => {
					return {
						id: item?.id ? item.id : '',
						name: item?.name ? item.name : '',
						description: item?.description ? item?.description : '',
						duration: item?.duration ? item.duration : 0,
						version: item?._version ? item._version : 0
					};
				});
			setLabPractices(labpractices);
		}
	}, [labPracticesData]);

	const mapLabpracticesForTable = (labpractices: Array<LabPracticeData>) => {
		const data: string | React.ReactNode[][] = [];
		labpractices.forEach((item) => {
			//If there is a semester selected show program button
			if (labSemesterId) {
				data.push([item.name, item.description, item.duration.toString(), redirectToLabPracticeSessionProgram(item)]);
			} else {
				data.push([item.name, item.description, item.duration.toString()]);
			}
		});
		return data;
	};

	const getTableHeaders = () => {
		const headers = ['Nombre', 'Descripción', 'Duración'];
		if (labSemesterId) {
			headers.push('Programar');
		}
		return headers;
	};

	const redirectToLabPracticeSessionProgram = (labPractice: LabPracticeData) => {
		return (
			<p
				className="links"
				onClick={() =>
					navigate('/lab-practice-session-creation', {
						state: {
							startDate: new Date(),
							endDate: new Date(),
							semesterId: labSemesterId,
							description: "",
							labPractice: {id: labPractice.id, name: labPractice.name, duration: labPractice.duration}
						}
					})
				}>
				Programar
			</p>
		);
	};

	const deleteLabPracticeFunc = async (labPracticeId: string, labPracticeVersion: number | null) => {
		try {
			const delPracticeAns = await deleteLabPractice({
				variables: {
					input: {
						id: labPracticeId,
						_version: labPracticeVersion
					}
				}
			});
			if (delPracticeAns.errors || !delPracticeAns.data?.deleteLabPractice?._deleted) {
				console.error('Error deleting labPractice with Id:' + labPracticeId);
				return false;
			} else {
				//Query linked Elements to delete them
				//LabPracticeCommands
				const {data: commandsData, error: commandsErrors} = await listLabPracticeCommands({
					variables: {id: labPracticeId}
				});
				//LabPracticeOutputs
				const {data: outputsData, error: outputsErrors} = await listLabPracticeOutputs({
					variables: {id: labPracticeId}
				});

				//Delete linked elements
				//LabPracticeOutput
				let outputPromises;
				if (outputsData && outputsData.listLabPracticeOutputs && !outputsErrors) {
					outputPromises = outputsData.listLabPracticeOutputs.items.map(async (item) => {
						if (item) {
							return await deleteLabPracticeOutput({variables: {input: {id: item.id, _version: item._version}}});
						}
					});
				} else {
					return false;
				}

				//LabPracticeCommand and LabPracticeParameter
				let commandPromises;
				let parameterPromises;
				if (commandsData && commandsData.listLabPracticeCommands && !commandsErrors) {
					commandPromises = commandsData.listLabPracticeCommands.items.map(async (item) => {
						if (item) {
							return await deleteLabPracticeCommand({variables: {input: {id: item.id, _version: item._version}}});
						}
					});
					parameterPromises = commandsData.listLabPracticeCommands.items.map((command) => {
						if (command && command.LabPracticeParameters) {
							return command.LabPracticeParameters.items.map(async (param) => {
								if (param) {
									return await deleteLabPracticeParameter({
										variables: {input: {id: param.id, _version: param._version}}
									});
								}
							});
						}
					});
					await Promise.all([commandPromises, parameterPromises, outputPromises]);
					return true;
				} else {
					return false;
				}
			}
		} catch (e) {
			console.error('Error deleting labPractice with Id:' + labPracticeId);
			return false;
		}
	};

	const handleTableAction = async (index: number, action: Action, row: React.ReactNode[] = []) => {
		switch (action) {
			case Action.Delete: {
				setSelLabPractice(labPractices[index]);
				setDisplayModal(true);

				break;
			}
			case Action.DeleteAll:
				console.warn('DELETE ALL');
				break;
			case Action.Edit:
				navigate('/lab-practice-edition', {
					state: {labPracticeId: labPractices[index].id, labName: laboratoryName, labId: labId}
				});
				break;
		}
	};

	const handleLabPracticeCreation = () => {
		navigate('/lab-practice-creation', {
			state: {labId: labId, labName: laboratoryName}
		});
	};

	const handleDisplayModal = () => {
		setDisplayModal(false);
	};

	const handleAcceptModal = async () => {
		if (selLabPractice) {
			const delAns = await deleteLabPracticeFunc(selLabPractice.id, selLabPractice.version);
			if (delAns) {
				showSuccessBanner(`La práctica ${selLabPractice.name} fue eliminada exitosamente`);
			} else {
				showErrorBanner(`La práctica ${selLabPractice.name} no pudo ser eliminada de manera exitosa`);
			}
			setDisplayModal(false);
		}
	};

	return (
		<LoadingContainer loading={false}>
			{
				<ModalComponent
					display={displayModal}
					onDisplay={handleDisplayModal}
					onSave={handleAcceptModal}
					title={selLabPractice?.name ? selLabPractice.name : ''}>
					<div>Está seguro de borrar la Práctica de Laboratorio {selLabPractice?.name}?</div>
				</ModalComponent>
			}
			<Row className="section">
				<h3 className="title">{'Prácticas de laboratorio de ' + laboratoryName}</h3>
			</Row>
			<Row className="section">
				<Col sm={8} className={classes.table}>
					<Table
						headers={getTableHeaders()}
						data={mapLabpracticesForTable(labPractices)}
						onAction={handleTableAction}
						removable={!labSemesterId}
						editable={!labSemesterId}
						overflow
						stickyHeader
						maxHeight={'400px'}
					/>
				</Col>
			</Row>
			{!labSemesterId ? (
				<Row className="section">
					<div className="justifyEnd">
						<Button loading={false} onClick={handleLabPracticeCreation}>
							Crear
						</Button>
					</div>
				</Row>
			) : (
				<></>
			)}
		</LoadingContainer>
	);
};
export default LabPracticeList;
