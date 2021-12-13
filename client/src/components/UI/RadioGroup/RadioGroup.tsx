import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

interface Props<T> {
	entries: {label: string; value: T}[];
	selectedEntryValue: T | null;
	onChange: (value: T) => void;
}

const RadioGroup: React.FC<Props<string>> = ({entries, selectedEntryValue, onChange}) => {
	return (
		<ButtonGroup>
			{entries.map(({label, value}) => (
				<ToggleButton
					key={value}
					id={`radio-${value}`}
					type="radio"
					name="radio"
					value={value}
					variant="outline-success"
					checked={value === selectedEntryValue}
					onChange={(e) => onChange(e.currentTarget.value)}>
					{label}
				</ToggleButton>
			))}
		</ButtonGroup>
	);
};

export default RadioGroup;
