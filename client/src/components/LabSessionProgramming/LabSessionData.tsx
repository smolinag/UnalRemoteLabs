import React from 'react';

import {LabSessionInfo, LabPracticeInfo} from '../../containers/LabSessionProgrammingView/types';
import {Input, DateTimePickerComponent, TextLabel} from '../UI';
import classes from './shared.module.scss';

interface Props {
	practiceInfo: LabPracticeInfo;
	sessionInfo: LabSessionInfo;
	onDescriptionChange: (value: string) => void;
	onStartDateChange: (value: Date) => void;
}

const LabSessionData: React.FC<Props> = ({practiceInfo, sessionInfo, onDescriptionChange, onStartDateChange}) => {
	return (
		<>
			<h3 className="title">Programación sesión Laboratorio de {practiceInfo.name}</h3>
			<div className={classes.options}>
				<Input
					type="text"
					placeholder="Descripción"
					value={sessionInfo.description ?? ''}
					onValueChange={(value) => onDescriptionChange(value)}
				/>
				<DateTimePickerComponent
					placeholder={'Fecha inicio'}
					onValueChange={(value: Date) => onStartDateChange(value)}
					value={sessionInfo.startDate}
					minDate={new Date()}
				/>
        <TextLabel
					placeholder="Duración"
					value={practiceInfo.duration ?? ''}
          unit={"minutos"}
				/>
			</div>
		</>
	);
};

export default LabSessionData;
