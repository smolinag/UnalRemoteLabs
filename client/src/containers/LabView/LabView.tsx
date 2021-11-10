import React from 'react';
import {Row, Col} from 'react-bootstrap';

import {Switch, Table, LoadingContainer} from '../../components/UI/index';
import dummyData from '../../dummyData/dummyData.json';
import {
	useGetPracticeInfoQuery,
	useOnUpdateLabPracticeSessionCommandSubscription,
	useUpdateLabPracticeSessionCommandMutation,
	useOnUpdateLabPracticeSessionOutputSubscription
} from '../../graphql/generated/schema';
import classes from './LabView.module.scss';

interface commandListDto {
	name: string;
	parameter: string;
	type: string;
	value: boolean;
}

const LabView: React.FC<unknown> = () => {
	const [commandList] = React.useState<commandListDto[]>(dummyData[0].commandlist);
	const {data: practiceInfo, loading} = useGetPracticeInfoQuery({
		variables: {id: '7f735a8d-2d46-466f-a40e-49a32d891654'}
	});
	const {data} = useOnUpdateLabPracticeSessionCommandSubscription();
	const {data: dataOuput} = useOnUpdateLabPracticeSessionOutputSubscription();

	const [updatelabPracticeSessionCommand] = useUpdateLabPracticeSessionCommandMutation({});

	React.useEffect(() => {
		console.warn(data);
	}, [data]);

	React.useEffect(() => {
		console.warn(dataOuput);
	}, [dataOuput]);

	const handleSwitchEvent = () => {
		// Swtich event
		updatelabPracticeSessionCommand({
			variables: {
				input: {
					id: '61c77c51-ca91-494e-bd09-e35286414599',
					parameters: JSON.stringify({
						name: 'start',
						params: {name: 'speed', value: 16}, 
						uuid: '11c77c51-ca91-494e-bd09-e35286414500'
					})
				}
			}
		});
	};

	const columns: string[] = ['Salida', 'Valores'];

	return (
		<LoadingContainer loading={loading}>
			<Row className={classes.section}>
				<h3 className={classes.title}>{practiceInfo?.getLabPractice?.name}</h3>
				<span>Descripción: {practiceInfo?.getLabPractice?.description}</span>
				<span>
					Duración: {practiceInfo?.getLabPractice?.duration ? practiceInfo?.getLabPractice?.duration : '-'} segundos
				</span>
			</Row>
			<Row className={classes.section}>
				<h4 className={classes.title}>Comandos de entrada</h4>
				<Row>
					<div className={classes.commands}>
						{commandList.map((command) => {
							return (
								<div key={command.parameter} className={classes.command}>
									<Switch label={command.name} state={command.value} onToggle={handleSwitchEvent} />
								</div>
							);
						})}
					</div>
				</Row>
			</Row>
			<Row className={classes.section}>
				<h4 className={classes.title}>Párametros de salida</h4>
				<Row>
					{dummyData[0].imagenReal && (
						<Col md={6}>
							<h5>Imagen tiempo real</h5>
						</Col>
					)}
					<Col md={6}>
						<h5>Datos</h5>
						<Table headers={columns} data={dummyData[0].data} overflow stickyHeader maxHeight={'400px'} />
					</Col>
				</Row>
			</Row>
		</LoadingContainer>
	);
};

export default LabView;
