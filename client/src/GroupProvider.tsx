import React, {createContext, useState, useContext} from 'react';

export interface AuthContext {
	group: string;
	login: (jwt: string) => void;
	logout: () => void;
}

const authContext = createContext<AuthContext>({
	group: '',
	login() {
		/*  */
	},
	logout() {
		/*  */
	}
});

const GroupProvider: React.FC = ({children}) => {
	const [group, setGroup] = useState<string>('');

	function logout() {
		setGroup('');
	}

	function login(group: string) {
		setGroup(group);
	}

	return (
		<authContext.Provider
			value={{
				group,
				login,
				logout
			}}>
			{children}
		</authContext.Provider>
	);
};

const useAuthContext = (): AuthContext => useContext(authContext);

export {authContext, useAuthContext};
export default GroupProvider;
