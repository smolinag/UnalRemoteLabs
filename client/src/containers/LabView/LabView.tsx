import React from 'react';

import {LabTitle, Commands, LabOutputs} from '../../components/Lab';
import {Command} from '../../components/Lab/Commands';
import {LoadingContainer} from '../../components/UI/index';
import dummyData from '../../dummyData/dummyData.json';
import {useGetLabPracticeQuery} from '../../graphql/generated/schema';

const PRACTICE_ID = '7f735a8d-2d46-466f-a40e-49a32d891654';

interface CommandListDto {
	name: string;
	parameter: string;
	type: string;
	value: boolean;
}

const mapCommand = ({name, parameter, value}: CommandListDto): Command => {
	return {
		id: parameter,
		label: name,
		value
	};
};

const DUMMY_COMMAND_LIST = dummyData[0].commandlist;

const LabView: React.FC<unknown> = () => {
	const {data: practiceInfo, loading} = useGetLabPracticeQuery({variables: {id: PRACTICE_ID}});

	return (
		<LoadingContainer loading={loading}>
			<LabTitle
				name={practiceInfo?.getLabPractice?.name}
				description={practiceInfo?.getLabPractice?.description}
				duration={practiceInfo?.getLabPractice?.duration}
			/>
			<Commands commands={DUMMY_COMMAND_LIST.map(mapCommand)} />
			<LabOutputs data={dummyData[0].data as [string, string][]} />
		</LoadingContainer>
	);
};

export default LabView;
