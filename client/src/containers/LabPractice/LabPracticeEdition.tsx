import React, {useContext} from 'react';
import Row from 'react-bootstrap/Row';
// import { useLocation } from 'react-router-dom';

import {
	LabPractice,
	LabPracticeCommand,
	LabPracticeCommandTable,
	LabPracticeParameters,
	LabPracticeParametersTable,
	LabPracticeOutput,
	LabPracticeOutputTable
} from '../../components/LabPracticeCreation';
import {Button, LoadingContainer, ModalComponent} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {
	useListLaboratoriesQuery,
	useGetLabPracticeQuery,
	useListLabPracticeCommandsQuery,
	useListLabPracticeOutputsQuery,
	useDeleteLabPracticeCommandMutation,
	useDeleteLabPracticeParameterMutation,
	useDeleteLabPracticeOutputMutation,
	useUpdateLabPracticeMutation,
	// useCreateLabPracticeMutation,
	useCreateLabPracticeCommandMutation,
	useCreateLabPracticeParameterMutation,
	// useCreateLabPracticeOutputMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import {
	Params,
	OutputInfo,
	LabPracticeCommandInfo,
	LabPracticeParameterInfo,
	LabPracticeInfo,
	ErrorIdentifier,
	Section,
	LaboratoryInfo
} from './types';

const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';
const DEVICE_ID = '850bbd31-eab1-4eb6-aa16-51886d706fb9';
// const COMMAND_NAME_PREFIX = 'cmd';

export interface LocationState {
	labPracticeId: string;
	deviceId: string;
}

const initialPracticeValue: LabPracticeInfo = {
	laboratoryId: '',
	practiceInfoName: '',
	practiceInfoDescription: '',
	practiceInfoDuration: '0',
	version: 0,
	command: {
		commandName: '',
		commandDescription: '',
		version: 0
	},
	parameter: {
		selectedCommandName: '',
		parameterName: '',
		parameterDescription: '',
		parameterDefaultValue: '',
		parameterMaxValue: '',
		parameterMinValue: '',
		parameterRegex: ''
	},
	output: {
		outputName: '',
		outputDescription: '',
		outputUnit: '',
		outputType: 'string'
	}
};

let rowIndex = -1;

