export interface Laboratory {
   id: string;
   name: string;
   description: string;
   labPractice?: LabPracticeInfo;
}

export interface LabPracticeInfo {
   id: string,
	practiceInfoName: string;
	practiceInfoDescription: string;
	practiceInfoDuration: number;
   labPracticeSession?: LabPracticeSession;
   laboratory: Laboratory
}

export interface LabPracticeSession {
   id: string;
   startDate: string;
   endDate: string;
   labPracticeInfo: LabPracticeInfo
}

export interface UserLabPracticeSession {
   id: string;
   sessionStartDate: string;
   sessionEndDate: string;
   labPracticeSession: LabPracticeSession
}
