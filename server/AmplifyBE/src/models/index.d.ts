import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class LabOutputOut {
  readonly id: string;
  readonly captureDate?: string;
  readonly value?: string;
  readonly labpracticeoutputID: string;
  readonly labpracticesessionID: string;
  constructor(init: ModelInit<LabOutputOut>);
}

type UserLabPracticeSessionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RoleUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RoleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PrivilegeRoleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PrivilegeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserLabSemesterMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabSemesterMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LaboratoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrganizationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabPracticeSessionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabPracticeOutputMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabPracticeSessionCommandMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabPracticeCommandMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabPracticeParameterMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabPracticeDeviceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabPracticeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UserLabPracticeSession {
  readonly id: string;
  readonly sessionStartDate?: string;
  readonly sessionEndDate?: string;
  readonly User?: User;
  readonly LabPracticeSession?: LabPracticeSession;
  readonly userID: string;
  readonly labpracticesessionID: string;
  readonly roleID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserLabPracticeSession, UserLabPracticeSessionMetaData>);
  static copyOf(source: UserLabPracticeSession, mutator: (draft: MutableModel<UserLabPracticeSession, UserLabPracticeSessionMetaData>) => MutableModel<UserLabPracticeSession, UserLabPracticeSessionMetaData> | void): UserLabPracticeSession;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly lastNames: string;
  readonly documentIdNumber?: string;
  readonly email: string;
  readonly phone?: string;
  readonly userName?: string;
  readonly s3AvatarPath?: string;
  readonly dateOfBirth?: string;
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly UserLabPracticeSessions?: (UserLabPracticeSession | null)[];
  readonly Roles?: (RoleUser | null)[];
  readonly UserLabSemesters?: (UserLabSemester | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class RoleUser {
  readonly id: string;
  readonly user: User;
  readonly role: Role;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<RoleUser, RoleUserMetaData>);
  static copyOf(source: RoleUser, mutator: (draft: MutableModel<RoleUser, RoleUserMetaData>) => MutableModel<RoleUser, RoleUserMetaData> | void): RoleUser;
}

export declare class Role {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly createdBy: string;
  readonly updatedBy?: string;
  readonly UserLabPracticeSessions?: (UserLabPracticeSession | null)[];
  readonly Privileges?: (PrivilegeRole | null)[];
  readonly Users?: (RoleUser | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Role, RoleMetaData>);
  static copyOf(source: Role, mutator: (draft: MutableModel<Role, RoleMetaData>) => MutableModel<Role, RoleMetaData> | void): Role;
}

export declare class PrivilegeRole {
  readonly id: string;
  readonly privilege: Privilege;
  readonly role: Role;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PrivilegeRole, PrivilegeRoleMetaData>);
  static copyOf(source: PrivilegeRole, mutator: (draft: MutableModel<PrivilegeRole, PrivilegeRoleMetaData>) => MutableModel<PrivilegeRole, PrivilegeRoleMetaData> | void): PrivilegeRole;
}

export declare class Privilege {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly Roles?: (PrivilegeRole | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Privilege, PrivilegeMetaData>);
  static copyOf(source: Privilege, mutator: (draft: MutableModel<Privilege, PrivilegeMetaData>) => MutableModel<Privilege, PrivilegeMetaData> | void): Privilege;
}

export declare class UserLabSemester {
  readonly id: string;
  readonly user: User;
  readonly labsemester: LabSemester;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserLabSemester, UserLabSemesterMetaData>);
  static copyOf(source: UserLabSemester, mutator: (draft: MutableModel<UserLabSemester, UserLabSemesterMetaData>) => MutableModel<UserLabSemester, UserLabSemesterMetaData> | void): UserLabSemester;
}

export declare class LabSemester {
  readonly id: string;
  readonly semesterName: string;
  readonly description?: string;
  readonly emailUserList?: string;
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly Laboratory?: Laboratory;
  readonly laboratoryID: string;
  readonly users?: (UserLabSemester | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabSemester, LabSemesterMetaData>);
  static copyOf(source: LabSemester, mutator: (draft: MutableModel<LabSemester, LabSemesterMetaData>) => MutableModel<LabSemester, LabSemesterMetaData> | void): LabSemester;
}

export declare class Laboratory {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly LabSemesters?: (LabSemester | null)[];
  readonly organizationID: string;
  readonly Organization?: Organization;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Laboratory, LaboratoryMetaData>);
  static copyOf(source: Laboratory, mutator: (draft: MutableModel<Laboratory, LaboratoryMetaData>) => MutableModel<Laboratory, LaboratoryMetaData> | void): Laboratory;
}

export declare class Organization {
  readonly id: string;
  readonly country: string;
  readonly region: string;
  readonly city: string;
  readonly type: string;
  readonly name: string;
  readonly description?: string;
  readonly phone?: string;
  readonly address?: string;
  readonly createdBy: string;
  readonly updatedBy?: string;
  readonly Laboratories?: (Laboratory | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Organization, OrganizationMetaData>);
  static copyOf(source: Organization, mutator: (draft: MutableModel<Organization, OrganizationMetaData>) => MutableModel<Organization, OrganizationMetaData> | void): Organization;
}

