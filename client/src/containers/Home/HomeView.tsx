import React from 'react';
import {Container, Row, Image} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import labsImage from '../../assets/images/unalManizales.jpg';
import usersImage from '../../assets/images/users.jpg';
import {LoadingContainer} from '../../components/UI';
import {Groups} from '../../generalUtils/groups';
import { ValidateGroupComponent } from '../../generalUtils/ValidateGroup';
import {useAuthContext} from '../../GroupProvider';
import classes from './Home.module.scss';

const HomeView: React.FC = () => {
	const navigate = useNavigate();
	const {group, userId} = useAuthContext();

	const redirectRol = () => {
		switch (group) {
			case Groups.AdminsGroup:
				navigate('/labs');
				break;
			default:
				navigate('/lab-semesters', {
					state: {userId: userId}
				});
				break;
		}
	};

	return (
		<Container fluid>
			<LoadingContainer loading={false}>
				<Row style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
					<div className={'col-md-4 ' + classes.cardItem}>
						<span className={classes.cardTitle}>LABORATORIOS</span>
						<Image className={classes.cardImage} src={labsImage} onClick={() => redirectRol()} />
					</div>
					<ValidateGroupComponent groups={[Groups.AdminsGroup]}>
						<div className={'col-md-4 ' + classes.cardItem}>
							<span className={classes.cardTitle}>USUARIOS</span>
							<Image className={classes.cardImage} src={usersImage} onClick={() => navigate('/users')} />
						</div>
					</ValidateGroupComponent>
				</Row>
			</LoadingContainer>
		</Container>
	);
};
export default HomeView;
