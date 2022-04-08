import React from 'react';
import Row from 'react-bootstrap/Row';

import {FileInput, Button} from '../UI';
import classes from './shared.module.scss';

interface Props {
	guideFileName: string;
	downloadingFile: boolean;
	fileDownloadEnabled: boolean;
	onFileSelected: (file: File) => void;
	onFileDownload: () => void;	
}

const LabPracticeGuide: React.FC<Props> = ({guideFileName, downloadingFile, fileDownloadEnabled, onFileSelected, onFileDownload}) => {
	return (
		<Row className="section">
			<h3 className="title">Guía de práctica de laboratorio</h3>
			<Row>
				<div>
					<div className={classes.wrapper}>
						<span>{"Archivo actual:  -"}</span>
						<span>{guideFileName ?? '--'}</span>
						<Button
						loading = {downloadingFile}
						onClick={onFileDownload}
						disabled = {!fileDownloadEnabled}
						>
							Descargar
						</Button>
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
