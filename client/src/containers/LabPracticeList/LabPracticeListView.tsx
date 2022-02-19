import React, {useState, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

import {LoadingContainer, Table} from '../../components/UI';
import {useListLabPracticesQuery} from '../../graphql/generated/schema';
import classes from './LabPracticeListView.module.scss';
import {LabPracticeData} from './types';

export interface LocationState {
	labId: string;
	labName: string;
}

const LabPracticeListView: React.FC<unknown> = () => {
	const [labPractices, setLabPractices] = useState<LabPracticeData[]>([]);

	const location = useLocation();
	const labId = (location.state as LocationState)?.labId;
	const labName = (location.state as LocationState)?.labName;

	const {data: labPracticesData} = useListLabPracticesQuery({variables: {id: labId}});

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
		const data: string[][] = [];
		labpractices.forEach((item) => {
			data.push([item.name, item.description, item.duration.toString()]);
		});
		return data;
	}

	// const handleTableAction = (index: number, action: Action, row: React.ReactNode[] = []) => {
	// 	switch (action) {
	// 		case Action.Delete:
	// 			console.warn("DELETE")
	// 			break;
	// 		case Action.DeleteAll:
	// 			console.warn("DELETE ALL")
	// 			break;
	// 	}
	// };

	return (
		<LoadingContainer loading={false}>
			<Row className="section">
				<h3 className="title">{"Prácticas de laboratorio de " + labName}</h3>
			</Row>
			<Row className="section">
				<Col sm={8} className={classes.table}>
					<Table
						headers={['Nombre', 'Descripción', 'Duración']}
						data={mapLabpracticesForTable(labPractices)}
						removable
						hasRemoveAll
						editable
						overflow
						stickyHeader
						maxHeight={'400px'}
					/>
				</Col>
			</Row>
		</LoadingContainer>
	);
};
export default LabPracticeListView;
