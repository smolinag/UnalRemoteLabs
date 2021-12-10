/* eslint-disable */
import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]?: Maybe<T[SubKey]>};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {[SubKey in K]: Maybe<T[SubKey]>};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The `AWSDateTime` scalar type provided by AWS AppSync, represents a valid ***extended*** [ISO 8601 DateTime](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations) string. In other words, this scalar type accepts datetime strings of the form `YYYY-MM-DDThh:mm:ss.SSSZ`.  The scalar can also accept "negative years" of the form `-YYYY` which correspond to years before `0000`. For example, "**-2017-01-01T00:00Z**" and "**-9999-01-01T00:00Z**" are both valid datetime strings.  The field after the two digit seconds field is a nanoseconds field. It can accept between 1 and 9 digits. So, for example, "**1970-01-01T12:00:00.2Z**", "**1970-01-01T12:00:00.277Z**" and "**1970-01-01T12:00:00.123456789Z**" are all valid datetime strings.  The seconds and nanoseconds fields are optional (the seconds field must be specified if the nanoseconds field is to be used).  The [time zone offset](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators) is compulsory for this scalar. The time zone offset must either be `Z` (representing the UTC time zone) or be in the format `±hh:mm:ss`. The seconds field in the timezone offset will be considered valid even though it is not part of the ISO 8601 standard. */
	AWSDateTime: any;
	/** The `AWSJSON` scalar type provided by AWS AppSync, represents a JSON string that complies with [RFC 8259](https://tools.ietf.org/html/rfc8259).  Maps like "**{\\"upvotes\\": 10}**", lists like "**[1,2,3]**", and scalar values like "**\\"AWSJSON example string\\"**", "**1**", and "**true**" are accepted as valid JSON and will automatically be parsed and loaded in the resolver mapping templates as Maps, Lists, or Scalar values rather than as the literal input strings.  Invalid JSON strings like "**{a: 1}**", "**{'a': 1}**" and "**Unquoted string**" will throw GraphQL validation errors. */
	AWSJSON: any;
	/** The `AWSTimestamp` scalar type provided by AWS AppSync, represents the number of seconds that have elapsed since `1970-01-01T00:00Z`. Negative values are also accepted and these represent the number of seconds till `1970-01-01T00:00Z`.  Timestamps are serialized and deserialized as integers. The minimum supported timestamp value is **`-31557014167219200`** which corresponds to `-1000000000-01-01T00:00Z`. The maximum supported timestamp value is **`31556889864403199`** which corresponds to `1000000000-12-31T23:59:59.999999999Z`. */
	AWSTimestamp: any;
};

export type CreateLabPracticeCommandInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeCommandLabPracticeId?: Maybe<Scalars['ID']>;
};

export type CreateLabPracticeDeviceInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeDeviceLabPracticeId?: Maybe<Scalars['ID']>;
};

export type CreateLabPracticeInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	duration?: Maybe<Scalars['Int']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	laboratoryID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeLaboratoryId?: Maybe<Scalars['ID']>;
	labPracticeLabPracticeDeviceId?: Maybe<Scalars['ID']>;
};

export type CreateLabPracticeOutputInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	units?: Maybe<Scalars['AWSJSON']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	outputType?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeOutputLabPracticeId?: Maybe<Scalars['ID']>;
};

export type CreateLabPracticeParameterInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	defaultValue?: Maybe<Scalars['String']>;
	minValue?: Maybe<Scalars['Int']>;
	maxValue?: Maybe<Scalars['Int']>;
	regex?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticecommandID?: Maybe<Scalars['ID']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeParameterLabPracticeCommandId?: Maybe<Scalars['ID']>;
	labPracticeParameterLabPracticeId?: Maybe<Scalars['ID']>;
};

export type CreateLabPracticeSessionCommandInput = {
	id?: Maybe<Scalars['ID']>;
	requestDate?: Maybe<Scalars['AWSDateTime']>;
	executionDate?: Maybe<Scalars['AWSDateTime']>;
	status?: Maybe<Scalars['String']>;
	parameters?: Maybe<Scalars['AWSJSON']>;
	labpracticesessionID?: Maybe<Scalars['ID']>;
	labpracticecommandID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeSessionCommandLabPracticeSessionId?: Maybe<Scalars['ID']>;
	labPracticeSessionCommandLabPracticeCommandId?: Maybe<Scalars['ID']>;
};

export type CreateLabPracticeSessionInput = {
	id?: Maybe<Scalars['ID']>;
	startDate?: Maybe<Scalars['AWSDateTime']>;
	endDate?: Maybe<Scalars['AWSDateTime']>;
	description?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeSessionLabPracticeId?: Maybe<Scalars['ID']>;
};

export type CreateLabPracticeSessionOutputInput = {
	id?: Maybe<Scalars['ID']>;
	captureDate?: Maybe<Scalars['AWSDateTime']>;
	storageDate?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
	labpracticeoutputID?: Maybe<Scalars['ID']>;
	labpracticesessionID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeSessionOutputLabPracticeOutputId?: Maybe<Scalars['ID']>;
	labPracticeSessionOutputLabPracticeSessionId?: Maybe<Scalars['ID']>;
};

export type CreateLabSemesterInput = {
	id?: Maybe<Scalars['ID']>;
	semesterName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	emailUserList?: Maybe<Scalars['AWSJSON']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	laboratoryID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labSemesterLaboratoryId?: Maybe<Scalars['ID']>;
};

export type CreateLaboratoryInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	organizationID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	laboratoryOrganizationId?: Maybe<Scalars['ID']>;
};

export type CreateOrganizationInput = {
	id?: Maybe<Scalars['ID']>;
	country?: Maybe<Scalars['String']>;
	region?: Maybe<Scalars['String']>;
	city?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	address?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
};

export type CreatePrivilegeInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
};

export type CreatePrivilegeRoleInput = {
	id?: Maybe<Scalars['ID']>;
	privilegeID: Scalars['ID'];
	roleID: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type CreateRoleInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
};

