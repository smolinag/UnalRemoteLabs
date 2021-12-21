import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import React from 'react';

import classes from './App.module.scss';
import awsExports from './aws-exports';
import {Footer, Header, NotificationBanner} from './components/UI';
import {LabView} from './containers';
import authComponents from './login/authComponents';

Amplify.configure(awsExports);

const App = (): JSX.Element => {
	return (
		<Authenticator components={authComponents} socialProviders={['google']}>
			{() => (
				<div className={classes.wrapper}>
					<NotificationBanner />
					<Header />
					<div className={classes.content}>
						<LabView />
					</div>
					<Footer />
				</div>
			)}
		</Authenticator>
	);
};
export default App;
