export interface LabSessionInfo {
  id?: string,
  _versionId?: number,
  startDate: Date,
  endDate: Date,
  description?: string,
  semesterId: string,
  labPractice?: LabPracticeInfo
}

export interface LabPracticeInfo {
  id: string, 
  name: string,
  description?: string,
  duration: number,
}

export interface SessionUser {
  id: string,
  name: string,
  email: string
}
