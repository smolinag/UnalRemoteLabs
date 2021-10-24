import React from 'react';

import Footer from './components/UI/Layout/Footer'
import Header from './components/UI/Layout/Header'

function App(): JSX.Element {
	return (
		<div style={{ minHeight: '100vh' }}>
			<Header/>
			<div style={{height: "300px"}}>

			</div>
			<Footer/>
		</div>
	);
}

export default App;
