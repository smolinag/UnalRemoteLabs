import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Status {
  PENDING = "pending",
  SUCCESS = "success",
  FAILURE = "failure",
  BUSY = "busy"
}

export enum Role {
  ADMINS = "Admins",
  MONITORS = "Monitors",
  STUDENTS = "Students",
  PROFESSORS = "Professors"
}

export declare class LabOutputOut {
  readonly labPracticeOutputID: string;
  readonly value: string;
  readonly rpiID: string;
  readonly captureDate: string;
  constructor(init: ModelInit<LabOutputOut>);
}

type LabPracticeSessionCommandMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabPracticeSessionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabPracticeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LaboratoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrganizationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserLabPracticeSessionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserLabSemesterMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LabSemesterMetaData = {
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

type LabPracticeOutputMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class LabPracticeSessionCommand {
  readonly id: string;
  readonly requestDate: string;
  readonly executionDate?: string;
  readonly status: Status | keyof typeof Status;
  readonly parameters?: string;
  readonly LabPracticeSession?: LabPracticeSession;
  readonly LabPracticeCommand?: LabPracticeCommand;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPracticeSessionCommand, LabPracticeSessionCommandMetaData>);
  static copyOf(source: LabPracticeSessionCommand, mutator: (draft: MutableModel<LabPracticeSessionCommand, LabPracticeSessionCommandMetaData>) => MutableModel<LabPracticeSessionCommand, LabPracticeSessionCommandMetaData> | void): LabPracticeSessionCommand;
}

export declare class LabPracticeSession {
  readonly id: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly description?: string;
  readonly LabPractice?: LabPractice;
  readonly LabSemester?: LabSemester;
  readonly LabPracticeSessionCommands?: (LabPracticeSessionCommand | null)[];
  readonly UserLabPracticeSessions?: (UserLabPracticeSession | null)[];
  readonly videoUrlCode?: string;
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPracticeSession, LabPracticeSessionMetaData>);
  static copyOf(source: LabPracticeSession, mutator: (draft: MutableModel<LabPracticeSession, LabPracticeSessionMetaData>) => MutableModel<LabPracticeSession, LabPracticeSessionMetaData> | void): LabPracticeSession;
}

export declare class LabPractice {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly duration: number;
  readonly Laboratory?: Laboratory;
  readonly LabPracticeCommands?: (LabPracticeCommand | null)[];
  readonly LabPracticeParameters?: (LabPracticeParameter | null)[];
  readonly LabPracticeDevice?: LabPracticeDevice;
  readonly LabPracticeSessions?: (LabPracticeSession | null)[];
  readonly LabPracticeOutputs?: (LabPracticeOutput | null)[];
  readonly guideS3Path?: string;
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPractice, LabPracticeMetaData>);
  static copyOf(source: LabPractice, mutator: (draft: MutableModel<LabPractice, LabPracticeMetaData>) => MutableModel<LabPractice, LabPracticeMetaData> | void): LabPractice;
}

export declare class Laboratory {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly Organization?: Organization;
  readonly LabSemesters?: (LabSemester | null)[];
  readonly LabPractices?: (LabPractice | null)[];
  readonly updatedBy?: string;
  readonly createdBy: string;
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
  readonly Laboratories?: (Laboratory | null)[];
  readonly Users?: (User | null)[];
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Organization, OrganizationMetaData>);
  static copyOf(source: Organization, mutator: (draft: MutableModel<Organization, OrganizationMetaData>) => MutableModel<Organization, OrganizationMetaData> | void): Organization;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly identificationNumber?: string;
  readonly email: string;
  readonly phone?: string;
  readonly userName?: string;
  readonly s3AvatarPath?: string;
  readonly role: Role | keyof typeof Role;
  readonly Organization?: Organization;
  readonly UserLabPracticeSessions?: (UserLabPracticeSession | null)[];
  readonly UserLabSemesters?: (UserLabSemester | null)[];
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class UserLabPracticeSession {
  readonly id: string;
  readonly sessionStartDate?: string;
  readonly sessionEndDate?: string;
  readonly User?: User;
  readonly LabPracticeSession?: LabPracticeSession;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserLabPracticeSession, UserLabPracticeSessionMetaData>);
  static copyOf(source: UserLabPracticeSession, mutator: (draft: MutableModel<UserLabPracticeSession, UserLabPracticeSessionMetaData>) => MutableModel<UserLabPracticeSession, UserLabPracticeSessionMetaData> | void): UserLabPracticeSession;
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
  readonly professor: string;
  readonly monitorEmailList?: string;
  readonly studentEmailList: string;
  readonly Laboratory?: Laboratory;
  readonly users?: (UserLabSemester | null)[];
  readonly LabPracticeSessions?: (LabPracticeSession | null)[];
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabSemester, LabSemesterMetaData>);
  static copyOf(source: LabSemester, mutator: (draft: MutableModel<LabSemester, LabSemesterMetaData>) => MutableModel<LabSemester, LabSemesterMetaData> | void): LabSemester;
}

export declare class LabPracticeCommand {
  readonly id: string;
  readonly name: string;
  readonly labelName?: string;
  readonly order?: number;
  readonly description?: string;
  readonly LabPractice?: LabPractice;
  readonly LabPracticeParameters?: (LabPracticeParameter | null)[];
  readonly LabPracticeSessionCommands?: (LabPracticeSessionCommand | null)[];
  readonly updatedBy?: string;
  readonly createdBy: string;
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
  readonly LabPracticeCommand?: LabPracticeCommand;
  readonly LabPractice?: LabPractice;
  readonly updatedBy?: string;
  readonly createdBy?: string;
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
  readonly LabPractice?: LabPractice;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPracticeDevice, LabPracticeDeviceMetaData>);
  static copyOf(source: LabPracticeDevice, mutator: (draft: MutableModel<LabPracticeDevice, LabPracticeDeviceMetaData>) => MutableModel<LabPracticeDevice, LabPracticeDeviceMetaData> | void): LabPracticeDevice;
}

export declare class LabPracticeOutput {
  readonly id: string;
  readonly name: string;
  readonly labelName?: string;
  readonly order?: number;
  readonly description?: string;
  readonly units?: string;
  readonly LabPractice?: LabPractice;
  readonly outputType: string;
  readonly updatedBy?: string;
  readonly createdBy: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<LabPracticeOutput, LabPracticeOutputMetaData>);
  static copyOf(source: LabPracticeOutput, mutator: (draft: MutableModel<LabPracticeOutput, LabPracticeOutputMetaData>) => MutableModel<LabPracticeOutput, LabPracticeOutputMetaData> | void): LabPracticeOutput;
}