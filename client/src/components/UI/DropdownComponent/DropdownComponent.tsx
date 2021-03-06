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
	required?: boolean;
	disabled?: boolean;
	tooltip?: string;
	simple?: boolean;
	value: string;
	onValueChange: (value: string, id: string) => void;
	error?: boolean;
}

const DropdownComponent: React.FC<Props> = ({
	text,
	options,
	required,
	disabled,
	tooltip,
	simple,
	value,
	onValueChange,
	error
}) => {
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
			{simple ? (
				<div className={classes.simpleInputWrapper}>
					<DropdownButton
						id="dropdown-basic-button"
						title={`${value}`}
						className={classes.dropdownToggle}
						disabled={disabled}>
						{options.map((option) => renderItem(option))}
					</DropdownButton>
				</div>
			) : (
				<div className={classes.inputWrapper}>
					<span className={classes.inputTitle}>
						{text}: {required && '(Requerido)'}
					</span>
					<div className={classes.inputSubwrapper}>
						<DropdownButton
							id="dropdown-basic-button"
							title={`${value}`}
							className={classes.dropdownToggle}
							disabled={disabled}>
							{options.map((option) => renderItem(option))}
						</DropdownButton>

						{tooltip && (
							<OverlayTrigger placement="right" delay={{show: 250, hide: 400}} overlay={<Tooltip>{tooltip}</Tooltip>}>
								<BsQuestionCircle />
							</OverlayTrigger>
						)}

						{error && <p className="errorMessage">Campo requerido</p>}
					</div>
				</div>
			)}
		</div>
	);
};

export default DropdownComponent;
