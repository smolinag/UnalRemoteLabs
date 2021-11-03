import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

import logoUNAL from '../../../images/logoUNAL.png';
import classes from "./Footer.module.scss"

const Footer: React.FC<unknown> = () => {
   return (
      <footer>
         <Row className={classes.footer}>
            <Col md={6} />
            <Col md={4} className={classes.leftBorder}>
               <Row>
                  <Col xs={6}>
                     <Row><span>Contacto página web:</span></Row>
                     <Row><span>Carrera 27 # 64-60</span></Row>
                     <Row><span>01 8000 916956</span></Row>
                     <Row><span>Manizales, Caldas - Colombia</span></Row>
                     <Row><span>(57+6) 8879300</span></Row>
                  </Col>
                  <Col xs={6} style={{ textAlign: "right" }}>
                     <Row><span>© Copyright 2021</span></Row>
                     <Row><span>Algunos derechos reservados.</span></Row>
                     <Row><span>sisqueresu_man@unal.edu.co</span></Row>
                     <Row><span>Acerca de este sitio web</span></Row>
                     <Row><span>Actualización: 10/23/2021</span></Row>
                  </Col>
               </Row>
            </Col>
            <Col md={2} className={classes.leftBorder}>
               <div>
                  <Image src={logoUNAL} className={classes.unalimage} />
               </div>
            </Col>
         </Row>
      </footer>
   )
};

export default Footer;