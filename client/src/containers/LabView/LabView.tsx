import React from 'react';

import {LabTitle, Commands, LabOutputs} from '../../components/Lab';
import {Command} from '../../components/Lab/Commands';
import {LoadingContainer} from '../../components/UI/index';
import dummyData from '../../dummyData/dummyData.json';
import {useGetLabPracticeQuery, useGetLabPracticeCommandQuery, Maybe} from '../../graphql/generated/schema';

const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';
const IINITIALCOMMANDNAME = 'cmd'

// REVISAR LOS TIPOS DE LOS PARÁMETROS
interface CommandListDto {
	id: Maybe<string>;
	name: Maybe<string>;
	parameters: ParameterDto | undefined | null;
}

// REVISAR LOS TIPOS DE LOS PARÁMETROS
interface ParameterDto {
	name: string | undefined | null;
	value: boolean | undefined | null;
}

const mapCommand = ({id, name, parameters: value}: CommandListDto): Command => {
	return {
		id,
		label: name,
		value
	};
};

const LabView: React.FC<unknown> = () => {
	const {data: practiceInfo, loading} = useGetLabPracticeQuery({variables: {id: PRACTICE_ID}});
	const {data: labCommandsData} = useGetLabPracticeCommandQuery();
	const [labCommands, setLabCommands] = React.useState<CommandListDto[]>([]);

	React.useEffect(() => {

		// REFACTORIZAR FUNCIÓN, TENIENDO EN CUENTA LOS TIPOS DE LOS
		// DE LOS PARÁMETROS RETORNADOS DESDE EL BE
		if (labCommandsData?.listLabPracticeCommands?.items != null) {
			const commands: CommandListDto[] = [];
			labCommandsData?.listLabPracticeCommands?.items.forEach((item) => {
				const name = item?.name;

				if(name && name.startsWith(IINITIALCOMMANDNAME)) {
					const id = item?.id;
					let parameter: ParameterDto = {name: null, value: null};
	
					item?.LabPracticeParameters?.items?.forEach((parameterItem) => {
						parameter = {
							name: parameterItem?.name,
							value: parameter.value
						};
					});
	
					commands.push({
						id,
						name,
						parameters: parameter
					});
				}
			});

			setLabCommands(commands);
		}
	}, [labCommandsData]);

	const handleCommandChange = (value: boolean, id: string) => {
		const newCommands: CommandListDto[] = labCommands.map((item) => {
			if (item.id === id) {
				item.parameters = {
					name: item.parameters?.name,
					value: value
				};
			} else {
				if (value === true) {
					// change other params to false
					item.parameters = {
						name: item.parameters?.name,
						value: !value
					};
				}
			}
			return item;
		});

		setLabCommands(newCommands);
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
