import React, {useContext, useState} from 'react';

const GroupsContext = React.createContext({});
const GroupsThemeContext = React.createContext({});

export const useGroups = () => {
	return useContext(GroupsContext);
};

export const useUpdateGroups = () => {
	return useContext(GroupsThemeContext);
};

type Props = {
	children?: React.ReactNode;
};



export const GroupsProvider: React.FC = ({children}: Props) => {
	const [state, setState] = useState({});

   const updateGroups = (group: string) => {
		setState(group);
	};

	return (
		<GroupsContext.Provider value={[state, setState]}>
			<GroupsThemeContext.Provider value={updateGroups}>{children}</GroupsThemeContext.Provider>
		</GroupsContext.Provider>
	);
};
