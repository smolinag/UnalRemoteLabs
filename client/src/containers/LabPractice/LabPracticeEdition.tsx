import {Storage} from 'aws-amplify';
import _ from 'lodash';
import React, {useContext} from 'react';
import Row from 'react-bootstrap/Row';
import {useLocation} from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

import {
	LabPractice,
	LabPracticeCommand,
	LabPracticeCommandTable,
	LabPracticeParameters,
	LabPracticeParametersTable,
	LabPracticeOutput,
	LabPracticeOutputTable,
	LabPracticeGuide
} from '../../components/LabPracticeCreation';
import {Button, LoadingContainer, ModalComponent} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {
	useGetLabPracticeQuery,
	useListLabPracticeCommandsQuery,
	useListLabPracticeOutputsQuery,
	useDeleteLabPracticeCommandMutation,
	useDeleteLabPracticeParameterMutation,
	useDeleteLabPracticeOutputMutation,
	useUpdateLabPracticeMutation,
	useUpdateLabPracticeCommandMutation,
	useUpdateLabPracticeParameterMutation,
	useUpdateLabPracticeOutputMutation,
	useCreateLabPracticeCommandMutation,
	useCreateLabPracticeParameterMutation,
	useCreateLabPracticeOutputMutation
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
	ActionType
} from './types';

export interface LocationState {
	labPracticeId: string;
	deviceId: string;
	labName: string;
	labId: string;
}

const initialPracticeValue: LabPracticeInfo = {
	laboratoryId: '',
	practiceInfoName: '',
	practiceInfoDescription: '',
	practiceInfoDuration: '0',
	practiceGuideS3Path: '',
	deviceId: '',
	version: 0,
	command: {
		commandName: '',
		commandDescription: '',
		version: 0,
		order: 1
	},
	parameter: {
		commandName: '',
		parameterName: '',
		parameterDescription: '',
		parameterDefaultValue: '',
		parameterMaxValue: undefined,
		parameterMinValue: undefined,
		parameterRegex: ''
	},
	output: {
		outputName: '',
		outputDescription: '',
		outputUnit: null,
		outputType: 'string',
		order: 1
	}
};

let rowIndex = -1;

