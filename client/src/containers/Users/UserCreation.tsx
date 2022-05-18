import React, {useContext, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

import {Button, LoadingContainer} from '../../components/UI';
import {UserData} from '../../components/Users/index';
import {isEmail} from '../../generalUtils/EmailUtils';
import {
	useCreateUserMutation,
	useGetUserByEmailQuery,
	useCreateCognitoUserMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {User, ErrorIdentifier, Params, LocationUserStateCreation, Role} from './types';

let initialUser: User = {
	id: '',
	organizationID: '',
	name: '',
	identificationNumber: '',
	email: '',
	phone: '',
	role: Role.Students
};

const UserCreation: React.FC<unknown> = () => {
	const location = useLocation();
	const organizationId = (location.state as LocationUserStateCreation)?.selectedOrganizationId;
	const userRole = (location.state as LocationUserStateCreation)?.selectedRole;

	initialUser = {...initialUser, organizationID: organizationId, role: userRole};

	const [user, setUser] = useState<User>(initialUser);
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<ErrorIdentifier[]>([]);

	const [createUser] = useCreateUserMutation();
	const [createCognitoUser] = useCreateCognitoUserMutation();

	const {refetch: getUserByEmail} = useGetUserByEmailQuery({skip: true, notifyOnNetworkStatusChange: true});

	const navigate = useNavigate();
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const onUserChange = (user: User) => {
		setUser(user);
	};

	const checkErrorMessage = () => {
		let hasError = false;

		let errors: ErrorIdentifier[] = [];

		if (user.email?.length === 0) {
			hasError = true;
			errors = errors.concat({
				identifier: Params.Email
			});
		} else {
			errors = [];
		}

		setErrors(errors);

		return hasError;
	};

	const validateEmail = async () => {
		let isEmailValid = true;
		if (user.email && !isEmail(user.email)) {
			isEmailValid = false;
			showErrorBanner(
				`Email ${user.email} no valido. Recuerde que debe ser un email de la universidad con el dominio @unal.edu.co`
			);
		} else {
			const {data} = await getUserByEmail({
				email: user.email
			});
			if (data?.getUserByEmail) {
				const items = data?.getUserByEmail?.items?.filter((item) => item !== null && item._deleted !== true);
				if (items.length > 0) {
					isEmailValid = false;
					showErrorBanner(`El usuario con el email ${user.email} ya existe`);
				}
			}
		}

		return isEmailValid;
	};

	const handleOnCreateUser = async () => {
		const hasError = checkErrorMessage();

		let isEmailValid = false;
		if (!hasError) {
			isEmailValid = await validateEmail();
		}

		if (!hasError && isEmailValid) {
			setLoading(true);

			try {
				const {data: userData} = await createUser({
					variables: {
						input: {
							organizationID: organizationId,
							role: userRole,
							name: user?.name ?? '',
							identificationNumber: user?.identificationNumber,
							email: user?.email ?? '',
							phone: user?.phone,
							createdBy: '1',
							updatedBy: '1'
						}
					}
				});

				if (!userData?.createUser?.id) {
					throw Error('Error insertando Usuario');
				} else {
					const randomstring = Math.random().toString(36).slice(-8);
					console.log(randomstring);
					await createCognitoUser({
						variables: {
							input: {
								email: user?.email ?? '',
								password: randomstring
							}
						}
					});
				}

				showSuccessBanner(`El usuario ${user.email} fue creado exitosamente`);
				setUser(initialUser);
			} catch (error) {
				console.error(error);
				showErrorBanner(`Error en la creación del usuario ${user.email}`);
			} finally {
				setLoading(false);
				navigate('/users');
			}
		}
	};

	return (
		<Container fluid>
			<LoadingContainer loading={loading}>
				<Row className="section">
					<h3 className="title">Creación de Usuario</h3>
					<UserData
						userValue={user}
						handleChange={onUserChange}
						errors={errors}
						organizationDisabled
						userTypeDisabled
					/>
				</Row>
				<Row className="section">
					<h3 className="title" />
					<Col className="justifyEnd">
						<Button loading={loading} onClick={handleOnCreateUser}>
							Guardar
						</Button>
					</Col>
				</Row>
			</LoadingContainer>
		</Container>
	);
};

export default UserCreation;
