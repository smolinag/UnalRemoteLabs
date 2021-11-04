import React from 'react';

import classes from './Switch.module.scss';

interface Props {
	label: string;
	state: boolean;
	onToggle: (value: boolean) => void;
}

const Switch: React.FC<Props> = ({label, onToggle, state}: Props) => {
	return (
		<div className={classes.wrapper}>
			<p onClick={() => onToggle(!state)}>{label}:</p>
			<button className={state ? classes.active : ''} onClick={() => onToggle(!state)}>
				<div className={classes.indicator} />
			</button>
		</div>
	);
};

export default Switch;
