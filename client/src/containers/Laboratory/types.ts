export interface Laboratory {
   id?: string | undefined,
	name: string;
	description?: string;
   organizationId: string;
   version: number | null;
}

export interface Organization {
   id: string,
   name: string
}

export enum Params {
	Name = 'name',
	Description = 'description',
   Organization = 'organization'
}

export interface LocationState {
	laboratoryId: string;
}