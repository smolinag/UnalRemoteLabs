import {Storage} from 'aws-amplify';
import React, {useContext, useState, useEffect} from 'react';
import {Container, Row, Col, Card, Image} from 'react-bootstrap';
import {useLocation, useNavigate} from 'react-router-dom';

import userLogo from '../../assets/images/userLogo.png';
import {Button, LoadingContainer, ImageInput} from '../../components/UI';
import {UserData} from '../../components/Users/index';
import {isEmail} from '../../generalUtils/EmailUtils';
import {useUpdateUserMutation, useGetUserByEmailQuery} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {User, ErrorIdentifier, Params, Role} from '../Users/types';
import classes from './account.module.scss';
import {LocationAccountState} from './types';

const initialUser: User = {
	id: '',
	organizationID: '',
	name: '',
	identificationNumber: '',
	email: '',
	phone: '',
	s3AvatarPath: null,
	role: Role.Students
};

const Account: React.FC = () => {
	const [user, setUser] = useState<User>(initialUser);
	const [errors, setErrors] = useState<ErrorIdentifier[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [userImage, setUserImage] = React.useState<string>(userLogo);
	const [userImageFile, setUserImageFile] = React.useState<File | null>(null);

	const [updateUser] = useUpdateUserMutation();

	const navigate = useNavigate();
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const location = useLocation();
	const userEmail = (location.state as LocationAccountState)?.userEmail;
	const {data: userData, loading: loadingUserData} = useGetUserByEmailQuery({
		variables: {email: userEmail}
	});

	useEffect(() => {
		if (userData?.getUserByEmail && userData?.getUserByEmail != null) {
			const items = userData?.getUserByEmail?.items?.filter((item) => item !== null && item._deleted !== true);
			if (items.length > 0) {
				const user = items[0];
				if (user !== null) {
					setUser({
						id: user.id,
						organizationID: user.organizationID,
						name: user.name ?? '',
						email: user.email,
						identificationNumber: user.identificationNumber ?? '',
						phone: user.phone ?? '',
						role: user.role,
						s3AvatarPath: user.s3AvatarPath,
						version: user._version,
						deleted: user._deleted ?? false
					});
					const setImages = async () => {
						if (user.s3AvatarPath && user.s3AvatarPath !== null) {
							const userImage = await Storage.get(user.s3AvatarPath);
							setUserImage(userImage);
						}
					};
					setImages();
				}
			}
		}
		setLoading(loadingUserData);
	}, [userData]);

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

	const handleOnCreateUser = async () => {
		const hasError = checkErrorMessage();

		let isEmailValid = false;
		if (user.email) {
			isEmailValid = isEmail(user.email);
		}

		if (!hasError && isEmailValid) {
			setLoading(true);

			try {
				const {data: userData} = await updateUser({
					variables: {
						input: {
							id: user.id ?? '',
							organizationID: user.organizationID,
							role: user.role,
							name: user?.name ? user.name : '',
							identificationNumber: user?.identificationNumber,
							email: user?.email ? user.email : '',
							phone: user?.phone,
							s3AvatarPath: user.s3AvatarPath,
							createdBy: '1',
							_version: user.version
						}
					}
				});

				if (!userData?.updateUser?.id) {
					throw Error('Error Actualizando Usuario');
				} else {
					try {
						if (userImageFile && userImageFile !== null && user.s3AvatarPath && user.s3AvatarPath !== null) {
							await Storage.put(user.s3AvatarPath, userImageFile);
						}
					} catch (e) {
						console.error('Error uploading guide to S3', e);
					}
				}

				showSuccessBanner(`El usuario ${user.email} fue actualizado exitosamente`);
				setUser(initialUser);
			} catch (error) {
				console.error(error);
				showErrorBanner(`Error en la actualización del usuario ${user.email}`);
			} finally {
				setLoading(false);
				navigate('/');
			}
		}
	};

	const onChangeImage = async (file: File) => {
		if (file && file !== null) {
			if (file.type === 'image/jpeg' || file.type === 'image/png') {
				const extension = file.name.split('.').pop();
				setUser({...user, s3AvatarPath: `profile-pictures/${user.id}.${extension}`});
				setUserImageFile(file);
				const userImage = URL.createObjectURL(file);
				setUserImage(userImage);
			} else {
				showErrorBanner('El archivo seleccionado debe ser jpg o png');
			}
		}
	};

	return (
		<Container fluid>
			<LoadingContainer loading={loading}>
				<Row className="section">
					<h3 className="title">Mi Cuenta</h3>
				</Row>
				<Row>
					<Col xs={12} sm={3}>
						<div className={classes.card}>
							<Card className="text-center">
								<Card.Header>Mi Foto</Card.Header>
								<Card.Body>
									<Row className="justifyCenter">
										<Col>
											<Image roundedCircle thumbnail src={userImage} />
										</Col>
									</Row>
									<Row>
										<Col className="justifyCenter">
											<ImageInput onFileSelected={(file) => onChangeImage(file)} />
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</div>
					</Col>
					<Col xs={12} sm={9}>
						<UserData
							userValue={user}
							handleChange={onUserChange}
							errors={errors}
							organizationDisabled
							userTypeDisabled
							emailDisabled
						/>
					</Col>
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

export default Account;
