import React from 'react';
import Button from 'react-bootstrap/Button';

import classes from './SimpleCommand.module.scss';

interface Props {
	onClick?: () => void;
	text: string;
}

const SimpleCommand: React.FC<Props> = ({onClick, text}) => {
	return (
		<Button variant='green' className={classes.button} onClick={onClick}>
			{text}
		</Button>
	);
};

export default SimpleCommand;
