import React from 'react';
import Row from 'react-bootstrap/Row';

import {FileInput} from '../UI';

interface Props {
	guideFileName: string;
	onFileSelected: (file: File) => void;
}

const LabPracticeGuide: React.FC<Props> = ({guideFileName, onFileSelected}) => {
	return (
		<Row className="section">
			<h3 className="title">Guía de práctica de laboratorio</h3>
			<Row>
				<span>Archivo actual: </span>
				<span>{guideFileName}</span>
			</Row>
			<Row>
				<FileInput instructionText="Nuevo archivo" onFileSelected={(file) => onFileSelected(file)} />
			</Row>
		</Row>
	);
};
export default LabPracticeGuide;
