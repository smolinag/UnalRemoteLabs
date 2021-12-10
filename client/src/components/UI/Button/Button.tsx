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
	justify?: string;
	onClick: () => void;
}

export enum Justify {
	JUSTIFY_END = 'justifyEnd',
	JUSTIFY_CENTER = 'justifyCenter',
	JUSTIFY_START = 'justifyStart'
};

const DEFAULT_VARIANT: Variants = 'red';
const JUSTIFY_END = 'justifyEnd';
const JUSTIFY_CENTER = 'justifyCenter';

const Button: React.FC<Props> = ({children, variant = DEFAULT_VARIANT, loading, justify, onClick}) => {
	const loadingSpinner = (
		<>
			<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
			<span>{children}</span>
		</>
	);

	let justifyWhere: string = classes.justifyStart;

	if (justify === JUSTIFY_END) {
		justifyWhere = classes.justifyEnd;
	} else if (justify === JUSTIFY_CENTER) {
		justifyWhere = classes.justifyCenter;
	}

	return (
		<div className={`${classes.buttonContainer} ${justifyWhere}`}>
			<BootstrapButton variant={variant} size="lg" className={classes.button} disabled={loading} onClick={onClick}>
				{loading ? loadingSpinner : children}
			</BootstrapButton>
		</div>
	);
};

export default Button;
