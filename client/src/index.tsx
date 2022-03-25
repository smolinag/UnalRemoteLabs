import {ApolloProvider} from '@apollo/client';
import {Authenticator} from '@aws-amplify/ui-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/global.scss';
import {apolloClient} from './apollo';
import App from './App';
import GroupProvider from './GroupProvider';
import authComponents from './login/authComponents';
import NotificationBannerProvider from './state/NotificationBannerProvider';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={apolloClient}>
			<GroupProvider>
				<BrowserRouter>
					<NotificationBannerProvider>
						<Authenticator components={authComponents} socialProviders={['google']}>
							{() => <App />}
						</Authenticator>
					</NotificationBannerProvider>
				</BrowserRouter>
			</GroupProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