export type CreateRoleUserInput = {
	id?: Maybe<Scalars['ID']>;
	userID: Scalars['ID'];
	roleID: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type CreateUserInput = {
	id?: Maybe<Scalars['ID']>;
	name?: Maybe<Scalars['String']>;
	lastNames?: Maybe<Scalars['String']>;
	documentIdNumber?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	userName?: Maybe<Scalars['String']>;
	s3AvatarPath?: Maybe<Scalars['String']>;
	dateOfBirth?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
};

export type CreateUserLabPracticeSessionInput = {
	id?: Maybe<Scalars['ID']>;
	sessionStartDate?: Maybe<Scalars['AWSDateTime']>;
	sessionEndDate?: Maybe<Scalars['AWSDateTime']>;
	userID?: Maybe<Scalars['ID']>;
	labpracticesessionID?: Maybe<Scalars['ID']>;
	roleID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	userLabPracticeSessionUserId?: Maybe<Scalars['ID']>;
	userLabPracticeSessionLabPracticeSessionId?: Maybe<Scalars['ID']>;
};

export type CreateUserLabSemesterInput = {
	id?: Maybe<Scalars['ID']>;
	userID: Scalars['ID'];
	labsemesterID: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteLabPracticeCommandInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteLabPracticeDeviceInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteLabPracticeInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteLabPracticeOutputInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteLabPracticeParameterInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteLabPracticeSessionCommandInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteLabPracticeSessionInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteLabPracticeSessionOutputInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteLabSemesterInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteLaboratoryInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteOrganizationInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeletePrivilegeInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeletePrivilegeRoleInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteRoleInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteRoleUserInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteUserInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteUserLabPracticeSessionInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type DeleteUserLabSemesterInput = {
	id: Scalars['ID'];
	_version?: Maybe<Scalars['Int']>;
};

export type LabPractice = {
	__typename?: 'LabPractice';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	duration?: Maybe<Scalars['Int']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	laboratoryID?: Maybe<Scalars['ID']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	LabPracticeOutputs?: Maybe<ModelLabPracticeOutputConnection>;
	LabPracticeSessions?: Maybe<ModelLabPracticeSessionConnection>;
	LabPracticeDevice?: Maybe<LabPracticeDevice>;
	LabPracticeParameters?: Maybe<ModelLabPracticeParameterConnection>;
	LabPracticeCommands?: Maybe<ModelLabPracticeCommandConnection>;
	Laboratory?: Maybe<Laboratory>;
};

export type LabPracticeLabPracticeOutputsArgs = {
	filter?: Maybe<ModelLabPracticeOutputFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LabPracticeLabPracticeSessionsArgs = {
	filter?: Maybe<ModelLabPracticeSessionFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LabPracticeLabPracticeParametersArgs = {
	filter?: Maybe<ModelLabPracticeParameterFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LabPracticeLabPracticeCommandsArgs = {
	filter?: Maybe<ModelLabPracticeCommandFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LabPracticeCommand = {
	__typename?: 'LabPracticeCommand';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	LabPracticeSessionCommands?: Maybe<ModelLabPracticeSessionCommandConnection>;
	LabPractice?: Maybe<LabPracticeParameter>;
	LabPracticeParameters?: Maybe<ModelLabPracticeParameterConnection>;
};

export type LabPracticeCommandLabPracticeSessionCommandsArgs = {
	filter?: Maybe<ModelLabPracticeSessionCommandFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LabPracticeCommandLabPracticeParametersArgs = {
	filter?: Maybe<ModelLabPracticeParameterFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LabPracticeDevice = {
	__typename?: 'LabPracticeDevice';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	LabPractice?: Maybe<LabPracticeOutput>;
};

export type LabPracticeOutput = {
	__typename?: 'LabPracticeOutput';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	units?: Maybe<Scalars['AWSJSON']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	outputType?: Maybe<Scalars['String']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	LabPractice?: Maybe<LabPracticeSessionOutput>;
	LabPracticeSessionOutputs?: Maybe<ModelLabPracticeSessionOutputConnection>;
};

export type LabPracticeOutputLabPracticeSessionOutputsArgs = {
	filter?: Maybe<ModelLabPracticeSessionOutputFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LabPracticeParameter = {
	__typename?: 'LabPracticeParameter';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	defaultValue?: Maybe<Scalars['String']>;
	minValue?: Maybe<Scalars['Int']>;
	maxValue?: Maybe<Scalars['Int']>;
	regex?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticecommandID?: Maybe<Scalars['ID']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	LabPractice?: Maybe<LabPracticeDevice>;
	LabPracticeCommand?: Maybe<LabPracticeCommand>;
};

export type LabPracticeSession = {
	__typename?: 'LabPracticeSession';
	id: Scalars['ID'];
	startDate?: Maybe<Scalars['AWSDateTime']>;
	endDate?: Maybe<Scalars['AWSDateTime']>;
	description?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	UserLabPracticeSessions?: Maybe<ModelUserLabPracticeSessionConnection>;
	LabPracticeSessionCommands?: Maybe<ModelLabPracticeSessionCommandConnection>;
	LabPracticeSessionOutputs?: Maybe<ModelLabPracticeSessionOutputConnection>;
	LabPractice?: Maybe<LabPracticeOutput>;
};

export type LabPracticeSessionUserLabPracticeSessionsArgs = {
	filter?: Maybe<ModelUserLabPracticeSessionFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LabPracticeSessionLabPracticeSessionCommandsArgs = {
	filter?: Maybe<ModelLabPracticeSessionCommandFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LabPracticeSessionLabPracticeSessionOutputsArgs = {
	filter?: Maybe<ModelLabPracticeSessionOutputFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LabPracticeSessionCommand = {
	__typename?: 'LabPracticeSessionCommand';
	id: Scalars['ID'];
	requestDate?: Maybe<Scalars['AWSDateTime']>;
	executionDate?: Maybe<Scalars['AWSDateTime']>;
	status?: Maybe<Scalars['String']>;
	parameters?: Maybe<Scalars['AWSJSON']>;
	labpracticesessionID?: Maybe<Scalars['ID']>;
	labpracticecommandID?: Maybe<Scalars['ID']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	LabPracticeSession?: Maybe<LabPracticeSession>;
	LabPracticeCommand?: Maybe<LabPracticeCommand>;
};

export type LabPracticeSessionOutput = {
	__typename?: 'LabPracticeSessionOutput';
	id: Scalars['ID'];
	captureDate?: Maybe<Scalars['AWSDateTime']>;
	storageDate?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
	labpracticeoutputID?: Maybe<Scalars['ID']>;
	labpracticesessionID?: Maybe<Scalars['ID']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	LabPracticeSession?: Maybe<LabPracticeSessionCommand>;
	LabPracticeOutput?: Maybe<LabPracticeOutput>;
};

export type LabSemester = {
	__typename?: 'LabSemester';
	id: Scalars['ID'];
	semesterName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	emailUserList?: Maybe<Scalars['AWSJSON']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	laboratoryID?: Maybe<Scalars['ID']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	Laboratory?: Maybe<Laboratory>;
	users?: Maybe<ModelUserLabSemesterConnection>;
};

export type LabSemesterUsersArgs = {
	userID?: Maybe<ModelIdKeyConditionInput>;
	filter?: Maybe<ModelUserLabSemesterFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type Laboratory = {
	__typename?: 'Laboratory';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	organizationID?: Maybe<Scalars['ID']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	Organization?: Maybe<Organization>;
	LabSemesters?: Maybe<ModelLabSemesterConnection>;
};

export type LaboratoryLabSemestersArgs = {
	filter?: Maybe<ModelLabSemesterFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type LambdaInput = {
	message: Scalars['String'];
	topic: Scalars['String'];
};

export enum ModelAttributeTypes {
	Binary = 'binary',
	BinarySet = 'binarySet',
	Bool = 'bool',
	List = 'list',
	Map = 'map',
	Number = 'number',
	NumberSet = 'numberSet',
	String = 'string',
	StringSet = 'stringSet',
	Null = '_null'
}

export type ModelBooleanInput = {
	ne?: Maybe<Scalars['Boolean']>;
	eq?: Maybe<Scalars['Boolean']>;
	attributeExists?: Maybe<Scalars['Boolean']>;
	attributeType?: Maybe<ModelAttributeTypes>;
};

export type ModelFloatInput = {
	ne?: Maybe<Scalars['Float']>;
	eq?: Maybe<Scalars['Float']>;
	le?: Maybe<Scalars['Float']>;
	lt?: Maybe<Scalars['Float']>;
	ge?: Maybe<Scalars['Float']>;
	gt?: Maybe<Scalars['Float']>;
	between?: Maybe<Array<Maybe<Scalars['Float']>>>;
	attributeExists?: Maybe<Scalars['Boolean']>;
	attributeType?: Maybe<ModelAttributeTypes>;
};

export type ModelIdInput = {
	ne?: Maybe<Scalars['ID']>;
	eq?: Maybe<Scalars['ID']>;
	le?: Maybe<Scalars['ID']>;
	lt?: Maybe<Scalars['ID']>;
	ge?: Maybe<Scalars['ID']>;
	gt?: Maybe<Scalars['ID']>;
	contains?: Maybe<Scalars['ID']>;
	notContains?: Maybe<Scalars['ID']>;
	between?: Maybe<Array<Maybe<Scalars['ID']>>>;
	beginsWith?: Maybe<Scalars['ID']>;
	attributeExists?: Maybe<Scalars['Boolean']>;
	attributeType?: Maybe<ModelAttributeTypes>;
	size?: Maybe<ModelSizeInput>;
};

export type ModelIdKeyConditionInput = {
	eq?: Maybe<Scalars['ID']>;
	le?: Maybe<Scalars['ID']>;
	lt?: Maybe<Scalars['ID']>;
	ge?: Maybe<Scalars['ID']>;
	gt?: Maybe<Scalars['ID']>;
	between?: Maybe<Array<Maybe<Scalars['ID']>>>;
	beginsWith?: Maybe<Scalars['ID']>;
};

export type ModelIntInput = {
	ne?: Maybe<Scalars['Int']>;
	eq?: Maybe<Scalars['Int']>;
	le?: Maybe<Scalars['Int']>;
	lt?: Maybe<Scalars['Int']>;
	ge?: Maybe<Scalars['Int']>;
	gt?: Maybe<Scalars['Int']>;
	between?: Maybe<Array<Maybe<Scalars['Int']>>>;
	attributeExists?: Maybe<Scalars['Boolean']>;
	attributeType?: Maybe<ModelAttributeTypes>;
};

export type ModelLabPracticeCommandConditionInput = {
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	labpracticeID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeCommandConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeCommandConditionInput>>>;
	not?: Maybe<ModelLabPracticeCommandConditionInput>;
};

export type ModelLabPracticeCommandConnection = {
	__typename?: 'ModelLabPracticeCommandConnection';
	items: Array<LabPracticeCommand>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelLabPracticeCommandFilterInput = {
	id?: Maybe<ModelIdInput>;
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	labpracticeID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeCommandFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeCommandFilterInput>>>;
	not?: Maybe<ModelLabPracticeCommandFilterInput>;
};

export type ModelLabPracticeConditionInput = {
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	duration?: Maybe<ModelIntInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	laboratoryID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeConditionInput>>>;
	not?: Maybe<ModelLabPracticeConditionInput>;
};

export type ModelLabPracticeConnection = {
	__typename?: 'ModelLabPracticeConnection';
	items: Array<LabPractice>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelLabPracticeDeviceConditionInput = {
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	type?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeDeviceConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeDeviceConditionInput>>>;
	not?: Maybe<ModelLabPracticeDeviceConditionInput>;
};

export type ModelLabPracticeDeviceConnection = {
	__typename?: 'ModelLabPracticeDeviceConnection';
	items: Array<LabPracticeDevice>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelLabPracticeDeviceFilterInput = {
	id?: Maybe<ModelIdInput>;
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	type?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeDeviceFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeDeviceFilterInput>>>;
	not?: Maybe<ModelLabPracticeDeviceFilterInput>;
};

export type ModelLabPracticeFilterInput = {
	id?: Maybe<ModelIdInput>;
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	duration?: Maybe<ModelIntInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	laboratoryID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeFilterInput>>>;
	not?: Maybe<ModelLabPracticeFilterInput>;
};

export type ModelLabPracticeOutputConditionInput = {
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	units?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	labpracticeID?: Maybe<ModelIdInput>;
	outputType?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeOutputConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeOutputConditionInput>>>;
	not?: Maybe<ModelLabPracticeOutputConditionInput>;
};

export type ModelLabPracticeOutputConnection = {
	__typename?: 'ModelLabPracticeOutputConnection';
	items: Array<LabPracticeOutput>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelLabPracticeOutputFilterInput = {
	id?: Maybe<ModelIdInput>;
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	units?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	labpracticeID?: Maybe<ModelIdInput>;
	outputType?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeOutputFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeOutputFilterInput>>>;
	not?: Maybe<ModelLabPracticeOutputFilterInput>;
};

export type ModelLabPracticeParameterConditionInput = {
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	defaultValue?: Maybe<ModelStringInput>;
	minValue?: Maybe<ModelIntInput>;
	maxValue?: Maybe<ModelIntInput>;
	regex?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	labpracticecommandID?: Maybe<ModelIdInput>;
	labpracticeID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeParameterConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeParameterConditionInput>>>;
	not?: Maybe<ModelLabPracticeParameterConditionInput>;
};

export type ModelLabPracticeParameterConnection = {
	__typename?: 'ModelLabPracticeParameterConnection';
	items: Array<LabPracticeParameter>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelLabPracticeParameterFilterInput = {
	id?: Maybe<ModelIdInput>;
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	defaultValue?: Maybe<ModelStringInput>;
	minValue?: Maybe<ModelIntInput>;
	maxValue?: Maybe<ModelIntInput>;
	regex?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	labpracticecommandID?: Maybe<ModelIdInput>;
	labpracticeID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeParameterFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeParameterFilterInput>>>;
	not?: Maybe<ModelLabPracticeParameterFilterInput>;
};

export type ModelLabPracticeSessionCommandConditionInput = {
	requestDate?: Maybe<ModelStringInput>;
	executionDate?: Maybe<ModelStringInput>;
	status?: Maybe<ModelStringInput>;
	parameters?: Maybe<ModelStringInput>;
	labpracticesessionID?: Maybe<ModelIdInput>;
	labpracticecommandID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeSessionCommandConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeSessionCommandConditionInput>>>;
	not?: Maybe<ModelLabPracticeSessionCommandConditionInput>;
};

export type ModelLabPracticeSessionCommandConnection = {
	__typename?: 'ModelLabPracticeSessionCommandConnection';
	items: Array<LabPracticeSessionCommand>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelLabPracticeSessionCommandFilterInput = {
	id?: Maybe<ModelIdInput>;
	requestDate?: Maybe<ModelStringInput>;
	executionDate?: Maybe<ModelStringInput>;
	status?: Maybe<ModelStringInput>;
	parameters?: Maybe<ModelStringInput>;
	labpracticesessionID?: Maybe<ModelIdInput>;
	labpracticecommandID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeSessionCommandFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeSessionCommandFilterInput>>>;
	not?: Maybe<ModelLabPracticeSessionCommandFilterInput>;
};

export type ModelLabPracticeSessionConditionInput = {
	startDate?: Maybe<ModelStringInput>;
	endDate?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	labpracticeID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeSessionConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeSessionConditionInput>>>;
	not?: Maybe<ModelLabPracticeSessionConditionInput>;
};

export type ModelLabPracticeSessionConnection = {
	__typename?: 'ModelLabPracticeSessionConnection';
	items: Array<LabPracticeSession>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelLabPracticeSessionFilterInput = {
	id?: Maybe<ModelIdInput>;
	startDate?: Maybe<ModelStringInput>;
	endDate?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	labpracticeID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeSessionFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeSessionFilterInput>>>;
	not?: Maybe<ModelLabPracticeSessionFilterInput>;
};

export type ModelLabPracticeSessionOutputConditionInput = {
	captureDate?: Maybe<ModelStringInput>;
	storageDate?: Maybe<ModelStringInput>;
	value?: Maybe<ModelStringInput>;
	labpracticeoutputID?: Maybe<ModelIdInput>;
	labpracticesessionID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeSessionOutputConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeSessionOutputConditionInput>>>;
	not?: Maybe<ModelLabPracticeSessionOutputConditionInput>;
};

export type ModelLabPracticeSessionOutputConnection = {
	__typename?: 'ModelLabPracticeSessionOutputConnection';
	items: Array<LabPracticeSessionOutput>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelLabPracticeSessionOutputFilterInput = {
	id?: Maybe<ModelIdInput>;
	captureDate?: Maybe<ModelStringInput>;
	storageDate?: Maybe<ModelStringInput>;
	value?: Maybe<ModelStringInput>;
	labpracticeoutputID?: Maybe<ModelIdInput>;
	labpracticesessionID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabPracticeSessionOutputFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelLabPracticeSessionOutputFilterInput>>>;
	not?: Maybe<ModelLabPracticeSessionOutputFilterInput>;
};

export type ModelLabSemesterConditionInput = {
	semesterName?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	emailUserList?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	laboratoryID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabSemesterConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelLabSemesterConditionInput>>>;
	not?: Maybe<ModelLabSemesterConditionInput>;
};

export type ModelLabSemesterConnection = {
	__typename?: 'ModelLabSemesterConnection';
	items: Array<LabSemester>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelLabSemesterFilterInput = {
	id?: Maybe<ModelIdInput>;
	semesterName?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	emailUserList?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	laboratoryID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLabSemesterFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelLabSemesterFilterInput>>>;
	not?: Maybe<ModelLabSemesterFilterInput>;
};

export type ModelLaboratoryConditionInput = {
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	organizationID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLaboratoryConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelLaboratoryConditionInput>>>;
	not?: Maybe<ModelLaboratoryConditionInput>;
};

export type ModelLaboratoryConnection = {
	__typename?: 'ModelLaboratoryConnection';
	items: Array<Laboratory>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelLaboratoryFilterInput = {
	id?: Maybe<ModelIdInput>;
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	organizationID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelLaboratoryFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelLaboratoryFilterInput>>>;
	not?: Maybe<ModelLaboratoryFilterInput>;
};

export type ModelOrganizationConditionInput = {
	country?: Maybe<ModelStringInput>;
	region?: Maybe<ModelStringInput>;
	city?: Maybe<ModelStringInput>;
	type?: Maybe<ModelStringInput>;
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	phone?: Maybe<ModelStringInput>;
	address?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelOrganizationConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelOrganizationConditionInput>>>;
	not?: Maybe<ModelOrganizationConditionInput>;
};

export type ModelOrganizationConnection = {
	__typename?: 'ModelOrganizationConnection';
	items: Array<Organization>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelOrganizationFilterInput = {
	id?: Maybe<ModelIdInput>;
	country?: Maybe<ModelStringInput>;
	region?: Maybe<ModelStringInput>;
	city?: Maybe<ModelStringInput>;
	type?: Maybe<ModelStringInput>;
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	phone?: Maybe<ModelStringInput>;
	address?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelOrganizationFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelOrganizationFilterInput>>>;
	not?: Maybe<ModelOrganizationFilterInput>;
};

export type ModelPrivilegeConditionInput = {
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelPrivilegeConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelPrivilegeConditionInput>>>;
	not?: Maybe<ModelPrivilegeConditionInput>;
};

export type ModelPrivilegeConnection = {
	__typename?: 'ModelPrivilegeConnection';
	items: Array<Privilege>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelPrivilegeFilterInput = {
	id?: Maybe<ModelIdInput>;
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelPrivilegeFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelPrivilegeFilterInput>>>;
	not?: Maybe<ModelPrivilegeFilterInput>;
};

export type ModelPrivilegeRoleConditionInput = {
	privilegeID?: Maybe<ModelIdInput>;
	roleID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelPrivilegeRoleConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelPrivilegeRoleConditionInput>>>;
	not?: Maybe<ModelPrivilegeRoleConditionInput>;
};

export type ModelPrivilegeRoleConnection = {
	__typename?: 'ModelPrivilegeRoleConnection';
	items: Array<PrivilegeRole>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelPrivilegeRoleFilterInput = {
	id?: Maybe<ModelIdInput>;
	privilegeID?: Maybe<ModelIdInput>;
	roleID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelPrivilegeRoleFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelPrivilegeRoleFilterInput>>>;
	not?: Maybe<ModelPrivilegeRoleFilterInput>;
};

export type ModelRoleConditionInput = {
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelRoleConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelRoleConditionInput>>>;
	not?: Maybe<ModelRoleConditionInput>;
};

export type ModelRoleConnection = {
	__typename?: 'ModelRoleConnection';
	items: Array<Role>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelRoleFilterInput = {
	id?: Maybe<ModelIdInput>;
	name?: Maybe<ModelStringInput>;
	description?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelRoleFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelRoleFilterInput>>>;
	not?: Maybe<ModelRoleFilterInput>;
};

export type ModelRoleUserConditionInput = {
	userID?: Maybe<ModelIdInput>;
	roleID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelRoleUserConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelRoleUserConditionInput>>>;
	not?: Maybe<ModelRoleUserConditionInput>;
};

export type ModelRoleUserConnection = {
	__typename?: 'ModelRoleUserConnection';
	items: Array<RoleUser>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelRoleUserFilterInput = {
	id?: Maybe<ModelIdInput>;
	userID?: Maybe<ModelIdInput>;
	roleID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelRoleUserFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelRoleUserFilterInput>>>;
	not?: Maybe<ModelRoleUserFilterInput>;
};

export type ModelSizeInput = {
	ne?: Maybe<Scalars['Int']>;
	eq?: Maybe<Scalars['Int']>;
	le?: Maybe<Scalars['Int']>;
	lt?: Maybe<Scalars['Int']>;
	ge?: Maybe<Scalars['Int']>;
	gt?: Maybe<Scalars['Int']>;
	between?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export enum ModelSortDirection {
	Asc = 'ASC',
	Desc = 'DESC'
}

export type ModelStringInput = {
	ne?: Maybe<Scalars['String']>;
	eq?: Maybe<Scalars['String']>;
	le?: Maybe<Scalars['String']>;
	lt?: Maybe<Scalars['String']>;
	ge?: Maybe<Scalars['String']>;
	gt?: Maybe<Scalars['String']>;
	contains?: Maybe<Scalars['String']>;
	notContains?: Maybe<Scalars['String']>;
	between?: Maybe<Array<Maybe<Scalars['String']>>>;
	beginsWith?: Maybe<Scalars['String']>;
	attributeExists?: Maybe<Scalars['Boolean']>;
	attributeType?: Maybe<ModelAttributeTypes>;
	size?: Maybe<ModelSizeInput>;
};

export type ModelUserConditionInput = {
	name?: Maybe<ModelStringInput>;
	lastNames?: Maybe<ModelStringInput>;
	documentIdNumber?: Maybe<ModelStringInput>;
	email?: Maybe<ModelStringInput>;
	phone?: Maybe<ModelStringInput>;
	userName?: Maybe<ModelStringInput>;
	s3AvatarPath?: Maybe<ModelStringInput>;
	dateOfBirth?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelUserConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelUserConditionInput>>>;
	not?: Maybe<ModelUserConditionInput>;
};

export type ModelUserConnection = {
	__typename?: 'ModelUserConnection';
	items: Array<User>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelUserFilterInput = {
	id?: Maybe<ModelIdInput>;
	name?: Maybe<ModelStringInput>;
	lastNames?: Maybe<ModelStringInput>;
	documentIdNumber?: Maybe<ModelStringInput>;
	email?: Maybe<ModelStringInput>;
	phone?: Maybe<ModelStringInput>;
	userName?: Maybe<ModelStringInput>;
	s3AvatarPath?: Maybe<ModelStringInput>;
	dateOfBirth?: Maybe<ModelStringInput>;
	updatedBy?: Maybe<ModelStringInput>;
	createdBy?: Maybe<ModelStringInput>;
	and?: Maybe<Array<Maybe<ModelUserFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelUserFilterInput>>>;
	not?: Maybe<ModelUserFilterInput>;
};

export type ModelUserLabPracticeSessionConditionInput = {
	sessionStartDate?: Maybe<ModelStringInput>;
	sessionEndDate?: Maybe<ModelStringInput>;
	userID?: Maybe<ModelIdInput>;
	labpracticesessionID?: Maybe<ModelIdInput>;
	roleID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelUserLabPracticeSessionConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelUserLabPracticeSessionConditionInput>>>;
	not?: Maybe<ModelUserLabPracticeSessionConditionInput>;
};

export type ModelUserLabPracticeSessionConnection = {
	__typename?: 'ModelUserLabPracticeSessionConnection';
	items: Array<UserLabPracticeSession>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelUserLabPracticeSessionFilterInput = {
	id?: Maybe<ModelIdInput>;
	sessionStartDate?: Maybe<ModelStringInput>;
	sessionEndDate?: Maybe<ModelStringInput>;
	userID?: Maybe<ModelIdInput>;
	labpracticesessionID?: Maybe<ModelIdInput>;
	roleID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelUserLabPracticeSessionFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelUserLabPracticeSessionFilterInput>>>;
	not?: Maybe<ModelUserLabPracticeSessionFilterInput>;
};

export type ModelUserLabSemesterConditionInput = {
	userID?: Maybe<ModelIdInput>;
	labsemesterID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelUserLabSemesterConditionInput>>>;
	or?: Maybe<Array<Maybe<ModelUserLabSemesterConditionInput>>>;
	not?: Maybe<ModelUserLabSemesterConditionInput>;
};

export type ModelUserLabSemesterConnection = {
	__typename?: 'ModelUserLabSemesterConnection';
	items: Array<UserLabSemester>;
	nextToken?: Maybe<Scalars['String']>;
	startedAt?: Maybe<Scalars['AWSTimestamp']>;
};

export type ModelUserLabSemesterFilterInput = {
	id?: Maybe<ModelIdInput>;
	userID?: Maybe<ModelIdInput>;
	labsemesterID?: Maybe<ModelIdInput>;
	and?: Maybe<Array<Maybe<ModelUserLabSemesterFilterInput>>>;
	or?: Maybe<Array<Maybe<ModelUserLabSemesterFilterInput>>>;
	not?: Maybe<ModelUserLabSemesterFilterInput>;
};

export type Mutation = {
	__typename?: 'Mutation';
	publishMqttMessage?: Maybe<Scalars['String']>;
	createOrganization?: Maybe<Organization>;
	updateOrganization?: Maybe<Organization>;
	deleteOrganization?: Maybe<Organization>;
	createRole?: Maybe<Role>;
	updateRole?: Maybe<Role>;
	deleteRole?: Maybe<Role>;
	createPrivilege?: Maybe<Privilege>;
	updatePrivilege?: Maybe<Privilege>;
	deletePrivilege?: Maybe<Privilege>;
	createUserLabPracticeSession?: Maybe<UserLabPracticeSession>;
	updateUserLabPracticeSession?: Maybe<UserLabPracticeSession>;
	deleteUserLabPracticeSession?: Maybe<UserLabPracticeSession>;
	createUser?: Maybe<User>;
	updateUser?: Maybe<User>;
	deleteUser?: Maybe<User>;
	createLabPracticeSessionCommand?: Maybe<LabPracticeSessionCommand>;
	updateLabPracticeSessionCommand?: Maybe<LabPracticeSessionCommand>;
	deleteLabPracticeSessionCommand?: Maybe<LabPracticeSessionCommand>;
	createLabPracticeSessionOutput?: Maybe<LabPracticeSessionOutput>;
	updateLabPracticeSessionOutput?: Maybe<LabPracticeSessionOutput>;
	deleteLabPracticeSessionOutput?: Maybe<LabPracticeSessionOutput>;
	createLabPracticeOutput?: Maybe<LabPracticeOutput>;
	updateLabPracticeOutput?: Maybe<LabPracticeOutput>;
	deleteLabPracticeOutput?: Maybe<LabPracticeOutput>;
	createLabPracticeSession?: Maybe<LabPracticeSession>;
	updateLabPracticeSession?: Maybe<LabPracticeSession>;
	deleteLabPracticeSession?: Maybe<LabPracticeSession>;
	createLabPracticeDevice?: Maybe<LabPracticeDevice>;
	updateLabPracticeDevice?: Maybe<LabPracticeDevice>;
	deleteLabPracticeDevice?: Maybe<LabPracticeDevice>;
	createLabPracticeParameter?: Maybe<LabPracticeParameter>;
	updateLabPracticeParameter?: Maybe<LabPracticeParameter>;
	deleteLabPracticeParameter?: Maybe<LabPracticeParameter>;
	createLabPracticeCommand?: Maybe<LabPracticeCommand>;
	updateLabPracticeCommand?: Maybe<LabPracticeCommand>;
	deleteLabPracticeCommand?: Maybe<LabPracticeCommand>;
	createLabPractice?: Maybe<LabPractice>;
	updateLabPractice?: Maybe<LabPractice>;
	deleteLabPractice?: Maybe<LabPractice>;
	createLabSemester?: Maybe<LabSemester>;
	updateLabSemester?: Maybe<LabSemester>;
	deleteLabSemester?: Maybe<LabSemester>;
	createLaboratory?: Maybe<Laboratory>;
	updateLaboratory?: Maybe<Laboratory>;
	deleteLaboratory?: Maybe<Laboratory>;
	createPrivilegeRole?: Maybe<PrivilegeRole>;
	updatePrivilegeRole?: Maybe<PrivilegeRole>;
	deletePrivilegeRole?: Maybe<PrivilegeRole>;
	createRoleUser?: Maybe<RoleUser>;
	updateRoleUser?: Maybe<RoleUser>;
	deleteRoleUser?: Maybe<RoleUser>;
	createUserLabSemester?: Maybe<UserLabSemester>;
	updateUserLabSemester?: Maybe<UserLabSemester>;
	deleteUserLabSemester?: Maybe<UserLabSemester>;
};

export type MutationPublishMqttMessageArgs = {
	input: LambdaInput;
};

export type MutationCreateOrganizationArgs = {
	input: CreateOrganizationInput;
	condition?: Maybe<ModelOrganizationConditionInput>;
};

export type MutationUpdateOrganizationArgs = {
	input: UpdateOrganizationInput;
	condition?: Maybe<ModelOrganizationConditionInput>;
};

export type MutationDeleteOrganizationArgs = {
	input: DeleteOrganizationInput;
	condition?: Maybe<ModelOrganizationConditionInput>;
};

export type MutationCreateRoleArgs = {
	input: CreateRoleInput;
	condition?: Maybe<ModelRoleConditionInput>;
};

export type MutationUpdateRoleArgs = {
	input: UpdateRoleInput;
	condition?: Maybe<ModelRoleConditionInput>;
};

export type MutationDeleteRoleArgs = {
	input: DeleteRoleInput;
	condition?: Maybe<ModelRoleConditionInput>;
};

export type MutationCreatePrivilegeArgs = {
	input: CreatePrivilegeInput;
	condition?: Maybe<ModelPrivilegeConditionInput>;
};

export type MutationUpdatePrivilegeArgs = {
	input: UpdatePrivilegeInput;
	condition?: Maybe<ModelPrivilegeConditionInput>;
};

export type MutationDeletePrivilegeArgs = {
	input: DeletePrivilegeInput;
	condition?: Maybe<ModelPrivilegeConditionInput>;
};

export type MutationCreateUserLabPracticeSessionArgs = {
	input: CreateUserLabPracticeSessionInput;
	condition?: Maybe<ModelUserLabPracticeSessionConditionInput>;
};

export type MutationUpdateUserLabPracticeSessionArgs = {
	input: UpdateUserLabPracticeSessionInput;
	condition?: Maybe<ModelUserLabPracticeSessionConditionInput>;
};

export type MutationDeleteUserLabPracticeSessionArgs = {
	input: DeleteUserLabPracticeSessionInput;
	condition?: Maybe<ModelUserLabPracticeSessionConditionInput>;
};

export type MutationCreateUserArgs = {
	input: CreateUserInput;
	condition?: Maybe<ModelUserConditionInput>;
};

export type MutationUpdateUserArgs = {
	input: UpdateUserInput;
	condition?: Maybe<ModelUserConditionInput>;
};

export type MutationDeleteUserArgs = {
	input: DeleteUserInput;
	condition?: Maybe<ModelUserConditionInput>;
};

export type MutationCreateLabPracticeSessionCommandArgs = {
	input: CreateLabPracticeSessionCommandInput;
	condition?: Maybe<ModelLabPracticeSessionCommandConditionInput>;
};

export type MutationUpdateLabPracticeSessionCommandArgs = {
	input: UpdateLabPracticeSessionCommandInput;
	condition?: Maybe<ModelLabPracticeSessionCommandConditionInput>;
};

export type MutationDeleteLabPracticeSessionCommandArgs = {
	input: DeleteLabPracticeSessionCommandInput;
	condition?: Maybe<ModelLabPracticeSessionCommandConditionInput>;
};

export type MutationCreateLabPracticeSessionOutputArgs = {
	input: CreateLabPracticeSessionOutputInput;
	condition?: Maybe<ModelLabPracticeSessionOutputConditionInput>;
};

export type MutationUpdateLabPracticeSessionOutputArgs = {
	input: UpdateLabPracticeSessionOutputInput;
	condition?: Maybe<ModelLabPracticeSessionOutputConditionInput>;
};

export type MutationDeleteLabPracticeSessionOutputArgs = {
	input: DeleteLabPracticeSessionOutputInput;
	condition?: Maybe<ModelLabPracticeSessionOutputConditionInput>;
};

export type MutationCreateLabPracticeOutputArgs = {
	input: CreateLabPracticeOutputInput;
	condition?: Maybe<ModelLabPracticeOutputConditionInput>;
};

export type MutationUpdateLabPracticeOutputArgs = {
	input: UpdateLabPracticeOutputInput;
	condition?: Maybe<ModelLabPracticeOutputConditionInput>;
};

export type MutationDeleteLabPracticeOutputArgs = {
	input: DeleteLabPracticeOutputInput;
	condition?: Maybe<ModelLabPracticeOutputConditionInput>;
};

export type MutationCreateLabPracticeSessionArgs = {
	input: CreateLabPracticeSessionInput;
	condition?: Maybe<ModelLabPracticeSessionConditionInput>;
};

export type MutationUpdateLabPracticeSessionArgs = {
	input: UpdateLabPracticeSessionInput;
	condition?: Maybe<ModelLabPracticeSessionConditionInput>;
};

export type MutationDeleteLabPracticeSessionArgs = {
	input: DeleteLabPracticeSessionInput;
	condition?: Maybe<ModelLabPracticeSessionConditionInput>;
};

export type MutationCreateLabPracticeDeviceArgs = {
	input: CreateLabPracticeDeviceInput;
	condition?: Maybe<ModelLabPracticeDeviceConditionInput>;
};

export type MutationUpdateLabPracticeDeviceArgs = {
	input: UpdateLabPracticeDeviceInput;
	condition?: Maybe<ModelLabPracticeDeviceConditionInput>;
};

export type MutationDeleteLabPracticeDeviceArgs = {
	input: DeleteLabPracticeDeviceInput;
	condition?: Maybe<ModelLabPracticeDeviceConditionInput>;
};

export type MutationCreateLabPracticeParameterArgs = {
	input: CreateLabPracticeParameterInput;
	condition?: Maybe<ModelLabPracticeParameterConditionInput>;
};

export type MutationUpdateLabPracticeParameterArgs = {
	input: UpdateLabPracticeParameterInput;
	condition?: Maybe<ModelLabPracticeParameterConditionInput>;
};

export type MutationDeleteLabPracticeParameterArgs = {
	input: DeleteLabPracticeParameterInput;
	condition?: Maybe<ModelLabPracticeParameterConditionInput>;
};

export type MutationCreateLabPracticeCommandArgs = {
	input: CreateLabPracticeCommandInput;
	condition?: Maybe<ModelLabPracticeCommandConditionInput>;
};

export type MutationUpdateLabPracticeCommandArgs = {
	input: UpdateLabPracticeCommandInput;
	condition?: Maybe<ModelLabPracticeCommandConditionInput>;
};

export type MutationDeleteLabPracticeCommandArgs = {
	input: DeleteLabPracticeCommandInput;
	condition?: Maybe<ModelLabPracticeCommandConditionInput>;
};

export type MutationCreateLabPracticeArgs = {
	input: CreateLabPracticeInput;
	condition?: Maybe<ModelLabPracticeConditionInput>;
};

export type MutationUpdateLabPracticeArgs = {
	input: UpdateLabPracticeInput;
	condition?: Maybe<ModelLabPracticeConditionInput>;
};

export type MutationDeleteLabPracticeArgs = {
	input: DeleteLabPracticeInput;
	condition?: Maybe<ModelLabPracticeConditionInput>;
};

export type MutationCreateLabSemesterArgs = {
	input: CreateLabSemesterInput;
	condition?: Maybe<ModelLabSemesterConditionInput>;
};

export type MutationUpdateLabSemesterArgs = {
	input: UpdateLabSemesterInput;
	condition?: Maybe<ModelLabSemesterConditionInput>;
};

export type MutationDeleteLabSemesterArgs = {
	input: DeleteLabSemesterInput;
	condition?: Maybe<ModelLabSemesterConditionInput>;
};

export type MutationCreateLaboratoryArgs = {
	input: CreateLaboratoryInput;
	condition?: Maybe<ModelLaboratoryConditionInput>;
};

export type MutationUpdateLaboratoryArgs = {
	input: UpdateLaboratoryInput;
	condition?: Maybe<ModelLaboratoryConditionInput>;
};

export type MutationDeleteLaboratoryArgs = {
	input: DeleteLaboratoryInput;
	condition?: Maybe<ModelLaboratoryConditionInput>;
};

export type MutationCreatePrivilegeRoleArgs = {
	input: CreatePrivilegeRoleInput;
	condition?: Maybe<ModelPrivilegeRoleConditionInput>;
};

export type MutationUpdatePrivilegeRoleArgs = {
	input: UpdatePrivilegeRoleInput;
	condition?: Maybe<ModelPrivilegeRoleConditionInput>;
};

export type MutationDeletePrivilegeRoleArgs = {
	input: DeletePrivilegeRoleInput;
	condition?: Maybe<ModelPrivilegeRoleConditionInput>;
};

export type MutationCreateRoleUserArgs = {
	input: CreateRoleUserInput;
	condition?: Maybe<ModelRoleUserConditionInput>;
};

export type MutationUpdateRoleUserArgs = {
	input: UpdateRoleUserInput;
	condition?: Maybe<ModelRoleUserConditionInput>;
};

export type MutationDeleteRoleUserArgs = {
	input: DeleteRoleUserInput;
	condition?: Maybe<ModelRoleUserConditionInput>;
};

export type MutationCreateUserLabSemesterArgs = {
	input: CreateUserLabSemesterInput;
	condition?: Maybe<ModelUserLabSemesterConditionInput>;
};

export type MutationUpdateUserLabSemesterArgs = {
	input: UpdateUserLabSemesterInput;
	condition?: Maybe<ModelUserLabSemesterConditionInput>;
};

export type MutationDeleteUserLabSemesterArgs = {
	input: DeleteUserLabSemesterInput;
	condition?: Maybe<ModelUserLabSemesterConditionInput>;
};

export type Organization = {
	__typename?: 'Organization';
	id: Scalars['ID'];
	country?: Maybe<Scalars['String']>;
	region?: Maybe<Scalars['String']>;
	city?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	address?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	Laboratories?: Maybe<ModelLaboratoryConnection>;
};

export type OrganizationLaboratoriesArgs = {
	filter?: Maybe<ModelLaboratoryFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type Privilege = {
	__typename?: 'Privilege';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	Roles?: Maybe<ModelPrivilegeRoleConnection>;
};

export type PrivilegeRolesArgs = {
	roleID?: Maybe<ModelIdKeyConditionInput>;
	filter?: Maybe<ModelPrivilegeRoleFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type PrivilegeRole = {
	__typename?: 'PrivilegeRole';
	id: Scalars['ID'];
	privilegeID: Scalars['ID'];
	roleID: Scalars['ID'];
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	role: Role;
	privilege: Privilege;
};

export type Query = {
	__typename?: 'Query';
	getOrganization?: Maybe<Organization>;
	listOrganizations?: Maybe<ModelOrganizationConnection>;
	syncOrganizations?: Maybe<ModelOrganizationConnection>;
	getRole?: Maybe<Role>;
	listRoles?: Maybe<ModelRoleConnection>;
	syncRoles?: Maybe<ModelRoleConnection>;
	getPrivilege?: Maybe<Privilege>;
	listPrivileges?: Maybe<ModelPrivilegeConnection>;
	syncPrivileges?: Maybe<ModelPrivilegeConnection>;
	getUserLabPracticeSession?: Maybe<UserLabPracticeSession>;
	listUserLabPracticeSessions?: Maybe<ModelUserLabPracticeSessionConnection>;
	syncUserLabPracticeSessions?: Maybe<ModelUserLabPracticeSessionConnection>;
	getUser?: Maybe<User>;
	listUsers?: Maybe<ModelUserConnection>;
	syncUsers?: Maybe<ModelUserConnection>;
	getLabPracticeSessionCommand?: Maybe<LabPracticeSessionCommand>;
	listLabPracticeSessionCommands?: Maybe<ModelLabPracticeSessionCommandConnection>;
	syncLabPracticeSessionCommands?: Maybe<ModelLabPracticeSessionCommandConnection>;
	getLabPracticeSessionOutput?: Maybe<LabPracticeSessionOutput>;
	listLabPracticeSessionOutputs?: Maybe<ModelLabPracticeSessionOutputConnection>;
	syncLabPracticeSessionOutputs?: Maybe<ModelLabPracticeSessionOutputConnection>;
	getLabPracticeOutput?: Maybe<LabPracticeOutput>;
	listLabPracticeOutputs?: Maybe<ModelLabPracticeOutputConnection>;
	syncLabPracticeOutputs?: Maybe<ModelLabPracticeOutputConnection>;
	getLabPracticeSession?: Maybe<LabPracticeSession>;
	listLabPracticeSessions?: Maybe<ModelLabPracticeSessionConnection>;
	syncLabPracticeSessions?: Maybe<ModelLabPracticeSessionConnection>;
	getLabPracticeDevice?: Maybe<LabPracticeDevice>;
	listLabPracticeDevices?: Maybe<ModelLabPracticeDeviceConnection>;
	syncLabPracticeDevices?: Maybe<ModelLabPracticeDeviceConnection>;
	getLabPracticeParameter?: Maybe<LabPracticeParameter>;
	listLabPracticeParameters?: Maybe<ModelLabPracticeParameterConnection>;
	syncLabPracticeParameters?: Maybe<ModelLabPracticeParameterConnection>;
	getLabPracticeCommand?: Maybe<LabPracticeCommand>;
	listLabPracticeCommands?: Maybe<ModelLabPracticeCommandConnection>;
	syncLabPracticeCommands?: Maybe<ModelLabPracticeCommandConnection>;
	getLabPractice?: Maybe<LabPractice>;
	listLabPractices?: Maybe<ModelLabPracticeConnection>;
	syncLabPractices?: Maybe<ModelLabPracticeConnection>;
	getLabSemester?: Maybe<LabSemester>;
	listLabSemesters?: Maybe<ModelLabSemesterConnection>;
	syncLabSemesters?: Maybe<ModelLabSemesterConnection>;
	getLaboratory?: Maybe<Laboratory>;
	listLaboratorys?: Maybe<ModelLaboratoryConnection>;
	syncLaboratories?: Maybe<ModelLaboratoryConnection>;
	syncPrivilegeRoles?: Maybe<ModelPrivilegeRoleConnection>;
	syncRoleUsers?: Maybe<ModelRoleUserConnection>;
	syncUserLabSemesters?: Maybe<ModelUserLabSemesterConnection>;
};

export type QueryGetOrganizationArgs = {
	id: Scalars['ID'];
};

export type QueryListOrganizationsArgs = {
	filter?: Maybe<ModelOrganizationFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncOrganizationsArgs = {
	filter?: Maybe<ModelOrganizationFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetRoleArgs = {
	id: Scalars['ID'];
};

export type QueryListRolesArgs = {
	filter?: Maybe<ModelRoleFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncRolesArgs = {
	filter?: Maybe<ModelRoleFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetPrivilegeArgs = {
	id: Scalars['ID'];
};

export type QueryListPrivilegesArgs = {
	filter?: Maybe<ModelPrivilegeFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncPrivilegesArgs = {
	filter?: Maybe<ModelPrivilegeFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetUserLabPracticeSessionArgs = {
	id: Scalars['ID'];
};

export type QueryListUserLabPracticeSessionsArgs = {
	filter?: Maybe<ModelUserLabPracticeSessionFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncUserLabPracticeSessionsArgs = {
	filter?: Maybe<ModelUserLabPracticeSessionFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetUserArgs = {
	id: Scalars['ID'];
};

export type QueryListUsersArgs = {
	filter?: Maybe<ModelUserFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncUsersArgs = {
	filter?: Maybe<ModelUserFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetLabPracticeSessionCommandArgs = {
	id: Scalars['ID'];
};

export type QueryListLabPracticeSessionCommandsArgs = {
	filter?: Maybe<ModelLabPracticeSessionCommandFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncLabPracticeSessionCommandsArgs = {
	filter?: Maybe<ModelLabPracticeSessionCommandFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetLabPracticeSessionOutputArgs = {
	id: Scalars['ID'];
};

export type QueryListLabPracticeSessionOutputsArgs = {
	filter?: Maybe<ModelLabPracticeSessionOutputFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncLabPracticeSessionOutputsArgs = {
	filter?: Maybe<ModelLabPracticeSessionOutputFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetLabPracticeOutputArgs = {
	id: Scalars['ID'];
};

export type QueryListLabPracticeOutputsArgs = {
	filter?: Maybe<ModelLabPracticeOutputFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncLabPracticeOutputsArgs = {
	filter?: Maybe<ModelLabPracticeOutputFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetLabPracticeSessionArgs = {
	id: Scalars['ID'];
};

export type QueryListLabPracticeSessionsArgs = {
	filter?: Maybe<ModelLabPracticeSessionFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncLabPracticeSessionsArgs = {
	filter?: Maybe<ModelLabPracticeSessionFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetLabPracticeDeviceArgs = {
	id: Scalars['ID'];
};

export type QueryListLabPracticeDevicesArgs = {
	filter?: Maybe<ModelLabPracticeDeviceFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncLabPracticeDevicesArgs = {
	filter?: Maybe<ModelLabPracticeDeviceFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetLabPracticeParameterArgs = {
	id: Scalars['ID'];
};

export type QueryListLabPracticeParametersArgs = {
	filter?: Maybe<ModelLabPracticeParameterFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncLabPracticeParametersArgs = {
	filter?: Maybe<ModelLabPracticeParameterFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetLabPracticeCommandArgs = {
	id: Scalars['ID'];
};

export type QueryListLabPracticeCommandsArgs = {
	filter?: Maybe<ModelLabPracticeCommandFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncLabPracticeCommandsArgs = {
	filter?: Maybe<ModelLabPracticeCommandFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetLabPracticeArgs = {
	id: Scalars['ID'];
};

export type QueryListLabPracticesArgs = {
	filter?: Maybe<ModelLabPracticeFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncLabPracticesArgs = {
	filter?: Maybe<ModelLabPracticeFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetLabSemesterArgs = {
	id: Scalars['ID'];
};

export type QueryListLabSemestersArgs = {
	filter?: Maybe<ModelLabSemesterFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncLabSemestersArgs = {
	filter?: Maybe<ModelLabSemesterFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QueryGetLaboratoryArgs = {
	id: Scalars['ID'];
};

export type QueryListLaboratorysArgs = {
	filter?: Maybe<ModelLaboratoryFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type QuerySyncLaboratoriesArgs = {
	filter?: Maybe<ModelLaboratoryFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QuerySyncPrivilegeRolesArgs = {
	filter?: Maybe<ModelPrivilegeRoleFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QuerySyncRoleUsersArgs = {
	filter?: Maybe<ModelRoleUserFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type QuerySyncUserLabSemestersArgs = {
	filter?: Maybe<ModelUserLabSemesterFilterInput>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
	lastSync?: Maybe<Scalars['AWSTimestamp']>;
};

export type Role = {
	__typename?: 'Role';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	UserLabPracticeSessions?: Maybe<ModelUserLabPracticeSessionConnection>;
	Privileges?: Maybe<ModelPrivilegeRoleConnection>;
	Users?: Maybe<ModelRoleUserConnection>;
};

export type RoleUserLabPracticeSessionsArgs = {
	filter?: Maybe<ModelUserLabPracticeSessionFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type RolePrivilegesArgs = {
	privilegeID?: Maybe<ModelIdKeyConditionInput>;
	filter?: Maybe<ModelPrivilegeRoleFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type RoleUsersArgs = {
	userID?: Maybe<ModelIdKeyConditionInput>;
	filter?: Maybe<ModelRoleUserFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type RoleUser = {
	__typename?: 'RoleUser';
	id: Scalars['ID'];
	userID: Scalars['ID'];
	roleID: Scalars['ID'];
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	role: Role;
	user: User;
};

export type Subscription = {
	__typename?: 'Subscription';
	onCreateLabPracticeSessionOutputBySessionID?: Maybe<LabPracticeSessionOutput>;
	onCreateLabPracticeSessionCommandBySessionID?: Maybe<LabPracticeSessionCommand>;
	onCreateOrganization?: Maybe<Organization>;
	onUpdateOrganization?: Maybe<Organization>;
	onDeleteOrganization?: Maybe<Organization>;
	onCreateRole?: Maybe<Role>;
	onUpdateRole?: Maybe<Role>;
	onDeleteRole?: Maybe<Role>;
	onCreatePrivilege?: Maybe<Privilege>;
	onUpdatePrivilege?: Maybe<Privilege>;
	onDeletePrivilege?: Maybe<Privilege>;
	onCreateUserLabPracticeSession?: Maybe<UserLabPracticeSession>;
	onUpdateUserLabPracticeSession?: Maybe<UserLabPracticeSession>;
	onDeleteUserLabPracticeSession?: Maybe<UserLabPracticeSession>;
	onCreateUser?: Maybe<User>;
	onUpdateUser?: Maybe<User>;
	onDeleteUser?: Maybe<User>;
	onCreateLabPracticeSessionCommand?: Maybe<LabPracticeSessionCommand>;
	onUpdateLabPracticeSessionCommand?: Maybe<LabPracticeSessionCommand>;
	onDeleteLabPracticeSessionCommand?: Maybe<LabPracticeSessionCommand>;
	onCreateLabPracticeSessionOutput?: Maybe<LabPracticeSessionOutput>;
	onUpdateLabPracticeSessionOutput?: Maybe<LabPracticeSessionOutput>;
	onDeleteLabPracticeSessionOutput?: Maybe<LabPracticeSessionOutput>;
	onCreateLabPracticeOutput?: Maybe<LabPracticeOutput>;
	onUpdateLabPracticeOutput?: Maybe<LabPracticeOutput>;
	onDeleteLabPracticeOutput?: Maybe<LabPracticeOutput>;
	onCreateLabPracticeSession?: Maybe<LabPracticeSession>;
	onUpdateLabPracticeSession?: Maybe<LabPracticeSession>;
	onDeleteLabPracticeSession?: Maybe<LabPracticeSession>;
	onCreateLabPracticeDevice?: Maybe<LabPracticeDevice>;
	onUpdateLabPracticeDevice?: Maybe<LabPracticeDevice>;
	onDeleteLabPracticeDevice?: Maybe<LabPracticeDevice>;
	onCreateLabPracticeParameter?: Maybe<LabPracticeParameter>;
	onUpdateLabPracticeParameter?: Maybe<LabPracticeParameter>;
	onDeleteLabPracticeParameter?: Maybe<LabPracticeParameter>;
	onCreateLabPracticeCommand?: Maybe<LabPracticeCommand>;
	onUpdateLabPracticeCommand?: Maybe<LabPracticeCommand>;
	onDeleteLabPracticeCommand?: Maybe<LabPracticeCommand>;
	onCreateLabPractice?: Maybe<LabPractice>;
	onUpdateLabPractice?: Maybe<LabPractice>;
	onDeleteLabPractice?: Maybe<LabPractice>;
	onCreateLabSemester?: Maybe<LabSemester>;
	onUpdateLabSemester?: Maybe<LabSemester>;
	onDeleteLabSemester?: Maybe<LabSemester>;
	onCreateLaboratory?: Maybe<Laboratory>;
	onUpdateLaboratory?: Maybe<Laboratory>;
	onDeleteLaboratory?: Maybe<Laboratory>;
	onCreatePrivilegeRole?: Maybe<PrivilegeRole>;
	onUpdatePrivilegeRole?: Maybe<PrivilegeRole>;
	onDeletePrivilegeRole?: Maybe<PrivilegeRole>;
	onCreateRoleUser?: Maybe<RoleUser>;
	onUpdateRoleUser?: Maybe<RoleUser>;
	onDeleteRoleUser?: Maybe<RoleUser>;
	onCreateUserLabSemester?: Maybe<UserLabSemester>;
	onUpdateUserLabSemester?: Maybe<UserLabSemester>;
	onDeleteUserLabSemester?: Maybe<UserLabSemester>;
};

export type SubscriptionOnCreateLabPracticeSessionOutputBySessionIdArgs = {
	labpracticesessionID: Scalars['ID'];
};

export type SubscriptionOnCreateLabPracticeSessionCommandBySessionIdArgs = {
	labpracticesessionID: Scalars['ID'];
};

export type UpdateLabPracticeCommandInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeCommandLabPracticeId?: Maybe<Scalars['ID']>;
};

export type UpdateLabPracticeDeviceInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeDeviceLabPracticeId?: Maybe<Scalars['ID']>;
};

export type UpdateLabPracticeInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	duration?: Maybe<Scalars['Int']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	laboratoryID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeLaboratoryId?: Maybe<Scalars['ID']>;
	labPracticeLabPracticeDeviceId?: Maybe<Scalars['ID']>;
};

export type UpdateLabPracticeOutputInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	units?: Maybe<Scalars['AWSJSON']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	outputType?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeOutputLabPracticeId?: Maybe<Scalars['ID']>;
};

export type UpdateLabPracticeParameterInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	defaultValue?: Maybe<Scalars['String']>;
	minValue?: Maybe<Scalars['Int']>;
	maxValue?: Maybe<Scalars['Int']>;
	regex?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticecommandID?: Maybe<Scalars['ID']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeParameterLabPracticeCommandId?: Maybe<Scalars['ID']>;
	labPracticeParameterLabPracticeId?: Maybe<Scalars['ID']>;
};

export type UpdateLabPracticeSessionCommandInput = {
	id: Scalars['ID'];
	requestDate?: Maybe<Scalars['AWSDateTime']>;
	executionDate?: Maybe<Scalars['AWSDateTime']>;
	status?: Maybe<Scalars['String']>;
	parameters?: Maybe<Scalars['AWSJSON']>;
	labpracticesessionID?: Maybe<Scalars['ID']>;
	labpracticecommandID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeSessionCommandLabPracticeSessionId?: Maybe<Scalars['ID']>;
	labPracticeSessionCommandLabPracticeCommandId?: Maybe<Scalars['ID']>;
};

export type UpdateLabPracticeSessionInput = {
	id: Scalars['ID'];
	startDate?: Maybe<Scalars['AWSDateTime']>;
	endDate?: Maybe<Scalars['AWSDateTime']>;
	description?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	labpracticeID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeSessionLabPracticeId?: Maybe<Scalars['ID']>;
};

export type UpdateLabPracticeSessionOutputInput = {
	id: Scalars['ID'];
	captureDate?: Maybe<Scalars['AWSDateTime']>;
	storageDate?: Maybe<Scalars['String']>;
	value?: Maybe<Scalars['String']>;
	labpracticeoutputID?: Maybe<Scalars['ID']>;
	labpracticesessionID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labPracticeSessionOutputLabPracticeOutputId?: Maybe<Scalars['ID']>;
	labPracticeSessionOutputLabPracticeSessionId?: Maybe<Scalars['ID']>;
};

export type UpdateLabSemesterInput = {
	id: Scalars['ID'];
	semesterName?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	emailUserList?: Maybe<Scalars['AWSJSON']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	laboratoryID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	labSemesterLaboratoryId?: Maybe<Scalars['ID']>;
};

export type UpdateLaboratoryInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	organizationID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	laboratoryOrganizationId?: Maybe<Scalars['ID']>;
};

export type UpdateOrganizationInput = {
	id: Scalars['ID'];
	country?: Maybe<Scalars['String']>;
	region?: Maybe<Scalars['String']>;
	city?: Maybe<Scalars['String']>;
	type?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	address?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
};

export type UpdatePrivilegeInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
};

export type UpdatePrivilegeRoleInput = {
	id: Scalars['ID'];
	privilegeID?: Maybe<Scalars['ID']>;
	roleID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
};

export type UpdateRoleInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
};

export type UpdateRoleUserInput = {
	id: Scalars['ID'];
	userID?: Maybe<Scalars['ID']>;
	roleID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
};

export type UpdateUserInput = {
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	lastNames?: Maybe<Scalars['String']>;
	documentIdNumber?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	userName?: Maybe<Scalars['String']>;
	s3AvatarPath?: Maybe<Scalars['String']>;
	dateOfBirth?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	_version?: Maybe<Scalars['Int']>;
};

export type UpdateUserLabPracticeSessionInput = {
	id: Scalars['ID'];
	sessionStartDate?: Maybe<Scalars['AWSDateTime']>;
	sessionEndDate?: Maybe<Scalars['AWSDateTime']>;
	userID?: Maybe<Scalars['ID']>;
	labpracticesessionID?: Maybe<Scalars['ID']>;
	roleID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
	userLabPracticeSessionUserId?: Maybe<Scalars['ID']>;
	userLabPracticeSessionLabPracticeSessionId?: Maybe<Scalars['ID']>;
};

export type UpdateUserLabSemesterInput = {
	id: Scalars['ID'];
	userID?: Maybe<Scalars['ID']>;
	labsemesterID?: Maybe<Scalars['ID']>;
	_version?: Maybe<Scalars['Int']>;
};

export type User = {
	__typename?: 'User';
	id: Scalars['ID'];
	name?: Maybe<Scalars['String']>;
	lastNames?: Maybe<Scalars['String']>;
	documentIdNumber?: Maybe<Scalars['String']>;
	email?: Maybe<Scalars['String']>;
	phone?: Maybe<Scalars['String']>;
	userName?: Maybe<Scalars['String']>;
	s3AvatarPath?: Maybe<Scalars['String']>;
	dateOfBirth?: Maybe<Scalars['String']>;
	updatedBy?: Maybe<Scalars['String']>;
	createdBy?: Maybe<Scalars['String']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	UserLabPracticeSessions?: Maybe<ModelUserLabPracticeSessionConnection>;
	Roles?: Maybe<ModelRoleUserConnection>;
	UserLabSemesters?: Maybe<ModelUserLabSemesterConnection>;
};

export type UserUserLabPracticeSessionsArgs = {
	filter?: Maybe<ModelUserLabPracticeSessionFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type UserRolesArgs = {
	roleID?: Maybe<ModelIdKeyConditionInput>;
	filter?: Maybe<ModelRoleUserFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type UserUserLabSemestersArgs = {
	labsemesterID?: Maybe<ModelIdKeyConditionInput>;
	filter?: Maybe<ModelUserLabSemesterFilterInput>;
	sortDirection?: Maybe<ModelSortDirection>;
	limit?: Maybe<Scalars['Int']>;
	nextToken?: Maybe<Scalars['String']>;
};

export type UserLabPracticeSession = {
	__typename?: 'UserLabPracticeSession';
	id: Scalars['ID'];
	sessionStartDate?: Maybe<Scalars['AWSDateTime']>;
	sessionEndDate?: Maybe<Scalars['AWSDateTime']>;
	userID?: Maybe<Scalars['ID']>;
	labpracticesessionID?: Maybe<Scalars['ID']>;
	roleID?: Maybe<Scalars['ID']>;
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	User?: Maybe<User>;
	LabPracticeSession?: Maybe<LabPracticeSession>;
};

export type UserLabSemester = {
	__typename?: 'UserLabSemester';
	id: Scalars['ID'];
	userID: Scalars['ID'];
	labsemesterID: Scalars['ID'];
	_version: Scalars['Int'];
	_deleted?: Maybe<Scalars['Boolean']>;
	_lastChangedAt: Scalars['AWSTimestamp'];
	createdAt: Scalars['AWSDateTime'];
	updatedAt: Scalars['AWSDateTime'];
	user: User;
	labsemester: LabSemester;
};

export type GetLabPracticeCommandQueryVariables = Exact<{[key: string]: never}>;

export type GetLabPracticeCommandQuery = {__typename?: 'Query'} & {
	listLabPracticeCommands?: Maybe<
		{__typename?: 'ModelLabPracticeCommandConnection'} & {
			items: Array<
				{__typename?: 'LabPracticeCommand'} & Pick<LabPracticeCommand, 'id' | 'name' | 'labpracticeID'> & {
						LabPracticeParameters?: Maybe<
							{__typename?: 'ModelLabPracticeParameterConnection'} & {
								items: Array<
									{__typename?: 'LabPracticeParameter'} & Pick<LabPracticeParameter, 'id' | 'name' | 'defaultValue'>
								>;
							}
						>;
					}
			>;
		}
	>;
};

export type GetLabPracticeSessionCommandQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetLabPracticeSessionCommandQuery = {__typename?: 'Query'} & {
	getLabPracticeSessionCommand?: Maybe<
		{__typename?: 'LabPracticeSessionCommand'} & Pick<LabPracticeSessionCommand, 'labpracticesessionID'>
	>;
};

export type OnUpdateLabPracticeSessionCommandSubscriptionVariables = Exact<{
	id: Scalars['ID'];
}>;

export type OnUpdateLabPracticeSessionCommandSubscription = {__typename?: 'Subscription'} & {
	onCreateLabPracticeSessionCommandBySessionID?: Maybe<
		{__typename?: 'LabPracticeSessionCommand'} & Pick<
			LabPracticeSessionCommand,
			'status' | 'parameters' | 'labpracticecommandID'
		>
	>;
};

export type UpdateLabPracticeSessionCommandMutationVariables = Exact<{
	input: CreateLabPracticeSessionCommandInput;
}>;

export type UpdateLabPracticeSessionCommandMutation = {__typename?: 'Mutation'} & {
	createLabPracticeSessionCommand?: Maybe<
		{__typename?: 'LabPracticeSessionCommand'} & Pick<
			LabPracticeSessionCommand,
			'id' | 'labpracticesessionID' | 'labpracticecommandID' | 'status' | 'parameters'
		>
	>;
};

export type GetLabPracticeQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetLabPracticeQuery = {__typename?: 'Query'} & {
	getLabPractice?: Maybe<
		{__typename?: 'LabPractice'} & Pick<LabPractice, 'name' | 'description' | 'duration'> & {
				LabPracticeSessions?: Maybe<
					{__typename?: 'ModelLabPracticeSessionConnection'} & {
						items: Array<{__typename?: 'LabPracticeSession'} & Pick<LabPracticeSession, 'id'>>;
					}
				>;
			}
	>;
};

export type OnCreateLabPracticeMutationVariables = Exact<{
	input: CreateLabPracticeInput;
}>;

export type OnCreateLabPracticeMutation = {__typename?: 'Mutation'} & {
	createLabPractice?: Maybe<
		{__typename?: 'LabPractice'} & Pick<
			LabPractice,
			'id' | 'laboratoryID' | 'name' | 'description' | 'duration' | 'updatedBy' | 'createdBy'
		>
	>;
};

export type OnCreateLabPracticeCommandMutationVariables = Exact<{
	input: CreateLabPracticeCommandInput;
}>;

export type OnCreateLabPracticeCommandMutation = {__typename?: 'Mutation'} & {
	createLabPracticeCommand?: Maybe<
		{__typename?: 'LabPracticeCommand'} & Pick<
			LabPracticeCommand,
			'id' | 'labpracticeID' | 'name' | 'description' | 'updatedBy' | 'createdBy'
		>
	>;
};

export type OnCreateLabPracticeOutputMutationVariables = Exact<{
	input: CreateLabPracticeOutputInput;
}>;

export type OnCreateLabPracticeOutputMutation = {__typename?: 'Mutation'} & {
	createLabPracticeOutput?: Maybe<
		{__typename?: 'LabPracticeOutput'} & Pick<
			LabPracticeOutput,
			'id' | 'labpracticeID' | 'name' | 'description' | 'units' | 'updatedBy' | 'createdBy'
		>
	>;
};

export type OnCreateLabPracticeParameterMutationVariables = Exact<{
	input: CreateLabPracticeParameterInput;
}>;

export type OnCreateLabPracticeParameterMutation = {__typename?: 'Mutation'} & {
	createLabPracticeParameter?: Maybe<
		{__typename?: 'LabPracticeParameter'} & Pick<
			LabPracticeParameter,
			| 'id'
			| 'labpracticecommandID'
			| 'labpracticeID'
			| 'name'
			| 'description'
			| 'defaultValue'
			| 'minValue'
			| 'maxValue'
			| 'regex'
			| 'updatedBy'
			| 'createdBy'
		>
	>;
};

export type GetLabPracticeOutputQueryVariables = Exact<{[key: string]: never}>;

export type GetLabPracticeOutputQuery = {__typename?: 'Query'} & {
	listLabPracticeOutputs?: Maybe<
		{__typename?: 'ModelLabPracticeOutputConnection'} & {
			items: Array<{__typename?: 'LabPracticeOutput'} & Pick<LabPracticeOutput, 'id' | 'name'>>;
		}
	>;
};

export type GetLabPracticeSessionOutputQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type GetLabPracticeSessionOutputQuery = {__typename?: 'Query'} & {
	getLabPracticeSessionOutput?: Maybe<{__typename?: 'LabPracticeSessionOutput'} & Pick<LabPracticeSessionOutput, 'id'>>;
};

export type OnUpdateLabPracticeSessionOutputSubscriptionVariables = Exact<{[key: string]: never}>;

export type OnUpdateLabPracticeSessionOutputSubscription = {__typename?: 'Subscription'} & {
	onCreateLabPracticeSessionOutput?: Maybe<
		{__typename?: 'LabPracticeSessionOutput'} & Pick<LabPracticeSessionOutput, 'value' | 'labpracticeoutputID'>
	>;
};

export type PublishMqttMessageMutationVariables = Exact<{
	input: LambdaInput;
}>;

export type PublishMqttMessageMutation = {__typename?: 'Mutation'} & Pick<Mutation, 'publishMqttMessage'>;

export const GetLabPracticeCommandDocument = gql`
	query getLabPracticeCommand {
		listLabPracticeCommands {
			items {
				id
				name
				labpracticeID
				LabPracticeParameters {
					items {
						id
						name
						defaultValue
					}
				}
			}
		}
	}
`;

/**
 * __useGetLabPracticeCommandQuery__
 *
 * To run a query within a React component, call `useGetLabPracticeCommandQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLabPracticeCommandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLabPracticeCommandQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLabPracticeCommandQuery(
	baseOptions?: Apollo.QueryHookOptions<GetLabPracticeCommandQuery, GetLabPracticeCommandQueryVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<GetLabPracticeCommandQuery, GetLabPracticeCommandQueryVariables>(
		GetLabPracticeCommandDocument,
		options
	);
}
export function useGetLabPracticeCommandLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetLabPracticeCommandQuery, GetLabPracticeCommandQueryVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<GetLabPracticeCommandQuery, GetLabPracticeCommandQueryVariables>(
		GetLabPracticeCommandDocument,
		options
	);
}
export type GetLabPracticeCommandQueryHookResult = ReturnType<typeof useGetLabPracticeCommandQuery>;
export type GetLabPracticeCommandLazyQueryHookResult = ReturnType<typeof useGetLabPracticeCommandLazyQuery>;
export type GetLabPracticeCommandQueryResult = Apollo.QueryResult<
	GetLabPracticeCommandQuery,
	GetLabPracticeCommandQueryVariables
>;
export const GetLabPracticeSessionCommandDocument = gql`
	query getLabPracticeSessionCommand($id: ID!) {
		getLabPracticeSessionCommand(id: $id) {
			labpracticesessionID
		}
	}
`;

/**
 * __useGetLabPracticeSessionCommandQuery__
 *
 * To run a query within a React component, call `useGetLabPracticeSessionCommandQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLabPracticeSessionCommandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLabPracticeSessionCommandQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLabPracticeSessionCommandQuery(
	baseOptions: Apollo.QueryHookOptions<GetLabPracticeSessionCommandQuery, GetLabPracticeSessionCommandQueryVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<GetLabPracticeSessionCommandQuery, GetLabPracticeSessionCommandQueryVariables>(
		GetLabPracticeSessionCommandDocument,
		options
	);
}
export function useGetLabPracticeSessionCommandLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<
		GetLabPracticeSessionCommandQuery,
		GetLabPracticeSessionCommandQueryVariables
	>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<GetLabPracticeSessionCommandQuery, GetLabPracticeSessionCommandQueryVariables>(
		GetLabPracticeSessionCommandDocument,
		options
	);
}
export type GetLabPracticeSessionCommandQueryHookResult = ReturnType<typeof useGetLabPracticeSessionCommandQuery>;
export type GetLabPracticeSessionCommandLazyQueryHookResult = ReturnType<
	typeof useGetLabPracticeSessionCommandLazyQuery
>;
export type GetLabPracticeSessionCommandQueryResult = Apollo.QueryResult<
	GetLabPracticeSessionCommandQuery,
	GetLabPracticeSessionCommandQueryVariables
>;
export const OnUpdateLabPracticeSessionCommandDocument = gql`
	subscription onUpdateLabPracticeSessionCommand($id: ID!) {
		onCreateLabPracticeSessionCommandBySessionID(labpracticesessionID: $id) {
			status
			parameters
			labpracticecommandID
		}
	}
`;

/**
 * __useOnUpdateLabPracticeSessionCommandSubscription__
 *
 * To run a query within a React component, call `useOnUpdateLabPracticeSessionCommandSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnUpdateLabPracticeSessionCommandSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnUpdateLabPracticeSessionCommandSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOnUpdateLabPracticeSessionCommandSubscription(
	baseOptions: Apollo.SubscriptionHookOptions<
		OnUpdateLabPracticeSessionCommandSubscription,
		OnUpdateLabPracticeSessionCommandSubscriptionVariables
	>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useSubscription<
		OnUpdateLabPracticeSessionCommandSubscription,
		OnUpdateLabPracticeSessionCommandSubscriptionVariables
	>(OnUpdateLabPracticeSessionCommandDocument, options);
}
export type OnUpdateLabPracticeSessionCommandSubscriptionHookResult = ReturnType<
	typeof useOnUpdateLabPracticeSessionCommandSubscription
>;
export type OnUpdateLabPracticeSessionCommandSubscriptionResult =
	Apollo.SubscriptionResult<OnUpdateLabPracticeSessionCommandSubscription>;
export const UpdateLabPracticeSessionCommandDocument = gql`
	mutation updateLabPracticeSessionCommand($input: CreateLabPracticeSessionCommandInput!) {
		createLabPracticeSessionCommand(input: $input) {
			id
			labpracticesessionID
			labpracticecommandID
			status
			parameters
		}
	}
`;
export type UpdateLabPracticeSessionCommandMutationFn = Apollo.MutationFunction<
	UpdateLabPracticeSessionCommandMutation,
	UpdateLabPracticeSessionCommandMutationVariables
>;

/**
 * __useUpdateLabPracticeSessionCommandMutation__
 *
 * To run a mutation, you first call `useUpdateLabPracticeSessionCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLabPracticeSessionCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLabPracticeSessionCommandMutation, { data, loading, error }] = useUpdateLabPracticeSessionCommandMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLabPracticeSessionCommandMutation(
	baseOptions?: Apollo.MutationHookOptions<
		UpdateLabPracticeSessionCommandMutation,
		UpdateLabPracticeSessionCommandMutationVariables
	>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<UpdateLabPracticeSessionCommandMutation, UpdateLabPracticeSessionCommandMutationVariables>(
		UpdateLabPracticeSessionCommandDocument,
		options
	);
}
export type UpdateLabPracticeSessionCommandMutationHookResult = ReturnType<
	typeof useUpdateLabPracticeSessionCommandMutation
>;
export type UpdateLabPracticeSessionCommandMutationResult =
	Apollo.MutationResult<UpdateLabPracticeSessionCommandMutation>;
export type UpdateLabPracticeSessionCommandMutationOptions = Apollo.BaseMutationOptions<
	UpdateLabPracticeSessionCommandMutation,
	UpdateLabPracticeSessionCommandMutationVariables
>;
export const GetLabPracticeDocument = gql`
	query getLabPractice($id: ID!) {
		getLabPractice(id: $id) {
			name
			description
			duration
			LabPracticeSessions {
				items {
					id
				}
			}
		}
	}
`;

/**
 * __useGetLabPracticeQuery__
 *
 * To run a query within a React component, call `useGetLabPracticeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLabPracticeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLabPracticeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLabPracticeQuery(
	baseOptions: Apollo.QueryHookOptions<GetLabPracticeQuery, GetLabPracticeQueryVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<GetLabPracticeQuery, GetLabPracticeQueryVariables>(GetLabPracticeDocument, options);
}
export function useGetLabPracticeLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetLabPracticeQuery, GetLabPracticeQueryVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<GetLabPracticeQuery, GetLabPracticeQueryVariables>(GetLabPracticeDocument, options);
}
export type GetLabPracticeQueryHookResult = ReturnType<typeof useGetLabPracticeQuery>;
export type GetLabPracticeLazyQueryHookResult = ReturnType<typeof useGetLabPracticeLazyQuery>;
export type GetLabPracticeQueryResult = Apollo.QueryResult<GetLabPracticeQuery, GetLabPracticeQueryVariables>;
export const OnCreateLabPracticeDocument = gql`
	mutation onCreateLabPractice($input: CreateLabPracticeInput!) {
		createLabPractice(input: $input) {
			id
			laboratoryID
			name
			description
			duration
			updatedBy
			createdBy
		}
	}
`;
export type OnCreateLabPracticeMutationFn = Apollo.MutationFunction<
	OnCreateLabPracticeMutation,
	OnCreateLabPracticeMutationVariables
>;

/**
 * __useOnCreateLabPracticeMutation__
 *
 * To run a mutation, you first call `useOnCreateLabPracticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOnCreateLabPracticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [onCreateLabPracticeMutation, { data, loading, error }] = useOnCreateLabPracticeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOnCreateLabPracticeMutation(
	baseOptions?: Apollo.MutationHookOptions<OnCreateLabPracticeMutation, OnCreateLabPracticeMutationVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<OnCreateLabPracticeMutation, OnCreateLabPracticeMutationVariables>(
		OnCreateLabPracticeDocument,
		options
	);
}
export type OnCreateLabPracticeMutationHookResult = ReturnType<typeof useOnCreateLabPracticeMutation>;
export type OnCreateLabPracticeMutationResult = Apollo.MutationResult<OnCreateLabPracticeMutation>;
export type OnCreateLabPracticeMutationOptions = Apollo.BaseMutationOptions<
	OnCreateLabPracticeMutation,
	OnCreateLabPracticeMutationVariables
>;
export const OnCreateLabPracticeCommandDocument = gql`
	mutation onCreateLabPracticeCommand($input: CreateLabPracticeCommandInput!) {
		createLabPracticeCommand(input: $input) {
			id
			labpracticeID
			name
			description
			updatedBy
			createdBy
		}
	}
`;
export type OnCreateLabPracticeCommandMutationFn = Apollo.MutationFunction<
	OnCreateLabPracticeCommandMutation,
	OnCreateLabPracticeCommandMutationVariables
>;

/**
 * __useOnCreateLabPracticeCommandMutation__
 *
 * To run a mutation, you first call `useOnCreateLabPracticeCommandMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOnCreateLabPracticeCommandMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [onCreateLabPracticeCommandMutation, { data, loading, error }] = useOnCreateLabPracticeCommandMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOnCreateLabPracticeCommandMutation(
	baseOptions?: Apollo.MutationHookOptions<
		OnCreateLabPracticeCommandMutation,
		OnCreateLabPracticeCommandMutationVariables
	>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<OnCreateLabPracticeCommandMutation, OnCreateLabPracticeCommandMutationVariables>(
		OnCreateLabPracticeCommandDocument,
		options
	);
}
export type OnCreateLabPracticeCommandMutationHookResult = ReturnType<typeof useOnCreateLabPracticeCommandMutation>;
export type OnCreateLabPracticeCommandMutationResult = Apollo.MutationResult<OnCreateLabPracticeCommandMutation>;
export type OnCreateLabPracticeCommandMutationOptions = Apollo.BaseMutationOptions<
	OnCreateLabPracticeCommandMutation,
	OnCreateLabPracticeCommandMutationVariables
>;
export const OnCreateLabPracticeOutputDocument = gql`
	mutation onCreateLabPracticeOutput($input: CreateLabPracticeOutputInput!) {
		createLabPracticeOutput(input: $input) {
			id
			labpracticeID
			name
			description
			units
			updatedBy
			createdBy
		}
	}
`;
export type OnCreateLabPracticeOutputMutationFn = Apollo.MutationFunction<
	OnCreateLabPracticeOutputMutation,
	OnCreateLabPracticeOutputMutationVariables
>;

/**
 * __useOnCreateLabPracticeOutputMutation__
 *
 * To run a mutation, you first call `useOnCreateLabPracticeOutputMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOnCreateLabPracticeOutputMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [onCreateLabPracticeOutputMutation, { data, loading, error }] = useOnCreateLabPracticeOutputMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOnCreateLabPracticeOutputMutation(
	baseOptions?: Apollo.MutationHookOptions<
		OnCreateLabPracticeOutputMutation,
		OnCreateLabPracticeOutputMutationVariables
	>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<OnCreateLabPracticeOutputMutation, OnCreateLabPracticeOutputMutationVariables>(
		OnCreateLabPracticeOutputDocument,
		options
	);
}
export type OnCreateLabPracticeOutputMutationHookResult = ReturnType<typeof useOnCreateLabPracticeOutputMutation>;
export type OnCreateLabPracticeOutputMutationResult = Apollo.MutationResult<OnCreateLabPracticeOutputMutation>;
export type OnCreateLabPracticeOutputMutationOptions = Apollo.BaseMutationOptions<
	OnCreateLabPracticeOutputMutation,
	OnCreateLabPracticeOutputMutationVariables
>;
export const OnCreateLabPracticeParameterDocument = gql`
	mutation onCreateLabPracticeParameter($input: CreateLabPracticeParameterInput!) {
		createLabPracticeParameter(input: $input) {
			id
			labpracticecommandID
			labpracticeID
			name
			description
			defaultValue
			minValue
			maxValue
			regex
			updatedBy
			createdBy
		}
	}
`;
export type OnCreateLabPracticeParameterMutationFn = Apollo.MutationFunction<
	OnCreateLabPracticeParameterMutation,
	OnCreateLabPracticeParameterMutationVariables
>;

/**
 * __useOnCreateLabPracticeParameterMutation__
 *
 * To run a mutation, you first call `useOnCreateLabPracticeParameterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOnCreateLabPracticeParameterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [onCreateLabPracticeParameterMutation, { data, loading, error }] = useOnCreateLabPracticeParameterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOnCreateLabPracticeParameterMutation(
	baseOptions?: Apollo.MutationHookOptions<
		OnCreateLabPracticeParameterMutation,
		OnCreateLabPracticeParameterMutationVariables
	>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<OnCreateLabPracticeParameterMutation, OnCreateLabPracticeParameterMutationVariables>(
		OnCreateLabPracticeParameterDocument,
		options
	);
}
export type OnCreateLabPracticeParameterMutationHookResult = ReturnType<typeof useOnCreateLabPracticeParameterMutation>;
export type OnCreateLabPracticeParameterMutationResult = Apollo.MutationResult<OnCreateLabPracticeParameterMutation>;
export type OnCreateLabPracticeParameterMutationOptions = Apollo.BaseMutationOptions<
	OnCreateLabPracticeParameterMutation,
	OnCreateLabPracticeParameterMutationVariables
>;
export const GetLabPracticeOutputDocument = gql`
	query getLabPracticeOutput {
		listLabPracticeOutputs {
			items {
				id
				name
			}
		}
	}
`;

/**
 * __useGetLabPracticeOutputQuery__
 *
 * To run a query within a React component, call `useGetLabPracticeOutputQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLabPracticeOutputQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLabPracticeOutputQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLabPracticeOutputQuery(
	baseOptions?: Apollo.QueryHookOptions<GetLabPracticeOutputQuery, GetLabPracticeOutputQueryVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<GetLabPracticeOutputQuery, GetLabPracticeOutputQueryVariables>(
		GetLabPracticeOutputDocument,
		options
	);
}
export function useGetLabPracticeOutputLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetLabPracticeOutputQuery, GetLabPracticeOutputQueryVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<GetLabPracticeOutputQuery, GetLabPracticeOutputQueryVariables>(
		GetLabPracticeOutputDocument,
		options
	);
}
export type GetLabPracticeOutputQueryHookResult = ReturnType<typeof useGetLabPracticeOutputQuery>;
export type GetLabPracticeOutputLazyQueryHookResult = ReturnType<typeof useGetLabPracticeOutputLazyQuery>;
export type GetLabPracticeOutputQueryResult = Apollo.QueryResult<
	GetLabPracticeOutputQuery,
	GetLabPracticeOutputQueryVariables
>;
export const GetLabPracticeSessionOutputDocument = gql`
	query getLabPracticeSessionOutput($id: ID!) {
		getLabPracticeSessionOutput(id: $id) {
			id
		}
	}
`;

/**
 * __useGetLabPracticeSessionOutputQuery__
 *
 * To run a query within a React component, call `useGetLabPracticeSessionOutputQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLabPracticeSessionOutputQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLabPracticeSessionOutputQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLabPracticeSessionOutputQuery(
	baseOptions: Apollo.QueryHookOptions<GetLabPracticeSessionOutputQuery, GetLabPracticeSessionOutputQueryVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useQuery<GetLabPracticeSessionOutputQuery, GetLabPracticeSessionOutputQueryVariables>(
		GetLabPracticeSessionOutputDocument,
		options
	);
}
export function useGetLabPracticeSessionOutputLazyQuery(
	baseOptions?: Apollo.LazyQueryHookOptions<GetLabPracticeSessionOutputQuery, GetLabPracticeSessionOutputQueryVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useLazyQuery<GetLabPracticeSessionOutputQuery, GetLabPracticeSessionOutputQueryVariables>(
		GetLabPracticeSessionOutputDocument,
		options
	);
}
export type GetLabPracticeSessionOutputQueryHookResult = ReturnType<typeof useGetLabPracticeSessionOutputQuery>;
export type GetLabPracticeSessionOutputLazyQueryHookResult = ReturnType<typeof useGetLabPracticeSessionOutputLazyQuery>;
export type GetLabPracticeSessionOutputQueryResult = Apollo.QueryResult<
	GetLabPracticeSessionOutputQuery,
	GetLabPracticeSessionOutputQueryVariables
>;
export const OnUpdateLabPracticeSessionOutputDocument = gql`
	subscription onUpdateLabPracticeSessionOutput {
		onCreateLabPracticeSessionOutput {
			value
			labpracticeoutputID
		}
	}
`;

/**
 * __useOnUpdateLabPracticeSessionOutputSubscription__
 *
 * To run a query within a React component, call `useOnUpdateLabPracticeSessionOutputSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnUpdateLabPracticeSessionOutputSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnUpdateLabPracticeSessionOutputSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnUpdateLabPracticeSessionOutputSubscription(
	baseOptions?: Apollo.SubscriptionHookOptions<
		OnUpdateLabPracticeSessionOutputSubscription,
		OnUpdateLabPracticeSessionOutputSubscriptionVariables
	>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useSubscription<
		OnUpdateLabPracticeSessionOutputSubscription,
		OnUpdateLabPracticeSessionOutputSubscriptionVariables
	>(OnUpdateLabPracticeSessionOutputDocument, options);
}
export type OnUpdateLabPracticeSessionOutputSubscriptionHookResult = ReturnType<
	typeof useOnUpdateLabPracticeSessionOutputSubscription
>;
export type OnUpdateLabPracticeSessionOutputSubscriptionResult =
	Apollo.SubscriptionResult<OnUpdateLabPracticeSessionOutputSubscription>;
export const PublishMqttMessageDocument = gql`
	mutation publishMqttMessage($input: LambdaInput!) {
		publishMqttMessage(input: $input)
	}
`;
export type PublishMqttMessageMutationFn = Apollo.MutationFunction<
	PublishMqttMessageMutation,
	PublishMqttMessageMutationVariables
>;

/**
 * __usePublishMqttMessageMutation__
 *
 * To run a mutation, you first call `usePublishMqttMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishMqttMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishMqttMessageMutation, { data, loading, error }] = usePublishMqttMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePublishMqttMessageMutation(
	baseOptions?: Apollo.MutationHookOptions<PublishMqttMessageMutation, PublishMqttMessageMutationVariables>
) {
	const options = {...defaultOptions, ...baseOptions};
	return Apollo.useMutation<PublishMqttMessageMutation, PublishMqttMessageMutationVariables>(
		PublishMqttMessageDocument,
		options
	);
}
export type PublishMqttMessageMutationHookResult = ReturnType<typeof usePublishMqttMessageMutation>;
export type PublishMqttMessageMutationResult = Apollo.MutationResult<PublishMqttMessageMutation>;
export type PublishMqttMessageMutationOptions = Apollo.BaseMutationOptions<
	PublishMqttMessageMutation,
	PublishMqttMessageMutationVariables
>;
