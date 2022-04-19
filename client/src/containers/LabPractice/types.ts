import { Maybe } from "graphql/jsutils/Maybe";

export interface LaboratoryInfo {
	id: string;
	name: string;
}

export interface LabPracticeInfo {
	laboratoryId: string;
	id?: string;
	practiceInfoName: string;
	practiceInfoDescription: string;
	practiceInfoDuration: string;
	practiceGuideS3Path: string;
	version?: number;
	command: LabPracticeCommandInfo;
	parameter: LabPracticeParameterInfo;
	output: OutputInfo
}

export interface LabPracticeCommandInfo {
	id?: string;
	commandName: string;
	commandLabel?: string;
	commandDescription: string;
	version?: number;
	updatedBy?: string;
	updatedAt?: string;
	createdBy?: string;
	createdAt?: string;
	action?: ActionType;
	order: number;
}

export interface LabPracticeParameterInfo {
	commandId?: string;
	commandName: string;
	id?:string;
	parameterName: string;
	parameterDescription: string;
	parameterDefaultValue: string;
	parameterMinValue: Maybe<number> | undefined;
	parameterMaxValue: Maybe<number> | undefined;
	parameterRegex: string;
	version?: number;
	updatedBy?: string;
	updatedAt?: string;
	createdBy?: string;
	createdAt?: string;
	action?: ActionType
}

export interface OutputInfo {
	id?: string;
	outputName: string;
	outputDescription: string;
	outputUnit: string | null;
	outputType: string;
	version?: number;
	order: number;
}

export enum Params {
	Name = 'name',
	Description = 'description',
	Duration = 'duration',
	CommandName = 'commandName',
	CommandDescription = 'commandDescription',
	CommandLabel = 'commandLabel',
	Order = 'order',
	SelectedCommand = 'selectedCommand',
	ParameterName = 'parameterName',
	ParameterDescription = 'parameterDescription',
	ParameterDefaultValue = 'parameterDefaultValue',
	ParameterMaxValue = 'parameterMaxValue',
	ParameterMinValue = 'parameterMinValue',
	ParameterRegex = 'parameterRegex',
	PracticeGuideS3Path = 'practiceGuideS3Path',
	OutputType = 'outputType',
	OutputName = 'outputName',
	OutputDescription = 'outputDescription',
	OutputUnit = 'outputUnit',
	AddCommand = 'addCommand',
	Laboratory = 'laboratoryId',
	ModalCommandName = 'modalCommandName',
	ModalCommandLabel = 'modalCommandLabel',
	OutputOrder = 'outputOrder'
}

export interface ErrorIdentifier {
	identifier: string,
}

export enum Section {
	PracticeInfo = 'PracticeInfo',
	CommandInfo = 'CommandInfo',
	ModalCommandInfo = 'ModalCommandInfo',
	ParameterInfo = 'ParameterInfo',
	ModalParameterInfo = 'ModalParameterInfo',
	OutputInfo = 'OutputInfo',
	CommandModalRemove = 'CommandModalRemove',
	ParameterModalRemove = 'ParameterModalRemove',
	OutputModalRemove = 'OutputModalRemove',
}

export enum ActionType {
	Nothing = 0,
	Edit = 1,
	Add = 2,
	Remove = 3,
}