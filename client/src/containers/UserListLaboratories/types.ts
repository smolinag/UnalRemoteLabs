export interface Laboratory {
   name: string;
   description: string;
   labPractice: LabPracticeInfo;
}

export interface LabPracticeInfo {
	practiceInfoName: string;
	practiceInfoDescription: string;
	practiceInfoDuration: string;
   labPracticeSession: LabPracticeSession;
}

export interface LabPracticeSession {
   startDate: Date;
   endDate: Date;
}
