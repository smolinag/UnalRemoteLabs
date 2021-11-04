import React from 'react';
import {Row, Col} from 'react-bootstrap';

import data2 from '../../../data/data.json';
import {useGetPracticeInfoQuery} from '../../../graphql/generated/schema'
import {Switch, Table} from '../index';
import classes from './View.module.scss';

interface commandListDto {
	"name": string, 
	"parameter": string, 
	"type": string, 
	"value": boolean
}

const View: React.FC<unknown> = () => {
	const [commandList, setCommandList] = React.useState<commandListDto[]>([])
	const {data} = useGetPracticeInfoQuery();
	// const {data: commands } = useGetLabCommandsListkQuery();
	
	React.useEffect(() => {
		setCommandList(data2[0].commandlist)
		console.warn(data)
	}, [data]);

	const test = () => {
		console.warn(test);
	};

   const columns: string[] = ["Parámetros", "Valores"]

	return (
		<>
			<Row className={classes.section}>
				<h3 className={classes.title}>{data?.getLabPractice?.name}</h3>
				<span>Descripción: {data?.getLabPractice?.description}</span>
				<span>Duración: {data?.getLabPractice?.duration ? data?.getLabPractice?.duration : "-"} segundos</span>
			</Row>
			<Row className={classes.section}>
				<h4 className={classes.title}>Comandos de entrada</h4>
				<Row>
					<div className={classes.commands}>
						{commandList.map((command) => {
							return <div key={command.parameter} className={classes.command}>
								<Switch label={command.name} state={command.value} onToggle={test}/>
								</div>
						})}
					</div>
				</Row>
			</Row>
			<Row className={classes.section}>
				<h4 className={classes.title}>Párametros de salida</h4>
				<Row>
               {
                  data2[0].imagenReal && (
                     <Col md={6}>
                        <h5>Imagen tiempo real</h5>
                     </Col>
                  )
               }
					<Col md={6}>
						<h5>Datos</h5>
                  <Table
                     headers={columns}
                     data={data2[0].data}
                  />
					</Col>
				</Row>
			</Row>
		</>
	);
};

export default View;
