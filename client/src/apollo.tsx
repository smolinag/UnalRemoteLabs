import {ApolloClient, HttpLink, InMemoryCache, ApolloLink} from '@apollo/client';
import {createAuthLink, AuthOptions} from 'aws-appsync-auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';

import appSyncConfig from './aws-exports';

const url = appSyncConfig.aws_appsync_graphqlEndpoint;
const region = appSyncConfig.aws_appsync_region;
const auth: AuthOptions = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type: appSyncConfig.aws_appsync_authenticationType as any,
	apiKey: appSyncConfig.aws_appsync_apiKey
	// jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
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
