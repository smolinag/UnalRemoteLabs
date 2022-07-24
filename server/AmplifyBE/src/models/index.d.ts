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

type LabPracticeOutputMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class LabPracticeSessionCommand {
  readonly id: string;
  readonly requestDate: string;
  readonly executionDate?: string | null;
  readonly status: Status | keyof typeof Status;
  readonly username?: string | null;
  readonly parameters?: string | null;
  readonly LabPracticeSession?: LabPracticeSession | null;
  readonly LabPracticeCommand?: LabPracticeCommand | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LabPracticeSessionCommand, LabPracticeSessionCommandMetaData>);
  static copyOf(source: LabPracticeSessionCommand, mutator: (draft: MutableModel<LabPracticeSessionCommand, LabPracticeSessionCommandMetaData>) => MutableModel<LabPracticeSessionCommand, LabPracticeSessionCommandMetaData> | void): LabPracticeSessionCommand;
}

export declare class LabPracticeSession {
  readonly id: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly description?: string | null;
  readonly LabPractice?: LabPractice | null;
  readonly LabSemester?: LabSemester | null;
  readonly LabPracticeSessionCommands?: (LabPracticeSessionCommand | null)[] | null;
  readonly UserLabPracticeSessions?: (UserLabPracticeSession | null)[] | null;
  readonly leaderUsers?: string | null;
  readonly videoUrlCode?: string | null;
  readonly updatedBy?: string | null;
  readonly createdBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LabPracticeSession, LabPracticeSessionMetaData>);
  static copyOf(source: LabPracticeSession, mutator: (draft: MutableModel<LabPracticeSession, LabPracticeSessionMetaData>) => MutableModel<LabPracticeSession, LabPracticeSessionMetaData> | void): LabPracticeSession;
}

export declare class LabPractice {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly duration: number;
  readonly Laboratory?: Laboratory | null;
  readonly LabPracticeCommands?: (LabPracticeCommand | null)[] | null;
  readonly LabPracticeParameters?: (LabPracticeParameter | null)[] | null;
  readonly LabPracticeDeviceId: string;
  readonly LabPracticeSessions?: (LabPracticeSession | null)[] | null;
  readonly LabPracticeOutputs?: (LabPracticeOutput | null)[] | null;
  readonly guideS3Path?: string | null;
  readonly updatedBy?: string | null;
  readonly createdBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LabPractice, LabPracticeMetaData>);
  static copyOf(source: LabPractice, mutator: (draft: MutableModel<LabPractice, LabPracticeMetaData>) => MutableModel<LabPractice, LabPracticeMetaData> | void): LabPractice;
}

export declare class Laboratory {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly Organization?: Organization | null;
  readonly LabSemesters?: (LabSemester | null)[] | null;
  readonly LabPractices?: (LabPractice | null)[] | null;
  readonly updatedBy?: string | null;
  readonly createdBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
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
  readonly description?: string | null;
  readonly phone?: string | null;
  readonly address?: string | null;
  readonly Laboratories?: (Laboratory | null)[] | null;
  readonly Users?: (User | null)[] | null;
  readonly updatedBy?: string | null;
  readonly createdBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Organization, OrganizationMetaData>);
  static copyOf(source: Organization, mutator: (draft: MutableModel<Organization, OrganizationMetaData>) => MutableModel<Organization, OrganizationMetaData> | void): Organization;
}

