export interface LabPracticeData {
	description: string;
	id: string;
	duration: number;
	name: string;
	version: number | null;
}

export interface LabPracticeDeviceData {
	id: string;
	name: string;
	type: string;
}
