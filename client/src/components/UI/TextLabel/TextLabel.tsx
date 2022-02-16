import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {BsQuestionCircle} from 'react-icons/bs';

import classes from './TextLabel.module.scss';

interface Props {
	placeholder: string;
	value: string | number;
	tooltip?: string;
	unit?: string;
}

const TextLabel: React.FC<Props> = ({placeholder, value, tooltip, unit}) => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.textLabelWrapper}>
				<span className={classes.textLabelTitle}>{placeholder + ':'}</span>
				<div className={classes.textLabelSubwrapper}>
					<span className={classes.textLabel}>{value}</span>
					{unit && <span className={classes.input}>{unit}</span>}
					{tooltip ? (
						<OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={<Tooltip>{tooltip}</Tooltip>}>
							<BsQuestionCircle />
						</OverlayTrigger>
					) : (
						<div style={{width: '16px'}} />
					)}
				</div>
			</div>
		</div>
	);
};

export default TextLabel;
