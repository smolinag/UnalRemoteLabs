export interface LabSessionInfo {
  startDate: Date,
  endDate: Date,
  description: string,
  labPracticeName: string,
  duration: string,
  semesterId: string
}

export interface SessionUser {
  id: string,
  name: string,
  email: string
}
