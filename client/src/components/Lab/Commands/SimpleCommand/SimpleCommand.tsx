import React from 'react';
import Button from 'react-bootstrap/Button';

import classes from './SimpleCommand.module.scss';

interface Props {
	onExecute: () => void;
	label: string;
}

const SimpleCommand: React.FC<Props> = ({onExecute, label}) => {
	return (
		<Button variant="green" className={classes.button} onClick={onExecute}>
			{label}
		</Button>
	);
};

export default SimpleCommand;
