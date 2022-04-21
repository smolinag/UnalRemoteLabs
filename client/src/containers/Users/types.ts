export interface User {
	id?: string;
	organizationID: string;
	name?: string;
	identificationNumber?: string;
	email?: string;
	phone?: string;
	role: Role;
	version?: number;
	deleted?: boolean | null;
}

export interface Organization {
	id: string;
	name: string;
}

export enum Params {
	Name = 'name',
	IdentificationNumber = 'identificationNumber',
	Email = 'email',
	Phone = 'phone'
}

export interface ErrorIdentifier {
	identifier: string;
}

export enum Role {
	Admins = 'Admins',
	Monitors = 'Monitors',
	Students = 'Students',
	Professors = 'Professors'
}

export interface UserType {
	id: string;
	value: string;
	role: Role;
}

export interface Option {
	id: string;
	value: string;
}

export interface LocationUserStateCreation {
	selectedOrganizationId: string;
	selectedRole: Role;
}

export interface LocationUserStateEdition {
	userId: string;
}
