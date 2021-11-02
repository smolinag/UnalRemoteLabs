import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {WebSocketLink} from '@apollo/client/link/ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';

import {getToken} from './authorization';

const httpLink = new HttpLink({
	uri: process.env.REACT_APP_GRAPHQL_HTTP
});

console.warn(process.env);
console.warn(getToken());

const authLink = setContext((_, {headers}) => {
	return {
		headers: {
			...headers,
			'x-api-key': getToken(),
			authorization: 'token'
		}
	};
});

const subscriptionClient = new SubscriptionClient(process.env.REACT_APP_GRAPHQL_WS ?? '', {
	reconnect: true,
	lazy: true,
	connectionParams: () => ({
		Headers: {
			'x-api-key': getToken()
		}
	})
});

const wsLink = new WebSocketLink(subscriptionClient);

const link = ApolloLink.from([authLink.concat(httpLink), wsLink]);

export const apolloClient = new ApolloClient({
	link,
	cache: new InMemoryCache()
});
