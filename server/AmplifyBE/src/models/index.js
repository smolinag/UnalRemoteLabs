// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { LabPracticeSessionOutput, LabPracticeOutput, LabPracticeSessionCommand, LabPracticeSession, UserLabPracticeSession, User, RoleUser, Role, PrivilegeRole, Privilege, UserLabSemester, LabSemester, Laboratory, Organization, LabPracticeCommand, LabPracticeParameter, LabPracticeDevice, LabPractice } = initSchema(schema);

export {
  LabPracticeSessionOutput,
  LabPracticeOutput,
  LabPracticeSessionCommand,
  LabPracticeSession,
  UserLabPracticeSession,
  User,
  RoleUser,
  Role,
  PrivilegeRole,
  Privilege,
  UserLabSemester,
  LabSemester,
  Laboratory,
  Organization,
  LabPracticeCommand,
  LabPracticeParameter,
  LabPracticeDevice,
  LabPractice
};