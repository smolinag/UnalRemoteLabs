import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';

import exitIcon from '../../../images/exitIcon.png';
import logosimbolo from '../../../images/logosimbolo.png';
import userAvatar from '../../../images/userAvatar.png';

import "./Header.scss"

const Header: React.FC<unknown> = () => {
   return (
      <Navbar expand="lg" id="navbar">
         <Navbar.Brand href="#home">
            <Image src={logosimbolo} id="logoimage" />
         </Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
               <Navbar.Text>
                  <h4 id="title">Laboratorios remotos Universidad Nacional de Colombia</h4>
               </Navbar.Text>
            </Nav>
         </Navbar.Collapse>
         <Navbar.Collapse className="justify-content-end">
            <Nav id="optionNavbar">
               <Image src={userAvatar} id="icon" />
               <span>Daniel Molina</span>
            </Nav>
            <Nav id="optionNavbar">
               <Image src={exitIcon} id="icon" />
               <span>Salir</span>
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   )
};

export default Header;