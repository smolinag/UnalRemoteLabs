import {Auth} from '@aws-amplify/auth';
import {useAuthenticator} from '@aws-amplify/ui-react';
import React, {useState, useEffect} from 'react';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BiExit} from 'react-icons/bi';
import {BsPersonCircle} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';

import logosimbolo from '../../../assets/images/logosimbolo.png';
import classes from './Header.module.scss';

const Header: React.FC<unknown> = () => {
	const navigate = useNavigate();
	const [loggedUser, setLoggedUser] = useState<string>('');
	const {signOut} = useAuthenticator();

	useEffect(() => {
		(async () => {
			let response = (await Auth.currentUserInfo()).attributes.email;
			response = await response;
			setLoggedUser(response);
		})();
	}, [loggedUser]);

	return (
		<header>
			<Navbar expand="lg" className={classes.navbar}>
				<Navbar.Brand href="#home" onClick={() => navigate('/')}>
					<Image src={logosimbolo} className={classes['navbar-brand']}/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className={classes.title}>
						<Navbar.Text>
							<h4>Laboratorios remotos Universidad Nacional de Colombia</h4>
						</Navbar.Text>
					</Nav>
					<Nav className={classes.optionNavbar}>
						<div className={classes.option}>
							<BsPersonCircle className={classes.icon} />
							<span>{loggedUser}</span>
						</div>

						<div className={classes.option}>
							<BiExit className={classes.icon} />
							<span onClick={signOut}>Salir</span>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