export declare class LabPracticeSession {
  readonly id: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly description?: string;
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly LabPractice?: LabPracticeOutput;
  readonly labpracticeID: string;
  readonly LabPracticeSessionCommands?: (LabPracticeSessionCommand | null)[];
  readonly UserLabPracticeSessions?: (UserLabPracticeSession | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPracticeSession, LabPracticeSessionMetaData>);
  static copyOf(source: LabPracticeSession, mutator: (draft: MutableModel<LabPracticeSession, LabPracticeSessionMetaData>) => MutableModel<LabPracticeSession, LabPracticeSessionMetaData> | void): LabPracticeSession;
}

export declare class LabPracticeOutput {
  readonly id: string;
  readonly name: string;
  readonly labelName?: string;
  readonly order?: number;
  readonly description?: string;
  readonly units?: string;
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly labpracticeID: string;
  readonly outputType: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPracticeOutput, LabPracticeOutputMetaData>);
  static copyOf(source: LabPracticeOutput, mutator: (draft: MutableModel<LabPracticeOutput, LabPracticeOutputMetaData>) => MutableModel<LabPracticeOutput, LabPracticeOutputMetaData> | void): LabPracticeOutput;
}

export declare class LabPracticeSessionCommand {
  readonly id: string;
  readonly requestDate: string;
  readonly executionDate?: string;
  readonly status: string;
  readonly parameters?: string;
  readonly LabPracticeSession?: LabPracticeSession;
  readonly labpracticesessionID: string;
  readonly LabPracticeCommand?: LabPracticeCommand;
  readonly labpracticecommandID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPracticeSessionCommand, LabPracticeSessionCommandMetaData>);
  static copyOf(source: LabPracticeSessionCommand, mutator: (draft: MutableModel<LabPracticeSessionCommand, LabPracticeSessionCommandMetaData>) => MutableModel<LabPracticeSessionCommand, LabPracticeSessionCommandMetaData> | void): LabPracticeSessionCommand;
}

export declare class LabPracticeCommand {
  readonly id: string;
  readonly name: string;
  readonly labelName?: string;
  readonly order?: number;
  readonly description?: string;
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly LabPractice?: LabPracticeParameter;
  readonly labpracticeID: string;
  readonly LabPracticeParameters?: (LabPracticeParameter | null)[];
  readonly LabPracticeSessionCommands?: (LabPracticeSessionCommand | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPracticeCommand, LabPracticeCommandMetaData>);
  static copyOf(source: LabPracticeCommand, mutator: (draft: MutableModel<LabPracticeCommand, LabPracticeCommandMetaData>) => MutableModel<LabPracticeCommand, LabPracticeCommandMetaData> | void): LabPracticeCommand;
}

export declare class LabPracticeParameter {
  readonly id: string;
  readonly name: string;
  readonly labelName?: string;
  readonly order?: number;
  readonly description?: string;
  readonly defaultValue: string;
  readonly minValue?: number;
  readonly maxValue?: number;
  readonly regex?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  readonly LabPracticeCommand?: LabPracticeCommand;
  readonly labpracticecommandID?: string;
  readonly LabPractice?: LabPracticeDevice;
  readonly labpracticeID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPracticeParameter, LabPracticeParameterMetaData>);
  static copyOf(source: LabPracticeParameter, mutator: (draft: MutableModel<LabPracticeParameter, LabPracticeParameterMetaData>) => MutableModel<LabPracticeParameter, LabPracticeParameterMetaData> | void): LabPracticeParameter;
}

export declare class LabPracticeDevice {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly type?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  readonly LabPractice?: LabPracticeOutput;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPracticeDevice, LabPracticeDeviceMetaData>);
  static copyOf(source: LabPracticeDevice, mutator: (draft: MutableModel<LabPracticeDevice, LabPracticeDeviceMetaData>) => MutableModel<LabPracticeDevice, LabPracticeDeviceMetaData> | void): LabPracticeDevice;
}

export declare class LabPractice {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly duration: number;
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly Laboratory?: Laboratory;
  readonly laboratoryID: string;
  readonly LabPracticeCommands?: (LabPracticeCommand | null)[];
  readonly LabPracticeParameters?: (LabPracticeParameter | null)[];
  readonly LabPracticeDevice?: LabPracticeDevice;
  readonly LabPracticeSessions?: (LabPracticeSession | null)[];
  readonly LabPracticeOutputs?: (LabPracticeOutput | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPractice, LabPracticeMetaData>);
  static copyOf(source: LabPractice, mutator: (draft: MutableModel<LabPractice, LabPracticeMetaData>) => MutableModel<LabPractice, LabPracticeMetaData> | void): LabPractice;
}