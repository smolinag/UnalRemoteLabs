import React from 'react';

import { Maybe } from '../../../graphql/generated/schema';
import classes from './Switch.module.scss';

interface Props {
	label: Maybe<string> | undefined;
	state: boolean  | undefined | null;
	onToggle: (value: boolean) => void;
}

const Switch: React.FC<Props> = ({label, onToggle, state}: Props) => {
	return (
		<div className={classes.wrapper}>
			<p onClick={() => onToggle(!state)}>{label}:</p>
			<button className={state ? `${classes.active} ${classes.button}` : '' } onClick={() => onToggle(!state)}>
				<div className={classes.indicator} />
			</button>
		</div>
	);
};

export default Switch;
