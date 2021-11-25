import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import generalClasses from '../../Lab/shared.module.scss';
import classes from './Button.module.scss';

type BootstrapVariants = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';

type CustomVariants = 'red' | 'green';

type Variants = BootstrapVariants | CustomVariants;

interface Props {
	variant?: Variants;
	loading: boolean;
	justifyEnd?: boolean;
}

const DEFAULT_VARIANT: Variants = 'red';

const Button: React.FC<Props> = ({children, variant = DEFAULT_VARIANT, loading, justifyEnd = false}) => {
	const loadingSpinner = (
		<>
			<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
			<span>{children}</span>
		</>
	);

	return (
		<div className={`${classes.buttonContainer} ${justifyEnd && generalClasses.justifyEnd}`}>
			<BootstrapButton variant={variant} size="lg" className={classes.button} disabled={loading}>
				{loading ? loadingSpinner : children}
			</BootstrapButton>
		</div>
	);
};

export default Button;
