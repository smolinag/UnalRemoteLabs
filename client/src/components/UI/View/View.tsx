import React from 'react';
import {Row, Col} from 'react-bootstrap';

import data from '../../../data/data.json';
import {Switch, Table} from '../index';
import classes from './View.module.scss';

interface commandListDto {
	"name": string, 
	"parameter": string, 
	"type": string, 
	"value": boolean
}

const View: React.FC<unknown> = () => {
	const [labName, setLabName] = React.useState<string>('')
	const [commandList, setCommandList] = React.useState<commandListDto[]>([])

	React.useEffect(() => {
		setLabName(data[0].name)
		setCommandList(data[0].commandlist)
	}, []);

	const test = () => {
		console.error(test);
	};

   const columns: string[] = ["Parámetros", "Valores"]

	return (
		<>
			<Row className={classes.labTitle}>
				<h3>{labName}</h3>
			</Row>
			<Row>
				<Row>
					<h4>Comandos de entrada</h4>
				</Row>
				<Row>
					<div className={classes.option}>
						{commandList.map((command) => {
							return <Switch label={command.name} state={command.value} onToggle={test} key={command.parameter} />;
						})}
					</div>
				</Row>
			</Row>
			<Row>
				<h4>Párametros de salida</h4>
				<Row>
               {
                  data[0].imagenReal && (
                     <Col md={6}>
                        <h5>Imagen tiempo real</h5>
                     </Col>
                  )
               }
					<Col md={6}>
						<h5>Datos</h5>
                  <Table
                     headers={columns}
                     data={data[0].data}
                  />
					</Col>
				</Row>
			</Row>
		</>
	);
};

export default View;
