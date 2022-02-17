export interface LabPracticeData {
	description: string;
	id: string;
	duration: number;
	name: string;
	labPracticeDevice: LabPracticeDeviceData;
	version: number | null;
}

export interface LabPracticeDeviceData {
	id: string;
	name: string;
	type: string;
}
