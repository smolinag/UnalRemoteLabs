import React, {createContext, useState, useContext} from 'react';

export interface AuthContext {
	group: string;
	defineGroup: (jwt: string) => void;
	clearGroup: () => void;
	setUserInfo: (userId: string, email: string, name: string) => void;
	user: {userId: string; email: string; name: string};
}

const authContext = createContext<AuthContext>({
	group: '',
	defineGroup() {
		/*  */
	},
	clearGroup() {
		/*  */
	},
	user: {userId: '', name: '', email: ''},
	setUserInfo() {
		/*  */
	}
});

const GroupProvider: React.FC = ({children}) => {
	const [group, setGroup] = useState<string>('');
	const [user, setUser] = useState<{userId: string; name: string; email: string}>({
		userId: '',
		name: '',
		email: ''
	});

	function clearGroup() {
		setGroup('');
		window.sessionStorage.removeItem('token');
	}

	function defineGroup(group: string) {
		setGroup(group);
	}

	function setUserInfo(userId: string, email: string, name: string) {
		setUser({userId, name, email});
	}

	return (
		<authContext.Provider
			value={{
				user,
				group,
				defineGroup,
				clearGroup,
				setUserInfo
			}}>
			{children}
		</authContext.Provider>
	);
};

const useAuthContext = (): AuthContext => useContext(authContext);

export {authContext, useAuthContext};
export default GroupProvider;
