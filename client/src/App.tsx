import React from 'react';

import classes from './App.module.scss';
import {Footer, Header} from './components/UI';

function App(): JSX.Element {
	return (
		<div className={classes.wrapper}>
			<Header />
			<div className={classes.content}></div>
			<Footer />
		</div>
	);
}

export default App;
