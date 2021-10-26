import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';

import exitIcon from '../../../images/exitIcon.png';
import logosimbolo from '../../../images/logosimbolo.png';
import userAvatar from '../../../images/userAvatar.png';
import classes from './Header.module.scss';

// import './Header.module.scss'

const Header: React.FC<unknown> = () => {
   return (
      <header>
         <Navbar expand="lg" className={classes.navbar}>
            <Navbar.Brand href="#home">
               <Image src={logosimbolo} className={classes['navbar-brand']} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className={classes.title}>
               <Nav>
                  <Navbar.Text>
                     <h4>Laboratorios remotos Universidad Nacional de Colombia</h4>
                  </Navbar.Text>
               </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
               <Nav className={classes.optionNavbar}>
                  <Image src={userAvatar} className={classes.icon} />
                  <span>Daniel Molina</span>
               </Nav>
               <Nav className={classes.optionNavbar}>
                  <Image src={exitIcon} className={classes.icon} />
                  <span>Salir</span>
               </Nav>
            </Navbar.Collapse>
         </Navbar>
      </header>
   )
};

export default Header;