import React from 'react';

import {useAuthContext} from '../GroupProvider';

interface Props {
	groups: string[];
}

export const ValidateGroupComonent: React.FC<Props> = ({children, groups}) => {
	const {group} = useAuthContext();

	const validateGroup = () => {
		let isAllowed = false;
		const groupMatch = groups.filter((groupElement) => groupElement === group);
		if (groupMatch.length > 0) {
			isAllowed = true;
			return isAllowed;
		}
	};

	return <>{validateGroup() ? children : null}</>;
};

export const ValidateGroupFunction = (groups: string[]) => {
	const {group} = useAuthContext();

	let isAllowed = false;
	const groupMatch = groups.filter((groupElement) => groupElement === group);

	if (groupMatch.length > 0) {
		isAllowed = true;
		return isAllowed;
	}
};
