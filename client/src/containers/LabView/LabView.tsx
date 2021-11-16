import React, {useState, useEffect} from 'react';

import {LabTitle, Commands, LabOutputs} from '../../components/Lab';
import {Command, ParameterDto} from '../../components/Lab/Commands';
import {LoadingContainer} from '../../components/UI/index';
import dummyData from '../../dummyData/dummyData.json';
import {
	useGetLabPracticeQuery,
	useGetLabPracticeCommandQuery,
	useUpdateLabPracticeSessionCommandMutation,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	useOnUpdateLabPracticeSessionCommandSubscription,
	// GetLabPracticeSessionCommandDocument,
	// GetLabPracticeSessionCommandQuery,
	// CreateLabPracticeSessionCommandInput,
	Maybe
} from '../../graphql/generated/schema';

const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';
const COMMAND_NAME_PREFIX = 'cmd';

// REVISAR LOS TIPOS DE LOS PARÁMETROS
interface CommandListDto {
	id: Maybe<string>;
	name: Maybe<string>;
	parameters: ParameterDto | undefined | null;
}

const mapCommand = ({id, name, parameters}: CommandListDto): Command => {
	return {
		id,
		label: name,
		parameters
	};
};

const LabView: React.FC<unknown> = () => {
	const [labCommands, setLabCommands] = useState<CommandListDto[]>([]);
	// TODO Deberiamos pasar esto a context?
	const [labPracticeSessionId, setLabPracticeSessionId] = useState<string>();

	const {data: practiceInfo, loading} = useGetLabPracticeQuery({variables: {id: PRACTICE_ID}});
	const {data: labCommandsData} = useGetLabPracticeCommandQuery();
	const [updateLabPracticeSessionCommand] = useUpdateLabPracticeSessionCommandMutation({});
	const {data: updatedSessionCommands} = useOnUpdateLabPracticeSessionCommandSubscription();

	useEffect(() => {
		// REFACTORIZAR FUNCIÓN, TENIENDO EN CUENTA LOS TIPOS DE LOS
		// DE LOS PARÁMETROS RETORNADOS DESDE EL BE
		if (labCommandsData?.listLabPracticeCommands?.items != null) {
			const commands: CommandListDto[] = labCommandsData.listLabPracticeCommands.items
				.filter(({name}) => name && name.startsWith(COMMAND_NAME_PREFIX))
				.map((command) => {
					const parameter = command.LabPracticeParameters?.items[0];
					return {
						name: command.name as string,
						id: command.id,
						parameters: {name: parameter?.name, id: parameter?.id as string, value: false}
					};
				});

			setLabCommands(commands);
		}
	}, [labCommandsData]);

	useEffect(() => {
		const sessionData = practiceInfo?.getLabPractice?.LabPracticeSessions?.items[0];
		if (sessionData) {
			setLabPracticeSessionId(sessionData.id);
		}
	}, [practiceInfo]);

	useEffect(() => {
		console.warn(updatedSessionCommands);
	}, [updatedSessionCommands]);

	const handleCommandChange = async (parameters: ParameterDto, id: string) => {
		updateLabPracticeSessionCommand({
			variables: {
				input: {
					labpracticesessionID: labPracticeSessionId,
					labpracticecommandID: id,
					parameters: JSON.stringify(parameters),
					status: 'pending'
				}
			}
		});
	};

	return (
		<LoadingContainer loading={loading}>
			<LabTitle
				name={practiceInfo?.getLabPractice?.name}
				description={practiceInfo?.getLabPractice?.description}
				duration={practiceInfo?.getLabPractice?.duration}
			/>

			<Commands commands={labCommands.map(mapCommand)} onCommandChange={handleCommandChange} />
			<LabOutputs data={dummyData[0].data as [string, string][]} />
		</LoadingContainer>
	);
};

export default LabView;
