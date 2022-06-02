import React, {createContext, useState} from 'react';

interface NotificationBannerState {
	visible: boolean;
	type: 'success' | 'danger' | 'warning';
	message: string;
}

interface NotificationBannerContext {
	state: NotificationBannerState;
	showErrorBanner: (message: string) => void;
	showSuccessBanner: (message: string) => void;
	showWarningBanner: (message: string) => void;
	clearBanner: () => void;
}

const notificationBannerContext = createContext<NotificationBannerContext>({
	state: {visible: false, type: 'danger', message: ''},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	showErrorBanner: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	clearBanner: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	showSuccessBanner: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	showWarningBanner: () => {}
});

type Props = {
	children?: React.ReactNode;
};

const SUCCES_MESSAGE_CLOSE_DELAY = 3000;
const ERROR_MESSAGE_CLOSE_DELAY = 4000;


let closeTimer: NodeJS.Timeout | undefined;

const NotificationBannerProvider: React.FC = ({children}: Props) => {
	const [state, setState] = useState<NotificationBannerState>({visible: false, type: 'danger', message: ''});

	const showErrorBanner = (message: string) => {
		if (closeTimer) {
			clearTimeout(closeTimer);
		}
		setState({visible: true, type: 'danger', message});
		closeTimer = setTimeout(clearBanner, ERROR_MESSAGE_CLOSE_DELAY);
	};

	const showSuccessBanner = (message: string) => {
		if (closeTimer) {
			clearTimeout(closeTimer);
		}
		setState({visible: true, type: 'success', message});
		closeTimer = setTimeout(clearBanner, SUCCES_MESSAGE_CLOSE_DELAY);
	};

	const showWarningBanner = (message: string) => {
		if (closeTimer) {
			clearTimeout(closeTimer);
		}
		setState({visible: true, type: 'warning', message});
		closeTimer = setTimeout(clearBanner, ERROR_MESSAGE_CLOSE_DELAY);
	};

	const clearBanner = () => {
		if (closeTimer) {
			clearTimeout(closeTimer);
		}
		setState({visible: false, type: 'danger', message: ''});
	};

	return (
		<notificationBannerContext.Provider value={{clearBanner, showErrorBanner, showSuccessBanner, showWarningBanner, state}}>
			{children}
		</notificationBannerContext.Provider>
	);
};

export {notificationBannerContext};
export default NotificationBannerProvider;
