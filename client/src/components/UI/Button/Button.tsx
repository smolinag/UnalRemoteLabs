import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import classes from './Button.module.scss';

type BootstrapVariants = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';

type CustomVariants = 'red' | 'green';

type Variants = BootstrapVariants | CustomVariants;

interface Props {
	variant?: Variants;
	loading: boolean;
	disabled?: boolean;
	onClick: () => void;
}

const DEFAULT_VARIANT: Variants = 'red';

const Button: React.FC<Props> = ({children, variant = DEFAULT_VARIANT, loading, disabled, onClick}) => {
	const loadingSpinner = (
		<>
			<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
			<span>{children}</span>
		</>
	);

	const color = disabled ? 'secondary' : variant;

	return (
		<div className={classes.button}>
			<BootstrapButton variant={color} size="lg" className={classes.button} disabled={loading || disabled} onClick={onClick}>
				{loading ? loadingSpinner : children}
			</BootstrapButton>
		</div>
	);
};

export default Button;
