import React from 'react';
import BootstrapButton from 'react-bootstrap/Button';

import classes from './Button.module.scss';

type BootstrapVariants = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';

type CustomVariants = 'red' | 'green';

type Variants = BootstrapVariants | CustomVariants;

interface Props {
	variant?: Variants;
}

const DEFAULT_VARIANT: Variants = 'red';

const Button: React.FC<Props> = ({children, variant = DEFAULT_VARIANT}) => {
	return (
		<BootstrapButton variant={variant} size="lg" className={classes.button}>
			{children}
		</BootstrapButton>
	);
};

export default Button;
