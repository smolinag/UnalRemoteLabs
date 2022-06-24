export interface LabSessionInfo {
  id?: string,
  _version?: number,
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
  userId: string,
  userName: string,
  userEmail: string,  
  sessionUserid?: string,
  sessionUserVersion?: number,
  sessionUserDeleted: boolean
}
