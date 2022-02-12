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
	selectedCommandName: string;
	id?:string;
	parameterName: string;
	parameterDescription: string;
	parameterDefaultValue: string;
	parameterMaxValue: string;
	parameterMinValue: string;
	parameterRegex: string;
	version?: number;
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
	OutputInfo = 'OutputInfo',
	CommandModalRemove = 'commandModalRemove',
	ParameterModalRemove = 'parameterModalRemove',
	OutputModalRemove = 'outputModalRemove',
}