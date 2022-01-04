import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import {BsQuestionCircle} from 'react-icons/bs';

import classes from './DropdownComponent.module.scss';

export interface Option {
	value: string;
	id: string;
}

interface Props {
	text: string;
	options: Option[];
	tooltip?: string;
	value: string;
	onValueChange: (value: string, id: string) => void;
	error?: boolean;
}

const DropdownComponent: React.FC<Props> = ({text, options, tooltip, value, onValueChange, error}) => {
	const renderTooltip = () => <Tooltip>{tooltip}</Tooltip>;

	const renderItem = (option: Option): JSX.Element => {
		return (
			<div key={option.id} className={classes.command}>
				<Dropdown.Item eventKey={option.id} onClick={() => onValueChange(option.value, option.id)}>
					{option.value}
				</Dropdown.Item>
			</div>
		);
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.inputWrapper}>
				<span className={classes.inputTitle}>{text}:</span>
				<div className={classes.inputSubwrapper}>
					<DropdownButton id="dropdown-basic-button" title={`${value}`} className={classes.dropdownToggle}>
						{options.map((option) => renderItem(option))}
					</DropdownButton>

					{tooltip && (
						<OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={renderTooltip}>
							<BsQuestionCircle />
						</OverlayTrigger>
					)}

					{error && <p className="errorMessage">Campo requerido</p>}
				</div>
			</div>
		</div>
	);
};

export default DropdownComponent;
