import React from 'react';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {BiExit} from 'react-icons/bi';
import {BsPersonCircle} from 'react-icons/bs';

import logosimbolo from '../../../assets/images/logosimbolo.png';
import classes from './Header.module.scss';

const Header: React.FC<unknown> = () => {
	return (
		<header>
			<Navbar expand="lg" className={classes.navbar}>
				<Navbar.Brand href="#home">
					<Image src={logosimbolo} className={classes['navbar-brand']} />
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
							<span>Daniel Molina</span>
						</div>

						<div className={classes.option}>
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
