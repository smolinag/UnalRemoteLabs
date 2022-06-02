import React from 'react';
import {Container, Row, Image} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import labsImage from '../../assets/images/unalManizales.jpg';
import usersImage from '../../assets/images/users.jpg';
import {LoadingContainer} from '../../components/UI';
// import {Groups} from '../../generalUtils/groups';
// import {useAuthContext} from '../../GroupProvider';
import classes from './Home.module.scss';

const HomeView: React.FC = () => {
	const navigate = useNavigate();
	// const {group, userId} = useAuthContext();

	return (
		<Container fluid>
			<LoadingContainer loading={false}>
				<Row style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
					<div className={'col-md-4 ' + classes.cardItem}>
						<span className={classes.cardTitle}>LABORATORIOS</span>
						<Image
							className={classes.cardImage}
							src={labsImage}
							onClick={() =>
								// group === Groups.StudentsGroup
								// 	? navigate('/user-labs-sessions', {
								// 			state: {userId: userId}
								// 	  })
								// 	: 
									navigate('/labs')
							}
						/>
					</div>
					{/* {group === Groups.StudentsGroup ?? ( */}
						<div className={'col-md-4 ' + classes.cardItem}>
							<span className={classes.cardTitle}>USUARIOS</span>
							<Image className={classes.cardImage} src={usersImage} onClick={() => navigate('/users')} />
						</div>
					{/* )} */}
				</Row>
			</LoadingContainer>
		</Container>
	);
};
export default HomeView;
