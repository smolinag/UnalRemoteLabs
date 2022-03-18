import React from 'react';
import Button from 'react-bootstrap/Button';

import classes from './SimpleCommand.module.scss';

interface Props {
	onExecute: () => void;
	label: string;
}

const SimpleCommand: React.FC<Props> = ({onExecute, label}) => {
	return (
		<div style={{margin: '0px 8px', textAlignLast:'center', maxWidth: "150px"}}>
				<Button variant="green" className={classes.button} onClick={onExecute}>
					{label}
				</Button>
		</div>
	);
};

export default SimpleCommand;
