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
import {Button, LoadingContainer} from '../../components/UI';
import {Action} from '../../components/UI/Table/Table';
import {
	useOnCreateLabPracticeMutation,
	useOnCreateLabPracticeCommandMutation,
	useOnCreateLabPracticeParameterMutation,
	useOnCreateLabPracticeOutputMutation
} from '../../graphql/generated/schema';
import {notificationBannerContext} from '../../state/NotificationBannerProvider';
import classes from './LabCreationView.module.scss';
import {Identifier, OutputInfo, LabPracticeCommandInfo, LabPracticeParameterInfo, LabPracticeInfo} from './types';

const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';

const initialPracticeValue: LabPracticeInfo = {
	practiceInfoName: '',
	practiceInfoDescription: '',
	practiceInfoDuration: '',
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
		outputUnit: ''
	}
};

const LabCreationView: React.FC<unknown> = () => {
	// const [practice] = React.useReducer(reducer, initialCommand);
	const [practiceInfo, setPracticeInfo] = React.useState<LabPracticeInfo>(initialPracticeValue);
	const [commandsList, setCommandsList] = React.useState<LabPracticeCommandInfo[]>([]);
	const [parametersList, setParametersList] = React.useState<LabPracticeParameterInfo[]>([]);
	const [outputsList, setOutputsList] = React.useState<OutputInfo[]>([]);
	const [loading, setLoading] = React.useState<boolean>(false);

	const [createLabPractice] = useOnCreateLabPracticeMutation({});
	const [createLabPracticeCommand] = useOnCreateLabPracticeCommandMutation({});
	const [createLabPracticeParameter] = useOnCreateLabPracticeParameterMutation({});
	const [createLabPracticeOutput] = useOnCreateLabPracticeOutputMutation({});
	const {showErrorBanner, showSuccessBanner} = useContext(notificationBannerContext);

	const practiceChange = (value: string, id: string) => {
		const practice1: LabPracticeInfo = {
			...practiceInfo
		};
		setPracticeInfo((previousState) => {
			switch (id) {
				case Identifier.Name:
					return {...previousState, practiceInfoName: value};
				case Identifier.Description:
					return {...previousState, practiceInfoDescription: value};
				case Identifier.Duration:
					return {...previousState, practiceInfoDuration: value};
				case Identifier.CommandName:
					practice1.command = {
						...practiceInfo.command,
						commandName: value
					};
					return {...previousState, command: practice1.command};
				case Identifier.CommandDescription:
					practice1.command = {
						...practiceInfo.command,
						commandDescription: value
					};
					return {...previousState, command: practice1.command};
				case Identifier.SelectedCommand:
					practice1.parameter = {
						...practiceInfo.parameter,
						selectedCommandName: value
					};
					return {...previousState, parameter: practice1.parameter};
				case Identifier.ParameterName:
					practice1.parameter = {
						...practiceInfo.parameter,
						parameterName: value
					};
					return {...previousState, parameter: practice1.parameter};
				case Identifier.ParameterDescription:
					practice1.parameter = {
						...practiceInfo.parameter,
						parameterDescription: value
					};
					return {...previousState, parameter: practice1.parameter};
				case Identifier.ParameterDefaultValue:
					practice1.parameter = {
						...practiceInfo.parameter,
						parameterDefaultValue: value
					};
					return {...previousState, parameter: practice1.parameter};
				case Identifier.ParameterUnit:
					practice1.parameter = {
						...practiceInfo.parameter,
						parameterUnit: value
					};
					return {...previousState, parameter: practice1.parameter};
				case Identifier.ParameterMaxValue:
					practice1.parameter = {
						...practiceInfo.parameter,
						parameterMaxValue: value
					};
					return {...previousState, parameter: practice1.parameter};
				case Identifier.ParameterMinValue:
					practice1.parameter = {
						...practiceInfo.parameter,
						parameterMinValue: value
					};
					return {...previousState, parameter: practice1.parameter};
				case Identifier.ParameterRegex:
					practice1.parameter = {
						...practiceInfo.parameter,
						parameterRegex: value
					};
					return {...previousState, parameter: practice1.parameter};
				case Identifier.OutputName:
					practice1.output = {
						...practiceInfo.output,
						outputName: value
					};
					return {...previousState, output: practice1.output};
				case Identifier.OutputDescription:
					practice1.output = {
						...practiceInfo.output,
						outputDescription: value
					};
					return {...previousState, output: practice1.output};
				case Identifier.OutputUnit:
					practice1.output = {
						...practiceInfo.output,
						outputUnit: value
					};
					return {...previousState, output: practice1.output};
				default:
					return previousState;
			}
		});
	};

	const addCommand = (command: LabPracticeCommandInfo): void => {
		setCommandsList((previousState) => {
			const newCommand: LabPracticeCommandInfo = {
				commandName: command.commandName,
				commandDescription: command.commandDescription
			};

			return previousState.concat(newCommand);
		});

		setPracticeInfo((previousState) => {
			const command: LabPracticeCommandInfo = {
				commandName: '',
				commandDescription: ''
			};
			return {...previousState, command: command};
		});
	};

	const handleCommandAction = (index: number, action: Action) => {
		switch (action) {
			case Action.Delete:
				setCommandsList((previousState) => {
					return previousState.slice(0, index).concat(previousState.slice(index + 1, commandsList.length + 1));
				});
				break;
		}
	};

	const handleParameterAction = (index: number, action: Action) => {
		switch (action) {
			case Action.Delete:
				setParametersList((previousState) => {
					return previousState.slice(0, index).concat(previousState.slice(index + 1, commandsList.length + 1));
				});
				break;
		}
	};

	const addParameter = (parameter: LabPracticeParameterInfo): void => {
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
			const parameter: LabPracticeParameterInfo = {
				selectedCommandName: '',
				parameterName: '',
				parameterDescription: '',
				parameterDefaultValue: '',
				parameterUnit: '',
				parameterMaxValue: '',
				parameterMinValue: '',
				parameterRegex: ''
			};
			return {...previousState, parameter: parameter};
		});
	};

	const addOutput = (output: OutputInfo): void => {
		setOutputsList((previousState) => {
			const newOutput: OutputInfo = {
				outputName: output.outputName,
				outputDescription: output.outputDescription,
				outputUnit: output.outputUnit
			};
			return previousState.concat(newOutput);
		});

		setPracticeInfo((previousState) => {
			const output: OutputInfo = {
				outputName: '',
				outputDescription: '',
				outputUnit: ''
			};
			return {...previousState, output: output};
		});
	};

	const createPractice = async () => {
		setLoading(true);

		try {
			const {data: labPracticeData} = await createLabPractice({
				variables: {
					input: {
						laboratoryID: PRACTICE_ID,
						name: practiceInfo.practiceInfoName,
						description: practiceInfo.practiceInfoDescription,
						duration: parseInt(practiceInfo.practiceInfoDuration)
					}
				}
			});

			if (!labPracticeData?.createLabPractice?.id) {
				throw Error('');
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const creationPromises: Promise<any>[] = [];
			if (commandsList.length > 0) {
				creationPromises.concat(
					commandsList.map((command) =>
						createLabPracticeCommand({
							variables: {
								input: {
									labpracticeID: labPracticeData.createLabPractice?.id,
									name: command.commandName,
									description: command.commandDescription
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
									labpracticeID: labPracticeData.createLabPractice?.id,
									// outputType: obj.outputType,
									name: obj.outputName,
									description: obj.outputDescription,
									units: JSON.stringify(obj.outputUnit)
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
	};

	return (
		<>
			<LoadingContainer loading={loading}>
				<LabPractice practice={practiceInfo} onValueChange={practiceChange} />

				<LabPracticeCommand command={practiceInfo.command} onValueChange={practiceChange} />
				<div className={classes.justifyCenter}>
					<Button loading={false} onClick={() => addCommand(practiceInfo.command)}>
						Añadir
					</Button>
				</div>
				{commandsList.length > 0 && <LabPracticeCommandTable data={commandsList} onAction={handleCommandAction} />}

				<LabPracticeParameters
					parameter={practiceInfo.parameter}
					commands={commandsList}
					onValueChange={practiceChange}
				/>
				<div className={classes.justifyCenter}>
					<Button loading={false} onClick={() => addParameter(practiceInfo.parameter)}>
						Añadir
					</Button>
				</div>
				{parametersList.length > 0 && (
					<LabPracticeParametersTable data={parametersList} onAction={handleParameterAction} />
				)}

				<LabPracticeOutput output={practiceInfo.output} onValueChange={practiceChange} />
				<div className={classes.justifyCenter}>
					<Button loading={false} onClick={() => addOutput(practiceInfo.output)}>
						Añadir
					</Button>
				</div>
				{outputsList.length > 0 && <LabPracticeOutputTable data={outputsList} />}

				<Row className="section">
					<div className={classes.justifyEnd}>
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
