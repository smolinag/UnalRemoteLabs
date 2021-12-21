import {ApolloProvider} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/global.scss';
import {apolloClient} from './apollo';
import App from './App';
import NotificationBannerProvider from './state/NotificationBannerProvider';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={apolloClient}>
			<BrowserRouter>
				<NotificationBannerProvider>
					<App />
				</NotificationBannerProvider>
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
