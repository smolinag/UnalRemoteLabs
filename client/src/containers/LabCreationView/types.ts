export interface LabPracticeInfo extends LabPracticeCommandInfo, OutputInfo {
	practiceInfoName: string;
	practiceInfoDescription: string;
	practiceInfoDuration: string;
}

export interface LabPracticeCommandInfo extends LabPracticeParameterInfo {
	commandName: string;
	commandDescription: string;
   parameters: LabPracticeParameterInfo[];
}

export interface LabPracticeParameterInfo {
	parameterName: string;
	parameterDescription: string;
	parameterDefaultValue: string;
	parameterUnit: string;
	parameterMaxValue: string;
	parameterMinValue: string;
	parameterRegex: string;
}

export interface OutputInfo {
	outputType: string;
	outputName: string;
	outputDescription: string;
	outputUnit: string;
}

export enum Identifier {
	Name = 'name',
	Description = 'description',
	Duration = 'duration',
	CommandName = 'commandName',
	CommandDescription = 'commandDescription',
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
