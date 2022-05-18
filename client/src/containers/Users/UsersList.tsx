import React, {useState, useEffect, useContext} from 'react';
import {Row, Col} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import {Button, LoadingContainer, ModalComponent} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {UserTypeSelector, OrganizationSelector, UsersTable} from '../../components/Users';
import {
	useListUsersByRoleAndOrganizationIdQuery,
	useDeleteUserMutation,
	useRemoveCognitoUserMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {User, Option, UserType, Role} from './types';

const intial_org = {
	id: 'd80b954b-9477-4061-aa8a-c14c5711143b',
	value: 'Unal Manizales'
};

const intial_role = {
	id: '2',
	value: 'Estudiantes',
	role: Role.Students
};

const initialUser: User = {
	id: '',
	organizationID: '',
	name: '',
	identificationNumber: '',
	email: '',
	phone: '',
	role: Role.Students
};

const UsersList: React.FC<unknown> = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<Array<User>>([]);
	const [selectedOrganization, setSelectedOrganization] = useState<Option>(intial_org);

	const [selectedUserType, setSelectedUserType] = useState<UserType>(intial_role);

	const [loading, setLoading] = useState<boolean>(false);
	const [displayModal, setDisplayModal] = useState<boolean>(false);

	const {
		data: usersData,
		loading: loadingUsersData,
		refetch: refetchUsersData
	} = useListUsersByRoleAndOrganizationIdQuery({
		variables: {role: intial_role.role, organizationID: intial_org.id},
		notifyOnNetworkStatusChange: true
	});

	const [userToDelete, setUserToDelete] = useState<User>(initialUser);
	const [deleteUser] = useDeleteUserMutation();
	const [removeCognitoUserMutation] = useRemoveCognitoUserMutation();
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	useEffect(() => {
		refetchUsersData();
		if (usersData && usersData.listUsers?.items) {
			const userList: Array<User> = usersData.listUsers?.items
				.filter((obj) => obj && !obj._deleted)
				.map((obj) => {
					return {
						id: obj?.id ?? '',
						organizationID: obj?.organizationID ?? '',
						name: obj?.name ?? '',
						identificationNumber: obj?.identificationNumber ?? '',
						email: obj?.email ?? '',
						phone: obj?.phone ?? '',
						role: obj?.role ?? Role.Students,
						version: obj?._version,
						deleted: obj?._deleted
					};
				});
			setUsers(userList);
		}
	}, [usersData]);

	const handleUsersTableAction = (index: number, action: Action) => {
		switch (action) {
			case Action.Edit:
				navigate('/user-edition', {state: {userId: users[index].id}});
				break;
			case Action.Delete:
				setDisplayModal(true);
				setUserToDelete(users[index]);
				break;
		}
	};

	const handleDisplayModal = (display: boolean) => {
		setDisplayModal(display);
		setUserToDelete(initialUser);
	};

	const onDeleteOk = () => {
		if (userToDelete && userToDelete?.id) {
			setLoading(true);
			deleteUser({
				variables: {
					input: {
						id: userToDelete?.id,
						_version: userToDelete.version
					}
				}
			})
				.then(async (response) => {
					const deletedUser = response.data?.deleteUser;
					if (deletedUser?._deleted) {
						setUsers(users.filter((obj) => obj.id !== deletedUser?.id));
						await removeCognitoUserMutation({
							variables: {
								email: deletedUser.email
							}
						});
					}
					setDisplayModal(false);
					showSuccessBanner(`El usuario ${deletedUser?.email} fue eliminado exitosamente`);
				})
				.catch((error) => {
					console.error(error);
					setDisplayModal(false);
					showErrorBanner(`No se pudo eliminar el usuario ${userToDelete.email}`);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	const handleOnSelectOrganization = async (id: string, value: string) => {
		setSelectedOrganization({id, value});
		refetchUsersData({role: selectedUserType.role, organizationID: id});
	};

	const handleOnSelectUserType = (id: string, value: string, role: Role) => {
		setSelectedUserType({id, value, role});
		refetchUsersData({role, organizationID: selectedOrganization.id});
	};

	return (
		<LoadingContainer loading={loadingUsersData}>
			<ModalComponent
				display={displayModal}
				onDisplay={handleDisplayModal}
				onSave={onDeleteOk}
				title={userToDelete?.email ?? ''}
				loadingAccept={loading}>
				<div>Está seguro de borrar el usuario {userToDelete?.email}?</div>
			</ModalComponent>
			<Row className="section">
				<h3 className="title">Usuarios</h3>
			</Row>
			<Row className="section">
				<Col sm={4} lg={2}>
					<OrganizationSelector onSelect={handleOnSelectOrganization} value={selectedOrganization.id} />
				</Col>
				<Col sm={4} lg={2}>
					<UserTypeSelector onSelect={handleOnSelectUserType} value={selectedUserType.role} />
				</Col>
			</Row>
			<Row className="section">
				<UsersTable data={users} onAction={handleUsersTableAction} />
			</Row>
			<Row className="section">
				<div className="justifyEnd">
					<Button
						loading={false}
						onClick={() =>
							navigate('/user-creation', {
								state: {selectedOrganizationId: selectedOrganization.id, selectedRole: selectedUserType.role}
							})
						}>
						Crear
					</Button>
				</div>
			</Row>
		</LoadingContainer>
	);
};

export default UsersList;
