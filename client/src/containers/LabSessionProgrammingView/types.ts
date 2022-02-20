export interface LabSessionInfo {
  id?: String,
  _versionId?: number,
  startDate: Date,
  endDate: Date,
  description: string,
  semesterId: string
}

export interface LabPracticeInfo {
  id: String, 
  name: String,
  description?: string,
  duration: number,
}

export interface SessionUser {
  id: string,
  name: string,
  email: string
}
