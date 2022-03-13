// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { LabPracticeSessionCommand, LabPracticeSession, LabPractice, Laboratory, LabSemester, UserLabSemester, User, UserLabPracticeSession, Organization, LabPracticeCommand, LabPracticeParameter, LabPracticeDevice, LabPracticeOutput, LabOutputOut } = initSchema(schema);

export {
  LabPracticeSessionCommand,
  LabPracticeSession,
  LabPractice,
  Laboratory,
  LabSemester,
  UserLabSemester,
  User,
  UserLabPracticeSession,
  Organization,
  LabPracticeCommand,
  LabPracticeParameter,
  LabPracticeDevice,
  LabPracticeOutput,
  LabOutputOut
};