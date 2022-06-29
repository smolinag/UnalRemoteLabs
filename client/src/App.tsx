// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

import classes from './App.module.scss';
import awsmobile from './aws-exports';
import {Footer, Header, NotificationBanner} from './components/UI';
import {
	LabPracticeView,
	LabPracticeCreation,
	LabSemesterList,
	LabSemesterCreation,
	LabSemesterEdition,
	UserLabPracticeSessionsList,
	LaboratoriesList,
	LaboratoryEdition,
	LaboratoryCreation,
	LabSessionProgrammingView,
	LabPracticeEdition,
	LabPracticeList,
	UsersList,
	UserCreation,
	UserEdition,
	HomeView,
	Account
} from './containers';
// import ValidateGroup from './generalUtils/ValidateGroup';

Amplify.configure(awsmobile);

const App = (): JSX.Element => {
	return (
		<div className={classes.wrapper}>
			<NotificationBanner />
			<Header />
			<div className={classes.content}>
				<Routes>
					<Route path="/" element={<HomeView />} />
					<Route path="/lab-semesters" element={<LabSemesterList />} />
					<Route path="/lab-semester-creation" element={<LabSemesterCreation />} />
					<Route path="/lab-semester-edition" element={<LabSemesterEdition />} />

					<Route path="/lab-practice-session-creation" element={<LabSessionProgrammingView />} />

					<Route path="/user-labs-sessions" element={<UserLabPracticeSessionsList />} />

					<Route path="/lab-practice" element={<LabPracticeView />} />
					<Route path="/lab-practices" element={<LabPracticeList />} />
					<Route path="/lab-practice-edition" element={<LabPracticeEdition />} />
					<Route path="/lab-practice-creation" element={<LabPracticeCreation />} />

					<Route path="/labs" element={<LaboratoriesList />} />
					<Route path="/lab-creation" element={<LaboratoryCreation />} />
					<Route path="/lab-edition" element={<LaboratoryEdition />} />

					<Route path="/users" element={<UsersList />} />
					<Route path="/user-creation" element={<UserCreation />} />
					<Route path="/user-edition" element={<UserEdition />} />
					<Route path="/my-account" element={<Account />} />

					{/* Crear componente para rutas no existentes */}
					<Route path="*" element={<div> La página solicitada no existe </div>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};

export default App;
