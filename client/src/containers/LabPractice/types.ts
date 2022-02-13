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
	version?: number;
	command: LabPracticeCommandInfo;
	parameter: LabPracticeParameterInfo;
	output: OutputInfo
}

export interface LabPracticeCommandInfo {
	id?: string;
	commandName: string;
	label?: string;
	commandDescription: string;
	version?: number;
	updatedBy?: string;
	updatedAt?: string;
	createdBy?: string;
	createdAt?: string;
}

export interface LabPracticeParameterInfo {
	commandId?: string;
	commandName: string;
	id?:string;
	parameterName: string;
	parameterDescription: string;
	parameterDefaultValue: string;
	parameterMaxValue: Maybe<number> | undefined;
	parameterMinValue: Maybe<number> | undefined;
	parameterRegex: string;
	version?: number;
	updatedBy?: string;
	updatedAt?: string;
	createdBy?: string;
	createdAt?: string;
}

export interface OutputInfo {
	id?: string;
	outputName: string;
	outputDescription: string;
	outputUnit: string;
	outputType: string;
	version?: number;
}

export enum Params {
	Name = 'name',
	Description = 'description',
	Duration = 'duration',
	CommandName = 'commandName',
	CommandDescription = 'commandDescription',
	SelectedCommand = 'selectedCommand',
	ParameterName = 'parameterName',
	ParameterDescription = 'parameterDescription',
	ParameterDefaultValue = 'parameterDefaultValue',
	ParameterMaxValue = 'parameterMaxValue',
	ParameterMinValue = 'parameterMinValue',
	ParameterRegex = 'parameterRegex',
	OutputType = 'outputType',
	OutputName = 'outputName',
	OutputDescription = 'outputDescription',
	OutputUnit = 'outputUnit',
	AddCommand = 'addCommand',
	Laboratory = 'laboratoryId',
	ModalCommandName = 'modalCommandName'
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