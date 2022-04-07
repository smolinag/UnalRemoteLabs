// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

import {decodeToken} from './apollo';
import classes from './App.module.scss';
import awsmobile from './aws-exports';
import {Footer, Header, NotificationBanner} from './components/UI';
import {
	LabPracticeView,
	LabPracticeCreation,
	LabSemesterList,
	LabSemesterCreation,
	LabSemesterEdition,
	LabTemp,
	UserLabPracticeSessionsList,
	LaboratoriesList,
	LaboratoryEdition,
	LaboratoryCreation,
	LabSessionProgrammingView,
	LabPracticeEdition,
	LabPracticeListView,
	HomeView
} from './containers';
import {useAuthContext} from './GroupProvider';

Amplify.configure(awsmobile);

const App = (): JSX.Element => {
	const {defineGroup, clearGroup} = useAuthContext();

	const token = window.sessionStorage.getItem('token');
	if (token) {
		defineGroup(decodeToken(token ? token : ''));
	} else {
		clearGroup();
		// window.location.href = 'https://d1p0lxk2wvxo6e.cloudfront.net';
	}

	return (
		<div className={classes.wrapper}>
			<NotificationBanner />
			<Header />
			<div className={classes.content}>
				<Routes>
					<Route path="/" element={<HomeView />} />
					<Route path="/temp" element={<LabTemp />} />
					<Route path="/lab-semesters" element={<LabSemesterList />} />
					<Route path="/lab-semester-creation" element={<LabSemesterCreation />} />
					<Route path="/lab-semester-edition" element={<LabSemesterEdition />} />

					<Route path="/lab-practice-session-creation" element={<LabSessionProgrammingView />} />

					<Route path="/user-labs-sessions" element={<UserLabPracticeSessionsList />} />
					<Route path="/labs" element={<LaboratoriesList />} />

					<Route path="/lab-practice" element={<LabPracticeView />} />
					<Route path="/lab-practices" element={<LabPracticeListView />} />
					<Route path="/lab-practice-edition" element={<LabPracticeEdition />} />
					<Route path="/lab-practice-creation" element={<LabPracticeCreation />} />

					<Route path="/lab-creation" element={<LaboratoryCreation />} />
					<Route path="/lab-edition" element={<LaboratoryEdition />} />

					{/* Crear componente para rutas no existentes */}
					<Route path="*" element={<div> La página solicitada no existe </div>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};

export default App;
