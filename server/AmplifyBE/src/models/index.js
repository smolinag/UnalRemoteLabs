// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "PENDING": "pending",
  "SUCCESS": "success",
  "FAILURE": "failure",
  "BUSY": "busy"
};

const Role = {
  "ADMINS": "Admins",
  "MONITORS": "Monitors",
  "STUDENTS": "Students",
  "PROFESSORS": "Professors"
};

const { LabPracticeSessionCommand, LabPracticeSession, LabPractice, Laboratory, Organization, User, UserLabPracticeSession, UserLabSemester, LabSemester, LabPracticeCommand, LabPracticeParameter, LabPracticeOutput, LabOutputOut } = initSchema(schema);

export {
  LabPracticeSessionCommand,
  LabPracticeSession,
  LabPractice,
  Laboratory,
  Organization,
  User,
  UserLabPracticeSession,
  UserLabSemester,
  LabSemester,
  LabPracticeCommand,
  LabPracticeParameter,
  LabPracticeOutput,
  Status,
  Role,
  LabOutputOut
};