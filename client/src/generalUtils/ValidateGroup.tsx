import React from 'react';

import {useAuthContext} from '../GroupProvider';

interface Props {
	groups: string[];
}

const ValidateGroup: React.FC<Props> = ({children, groups}) => {
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

export default ValidateGroup;
