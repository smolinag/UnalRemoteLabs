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