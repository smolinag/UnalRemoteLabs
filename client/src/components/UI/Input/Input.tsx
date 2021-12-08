import React from 'react';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {BsQuestionCircle} from 'react-icons/bs';

import generalClasses from '../../Lab/shared.module.scss';
import classes from './Input.module.scss';

interface Props {
	id: string;
	type: string;
	placeholder: string;
	disabled?: boolean;
	required?: boolean;
	value: string | number;
	tooltip?: string;
	unit?: boolean;
	onValueChange?: (value: string, id: string) => void;
}

const Input: React.FC<Props> = ({id, type, placeholder, disabled, required, value, tooltip, unit, onValueChange}) => {
	const renderTooltip = () => <Tooltip>{tooltip}</Tooltip>;

	const valueChange = (value: string, id: string): void => {
		if (onValueChange) {
			onValueChange(value, id);
		}
	};

	return (
		<div className={generalClasses.wrapper}>
			<div className={classes.inputWrapper}>
				<span className={classes.inputTitle}>{placeholder}:</span>
				<div className={classes.inputSubwrapper}>
					<input
						id={id}
						type={type}
						placeholder={placeholder}
						required={required}
						value={value}
						onChange={(e) => valueChange(e.target.value, id)}
						className={classes.input}
					/>
					{unit && <span className={classes.input}>minutos</span>}

					{tooltip ? (
						<OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={renderTooltip}>
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

export default Input;
