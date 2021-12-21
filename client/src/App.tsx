import React from 'react';
import {Route, Routes} from 'react-router-dom';

import classes from './App.module.scss';
import {Footer, Header, NotificationBanner} from './components/UI';
import {LabView, LabCreationView} from './containers';

function App(): JSX.Element {
	return (
		<div className={classes.wrapper}>
			<NotificationBanner />
			<Header />
			<div className={classes.content}>
				<Routes>
					<Route path="/" element={<LabView />} />
					<Route path="/create-lab" element={<LabCreationView />} />
					{/* Crear componente para rutas no existentes */}
					<Route path="*" element={<div> Pagina no existe </div>} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
