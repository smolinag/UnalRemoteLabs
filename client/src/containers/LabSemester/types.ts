export interface LabSemester {
	id?: string;
	semesterName: string;
	description: string | null;
	professor: string;
	monitorEmailList: Array<string>;
	studentEmailList: Array<string>;
	laboratoryID?: string;
	version?: number | null;
	deleted?: boolean | null;
}

export interface Laboratory {
	id?: string;
	name: string | null;
}

export interface LocationStateList {
	laboratoryID: string;
}

export interface LocationStateCreation {
	laboratoryID: string;
}

export interface LocationStateEdition {
	labSemesterID: string;
}

export enum Params {
	Name = 'name',
	Description = 'description',
	professor = 'profesor',
}

export interface ErrorIdentifier {
	identifier: string;
}
