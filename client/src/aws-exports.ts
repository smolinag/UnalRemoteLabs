/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const appSyncConfig = {
	aws_project_region: 'us-east-2',
	aws_appsync_graphqlEndpoint: 'https://4xgfahcqmvfmti2gv2rfwhflxe.appsync-api.us-east-2.amazonaws.com/graphql',
	aws_appsync_region: 'us-east-2',
	aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
	aws_appsync_apiKey: 'da2-oznphqdk6fhulig7ivj645d4yi',
	aws_cognito_identity_pool_id: 'us-east-2:1cb3fb01-f5ea-46c3-81bb-44e516e42107',
	aws_cognito_region: 'us-east-2',
	aws_user_pools_id: 'us-east-2_zsUbsMO4I',
	aws_user_pools_web_client_id: '456sd4us2915jjlpfest04v9jl',
	oauth: {
		domain: 'unalvirtuallabsfab5cbf4-fab5cbf4-dev.auth.us-east-2.amazoncognito.com',
		scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
		redirectSignIn: 'http://localhost:3000/',
		redirectSignOut: 'http://localhost:3000/',
		responseType: 'code'
	},
	federationTarget: 'COGNITO_USER_POOLS',
	aws_cognito_username_attributes: ['EMAIL'],
	aws_cognito_social_providers: ['GOOGLE'],
	aws_cognito_signup_attributes: ['EMAIL'],
	aws_cognito_mfa_configuration: 'OFF',
	aws_cognito_mfa_types: ['SMS'],
	aws_cognito_password_protection_settings: {
		passwordPolicyMinLength: 8,
		passwordPolicyCharacters: []
	},
	aws_cognito_verification_mechanisms: ['EMAIL']
};

export default appSyncConfig;
