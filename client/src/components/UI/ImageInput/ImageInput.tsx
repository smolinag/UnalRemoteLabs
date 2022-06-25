import React from 'react';

import classes from './ImageInput.module.scss';

interface Props {
	// instructionText: string;
	onFileSelected: (file: File) => void;
}

const ImageInput: React.FC<Props> = ({onFileSelected}) => {
	const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			onFileSelected(e.target.files[0]);
		}
	};

	return <input className={classes.inputTitle} type="file" accept="image/*" onChange={handleFileInput} />;
};
export default ImageInput;
