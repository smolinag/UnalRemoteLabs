import React from 'react';
import {DropdownButton, Dropdown, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {BsQuestionCircle} from 'react-icons/bs';

import classes from './DropdownComponent.module.scss';

export interface Option {
	label: string;
	value: string;
}

interface Props {
	text: string;
	options: Option[];
	tooltip?: string;
}

const DropdownComponent: React.FC<Props> = ({text, options, tooltip}) => {
	const renderTooltip = () => <Tooltip>{tooltip}</Tooltip>;

	const renderItem = (option: Option): JSX.Element => {
		return (
			<div key={option.value} className={classes.command}>
				<Dropdown.Item href="#/action-1">{option.label}</Dropdown.Item>
			</div>
		);
	};

	return (
		<div className={classes.wrapper}>
			<span>{text}:</span>
			<DropdownButton id="dropdown-basic-button" title="Dropdown button">
				{options.map((option) => renderItem(option))}
			</DropdownButton>

			{tooltip && (
				<OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={renderTooltip}>
					<BsQuestionCircle />
				</OverlayTrigger>
			)}
		</div>
	);
};

export default DropdownComponent;
