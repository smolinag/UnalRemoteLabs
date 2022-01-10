import React, {createContext, useState} from 'react';

interface NotificationBannerState {
	visible: boolean;
	type: 'success' | 'error';
	message: string;
}

interface NotificationBannerContext {
	state: NotificationBannerState;
	showErrorBanner: (message: string) => void;
	showSuccessBanner: (message: string) => void;
	clearBanner: () => void;
}

const notificationBannerContext = createContext<NotificationBannerContext>({
	state: {visible: false, type: 'error', message: ''},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	showErrorBanner: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	clearBanner: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	showSuccessBanner: () => {}
});

type Props = {
	children?: React.ReactNode;
};

const MESSAGE_CLOSE_DELAY = 3000;

let closeTimer: NodeJS.Timeout | undefined;

const NotificationBannerProvider: React.FC = ({children}: Props) => {
	const [state, setState] = useState<NotificationBannerState>({visible: false, type: 'error', message: ''});

	const showErrorBanner = (message: string) => {
		if (closeTimer) {
			clearTimeout(closeTimer);
		}
		setState({visible: true, type: 'error', message});
	};

	const showSuccessBanner = (message: string) => {
		if (closeTimer) {
			clearTimeout(closeTimer);
		}
		setState({visible: true, type: 'success', message});
		closeTimer = setTimeout(clearBanner, MESSAGE_CLOSE_DELAY);
	};

	const clearBanner = () => {
		if (closeTimer) {
			clearTimeout(closeTimer);
		}
		setState({visible: false, type: 'error', message: ''});
	};

	return (
		<notificationBannerContext.Provider value={{clearBanner, showErrorBanner, showSuccessBanner, state}}>
			{children}
		</notificationBannerContext.Provider>
	);
};

export {notificationBannerContext};
export default NotificationBannerProvider;
