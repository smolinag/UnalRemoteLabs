import React, {createContext, useState, useContext} from 'react';

export interface AuthContext {
	group: string;
	userId: string;
	userEmail: string;
	defineGroup: (jwt: string) => void;
	clearGroup: () => void;
	setUserInfo: (userId: string, userEmail: string) => void;
}

const authContext = createContext<AuthContext>({
	group: '',
	userId: '',
	userEmail: '',
	defineGroup() {
		/*  */
	},
	clearGroup() {
		/*  */
	},
	setUserInfo() {
		/*  */
	}
});

const GroupProvider: React.FC = ({children}) => {
	const [group, setGroup] = useState<string>('');
	const [userId, setUserId] = useState<string>('');
	const [userEmail, setUserEmail] = useState<string>('');

	function clearGroup() {
		setGroup('');
		window.sessionStorage.removeItem('token');
	}

	function defineGroup(group: string) {
		setGroup(group);
	}

	function setUserInfo(userId: string, email: string) {
		setUserId(userId);
		setUserEmail(email);
	}

	return (
		<authContext.Provider
			value={{
				group,
				userId,
				userEmail,
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
