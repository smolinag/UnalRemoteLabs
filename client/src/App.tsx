import React from 'react';

import classes from './App.module.scss';
import Footer from './components/UI/Layout/Footer'
import Header from './components/UI/Layout/Header'

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
