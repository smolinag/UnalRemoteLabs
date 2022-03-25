import React from 'react';
import Row from 'react-bootstrap/Row';

import {FileInput} from '../UI';
import classes from './shared.module.scss';

interface Props {
	guideFileName: string;
	onFileSelected: (file: File) => void;
}

const LabPracticeGuide: React.FC<Props> = ({guideFileName, onFileSelected}) => {
	return (
		<Row className="section">
			<h3 className="title">Guía de práctica de laboratorio</h3>
			<Row>
				<div>
					<div className={classes.wrapper}>
						<span>Archivo actual: </span>
						<span>{guideFileName ?? '--'}</span>
					</div>
				</div>
			</Row>
			<Row>
				<FileInput instructionText="Nuevo archivo" onFileSelected={(file) => onFileSelected(file)} />
			</Row>
		</Row>
	);
};
export default LabPracticeGuide;
