import {Authenticator} from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

import classes from './App.module.scss';
import awsExports from './aws-exports';
import {Footer, Header, NotificationBanner} from './components/UI';
import {
	LabPracticeView,
	LabPracticeCreation,
	LabSemesterCreationView,
	LabTemp,
	UserLabPracticeSessionsList,
	LaboratoriesList,
	LaboratoryEdition,
	LaboratoryCreation,
	LabSessionProgrammingView,
	LabPracticeEdition,
	LabPracticeListView
} from './containers';
import authComponents from './login/authComponents';

Amplify.configure(awsExports);

const App = (): JSX.Element => {
	// eslint-disable-next-line no-console
	return (
		<Authenticator components={authComponents} socialProviders={['google']}>
			{() => (
				<div className={classes.wrapper}>
					<NotificationBanner />
					<Header />
					<div className={classes.content}>
						<Routes>
							<Route path="/" element={<LabTemp />} />

							<Route path="/create-lab-practice-semester" element={<LabSemesterCreationView />} />
							<Route path="/create-lab-practice-session" element={<LabSessionProgrammingView />} />

							<Route path="/user-labs-sessions" element={<UserLabPracticeSessionsList />} />
							<Route path="/labs" element={<LaboratoriesList />} />

							<Route path="/lab-practice" element={<LabPracticeView />} />
							<Route path="/lab-practice-list" element={<LabPracticeListView />} />
							<Route path="/lab-creation" element={<LaboratoryCreation />} />
							<Route path="/lab-edition" element={<LaboratoryEdition />} />

							<Route path="/create-lab-practice" element={<LabPracticeCreation />} />
							<Route path="/edit-lab-practice" element={<LabPracticeEdition />} />

							{/* Crear componente para rutas no existentes */}
							<Route path="*" element={<div> Pagina no existe </div>} />
						</Routes>
					</div>
					<Footer />
				</div>
			)}
		</Authenticator>
	);
};

export default App;
