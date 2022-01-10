export interface LabSemesterInfo {
	laboratoryName: string;
	semesterName: string;
	semesterDescription: string | null;
}

export interface LocationState {
	laboratoryId: string;
}

export enum Params {
	Name = 'name',
	Description = 'description'
}

export interface ErrorIdentifier {
	identifier: string;
}
