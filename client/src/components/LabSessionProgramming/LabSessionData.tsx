import React from 'react';

import {LabSessionInfo} from '../../containers/LabSessionProgrammingView/types';
import {Input, DateTimePickerComponent, TextLabel} from '../UI';
import classes from './shared.module.scss';

interface Props {
	sessionInfo: LabSessionInfo;
	onDescriptionChange: (value: string) => void;
	onStartDateChange: (value: Date) => void;
}

const LabSessionData: React.FC<Props> = ({sessionInfo, onDescriptionChange, onStartDateChange}) => {
	return (
		<>
			<h3 className="title">Programación sesión Laboratorio de {sessionInfo.labPractice?.name}</h3>
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
					value={new Date(sessionInfo.startDate)}
				/>
        <TextLabel
					placeholder="Duración"
					value={sessionInfo.labPractice?.duration ?? ''}
          unit={"minutos"}
				/>
			</div>
		</>
	);
};

export default LabSessionData;
