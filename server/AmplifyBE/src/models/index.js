// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Roles = {
  "ADMINS": "Admins",
  "MONITORS": "Monitors",
  "STUDENTS": "Students",
  "PROFESSORS": "Professors"
};

const { LabPracticeSessionCommand, LabPracticeSession, LabPractice, Laboratory, Organization, User, UserLabPracticeSession, UserLabSemester, LabSemester, LabPracticeCommand, LabPracticeParameter, LabPracticeDevice, LabPracticeOutput, LabOutputOut } = initSchema(schema);

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
  LabPracticeDevice,
  LabPracticeOutput,
  Roles,
  LabOutputOut
};