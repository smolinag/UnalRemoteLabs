import React, {createContext, useState, useContext} from 'react';

export interface AuthContext {
	group: string;
	defineGroup: (jwt: string) => void;
	clearGroup: () => void;
	userId: string;
	setUserInfo: (userId: string) => void;
}

const authContext = createContext<AuthContext>({
	group: '',
	defineGroup() {
		/*  */
	},
	clearGroup() {
		/*  */
	},
	userId: '',
	setUserInfo() {
		/*  */
	}
});

const GroupProvider: React.FC = ({children}) => {
	const [group, setGroup] = useState<string>('');
	const [userId, setUserId] = useState<string>('');

	function clearGroup() {
		setGroup('');
		window.sessionStorage.removeItem('token');
	}

	function defineGroup(group: string) {
		setGroup(group);
	}

	function setUserInfo(userId: string) {
		setUserId(userId);
	}

	return (
		<authContext.Provider
			value={{
				group,
				defineGroup,
				clearGroup,
				userId,
				setUserInfo
			}}>
			{children}
		</authContext.Provider>
	);
};

const useAuthContext = (): AuthContext => useContext(authContext);

export {authContext, useAuthContext};
export default GroupProvider;