export declare class User {
  readonly id: string;
  readonly name?: string | null;
  readonly identificationNumber?: string | null;
  readonly email: string;
  readonly phone?: string | null;
  readonly s3AvatarPath?: string | null;
  readonly role: Role | keyof typeof Role;
  readonly Organization?: Organization | null;
  readonly UserLabPracticeSessions?: (UserLabPracticeSession | null)[] | null;
  readonly UserLabSemesters?: (UserLabSemester | null)[] | null;
  readonly updatedBy?: string | null;
  readonly createdBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class UserLabPracticeSession {
  readonly id: string;
  readonly sessionStartDate?: string | null;
  readonly sessionEndDate?: string | null;
  readonly User?: User | null;
  readonly LabPracticeSession?: LabPracticeSession | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserLabPracticeSession, UserLabPracticeSessionMetaData>);
  static copyOf(source: UserLabPracticeSession, mutator: (draft: MutableModel<UserLabPracticeSession, UserLabPracticeSessionMetaData>) => MutableModel<UserLabPracticeSession, UserLabPracticeSessionMetaData> | void): UserLabPracticeSession;
}

export declare class UserLabSemester {
  readonly id: string;
  readonly user: User;
  readonly labsemester: LabSemester;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserLabSemester, UserLabSemesterMetaData>);
  static copyOf(source: UserLabSemester, mutator: (draft: MutableModel<UserLabSemester, UserLabSemesterMetaData>) => MutableModel<UserLabSemester, UserLabSemesterMetaData> | void): UserLabSemester;
}

export declare class LabSemester {
  readonly id: string;
  readonly semesterName: string;
  readonly description?: string | null;
  readonly Laboratory?: Laboratory | null;
  readonly users?: (UserLabSemester | null)[] | null;
  readonly LabPracticeSessions?: (LabPracticeSession | null)[] | null;
  readonly updatedBy?: string | null;
  readonly createdBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LabSemester, LabSemesterMetaData>);
  static copyOf(source: LabSemester, mutator: (draft: MutableModel<LabSemester, LabSemesterMetaData>) => MutableModel<LabSemester, LabSemesterMetaData> | void): LabSemester;
}

export declare class LabPracticeCommand {
  readonly id: string;
  readonly name: string;
  readonly labelName?: string | null;
  readonly order?: number | null;
  readonly description?: string | null;
  readonly LabPractice?: LabPractice | null;
  readonly LabPracticeParameters?: (LabPracticeParameter | null)[] | null;
  readonly LabPracticeSessionCommands?: (LabPracticeSessionCommand | null)[] | null;
  readonly updatedBy?: string | null;
  readonly createdBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LabPracticeCommand, LabPracticeCommandMetaData>);
  static copyOf(source: LabPracticeCommand, mutator: (draft: MutableModel<LabPracticeCommand, LabPracticeCommandMetaData>) => MutableModel<LabPracticeCommand, LabPracticeCommandMetaData> | void): LabPracticeCommand;
}

export declare class LabPracticeParameter {
  readonly id: string;
  readonly name: string;
  readonly labelName?: string | null;
  readonly order?: number | null;
  readonly description?: string | null;
  readonly defaultValue: string;
  readonly minValue?: number | null;
  readonly maxValue?: number | null;
  readonly regex?: string | null;
  readonly LabPracticeCommand?: LabPracticeCommand | null;
  readonly LabPractice?: LabPractice | null;
  readonly updatedBy?: string | null;
  readonly createdBy?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LabPracticeParameter, LabPracticeParameterMetaData>);
  static copyOf(source: LabPracticeParameter, mutator: (draft: MutableModel<LabPracticeParameter, LabPracticeParameterMetaData>) => MutableModel<LabPracticeParameter, LabPracticeParameterMetaData> | void): LabPracticeParameter;
}

export declare class LabPracticeOutput {
  readonly id: string;
  readonly name: string;
  readonly labelName?: string | null;
  readonly order?: number | null;
  readonly description?: string | null;
  readonly units?: string | null;
  readonly LabPractice?: LabPractice | null;
  readonly outputType: string;
  readonly updatedBy?: string | null;
  readonly createdBy: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LabPracticeOutput, LabPracticeOutputMetaData>);
  static copyOf(source: LabPracticeOutput, mutator: (draft: MutableModel<LabPracticeOutput, LabPracticeOutputMetaData>) => MutableModel<LabPracticeOutput, LabPracticeOutputMetaData> | void): LabPracticeOutput;
}