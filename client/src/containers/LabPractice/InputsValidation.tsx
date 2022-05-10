import {ErrorIdentifier, LabPracticeInfo, Params, Section} from './types';

export const validateErrorMessage = (section: string, errors: ErrorIdentifier[], practiceInfo: LabPracticeInfo) => {
	const errorsArray: ErrorIdentifier[] = errors;

	const notAddedLab = errors.filter((error) => error.identifier === Params.Laboratory).length === 1;
	const notAddedName = errors.filter((error) => error.identifier === Params.Name).length === 1;
	const notAddedDuration = errors.filter((error) => error.identifier === Params.Duration).length === 1;
	const notCommandName = errors.filter((error) => error.identifier === Params.CommandName).length === 1;
	const notCommandSelected = errors.filter((error) => error.identifier === Params.SelectedCommand).length === 1;
	const notParameterName = errors.filter((error) => error.identifier === Params.ParameterName).length === 1;
	const notParameterDefaultValue =
		errors.filter((error) => error.identifier === Params.ParameterDefaultValue).length === 1;
	const notOutputName = errors.filter((error) => error.identifier === Params.OutputName).length === 1;

	if (section === Section.PracticeInfo) {
		if (!notAddedLab && practiceInfo.laboratoryId.length === 0) {
			errorsArray.push({
				identifier: Params.Laboratory
			});
		} else if (notAddedLab && practiceInfo.laboratoryId.length > 0) {
			const index = errors.findIndex((error) => error.identifier === Params.Laboratory);
			return errorsArray.slice(0, index).concat(errorsArray.slice(index + 1, errors.length + 1));
		}

		if (!notAddedName && practiceInfo.practiceInfoName.length === 0) {
			errorsArray.push({
				identifier: Params.Name
			});
		} else if (notAddedName && practiceInfo.practiceInfoName.length > 0) {
			const index = errors.findIndex((error) => error.identifier === Params.Name);
			return errorsArray.slice(0, index).concat(errorsArray.slice(index + 1, errors.length + 1));
		}

		if (!notAddedDuration && parseInt(practiceInfo.practiceInfoDuration) === 0) {
			errorsArray.push({
				identifier: Params.Duration
			});
		} else if (notAddedDuration && parseInt(practiceInfo.practiceInfoDuration) > 0) {
			const index = errors.findIndex((error) => error.identifier === Params.Duration);
			return errorsArray.slice(0, index).concat(errorsArray.slice(index + 1, errors.length + 1));
		}
	}
	if (section === Section.CommandInfo) {
		if (!notCommandName && practiceInfo.command.commandName.length === 0) {
			errorsArray.push({
				identifier: Params.CommandName
			});
		} else if (notCommandName && practiceInfo.command.commandName.length > 0) {
			const index = errors.findIndex((error) => error.identifier === Params.CommandName);
			return errorsArray.slice(0, index).concat(errorsArray.slice(index + 1, errors.length + 1));
		}
	}
	if (section === Section.ParameterInfo) {
		if (!notCommandSelected && practiceInfo.parameter.commandName.length === 0) {
			errorsArray.push({
				identifier: Params.SelectedCommand
			});
		} else if (notCommandSelected && practiceInfo.parameter.commandName.length > 0) {
			const index = errors.findIndex((error) => error.identifier === Params.SelectedCommand);
			return errorsArray.slice(0, index).concat(errorsArray.slice(index + 1, errors.length + 1));
		}

		if (!notParameterName && practiceInfo.parameter.parameterName.length === 0) {
			errorsArray.push({
				identifier: Params.ParameterName
			});
		} else if (notParameterName && practiceInfo.parameter.parameterName.length > 0) {
			const index = errors.findIndex((error) => error.identifier === Params.ParameterName);
			return errorsArray.slice(0, index).concat(errorsArray.slice(index + 1, errors.length + 1));
		}

		if (!notParameterDefaultValue && practiceInfo.parameter.parameterDefaultValue.length === 0) {
			errorsArray.push({
				identifier: Params.ParameterDefaultValue
			});
		} else if (notParameterDefaultValue && practiceInfo.parameter.parameterDefaultValue.length > 0) {
			const index = errors.findIndex((error) => error.identifier === Params.ParameterDefaultValue);
			return errorsArray.slice(0, index).concat(errorsArray.slice(index + 1, errors.length + 1));
		}
	}

	if (section === Section.OutputInfo) {
		if (!notOutputName && practiceInfo.output.outputName.length === 0) {
			errorsArray.push({
				identifier: Params.OutputName
			});
		} else if (notOutputName && practiceInfo.output.outputName.length > 0) {
			const index = errors.findIndex((error) => error.identifier === Params.OutputName);
			return errorsArray.slice(0, index).concat(errorsArray.slice(index + 1, errors.length + 1));
		}
	}

	return errorsArray;
};
