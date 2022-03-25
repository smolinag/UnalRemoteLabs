import React, {createContext, useState, useContext} from 'react';

export interface AuthContext {
	group: string;
	defineGroup: (jwt: string) => void;
	clearGroup: () => void;
}

const authContext = createContext<AuthContext>({
	group: '',
	defineGroup() {
		/*  */
	},
	clearGroup() {
		/*  */
	}
});

const GroupProvider: React.FC = ({children}) => {
	const [group, setGroup] = useState<string>('');

	function clearGroup() {
		setGroup('');
		window.sessionStorage.removeItem('token');
	}

	function defineGroup(group: string) {
		setGroup(group);
	}

	return (
		<authContext.Provider
			value={{
				group,
				defineGroup,
				clearGroup
			}}>
			{children}
		</authContext.Provider>
	);
};

const useAuthContext = (): AuthContext => useContext(authContext);

export {authContext, useAuthContext};
export default GroupProvider;
