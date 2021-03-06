import React from 'react';
import {OverlayTrigger} from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import {BsQuestionCircle} from 'react-icons/bs';

import classes from './Input.module.scss';

interface Props {
	type: string;
	placeholder: string;
	disabled?: boolean;
	required?: boolean;
	value: string | number;
	tooltip?: string;
	unit?: string;
	min?: number;
	max?: number;
	onValueChange: (value: string) => void;
	error?: boolean;
}

const Input: React.FC<Props> = ({
	type,
	placeholder,
	required,
	disabled,
	value,
	tooltip,
	unit,
	min,
	max,
	onValueChange,
	error
}) => {
	let unitString = '';

	const valueChange = (value: string): void => {
		if (onValueChange) {
			onValueChange(value);
		}
	};

	if (unit) {
		switch (unit) {
			case 'minutos':
				unitString = 'minutos';
				break;
		}
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.inputWrapper}>
				<span className={classes.inputTitle}>
					{placeholder}: {required && '(Requerido)'}
				</span>
				<div className={classes.inputSubwrapper}>
					<input
						style={type === 'number' ? {width: '100px'} : {width: '250px'}}
						type={type}
						placeholder={placeholder}
						required={required}
						value={value}
						onChange={(e) => valueChange(e.target.value)}
						className={classes.input}
						min={min}
						max={max}
						disabled={disabled}
					/>
					{unit && <span className={classes.input}>{unitString}</span>}

					{tooltip ? (
						<OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={<Tooltip>{tooltip}</Tooltip>}>
							<BsQuestionCircle />
						</OverlayTrigger>
					) : (
						<div style={{width: '16px'}} />
					)}
				</div>

				{error && <p className="errorMessage">Campo requerido</p>}
			</div>
		</div>
	);
};

export default Input;
