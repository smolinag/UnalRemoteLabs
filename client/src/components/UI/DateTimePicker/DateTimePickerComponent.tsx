import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DateTimePicker from 'react-datetime-picker';
import {BsQuestionCircle} from 'react-icons/bs';

import classes from './DateTimePicker.module.scss';

interface Props {
	placeholder: string;
	required?: boolean;
	value: Date;
	tooltip?: string;
	onValueChange: (value: Date) => void;
	minDate?: Date;
	maxDate?: Date;
}

const DateTimePickerComponent: React.FC<Props> = ({
	placeholder,
	required,
	value,
	tooltip,
	onValueChange,
	minDate,
	maxDate
}) => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.datetimepickerWrapper}>
				<span className={classes.datetimepickerTitle}>
					{placeholder}: {required && '(Requerido)'}
				</span>
				<div className={classes.datetimepickerSubwrapper}>
					<DateTimePicker
						onChange={(value: Date) => onValueChange(value)}
						value={value}
						clearIcon={null}
						disableClock={true}
						className={classes.datetimepicker}
						minDate={minDate}
						maxDate={maxDate}
					/>
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
export default DateTimePickerComponent;
