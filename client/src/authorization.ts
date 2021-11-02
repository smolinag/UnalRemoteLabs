export const getToken = (): string => {
	if (process.env.REACT_APP_GRAPHQL_AUTH_KEY) {
		return process.env.REACT_APP_GRAPHQL_AUTH_KEY;
	}
	throw new Error('no valid key in environment variables');
};
