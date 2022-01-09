// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { LabPracticeSessionCommand, LabPracticeSession, LabPracticeOutput, UserLabPracticeSession, User, RoleUser, Role, PrivilegeRole, Privilege, UserLabSemester, LabSemester, Laboratory, Organization, LabPracticeCommand, LabPracticeParameter, LabPracticeDevice, LabPractice, LabOutputOut } = initSchema(schema);

export {
  LabPracticeSessionCommand,
  LabPracticeSession,
  LabPracticeOutput,
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
  LabPractice,
  LabOutputOut
};