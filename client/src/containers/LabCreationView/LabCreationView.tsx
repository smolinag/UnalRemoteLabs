import React, {useContext} from 'react';
import Row from 'react-bootstrap/Row';

import {
	LabPractice,
	LabPracticeCommand,
	LabPracticeCommandTable,
	LabPracticeParameters,
	LabPracticeParametersTable,
	LabPracticeOutput,
	LabPracticeOutputTable
} from '../../components/LabCreation';
import {Button, LoadingContainer, ModalComponent} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {
	useListLaboratoriesQuery,
	useCreateLabPracticeMutation,
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
	LaboratoryInfo
} from './types';

// const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';

const initialPracticeValue: LabPracticeInfo = {
	laboratoryId: '',
	practiceInfoName: '',
	practiceInfoDescription: '',
	practiceInfoDuration: '0',
	command: {
		commandName: '',
		commandDescription: ''
	},
	parameter: {
		selectedCommandName: '',
		parameterName: '',
		parameterDescription: '',
		parameterDefaultValue: '',
		parameterUnit: '',
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

const LabCreationView: React.FC<unknown> = () => {
	const [practiceInfo, setPracticeInfo] = React.useState<LabPracticeInfo>(initialPracticeValue);
	const [commandsList, setCommandsList] = React.useState<LabPracticeCommandInfo[]>([]);
	const [parametersList, setParametersList] = React.useState<LabPracticeParameterInfo[]>([]);
	const [outputsList, setOutputsList] = React.useState<OutputInfo[]>([]);
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

	const {data: laboratoriesList} = useListLaboratoriesQuery();
	const [createLabPractice] = useCreateLabPracticeMutation({});
	const [createLabPracticeCommand] = useCreateLabPracticeCommandMutation({});
	const [createLabPracticeParameter] = useCreateLabPracticeParameterMutation({});
	const [createLabPracticeOutput] = useCreateLabPracticeOutputMutation({});
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	React.useEffect(() => {
		const labs = laboratoriesList?.listLaboratorys?.items;
		if (labs) {
			setLaboratories(
				labs.map((obj) => {
					return {id: obj.id, name: obj.name};
				})
			);
		}
	}, [laboratoriesList]);

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
				case Params.ParameterUnit:
					practice.parameter = {
						...practiceInfo.parameter,
						parameterUnit: value
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
				setCommandsList((previousState) => {
					return previousState.slice(0, index).concat(previousState.slice(index + 1, commandsList.length + 1));
				});
				break;
			case Action.Edit:
				setDisplayModal(true);
				setModalType(Section.CommandInfo);
				setModalTitle(`Commando: ${commandsList[index].commandName}`);
				setCommandToEdit(commandsList[index]);
				rowIndex = index;
				break;
		}
	};

	const handleDisplayModal = (display: boolean) => {
		setDisplayModal(display);
		setCommandToEdit(initialPracticeValue.command);
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
					parameterUnit: parameter.parameterUnit,
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
				setParametersList((previousState) => {
					return previousState.slice(0, index).concat(previousState.slice(index + 1, commandsList.length + 1));
				});
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
				setOutputsList((previousState) => {
					return previousState.slice(0, index).concat(previousState.slice(index + 1, outputsList.length + 1));
				});
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

	const createPractice = async () => {
		checkErrorMessage(Section.PracticeInfo);

		console.warn(errors)

		if (errors.length === 0) {
			setLoading(true);

			try {
				const {data: labPracticeData} = await createLabPractice({
					variables: {
						input: {
							laboratoryID: practiceInfo.laboratoryId,
							name: practiceInfo.practiceInfoName,
							description: practiceInfo.practiceInfoDescription,
							duration: parseInt(practiceInfo.practiceInfoDuration),
							createdBy: '1'
						}
					}
				});

				if (!labPracticeData?.createLabPractice?.id) {
					throw Error('');
				}

				const practiceId = labPracticeData.createLabPractice?.id;

				if (!practiceId) {
					return;
				}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const creationPromises: Promise<any>[] = [];
				if (commandsList.length > 0) {
					creationPromises.concat(
						commandsList.map((command) =>
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
											if (parameter.selectedCommandName === commandName) {
												createLabPracticeParameter({
													variables: {
														input: {
															labpracticecommandID: commandId,
															labpracticeID: labPracticeData.createLabPractice?.id,
															name: parameter.parameterName,
															description: parameter.parameterDescription,
															defaultValue: parameter.parameterDefaultValue,
															minValue: parseInt(parameter.parameterMinValue),
															maxValue: parseInt(parameter.parameterMaxValue),
															regex: parameter.parameterRegex
														}
													}
												});
											}
										})
									);
								}
							})
						)
					);
				}
				if (outputsList.length > 0) {
					creationPromises.concat(
						outputsList.map(async (obj) =>
							createLabPracticeOutput({
								variables: {
									input: {
										labpracticeID: practiceId,
										outputType: 'string',
										name: obj.outputName,
										description: obj.outputDescription,
										units: JSON.stringify(obj.outputUnit),
										createdBy: '1'
									}
								}
							})
						)
					);
				}

				await Promise.all(creationPromises);
				showSuccessBanner(`La práctica ${labPracticeData.createLabPractice.name} fue creada exitosamente`);
			} catch (error) {
				showErrorBanner(`Error en la creación de la práctica ${practiceInfo.practiceInfoName}`);
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
					case Params.ParameterUnit:
						return {...previousState, parameterUnit: value};
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
		if (modalType === Section.CommandInfo) {
			if (commandToEdit.commandName !== '') {
				setCommandsList((previousState) => {
					const command = previousState[rowIndex];

					previousState.map((obj) => {
						if (obj.commandName === command.commandName) {
							(obj.commandName = commandToEdit.commandName),
								(obj.commandDescription = commandToEdit.commandDescription);
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
							obj.parameterUnit = parameterToEdit.parameterUnit;
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
	};

	const modalSection = () => {
		switch (modalType) {
			case Section.CommandInfo:
				return <LabPracticeCommand command={commandToEdit} onValueEdit={editInformation} errors={errors} />;
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
					title={modalTitle}>
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
						<Button loading={loading} onClick={createPractice}>
							Guardar
						</Button>
					</div>
				</Row>
			</LoadingContainer>
		</>
	);
};

export default LabCreationView;
