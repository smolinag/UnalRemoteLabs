import React from 'react';

import classes from './App.module.scss';
import {Footer, Header, NotificationBanner} from './components/UI';
import {LabView} from './containers';

function App(): JSX.Element {
	return (
		<div className={classes.wrapper}>
			<NotificationBanner />
			<Header />
			<div className={classes.content}>
				<LabView />
			</div>
			<Footer />
		</div>
	);
}

export default App;
