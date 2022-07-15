import {Auth} from '@aws-amplify/auth';
import React, {useState, useEffect} from 'react';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BiExit} from 'react-icons/bi';
import {BsPersonCircle} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';

import logosimbolo from '../../../assets/images/logosimbolo.png';
import {useGetUserByEmailLazyQuery} from '../../../graphql/generated/schema';
import {useAuthContext} from '../../../GroupProvider';
import classes from './Header.module.scss';

const Header: React.FC = () => {
	const navigate = useNavigate();
	const [loggedUser, setLoggedUser] = useState<string>('');
	const {defineGroup, setUserInfo} = useAuthContext();

	const [getUserByEmail] = useGetUserByEmailLazyQuery({
		onCompleted: (data) => {
			const items = data?.getUserByEmail?.items?.filter((item) => item !== null && item._deleted !== true);
			if (items && items.length > 0) {
				defineGroup(items[0]?.role ? items[0]?.role : '');
				setUserInfo(items[0]?.id ? items[0]?.id : '', items[0]?.email ? items[0]?.email : '');
			}
		}
	});

	useEffect(() => {
		(async () => {
			let response = (await Auth.currentUserInfo())?.attributes?.email;
			response = await response;

			getUserByEmail({
				variables: {email: response}
			});
			setLoggedUser(response);
		})();
	}, [loggedUser]);

	const signOutFunction = () => {
		// clearGroup();
		setLoggedUser('');
		navigate('/');
		Auth.signOut();
		setUserInfo('', '');
		window.sessionStorage.getItem('token');
	};

	const redirectToAccount = () => {
		navigate('/my-account', {state: {userEmail: loggedUser}});
	};

	return (
		<header>
			<Navbar expand="lg" className={classes.navbar}>
				<Navbar.Brand href="#home" onClick={() => navigate('/')}>
					<Image src={logosimbolo} className={classes['navbar-brand']} />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className={classes.title}>
						<Navbar.Text>
							<h4>Laboratorios remotos Universidad Nacional de Colombia</h4>
							<h5>(En construcción &#128679;)</h5>
						</Navbar.Text>
					</Nav>
					<Nav className={classes.optionNavbar}>
						<div className={classes.option} onClick={redirectToAccount}>
							<BsPersonCircle className={classes.icon} />
							<span>{loggedUser}</span>
						</div>

						<div className={classes.option} onClick={signOutFunction}>
							<BiExit className={classes.icon} />
							<span>Salir</span>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
