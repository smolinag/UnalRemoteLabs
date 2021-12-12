import React, {useContext} from 'react';
import Alert from 'react-bootstrap/Alert';

import {notificationBannerContext} from '../../../state/NotificationBannerProvider';
import classes from './NotificationBanner.module.scss';

const NotificationBanner: React.FC = () => {
	const {state, clearBanner} = useContext(notificationBannerContext);
	if (!state.visible) {
		return null;
	}
	return (
		<Alert
			className={classes.banner}
			variant={state.type === 'success' ? 'success' : 'danger'}
			dismissible={state.type === 'error'}
			onClose={clearBanner}>
			{state.message}
		</Alert>
	);
};

export default NotificationBanner;
