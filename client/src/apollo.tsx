import {ApolloClient, HttpLink, InMemoryCache, ApolloLink} from '@apollo/client';
import {Auth} from '@aws-amplify/auth';
import {createAuthLink, AuthOptions} from 'aws-appsync-auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';
import { createContext, useContext } from 'react';

import awsmobile from './aws-exports';
import {GroupsProvider} from './GroupsProvider'

const url = awsmobile.aws_appsync_graphqlEndpoint;
const region = awsmobile.aws_appsync_region;
const auth: AuthOptions = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type: awsmobile.aws_appsync_authenticationType as any,
	// apiKey: awsmobile.aws_appsync_apiKey,
	jwtToken: async () => {
		try {
			const token = (await Auth.currentSession()).getAccessToken().getJwtToken();
			decodeToken(token);
			window.sessionStorage.setItem('token', token);
			return token;
		} catch (e) {
			console.error(e);
			return '';
		}
	}
	// credentials: async () => credentials, // Required when you use IAM-based auth.
};

const httpLink = new HttpLink({uri: url});

const link = ApolloLink.from([
	createAuthLink({url, region, auth}),
	createSubscriptionHandshakeLink({url, region, auth}, httpLink)
]);

export const apolloClient = new ApolloClient({
	link,
	cache: new InMemoryCache()
});

// let chroneTime = 0;

const decodeToken = (token: string) => {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join('')
	);

	const payload = JSON.parse(jsonPayload);
	console.log(payload["cognito:groups"]);

	// createContext(payload["cognito:groups"]);


	// const [groups, setGroups] = useContext(GroupsProvider)

	// setGroups(payload["cognito:groups"])

	// console.log(groups);

	
};

// const getNewToken = () => {
// 	setInterval(() => {
// 		getRefreshTokenFunction();
// 	}, chroneTime);
// };

// const getRefreshTokenFunction = async () => {
// 	const response = await refreshToken();
// };
