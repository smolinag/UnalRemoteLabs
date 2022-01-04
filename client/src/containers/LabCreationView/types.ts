export interface LabPracticeInfo {
	practiceInfoName: string;
	practiceInfoDescription: string;
	practiceInfoDuration: string;
	command: LabPracticeCommandInfo;
	parameter: LabPracticeParameterInfo;
	output: OutputInfo
}

export interface LabPracticeCommandInfo {
	commandName: string;
	commandDescription: string;
}

export interface LabPracticeParameterInfo {
	selectedCommandName: string;
	parameterName: string;
	parameterDescription: string;
	parameterDefaultValue: string;
	parameterUnit: string;
	parameterMaxValue: string;
	parameterMinValue: string;
	parameterRegex: string;
}

export interface OutputInfo {
	outputName: string;
	outputDescription: string;
	outputUnit: string;
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
	ParameterUnit = 'parameterUnit',
	ParameterMaxValue = 'parameterMaxValue',
	ParameterMinValue = 'parameterMinValue',
	ParameterRegex = 'parameterRegex',
	OutputType = 'outputType',
	OutputName = 'outputName',
	OutputDescription = 'outputDescription',
	OutputUnit = 'outputUnit',
	AddCommand = 'addCommand'
}

export interface ErrorIdentifier {
	identifier: string,
}

export enum Section {
	PracticeInfo = 'PracticeInfo',
	CommandInfo = 'CommandInfo',
	ParameterInfo = 'ParameterInfo',
	OutputInfo = 'OutputInfo',
}