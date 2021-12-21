import {translations} from '@aws-amplify/ui';
import {View, useTheme, Image, Text, Button, useAuthenticator} from '@aws-amplify/ui-react';
import {I18n} from 'aws-amplify';
import React from 'react';

I18n.putVocabularies(translations);
I18n.setLanguage('es');

I18n.putVocabularies({
	es: {
		'Sign In': 'Acceder',
		'Create Account': 'Crear cuenta',
		'Sign In with Google': 'Ingresa con Google',
		'Sign Up with Google': 'Crear cuenta con Google'
	}
});

const authComponents = {
	Header(): JSX.Element {
		const {tokens} = useTheme();

		return (
			<View textAlign="center" padding={tokens.space.large}>
				<Image alt="Amplify logo" src="/static/media/logosimbolo.c51f8526.png" />
			</View>
		);
	},

	Footer(): JSX.Element {
		const {tokens} = useTheme();

		return (
			<View textAlign="center" padding={tokens.space.large}>
				<Text color={`${tokens.colors.neutral['80']}`}>&copy; Universidad Nacional</Text>
			</View>
		);
	},

	SignIn: {
		Footer(): JSX.Element {
			const {toResetPassword} = useAuthenticator();

			return (
				<View textAlign="center">
					<Button fontWeight="normal" onClick={toResetPassword} size="small" variation="link">
						Olvidé mi contraseña
					</Button>
				</View>
			);
		}
	},

	SignUp: {
		Footer(): JSX.Element {
			const {toResetPassword} = useAuthenticator();

			return (
				<View textAlign="center">
					<Button fontWeight="normal" onClick={toResetPassword} size="small" variation="link">
						Olvidé mi contraseña
					</Button>
				</View>
			);
		}
	}
};
export default authComponents;
