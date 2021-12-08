import React from 'react';
import {DropdownButton, Dropdown, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {BsQuestionCircle} from 'react-icons/bs';

import generalClasses from '../../Lab/shared.module.scss';
import classes from './DropdownComponent.module.scss';

export interface Option {
	label: string;
	value: string;
}

interface Props {
	text: string;
	options: Option[];
	tooltip?: string;
	value: string;
	onValueChange: (value: string, id: string) => void;
}

const DropdownComponent: React.FC<Props> = ({text, options, tooltip, value, onValueChange}) => {
	const renderTooltip = () => <Tooltip>{tooltip}</Tooltip>;

	const renderItem = (option: Option): JSX.Element => {
		return (
			<div key={option.value} className={classes.command}>
				<Dropdown.Item eventKey={option.value} onClick={() => onValueChange(option.label, option.value)}>
					{option.label}
				</Dropdown.Item>
			</div>
		);
	};

	return (
		<div className={generalClasses.wrapper}>
			<div className={classes.inputWrapper}>
				<span className={classes.inputTitle}>{text}:</span>
				<div className={classes.inputSubwrapper}>
					<DropdownButton id="dropdown-basic-button" title={`${value}`} className={classes.input}>
						{options.map((option) => renderItem(option))}
					</DropdownButton>

					{tooltip && (
						<OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={renderTooltip}>
							<BsQuestionCircle />
						</OverlayTrigger>
					)}
				</div>
			</div>
		</div>
	);
};

export default DropdownComponent;