const LabPracticeEdition: React.FC<unknown> = () => {
	const [paramsAlreadyIn, setParamsAlreadyIn] = React.useState<boolean>(false);
	const [outputsAlreadyIn, setOutputsAlreadyIn] = React.useState<boolean>(false);

	const [practiceInfo, setPracticeInfo] = React.useState<LabPracticeInfo>(initialPracticeValue);
	const [commandsList, setCommandsList] = React.useState<LabPracticeCommandInfo[]>([]);
	const [parametersList, setParametersList] = React.useState<LabPracticeParameterInfo[]>([]);
	const [outputsList, setOutputsList] = React.useState<OutputInfo[]>([]);

	const [commandToRemove, setCommandToRemove] = React.useState<LabPracticeCommandInfo>(initialPracticeValue.command);
	const [parameterToRemove, setParameterToRemove] = React.useState<LabPracticeParameterInfo>(
		initialPracticeValue.parameter
	);
	const [outputToRemove, setOutputToRemove] = React.useState<OutputInfo>(initialPracticeValue.output);
	const [loadingButton, setLoadingButton] = React.useState<boolean>(false);

	const [loading, setLoading] = React.useState<boolean>(true);
	const [errors, setErrors] = React.useState<ErrorIdentifier[]>([]);

	const [displayModal, setDisplayModal] = React.useState<boolean>(false);
	const [modalType, setModalType] = React.useState<Section>(Section.CommandInfo);
	const [modalTitle, setModalTitle] = React.useState<string>('');
	const [commandToEdit, setCommandToEdit] = React.useState<LabPracticeCommandInfo>(initialPracticeValue.command);
	const [parameterToEdit, setParameterToEdit] = React.useState<LabPracticeParameterInfo>(
		initialPracticeValue.parameter
	);
	const [outputToEdit, setOutputToEdit] = React.useState<OutputInfo>(initialPracticeValue.output);

	const [downloadingGuideFile, setDownloadingGuideFile] = React.useState<boolean>(false);
	const [guideFile, setGuideFile] = React.useState<File | null>(null);

	const location = useLocation();
	const labPracticeId = (location.state as LocationState)?.labPracticeId;
	const labName = (location.state as LocationState)?.labName;

	const {data: practiceInfoDb} = useGetLabPracticeQuery({variables: {id: labPracticeId}, fetchPolicy: 'network-only'});
	const {data: labCommandsDataDb} = useListLabPracticeCommandsQuery({
		variables: {id: labPracticeId},
		fetchPolicy: 'network-only'
	});
	const {data: practiceOutputsDb} = useListLabPracticeOutputsQuery({
		variables: {id: labPracticeId},
		fetchPolicy: 'network-only'
	});

	const [deleteLabPracticeCommand] = useDeleteLabPracticeCommandMutation({});
	const [deleteLabPracticeParameter] = useDeleteLabPracticeParameterMutation({});
	const [deleteLabPracticeOutput] = useDeleteLabPracticeOutputMutation({});

	const [updateLabPractice] = useUpdateLabPracticeMutation({});
	const [updateLabPracticeCommand] = useUpdateLabPracticeCommandMutation({});
	const [updateLabPracticeParameter] = useUpdateLabPracticeParameterMutation({});
	const [updateLabPracticeOutput] = useUpdateLabPracticeOutputMutation({});

	const [createLabPracticeCommand] = useCreateLabPracticeCommandMutation({});
	const [createLabPracticeParameter] = useCreateLabPracticeParameterMutation({});
	const [createLabPracticeOutput] = useCreateLabPracticeOutputMutation({});

	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	// Load practice info
	React.useEffect(() => {
		if (practiceInfoDb?.getLabPractice) {
			setLoading(true);
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
				practiceGuideS3Path: practiceInfoDb?.getLabPractice.guideS3Path ?? '',
				version: practiceInfoDb.getLabPractice._version,
				deviceId: practiceInfoDb.getLabPractice.LabPracticeDeviceId
			};
			setLoading(false);
			setPracticeInfo(practice);
		}
	}, [practiceInfoDb]);

	// Load commands and parameters info
	React.useEffect(() => {
		if (labCommandsDataDb?.listLabPracticeCommands?.items != null && !paramsAlreadyIn) {
			setLoading(true);
			setParamsAlreadyIn(true);

			setCommandsList(() => {
				const tempCommands: LabPracticeCommandInfo[] = [];
				labCommandsDataDb?.listLabPracticeCommands?.items.forEach((command) => {
					if (!command?._deleted) {
						tempCommands.push({
							id: command?.id as string,
							commandName: command?.name as string,
							commandDescription: command?.description ? command?.description : '',
							commandLabel: (command?.labelName ?? command?.labelName) as string,
							version: command?._version,
							action: ActionType.Nothing,
							order: command?.order ?? 0
						});
					}
				});
				return _.orderBy(tempCommands, 'order', 'asc');
			});

			setParametersList(() => {
				const parametersList: LabPracticeParameterInfo[] = [];
				labCommandsDataDb?.listLabPracticeCommands?.items.map((command) => {
					if (!command?._deleted && command?.LabPracticeParameters) {
						command?.LabPracticeParameters.items.forEach((parameter) => {
							if (parameter && !parameter._deleted) {
								parametersList.push({
									commandId: command?.id,
									commandName: command?.name,
									id: parameter?.id,
									parameterName: parameter?.name ? parameter?.name : '',
									parameterDescription: parameter?.description ? parameter?.description : '',
									parameterDefaultValue: parameter?.defaultValue ? parameter?.defaultValue : '',
									parameterMaxValue: parameter?.maxValue !== null ? parameter?.maxValue : 9999,
									parameterMinValue: parameter?.minValue !== null? parameter?.minValue : -9999,
									parameterRegex: parameter?.regex ? parameter?.regex : '',
									version: parameter._version,
									action: ActionType.Nothing
								});
							}
						});
					}
				});
				return parametersList;
			});

			setLoading(false);
		}
	}, [labCommandsDataDb]);

	// Load outputs info
	React.useEffect(() => {
		if (practiceOutputsDb?.listLabPracticeOutputs?.items != null && !outputsAlreadyIn) {
			setOutputsAlreadyIn(true);

			setOutputsList(() => {
				const outputs: OutputInfo[] = [];
				practiceOutputsDb?.listLabPracticeOutputs?.items.forEach((output) => {
					if (!output?._deleted) {
						outputs.push({
							id: output?.id,
							outputName: output?.name ? output?.name : '',
							outputDescription: output?.description ? output?.description : '',
							outputUnit: output?.units ? output?.units : null,
							outputType: output?.outputType ? output?.outputType : '',
							version: output?._version,
							order: output?.order ?? 0
						});
					}
				});
				return _.orderBy(outputs, 'order', 'asc');
			});
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
				case Params.DeviceId:
					return {...previousState, deviceId: value};
				case Params.Duration:
					return {...previousState, practiceInfoDuration: value.length > 0 && parseInt(value) > 0 ? value : '0'};
				case Params.PracticeGuideS3Path:
					return {...previousState, practiceGuideS3Path: value};
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
				case Params.CommandLabel:
					practice.command = {
						...practiceInfo.command,
						commandLabel: value
					};
					return {...previousState, command: practice.command};
				case Params.Order:
					practice.command = {
						...practiceInfo.command,
						order: parseInt(value) > 0 ? parseInt(value) : 1
					};
					return {...previousState, command: practice.command};
				case Params.SelectedCommand:
					practice.parameter = {
						...practiceInfo.parameter,
						commandName: value
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
						parameterMaxValue: parseInt(value)
					};
					return {...previousState, parameter: practice.parameter};
				case Params.ParameterMinValue:
					practice.parameter = {
						...practiceInfo.parameter,
						parameterMinValue: parseInt(value)
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
				case Params.OutputOrder:
					practice.output = {
						...practiceInfo.output,
						order: parseInt(value) > 0 ? parseInt(value) : 1
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
					...command,
					action: ActionType.Add
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
						(parameter) => parameter.commandName === commandsList[index].commandName
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
			parameter.commandName.length > 0 &&
			parameter.parameterName.length > 0 &&
			parameter.parameterDefaultValue.length > 0
		) {
			setParametersList((previousState) => {
				const newParameter: LabPracticeParameterInfo = {
					commandName: parameter.commandName,
					parameterName: parameter.parameterName,
					parameterDescription: parameter.parameterDescription,
					parameterDefaultValue: parameter.parameterDefaultValue,
					parameterMaxValue: parameter.parameterMaxValue,
					parameterMinValue: parameter.parameterMinValue,
					parameterRegex: parameter.parameterRegex,
					action: ActionType.Add
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
					outputType: output.outputType,
					order: output.order
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

			//Cargar guia a S3
			if (guideFile) {
				try {
					await Storage.put(guideFile.name, guideFile);
					practiceChange(guideFile.name, 'practiceGuideS3Path');
				} catch (e) {
					console.error('Error uploading guide to S3', e);
				}
			}

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
							LabPracticeDeviceId: practiceInfo.deviceId,
							guideS3Path: guideFile?.name,
							createdBy: '1',
							_version: practiceInfo.version
						}
					}
				});
				practiceInfo.practiceGuideS3Path = guideFile?.name ?? '';
				setPracticeInfo(practiceInfo);

				if (!labPracticeData?.updateLabPractice?.id) {
					throw Error('');
				}

				const practiceId = labPracticeData.updateLabPractice?.id;

				if (!practiceId) {
					return;
				}

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				if (commandsList.length > 0) {
					commandsList.map(async (command) => {
						if (command.id) {
							// Actualizar comando
							await updateLabPracticeCommand({
								variables: {
									input: {
										id: command.id ? command.id : '',
										name: command.commandName,
										description: command.commandDescription,
										labelName: command.commandLabel,
										order: command.order,
										updatedBy: '1',
										_version: command.version
									}
								}
							}).then((responseCommandData) => {
								const commandId = responseCommandData?.data?.updateLabPracticeCommand?.id;
								const commandName = responseCommandData?.data?.updateLabPracticeCommand?.name;

								if (parametersList.length > 0) {
									parametersList.map(async (parameter) => {
										if (!parameter.id && parameter.commandName === commandName) {
											// Crear nuevo parámetro
											await createLabPracticeParameter({
												variables: {
													input: {
														id: parameter.id,
														labpracticecommandID: commandId,
														labpracticeID: practiceId,
														name: parameter.parameterName,
														labelName: parameter.parameterName,
														description: parameter.parameterDescription,
														defaultValue: parameter.parameterDefaultValue,
														minValue: parameter.parameterMinValue,
														maxValue: parameter.parameterMaxValue,
														regex: parameter.parameterRegex,
														createdBy: '1'
													}
												}
											});
										} else if (parameter.id && parameter.commandName === commandName) {
											console.log(parameter.parameterMinValue)
											// Actualizar parámetro
											await updateLabPracticeParameter({
												variables: {
													input: {
														id: parameter.id ? parameter.id : '',
														labpracticecommandID: commandId,
														labpracticeID: practiceInfo.id,
														name: parameter.parameterName,
														labelName: parameter.parameterName,
														description: parameter.parameterDescription,
														defaultValue: parameter.parameterDefaultValue,
														minValue: parameter.parameterMinValue,
														maxValue: parameter.parameterMaxValue,
														regex: parameter.parameterRegex,
														updatedBy: '1',
														_version: parameter.version
													}
												}
											});
										}
									});
								}
							});
						} else {
							// Crear nuevo comando
							await createLabPracticeCommand({
								variables: {
									input: {
										labpracticeID: practiceId,
										name: command.commandName,
										description: command.commandDescription,
										labelName: command.commandLabel,
										createdBy: '1',
										order: command.order
									}
								}
							}).then((responseCommandData) => {
								const commandId = responseCommandData?.data?.createLabPracticeCommand?.id;
								const commandName = responseCommandData?.data?.createLabPracticeCommand?.name;

								if (parametersList.length > 0) {
									parametersList.map(async (parameter) => {
										if (!parameter.id && parameter.commandName === commandName) {
											// Crear nuevo parámetro
											createLabPracticeParameter({
												variables: {
													input: {
														labpracticecommandID: commandId,
														labpracticeID: labPracticeData.updateLabPractice?.id,
														name: parameter.parameterName,
														description: parameter.parameterDescription,
														defaultValue: parameter.parameterDefaultValue,
														minValue: parameter.parameterMinValue,
														maxValue: parameter.parameterMaxValue,
														regex: parameter.parameterRegex,
														createdBy: '1'
													}
												}
											});
										} else if (parameter.id && parameter.commandName === commandName) {
											// Actualizar parámetro
											await updateLabPracticeParameter({
												variables: {
													input: {
														id: parameter.id,
														labpracticecommandID: commandId,
														labpracticeID: labPracticeData.updateLabPractice?.id,
														name: parameter.parameterName,
														description: parameter.parameterDescription,
														defaultValue: parameter.parameterDefaultValue,
														minValue: parameter.parameterMinValue,
														maxValue: parameter.parameterMaxValue,
														regex: parameter.parameterRegex,
														updatedBy: '1',
														_version: parameter.version
													}
												}
											});
										}
									});
								}
							});
						}
					});
				}
				if (outputsList.length > 0) {
					outputsList.map(async (output) => {

						if (!output.id) {
							await createLabPracticeOutput({
								variables: {
									input: {
										labpracticeID: practiceId,
										outputType: 'string',
										name: output.outputName,
										description: output.outputDescription,
										units: output.outputUnit,
										createdBy: '1',
										order: output.order
									}
								}
							});
						} else {
							await updateLabPracticeOutput({
								variables: {
									input: {
										id: output.id,
										labpracticeID: practiceId,
										outputType: 'string',
										name: output.outputName,
										description: output.outputDescription,
										units: output.outputUnit,
										updatedBy: '1',
										_version: output.version,
										order: output.order
									}
								}
							});
						}
					});
				}

				showSuccessBanner(`La práctica ${practiceInfo.practiceInfoName} fue actualizada exitosamente`);
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
				if (!notCommandSelected && practiceInfo.parameter.commandName.length === 0) {
					previousState.push({
						identifier: Params.SelectedCommand
					});
				} else if (notCommandSelected && practiceInfo.parameter.commandName.length > 0) {
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
					case Params.CommandLabel:
						return {...previousState, commandLabel: value};
					case Params.Order:
						return {...previousState, order: parseInt(value)};
					default:
						return previousState;
				}
			});
		} else if (parameter) {
			setParameterToEdit((previousState) => {
				switch (param) {
					case Params.SelectedCommand:
						return {...previousState, commandName: value};
					case Params.ParameterName:
						return {...previousState, parameterName: value};
					case Params.ParameterDescription:
						return {...previousState, parameterDescription: value};
					case Params.ParameterDefaultValue:
						return {...previousState, parameterDefaultValue: value};
					case Params.ParameterMinValue:
						return {...previousState, parameterMinValue: value == '0' ? 0 : parseInt(value)};
					case Params.ParameterMaxValue:
						return {...previousState, parameterMaxValue: value == '0' ? 0 : parseInt(value)};
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
					case Params.OutputOrder:
						return {...previousState, order: parseInt(value)};
					default:
						return previousState;
				}
			});
		}
	};

	const handleSaveEdit = async () => {
		// Edición de comando
		if (modalType === Section.ModalCommandInfo) {
			checkErrorMessage(Section.ModalCommandInfo);

			if (commandToEdit.commandName !== '') {
				setLoadingButton(true);
				setCommandsList((previousState) => {
					const updatedCommand = previousState[rowIndex];
					previousState.map((obj) => {
						if (obj.commandName === updatedCommand.commandName) {
							obj.commandName = commandToEdit.commandName;
							obj.commandLabel = commandToEdit.commandLabel;
							obj.commandDescription = commandToEdit.commandDescription;
							obj.updatedBy = commandToEdit.updatedBy;
							obj.updatedAt = commandToEdit.updatedAt;
							obj.action = ActionType.Edit;
							obj.order = commandToEdit.order;
						}
					});
					return previousState;
				});
				setParametersList((previousState) => {
					previousState.map((obj) => {
						if (obj.commandId === commandToEdit.id) {
							obj.commandName = commandToEdit.commandName;
						}
					});

					return previousState;
				});
				setCommandToEdit(initialPracticeValue.command);
				setDisplayModal(false);
				setLoadingButton(false);
			}
		}

		// Edición de parámetro
		if (modalType === Section.ParameterInfo) {
			checkErrorMessage(Section.ModalParameterInfo);
			if (
				parameterToEdit.parameterName !== '' &&
				parameterToEdit.commandName.length > 0 &&
				parameterToEdit.parameterDefaultValue.length > 0
			) {
				setLoadingButton(true);
				setParametersList((previousState) => {
					const updatedParameter = previousState[rowIndex];
					previousState.map((obj) => {
						if (obj.parameterName === updatedParameter.parameterName) {
							obj.id = parameterToEdit.id;
							obj.commandName = parameterToEdit.commandName;
							obj.parameterName = parameterToEdit.parameterName;
							obj.parameterDescription = parameterToEdit.parameterDescription;
							obj.parameterDefaultValue = parameterToEdit.parameterDefaultValue;
							obj.parameterMinValue = parameterToEdit.parameterMinValue;
							obj.parameterMaxValue = parameterToEdit.parameterMaxValue;
							obj.parameterRegex = parameterToEdit.parameterRegex;
							obj.version = parameterToEdit.version;
							obj.action = ActionType.Edit;
						}
					});
					return previousState;
				});

				setParameterToEdit(initialPracticeValue.parameter);
				setDisplayModal(false);
				setLoadingButton(false);
			}
		}

		// Edición de parámetro de salida
		if (modalType === Section.OutputInfo) {
			if (outputToEdit.outputName.length > 0) {
				setOutputsList((previousState) => {
					const output = previousState[rowIndex];
					previousState.map((obj) => {
						if (obj.outputName === output.outputName) {
							obj.outputName = outputToEdit.outputName;
							obj.outputDescription = outputToEdit.outputDescription;
							obj.outputUnit = outputToEdit.outputUnit;
							obj.order = outputToEdit.order;
						}
					});
					return previousState;
				});
				setOutputToEdit(initialPracticeValue.output);
				setDisplayModal(false);
			}
		}

		// Borrar comando
		if (modalType === Section.CommandModalRemove) {
			if (commandToRemove.id) {
				setLoadingButton(true);
				await deleteLabPracticeCommand({
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
							setLoadingButton(false);
						}
					})
					.catch((error) => {
						setDisplayModal(false);
						showErrorBanner(`No se pudo eliminar el comando ${commandToRemove.commandName}`);
						setLoadingButton(false);
					});
			} else {
				setCommandsList((previousState) => {
					return previousState.slice(0, rowIndex).concat(previousState.slice(rowIndex + 1, commandsList.length + 1));
				});
				setDisplayModal(false);
			}
		}

		// Borrar parámetro
		if (modalType === Section.ParameterModalRemove) {
			if (parameterToRemove.id) {
				setLoadingButton(true);
				await deleteLabPracticeParameter({
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
							setLoadingButton(false);
						}
					})
					.catch((error) => {
						setDisplayModal(false);
						showErrorBanner(`No se pudo eliminar el parámetro ${parameterToRemove.parameterName}`);
						setLoadingButton(false);
					});
			} else {
				setParametersList((previousState) => {
					return previousState.slice(0, rowIndex).concat(previousState.slice(rowIndex + 1, parametersList.length + 1));
				});
				setDisplayModal(false);
			}
		}

		// Borrar parámetro de salida
		if (modalType === Section.OutputModalRemove) {
			if (outputToRemove.id) {
				setLoadingButton(true);
				await deleteLabPracticeOutput({
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
							setLoadingButton(false);
						}
					})
					.catch((error) => {
						setDisplayModal(false);
						showErrorBanner(`No se pudo eliminar el parámetro de salida ${outputToRemove.outputName}`);
						setLoadingButton(false);
					});
			} else {
				setOutputsList((previousState) => {
					return previousState.slice(0, rowIndex).concat(previousState.slice(rowIndex + 1, outputsList.length + 1));
				});
				setDisplayModal(false);
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

	const handleGuideFileSelection = (file: File) => {
		setGuideFile(file);
	};

	const handleDownloadGuideFile = async () => {
		try {
			setDownloadingGuideFile(true);
			const data = await Storage.get(practiceInfo.practiceGuideS3Path, {download: true});
			if (data?.Body) {
				downloadBlob(data.Body as Blob, practiceInfo.practiceGuideS3Path);
			}
			setDownloadingGuideFile(false);
		} catch (e) {
			console.error('Error downloading S3 file', e);
		}
	};

	const downloadBlob = async (blob: Blob, filename: string) => {
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename || 'download';
		const clickHandler = () => {
			setTimeout(() => {
				URL.revokeObjectURL(url);
				a.removeEventListener('click', clickHandler);
			}, 150);
		};
		a.addEventListener('click', clickHandler, false);
		a.click();
		return a;
	};

	return (
		<>
			{
				<ModalComponent
					display={displayModal}
					onDisplay={handleDisplayModal}
					onSave={handleSaveEdit}
					title={modalTitle}
					loadingAccept={loadingButton}>
					{modalSection()}
				</ModalComponent>
			}
			<LoadingContainer loading={loading}>
				<LabPractice practice={practiceInfo} labName={labName} onValueChange={practiceChange} errors={errors} />

				<LabPracticeGuide
					guideFileName={practiceInfo.practiceGuideS3Path}
					onFileSelected={(file) => handleGuideFileSelection(file)}
					onFileDownload={handleDownloadGuideFile}
					fileDownloadEnabled={practiceInfo?.practiceGuideS3Path ? true : false}
					downloadingFile={downloadingGuideFile}
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
