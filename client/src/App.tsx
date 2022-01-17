import {Authenticator} from '@aws-amplify/ui-react';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import {Amplify} from 'aws-amplify';
import React from 'react';
import {Route, Routes} from 'react-router-dom';

import classes from './App.module.scss';
import awsExports from './aws-exports';
import {Footer, Header, NotificationBanner} from './components/UI';
import {LabView, LabCreationView, LabSemesterCreationView, LabTemp, UserListLaboratories, LaboratoriesList, LaboratoryEdition, LaboratoryCreation, LabSessionProgrammingView} from './containers';
import authComponents from './login/authComponents';

Amplify.configure(awsExports);

const App = (): JSX.Element => {
	return (
		<Authenticator components={authComponents} socialProviders={['google']}>
			{(response) => (
				<div className={classes.wrapper}>
					<NotificationBanner />
					<Header />
					<div className={classes.content}>
						<Routes>
							<Route path="/" element={<LabView />} />
							<Route path="/create-lab" element={<LabCreationView />} />
							<Route path="/user-labs" element={<UserListLaboratories />} />
							<Route path="/create-lab-semester" element={<LabSemesterCreationView />} />
							<Route path="/create-lab-session" element={<LabSessionProgrammingView />} />
							<Route path="/temp" element={<LabTemp />} />
							<Route path="/labs" element={<LaboratoriesList />} />
							<Route path="/lab-creation" element={<LaboratoryCreation />} />
							<Route path="/lab-edition" element={<LaboratoryEdition />} />
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
