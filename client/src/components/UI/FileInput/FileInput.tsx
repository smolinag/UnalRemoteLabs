import React from 'react';

import classes from './FileInput.module.scss';

interface Props {
	instructionText: string;
	onFileSelected: (file: File) => void;
}

const FileInput: React.FC<Props> = ({instructionText, onFileSelected}) => {

	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			onFileSelected(e.target.files[0]);
		}
	};

	return (
		<div>
			<div className={classes.wrapper}>
				<span className={classes.inputTitle}>{instructionText}:</span>
				<input type="file" onChange={handleFileInput} />
			</div>
		</div>
	);
};
export default FileInput;