const LabPracticeEdition: React.FC<unknown> = () => {
	const [practiceInfo, setPracticeInfo] = React.useState<LabPracticeInfo>(initialPracticeValue);
	const [commandsList, setCommandsList] = React.useState<LabPracticeCommandInfo[]>([]);
	const [parametersList, setParametersList] = React.useState<LabPracticeParameterInfo[]>([]);
	const [outputsList, setOutputsList] = React.useState<OutputInfo[]>([]);

	const [commandToRemove, setCommandToRemove] = React.useState<LabPracticeCommandInfo>(initialPracticeValue.command);
	const [parameterToRemove, setParameterToRemove] = React.useState<LabPracticeParameterInfo>(
		initialPracticeValue.parameter
	);
	const [outputToRemove, setOutputToRemove] = React.useState<OutputInfo>(initialPracticeValue.output);
	const [loadingRemove, setLoadingRemove] = React.useState<boolean>(false);

	const [loading, setLoading] = React.useState<boolean>(false);
	const [errors, setErrors] = React.useState<ErrorIdentifier[]>([]);
	const [laboratories, setLaboratories] = React.useState<LaboratoryInfo[]>([]);

	const [displayModal, setDisplayModal] = React.useState<boolean>(false);
	const [modalType, setModalType] = React.useState<Section>(Section.CommandInfo);
	const [modalTitle, setModalTitle] = React.useState<string>('');
	const [commandToEdit, setCommandToEdit] = React.useState<LabPracticeCommandInfo>(initialPracticeValue.command);
	const [parameterToEdit, setParameterToEdit] = React.useState<LabPracticeParameterInfo>(
		initialPracticeValue.parameter
	);
	const [outputToEdit, setOutputToEdit] = React.useState<OutputInfo>(initialPracticeValue.output);

	// const location = useLocation();
	// const labPracticeId = (location.state as LocationState)?.labPracticeId;
	// const deviceId = (location.state as LocationState)?.deviceId;

	const {data: laboratoriesList} = useListLaboratoriesQuery();
	const {data: practiceInfoDb} = useGetLabPracticeQuery({variables: {id: PRACTICE_ID}});
	const {data: labCommandsDataDb} = useListLabPracticeCommandsQuery({variables: {id: PRACTICE_ID}});
	const {data: practiceOutputsDb} = useListLabPracticeOutputsQuery({
		variables: {id: DEVICE_ID}
	});

	const [deleteLabPracticeCommand] = useDeleteLabPracticeCommandMutation({});
	const [deleteLabPracticeParameter] = useDeleteLabPracticeParameterMutation({});
	const [deleteLabPracticeOutput] = useDeleteLabPracticeOutputMutation({});

	const [updateLabPractice] = useUpdateLabPracticeMutation({});

	// const [createLabPractice] = useCreateLabPracticeMutation({});
	const [createLabPracticeCommand] = useCreateLabPracticeCommandMutation({});
	const [createLabPracticeParameter] = useCreateLabPracticeParameterMutation({});
	// const [createLabPracticeOutput] = useCreateLabPracticeOutputMutation({});
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	React.useEffect(() => {
		if (practiceInfoDb?.getLabPractice) {
			const practice: LabPracticeInfo = {
				...initialPracticeValue,
				id: practiceInfoDb.getLabPractice.id,
				laboratoryId: practiceInfoDb?.getLabPractice.Laboratory ? practiceInfoDb?.getLabPractice.Laboratory?.id : '',
				practiceInfoName: practiceInfoDb?.getLabPractice.name,
				practiceInfoDescription: practiceInfoDb?.getLabPractice.description
					? practiceInfoDb?.getLabPractice.description
					: '',
				practiceInfoDuration: practiceInfoDb?.getLabPractice.duration
					? practiceInfoDb?.getLabPractice.duration.toString()
					: '0',
				version: practiceInfoDb.getLabPractice._version
			};
			setPracticeInfo(practice);
		}
	}, [practiceInfoDb]);

	React.useEffect(() => {
		const labs = laboratoriesList?.listLaboratorys?.items;
		if (labs) {
			setLaboratories(
				labs.map((obj) => {
					return {id: obj !== null ? obj.id : '', name: obj !== null ? obj.name : ''};
				})
			);
		}
	}, [laboratoriesList]);

	React.useEffect(() => {
		if (labCommandsDataDb?.listLabPracticeCommands?.items != null) {
			console.warn(labCommandsDataDb?.listLabPracticeCommands?.items)
			const commands: LabPracticeCommandInfo[] = labCommandsDataDb?.listLabPracticeCommands?.items
				// .filter((command) => command?.name && command.name.startsWith(COMMAND_NAME_PREFIX))
				.map((command) => {
					return {
						id: command?.id as string,
						commandName: command?.name as string,
						commandDescription: command?.description ? command?.description : '',
						parameters: command?.LabPracticeParameters?.items?.map((parameter) => ({
							label: (parameter?.labelName ?? parameter?.name) as string,
							id: parameter?.id as string,
							value: Number((parameter?.defaultValue as string) ?? 0)
						})),
						label: (command?.labelName ?? command?.name) as string,
						version: command?._version
					};
				});

			const parameters: LabPracticeParameterInfo[] = [];

			labCommandsDataDb?.listLabPracticeCommands?.items
				// .filter((command) => command?.name && command.name.startsWith(COMMAND_NAME_PREFIX))
				.map((command) => {
					if (command?.LabPracticeParameters) {
						command?.LabPracticeParameters.items.forEach((parameter) => {
							if (parameter) {
								parameters.push({
									commandId: command?.id,
									selectedCommandName: command?.name,
									id: parameter?.id,
									parameterName: parameter?.name ? parameter?.name : '',
									parameterDescription: parameter?.description ? parameter?.description : '',
									parameterDefaultValue: parameter?.defaultValue ? parameter?.defaultValue : '',
									parameterMaxValue: parameter?.maxValue ? parameter?.maxValue.toString() : '',
									parameterMinValue: parameter?.minValue ? parameter?.minValue.toString() : '',
									parameterRegex: parameter?.regex ? parameter?.regex : ''
								});
							}
						});
					}
				});

			setCommandsList(commands);
			setParametersList(parameters);
		}
	}, [labCommandsDataDb]);

	React.useEffect(() => {
		if (practiceOutputsDb?.listLabPracticeOutputs?.items != null) {
			const outputs: OutputInfo[] = practiceOutputsDb?.listLabPracticeOutputs?.items.map((output) => {
				return {
					id: output?.id,
					outputName: output?.name ? output?.name : '',
					outputDescription: output?.description ? output?.description : '',
					outputUnit: output?.units ? output?.units : '',
					outputType: output?.outputType ? output?.outputType : '',
					version: output?._version
				};
			});

			setOutputsList(outputs);
		}
	}, [practiceOutputsDb]);

	const practiceChange = (value: string, id: string) => {
		const practice: LabPracticeInfo = {
			...practiceInfo
		};
		setPracticeInfo((previousState) => {
			switch (id) {
				case Params.Laboratory:
					return {...previousState, laboratoryId: value};
				case Params.Name:
					return {...previousState, practiceInfoName: value};
				case Params.Description:
					return {...previousState, practiceInfoDescription: value};
				case Params.Duration:
					return {...previousState, practiceInfoDuration: value.length > 0 && parseInt(value) > 0 ? value : '0'};
				case Params.CommandName:
					practice.command = {
						...practiceInfo.command,
						commandName: value
					};
					return {...previousState, command: practice.command};
				case Params.CommandDescription:
					practice.command = {
						...practiceInfo.command,
						commandDescription: value
					};
					return {...previousState, command: practice.command};
				case Params.SelectedCommand:
					practice.parameter = {
						...practiceInfo.parameter,
						selectedCommandName: value
					};
					return {...previousState, parameter: practice.parameter};
				case Params.ParameterName:
					practice.parameter = {
						...practiceInfo.parameter,
						parameterName: value
					};
					return {...previousState, parameter: practice.parameter};
				case Params.ParameterDescription:
					practice.parameter = {
						...practiceInfo.parameter,
						parameterDescription: value
					};
					return {...previousState, parameter: practice.parameter};
				case Params.ParameterDefaultValue:
					practice.parameter = {
						...practiceInfo.parameter,
						parameterDefaultValue: value
					};
					return {...previousState, parameter: practice.parameter};
				case Params.ParameterMaxValue:
					practice.parameter = {
						...practiceInfo.parameter,
						parameterMaxValue: value
					};
					return {...previousState, parameter: practice.parameter};
				case Params.ParameterMinValue:
					practice.parameter = {
						...practiceInfo.parameter,
						parameterMinValue: value
					};
					return {...previousState, parameter: practice.parameter};
				case Params.ParameterRegex:
					practice.parameter = {
						...practiceInfo.parameter,
						parameterRegex: value
					};
					return {...previousState, parameter: practice.parameter};
				case Params.OutputName:
					practice.output = {
						...practiceInfo.output,
						outputName: value
					};
					return {...previousState, output: practice.output};
				case Params.OutputDescription:
					practice.output = {
						...practiceInfo.output,
						outputDescription: value
					};
					return {...previousState, output: practice.output};
				case Params.OutputUnit:
					practice.output = {
						...practiceInfo.output,
						outputUnit: value
					};
					return {...previousState, output: practice.output};
				default:
					return previousState;
			}
		});
	};

	const addCommand = (command: LabPracticeCommandInfo): void => {
		checkErrorMessage(Section.CommandInfo);

		if (command.commandName.length > 0) {
			setCommandsList((previousState) => {
				const newCommand: LabPracticeCommandInfo = {
					commandName: command.commandName,
					commandDescription: command.commandDescription
				};

				return previousState.concat(newCommand);
			});

			setPracticeInfo((previousState) => {
				const command: LabPracticeCommandInfo = initialPracticeValue.command;
				return {...previousState, command: command};
			});
		}
	};

	const handleCommandAction = (index: number, action: Action) => {
		switch (action) {
			case Action.Delete:
				if (parametersList.length > 0) {
					const parameters = parametersList.filter(
						(parameter) => parameter.selectedCommandName === commandsList[index].commandName
					);
					if (parameters.length > 0) {
						showErrorBanner(`No se pude eliminar el comando, elimine primero los parámetros asociados a este.`);
					} else {
						setDisplayModal(true);
						setModalType(Section.CommandModalRemove);
						setModalTitle(`Borrar commando: ${commandsList[index].commandName}`);
						setCommandToRemove(commandsList[index]);
						rowIndex = index;
					}
				} else {
					setDisplayModal(true);
					setModalType(Section.CommandModalRemove);
					setModalTitle(`Borrar commando: ${commandsList[index].commandName}`);
					setCommandToRemove(commandsList[index]);
					rowIndex = index;
				}

				break;
			case Action.Edit:
				setDisplayModal(true);
				setModalType(Section.ModalCommandInfo);
				setModalTitle(`Commando: ${commandsList[index].commandName}`);
				setCommandToEdit(commandsList[index]);
				rowIndex = index;
				break;
		}
	};

	const addParameter = (parameter: LabPracticeParameterInfo): void => {
		checkErrorMessage(Section.ParameterInfo);

		if (
			parameter.selectedCommandName.length > 0 &&
			parameter.parameterName.length > 0 &&
			parameter.parameterDefaultValue.length > 0
		) {
			setParametersList((previousState) => {
				const newParameter: LabPracticeParameterInfo = {
					selectedCommandName: parameter.selectedCommandName,
					parameterName: parameter.parameterName,
					parameterDescription: parameter.parameterDescription,
					parameterDefaultValue: parameter.parameterDefaultValue,
					parameterMaxValue: parameter.parameterMaxValue,
					parameterMinValue: parameter.parameterMinValue,
					parameterRegex: parameter.parameterRegex
				};

				return previousState.concat(newParameter);
			});

			setPracticeInfo((previousState) => {
				const parameter: LabPracticeParameterInfo = initialPracticeValue.parameter;
				return {...previousState, parameter: parameter};
			});
		}
	};

	const handleParameterAction = (index: number, action: Action) => {
		switch (action) {
			case Action.Delete:
				setDisplayModal(true);
				setModalType(Section.ParameterModalRemove);
				setModalTitle(`Borrar parametro: ${parametersList[index].parameterName}`);
				setParameterToRemove(parametersList[index]);
				rowIndex = index;
				break;
			case Action.Edit:
				setModalType(Section.ParameterInfo);
				setDisplayModal(true);
				setModalTitle(`Parametro: ${parametersList[index].parameterName}`);
				setParameterToEdit(parametersList[index]);
				rowIndex = index;
				break;
		}
	};

	const addOutput = (output: OutputInfo): void => {
		checkErrorMessage(Section.OutputInfo);

		if (output.outputName.length > 0) {
			setOutputsList((previousState) => {
				const newOutput: OutputInfo = {
					outputName: output.outputName,
					outputDescription: output.outputDescription,
					outputUnit: output.outputUnit,
					outputType: output.outputType
				};
				return previousState.concat(newOutput);
			});

			setPracticeInfo((previousState) => {
				const output: OutputInfo = initialPracticeValue.output;
				return {...previousState, output: output};
			});
		}
	};

	const handleOutputAction = (index: number, action: Action) => {
		switch (action) {
			case Action.Delete:
				setDisplayModal(true);
				setModalType(Section.OutputModalRemove);
				setModalTitle(`Borrar parámetro de salida: ${outputsList[index].outputName}`);
				setOutputToRemove(outputsList[index]);
				rowIndex = index;
				break;
			case Action.Edit:
				setModalType(Section.OutputInfo);
				setDisplayModal(true);
				setModalTitle(`Output: ${outputsList[index].outputName}`);
				setOutputToEdit(outputsList[index]);
				rowIndex = index;
				break;
		}
	};

	const createUpdatePractice = async () => {
		checkErrorMessage(Section.PracticeInfo);

		if (errors.length === 0) {
			setLoading(true);

			try {
				// Actualizar práctica
				const {data: labPracticeData} = await updateLabPractice({
					variables: {
						input: {
							id: practiceInfo.id ? practiceInfo.id : '',
							laboratoryID: practiceInfo.laboratoryId,
							name: practiceInfo.practiceInfoName,
							description: practiceInfo.practiceInfoDescription,
							duration: parseInt(practiceInfo.practiceInfoDuration),
							createdBy: '1',
							_version: practiceInfo.version
						}
					}
				});

				if (!labPracticeData?.updateLabPractice?.id) {
					throw Error('');
				}

				const practiceId = labPracticeData.updateLabPractice?.id;

				if (!practiceId) {
					return;
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				// const creationPromises: Promise<any>[] = [];
				if (commandsList.length > 0) {
					commandsList.map((command) => {
						if (command.id) {
							// Actualizar comando
							console.warn(command.id);
						} else {
							// Crear nuevo comando 
							createLabPracticeCommand({
								variables: {
									input: {
										labpracticeID: practiceId,
										name: command.commandName,
										description: command.commandDescription,
										createdBy: '1'
									}
								}
							}).then((commandData) => {
								const commandId = commandData?.data?.createLabPracticeCommand?.id;
								const commandName = commandData?.data?.createLabPracticeCommand?.name;
								if (!commandName) {
									return;
								}
								if (parametersList.length > 0) {
									return Promise.all(
										parametersList.map((parameter) => {
											if (parameter.selectedCommandName === commandName && !parameter.id) {
												// Crear nuevo parámetro
												createLabPracticeParameter({
													variables: {
														input: {
															labpracticecommandID: commandId,
															labpracticeID: labPracticeData.updateLabPractice?.id,
															name: parameter.parameterName,
															description: parameter.parameterDescription,
															defaultValue: parameter.parameterDefaultValue,
															minValue: parseInt(parameter.parameterMinValue),
															maxValue: parseInt(parameter.parameterMaxValue),
															regex: parameter.parameterRegex
														}
													}
												});
											} else {
												// Actualizar parámetro
											}
										})
									);
								}
							});
						}
					});
				}
				// if (outputsList.length > 0) {
				// 	creationPromises.concat(
				// 		outputsList.map(async (obj) =>
				// 			createLabPracticeOutput({
				// 				variables: {
				// 					input: {
				// 						labpracticeID: practiceId,
				// 						outputType: 'string',
				// 						name: obj.outputName,
				// 						description: obj.outputDescription,
				// 						units: JSON.stringify(obj.outputUnit),
				// 						createdBy: '1'
				// 					}
				// 				}
				// 			})
				// 		)
				// 	);
				// }

				// await Promise.all(creationPromises);
				showSuccessBanner(`La práctica ${labPracticeData.updateLabPractice.name} fue actualizada exitosamente`);
			} catch (error) {
				showErrorBanner(`Error en la actualización de la práctica ${practiceInfo.practiceInfoName}`);
			} finally {
				setLoading(false);
			}
		}
	};

	const checkErrorMessage = (section: string) => {
		setErrors((previousState: ErrorIdentifier[]) => {
			const notAddedLab = errors.filter((error) => error.identifier === Params.Laboratory).length === 1;
			const notAddedName = errors.filter((error) => error.identifier === Params.Name).length === 1;
			const notAddedDuration = errors.filter((error) => error.identifier === Params.Duration).length === 1;
			const notCommandName = errors.filter((error) => error.identifier === Params.CommandName).length === 1;
			const notCommandSelected = errors.filter((error) => error.identifier === Params.SelectedCommand).length === 1;
			const notParameterName = errors.filter((error) => error.identifier === Params.ParameterName).length === 1;
			const notParameterDefaultValue =
				errors.filter((error) => error.identifier === Params.ParameterDefaultValue).length === 1;
			const notOutputName = errors.filter((error) => error.identifier === Params.OutputName).length === 1;
			const notModalCommandName = errors.filter((error) => error.identifier === Params.ModalCommandName).length >= 1;

			if (section === Section.PracticeInfo) {
				if (!notAddedLab && practiceInfo.laboratoryId.length === 0) {
					previousState.push({
						identifier: Params.Laboratory
					});
				} else if (notAddedLab && practiceInfo.laboratoryId.length > 0) {
					const index = errors.findIndex((error) => error.identifier === Params.Laboratory);
					return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
				}

				if (!notAddedName && practiceInfo.practiceInfoName.length === 0) {
					previousState.push({
						identifier: Params.Name
					});
				} else if (notAddedName && practiceInfo.practiceInfoName.length > 0) {
					const index = errors.findIndex((error) => error.identifier === Params.Name);
					return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
				}

				if (!notAddedDuration && parseInt(practiceInfo.practiceInfoDuration) === 0) {
					previousState.push({
						identifier: Params.Duration
					});
				} else if (notAddedDuration && parseInt(practiceInfo.practiceInfoDuration) > 0) {
					const index = errors.findIndex((error) => error.identifier === Params.Duration);
					return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
				}
			}
			if (section === Section.CommandInfo) {
				if (!notCommandName && practiceInfo.command.commandName.length === 0) {
					previousState.push({
						identifier: Params.CommandName
					});
				} else if (notCommandName && practiceInfo.command.commandName.length > 0) {
					const index = errors.findIndex((error) => error.identifier === Params.CommandName);
					return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
				}
			}
			if (section === Section.ModalCommandInfo) {
				if (!notModalCommandName && commandToEdit.commandName.length === 0) {
					previousState.push({
						identifier: Params.ModalCommandName
					});
				} else if (notModalCommandName && commandToEdit.commandName.length > 0) {
					const index = errors.findIndex((error) => error.identifier === Params.ModalCommandName);
					return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
				}
			}
			if (section === Section.ParameterInfo) {
				if (!notCommandSelected && practiceInfo.parameter.selectedCommandName.length === 0) {
					previousState.push({
						identifier: Params.SelectedCommand
					});
				} else if (notCommandSelected && practiceInfo.parameter.selectedCommandName.length > 0) {
					const index = errors.findIndex((error) => error.identifier === Params.SelectedCommand);
					return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
				}

				if (!notParameterName && practiceInfo.parameter.parameterName.length === 0) {
					previousState.push({
						identifier: Params.ParameterName
					});
				} else if (notParameterName && practiceInfo.parameter.parameterName.length > 0) {
					const index = errors.findIndex((error) => error.identifier === Params.ParameterName);
					return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
				}

				if (!notParameterDefaultValue && practiceInfo.parameter.parameterDefaultValue.length === 0) {
					previousState.push({
						identifier: Params.ParameterDefaultValue
					});
				} else if (notParameterDefaultValue && practiceInfo.parameter.parameterDefaultValue.length > 0) {
					const index = errors.findIndex((error) => error.identifier === Params.ParameterDefaultValue);
					return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
				}
			}

			if (section === Section.OutputInfo) {
				if (!notOutputName && practiceInfo.output.outputName.length === 0) {
					previousState.push({
						identifier: Params.OutputName
					});
				} else if (notOutputName && practiceInfo.output.outputName.length > 0) {
					const index = errors.findIndex((error) => error.identifier === Params.OutputName);
					return previousState.slice(0, index).concat(previousState.slice(index + 1, errors.length + 1));
				}
			}

			return [...previousState];
		});
	};

	const handleDisplayModal = (display: boolean) => {
		setDisplayModal(display);
		setCommandToEdit(initialPracticeValue.command);
	};

	const editInformation = (
		param: string,
		value: string,
		command?: LabPracticeCommandInfo,
		parameter?: LabPracticeParameterInfo,
		output?: OutputInfo
	) => {
		if (command) {
			setCommandToEdit((previousState) => {
				switch (param) {
					case Params.CommandName:
						return {...previousState, commandName: value};
					case Params.CommandDescription:
						return {...previousState, commandDescription: value};
					default:
						return previousState;
				}
			});
		} else if (parameter) {
			setParameterToEdit((previousState) => {
				switch (param) {
					case Params.SelectedCommand:
						return {...previousState, selectedCommandName: value};
					case Params.ParameterName:
						return {...previousState, parameterName: value};
					case Params.ParameterDescription:
						return {...previousState, parameterDescription: value};
					case Params.ParameterDefaultValue:
						return {...previousState, parameterDefaultValue: value};
					case Params.ParameterMinValue:
						return {...previousState, parameterMinValue: value};
					case Params.ParameterMaxValue:
						return {...previousState, parameterMaxValue: value};
					case Params.ParameterRegex:
						return {...previousState, parameterRegex: value};
					default:
						return previousState;
				}
			});
		} else if (output) {
			setOutputToEdit((previousState) => {
				switch (param) {
					case Params.OutputName:
						return {...previousState, outputName: value};
					case Params.OutputDescription:
						return {...previousState, outputDescription: value};
					case Params.OutputUnit:
						return {...previousState, outputUnit: value};
					default:
						return previousState;
				}
			});
		}
	};

	const handleSaveEdit = () => {
		if (modalType === Section.ModalCommandInfo) {
			checkErrorMessage(Section.ModalCommandInfo);

			if (commandToEdit.commandName !== '') {
				setCommandsList((previousState) => {
					const command = previousState[rowIndex];

					previousState.map((obj) => {
						if (obj.id === command.id) {
							obj.commandName = commandToEdit.commandName;
							obj.commandDescription = commandToEdit.commandDescription;
						}
					});
					return previousState;
				});
				setCommandToEdit(initialPracticeValue.command);
				setDisplayModal(false);
			}
		}

		if (modalType === Section.ParameterInfo) {
			if (
				parameterToEdit.parameterName !== '' &&
				parameterToEdit.selectedCommandName.length > 0 &&
				parameterToEdit.parameterDefaultValue.length > 0
			) {
				setParametersList((previousState) => {
					const parameter = previousState[rowIndex];

					previousState.map((obj) => {
						if (obj.parameterName === parameter.parameterName) {
							obj.selectedCommandName = parameterToEdit.selectedCommandName;
							obj.parameterName = parameterToEdit.parameterName;
							obj.parameterDescription = parameterToEdit.parameterDescription;
							obj.parameterDefaultValue = parameterToEdit.parameterDefaultValue;
							obj.parameterMinValue = parameterToEdit.parameterMinValue;
							obj.parameterMaxValue = parameterToEdit.parameterMaxValue;
							obj.parameterRegex = parameterToEdit.parameterRegex;
						}
					});
					return previousState;
				});
				setParameterToEdit(initialPracticeValue.parameter);
				setDisplayModal(false);
			}
		}

		if (modalType === Section.OutputInfo) {
			if (outputToEdit.outputName.length > 0 && outputToEdit.outputUnit.length > 0) {
				setOutputsList((previousState) => {
					const output = previousState[rowIndex];

					previousState.map((obj) => {
						if (obj.outputName === output.outputName) {
							obj.outputName = outputToEdit.outputName;
							obj.outputDescription = outputToEdit.outputDescription;
							obj.outputUnit = outputToEdit.outputUnit;
						}
					});
					return previousState;
				});
				setOutputToEdit(initialPracticeValue.output);
				setDisplayModal(false);
			}
		}

		if (modalType === Section.CommandModalRemove) {
			if (commandToRemove.id) {
				setLoadingRemove(true);
				deleteLabPracticeCommand({
					variables: {
						input: {
							id: commandToRemove?.id,
							_version: commandToRemove.version
						}
					}
				})
					.then((response) => {
						if (response.data?.deleteLabPracticeCommand?._deleted) {
							setCommandsList((previousState) => {
								return previousState
									.slice(0, rowIndex)
									.concat(previousState.slice(rowIndex + 1, commandsList.length + 1));
							});
							setDisplayModal(false);
							showSuccessBanner(`El Comando ${commandToRemove.commandName} fue eliminado exitosamente`);
							setLoadingRemove(false);
						}
					})
					.catch((error) => {
						setDisplayModal(false);
						showErrorBanner(`No se pudo eliminar el comando ${commandToRemove.commandName}`);
						setLoadingRemove(false);
					});
			} else {
				setCommandsList((previousState) => {
					return previousState.slice(0, rowIndex).concat(previousState.slice(rowIndex + 1, commandsList.length + 1));
				});
			}
		}

		if (modalType === Section.ParameterModalRemove) {
			if (parameterToRemove.id) {
				setLoadingRemove(true);
				deleteLabPracticeParameter({
					variables: {
						input: {
							id: parameterToRemove?.id,
							_version: parameterToRemove.version
						}
					}
				})
					.then((response) => {
						if (response.data?.deleteLabPracticeParameter?._deleted) {
							setParametersList((previousState) => {
								return previousState
									.slice(0, rowIndex)
									.concat(previousState.slice(rowIndex + 1, parametersList.length + 1));
							});
							setDisplayModal(false);
							showSuccessBanner(`El parámetro ${parameterToRemove.parameterName} fue eliminado exitosamente`);
							setLoadingRemove(false);
						}
					})
					.catch((error) => {
						setDisplayModal(false);
						showErrorBanner(`No se pudo eliminar el parámetro ${parameterToRemove.parameterName}`);
						setLoadingRemove(false);
					});
			} else {
				setParametersList((previousState) => {
					return previousState.slice(0, rowIndex).concat(previousState.slice(rowIndex + 1, parametersList.length + 1));
				});
			}
		}

		if (modalType === Section.OutputModalRemove) {
			if (outputToRemove.id) {
				setLoadingRemove(true);
				deleteLabPracticeOutput({
					variables: {
						input: {
							id: outputToRemove?.id,
							_version: outputToRemove.version
						}
					}
				})
					.then((response) => {
						if (response.data?.deleteLabPracticeOutput?._deleted) {
							setOutputsList((previousState) => {
								return previousState
									.slice(0, rowIndex)
									.concat(previousState.slice(rowIndex + 1, outputsList.length + 1));
							});
							setDisplayModal(false);
							showSuccessBanner(`El parámetro de salida ${outputToRemove.outputName} fue eliminado exitosamente`);
							setLoadingRemove(false);
						}
					})
					.catch((error) => {
						setDisplayModal(false);
						showErrorBanner(`No se pudo eliminar el parámetro de salida ${outputToRemove.outputName}`);
						setLoadingRemove(false);
					});
			} else {
				setOutputsList((previousState) => {
					return previousState.slice(0, rowIndex).concat(previousState.slice(rowIndex + 1, outputsList.length + 1));
				});
			}
		}
	};

	const modalSection = () => {
		switch (modalType) {
			case Section.ModalCommandInfo:
				return <LabPracticeCommand command={commandToEdit} onValueEdit={editInformation} errors={errors} modal />;
			case Section.ParameterInfo:
				return (
					<LabPracticeParameters
						parameter={parameterToEdit}
						commands={commandsList}
						onValueEdit={editInformation}
						errors={errors}
					/>
				);
			case Section.OutputInfo:
				return <LabPracticeOutput output={outputToEdit} onValueEdit={editInformation} errors={errors} />;
			case Section.CommandModalRemove:
				return <div>{`Está seguro que desea borrar el comando: ${commandToRemove.commandName}`}</div>;
			case Section.ParameterModalRemove:
				return <div>{`Está seguro que desea borrar el parámetro: ${parameterToRemove.parameterName}`}</div>;
			case Section.OutputModalRemove:
				return <div>{`Está seguro que desea borrar el parámetro de salida : ${outputToRemove.outputName}`}</div>;
			default:
				break;
		}
	};

	return (
		<>
			{
				<ModalComponent
					display={displayModal}
					onDisplay={handleDisplayModal}
					onSave={handleSaveEdit}
					title={modalTitle}
					loadingAccept={loadingRemove}>
					{modalSection()}
				</ModalComponent>
			}
			<LoadingContainer loading={loading}>
				<LabPractice
					practice={practiceInfo}
					laboratories={laboratories}
					onValueChange={practiceChange}
					errors={errors}
				/>

				<LabPracticeCommand command={practiceInfo.command} onValueChange={practiceChange} errors={errors} />
				<div className="justifyCenter">
					<Button loading={false} onClick={() => addCommand(practiceInfo.command)}>
						Añadir
					</Button>
				</div>
				{commandsList.length > 0 && <LabPracticeCommandTable data={commandsList} onAction={handleCommandAction} />}

				<LabPracticeParameters
					parameter={practiceInfo.parameter}
					commands={commandsList}
					onValueChange={practiceChange}
					errors={errors}
				/>
				<div className="justifyCenter">
					<Button loading={false} onClick={() => addParameter(practiceInfo.parameter)}>
						Añadir
					</Button>
				</div>
				{parametersList.length > 0 && (
					<LabPracticeParametersTable data={parametersList} onAction={handleParameterAction} />
				)}

				<LabPracticeOutput output={practiceInfo.output} onValueChange={practiceChange} errors={errors} />
				<div className="justifyCenter">
					<Button loading={false} onClick={() => addOutput(practiceInfo.output)}>
						Añadir
					</Button>
				</div>
				{outputsList.length > 0 && <LabPracticeOutputTable data={outputsList} onAction={handleOutputAction} />}

				<Row className="section">
					<div className="justifyEnd">
						<Button loading={loading} onClick={createUpdatePractice}>
							Guardar
						</Button>
					</div>
				</Row>
			</LoadingContainer>
		</>
	);
};

export default LabPracticeEdition;
