import React from 'react';
import {Container, Row, Image} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import labsImage from '../../assets/images/unalManizales.jpg';
import usersImage from '../../assets/images/users.jpg';
import {LoadingContainer} from '../../components/UI';
import classes from './Home.module.scss';

const HomeView: React.FC<unknown> = () => {
  const navigate = useNavigate();

  const navigateToLaboratories = (path: string) => {
		navigate(path);
	};

	return (
		<Container fluid>
			<LoadingContainer loading={false}>
				<Row style={{display: "flex", flexDirection:"row", justifyContent:"center"}}>
          <div className={'col-md-4 ' + classes.cardItem}>
            <span className={classes.cardTitle}>LABORATORIOS</span>
						<Image className={classes.cardImage} src={labsImage} onClick={() => navigateToLaboratories('/labs')}/>
					</div>
          <div className={'col-md-4 ' + classes.cardItem}>
            <span className={classes.cardTitle}>USUARIOS</span>
						<Image className={classes.cardImage} src={usersImage}/>
					</div>
				</Row>
			</LoadingContainer>
		</Container>
	);
};
export default HomeView;
