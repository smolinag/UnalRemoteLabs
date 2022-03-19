import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

import {LoadingContainer, Table, Button} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {useListLabPracticesQuery, useGetLaboratoryQuery} from '../../graphql/generated/schema';
import classes from './LabPracticeListView.module.scss';
import {LabPracticeData} from './types';

export interface LocationState {
	labId: string;
	labSemesterId?: string;
}

const LabPracticeListView: React.FC<unknown> = () => {
	const [labPractices, setLabPractices] = useState<LabPracticeData[]>([]);
	const [laboratoryName, setLaboratoryName] = useState<string>('');

	const navigate = useNavigate();

	const location = useLocation();
	const labId = (location.state as LocationState)?.labId;
	const labSemesterId = (location.state as LocationState)?.labSemesterId;

	const {data: labData} = useGetLaboratoryQuery({variables: {id: labId}});
	const {data: labPracticesData} = useListLabPracticesQuery({variables: {id: labId}});

	useEffect(() => {
		setLaboratoryName(labData?.getLaboratory?.name ? labData.getLaboratory.name : '');
	}, [labData]);

	useEffect(() => {
		console.warn(labPracticesData);
		if (labPracticesData?.listLabPractices) {
			const labpractices: LabPracticeData[] = labPracticesData.listLabPractices.items
				.filter((item) => !item?._deleted)
				.map((item) => {
					return {
						id: item?.id ? item.id : '',
						name: item?.name ? item.name : '',
						description: item?.description ? item?.description : '',
						duration: item?.duration ? item.duration : 0,
						version: item?._version ? item._version : 0,
						labPracticeDevice: {
							id: item?.LabPracticeDevice?.id ? item.LabPracticeDevice.id : '',
							name: item?.LabPracticeDevice?.name ? item.LabPracticeDevice.name : '',
							type: item?.LabPracticeDevice?.type ? item.LabPracticeDevice.type : ''
						}
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
				data.push([
					item.name,
					item.description,
					item.duration.toString(),
					redirectToLabPracticeSessionProgram(item.id)
				]);
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

	const redirectToLabPracticeSessionProgram = (labPracticeId: string) => {
		return (
			<a
				href=""
				onClick={() =>
					navigate('/lab-practice-session-creation', {
						state: {labPracticeId, labSemesterId}
					})
				}>
				Programar
			</a>
		);
	};

	const handleTableAction = (index: number, action: Action, row: React.ReactNode[] = []) => {
		switch (action) {
			case Action.Delete:
				console.warn('DELETE');
				break;
			case Action.DeleteAll:
				console.warn('DELETE ALL');
				break;
			case Action.Edit:
				console.log('Edit');
				navigate('/lab-practice-edition', {
					state: {labPracticeId: labPractices[index].id, labName: laboratoryName}
				})
				break;
		}
	};

	const handleLabPracticeCreation = () =>{
		navigate('/lab-practice-creation', {
			state: {labId: labId, labName: laboratoryName}
		})
	}

	return (
		<LoadingContainer loading={false}>
			<Row className="section">
				<h3 className="title">{'Prácticas de laboratorio de ' + laboratoryName}</h3>
			</Row>
			<Row className="section">
				<Col sm={8} className={classes.table}>
					<Table
						headers={getTableHeaders()}
						data={mapLabpracticesForTable(labPractices)}
						onAction={handleTableAction}
						removable
						hasRemoveAll
						editable
						overflow
						stickyHeader
						maxHeight={'400px'}
					/>
				</Col>
			</Row>
			<Row className="section">
				<div className="justifyEnd">
					<Button loading={false} onClick={handleLabPracticeCreation}>
						Crear
					</Button>
				</div>
			</Row>
		</LoadingContainer>
	);
};
export default LabPracticeListView;
