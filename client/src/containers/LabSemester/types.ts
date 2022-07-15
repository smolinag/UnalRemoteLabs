export interface LabSemester {
	id?: string;
	semesterName: string;
	description: string | null;
	professorEmailList: Array<string>;
	monitorEmailList: Array<string>;
	studentEmailList: Array<string>;
	laboratoryId?: string;
	laboratoryName?: string;
	laboratoryOrganizationId?: string;
	version?: number | null;
	deleted?: boolean | null;
}

export interface Laboratory {
	id?: string;
	name: string | null;
	organizationID: string;
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
	Laboratory = 'Laboratory'
}

export interface ErrorIdentifier {
	identifier: string;
}
