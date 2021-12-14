import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import {Transition} from 'react-transition-group';

import classes from './LoadingContainer.module.scss';

interface Props {
	loading: boolean;
}

const duration = 300;

const defaultStyle = {
	transition: `opacity ${duration}ms ease-in-out`,
	opacity: 0
};

const transitionStyles: Record<string, React.CSSProperties> = {
	entering: {opacity: 1},
	entered: {opacity: 1},
	exiting: {opacity: 0},
	exited: {opacity: 0}
};

const overlayTransitionStyles: Record<string, React.CSSProperties> = {
	entering: {},
	entered: {},
	exiting: {},
	exited: {width: 0, height: 0}
};

const LoadingContainer: React.FC<Props> = ({children, loading}) => {
	return (
		<div className={classes.wrapper}>
			<Transition in={loading} timeout={duration}>
				{(state) => (
					<div style={{...defaultStyle, ...transitionStyles[state]}}>
						<div className={classes.overlay} style={overlayTransitionStyles[state]} />
						<Spinner className={classes.indicator} animation="border" variant="green" />
					</div>
				)}
			</Transition>
			{children}
		</div>
	);
};

export default LoadingContainer;
