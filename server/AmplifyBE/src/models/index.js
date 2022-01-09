// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserLabPracticeSession, User, RoleUser, Role, PrivilegeRole, Privilege, UserLabSemester, LabSemester, Laboratory, Organization, LabPracticeSession, LabPracticeOutput, LabPracticeSessionCommand, LabPracticeCommand, LabPracticeParameter, LabPracticeDevice, LabPractice, LabOutputOut } = initSchema(schema);

export {
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
  LabPracticeSession,
  LabPracticeOutput,
  LabPracticeSessionCommand,
  LabPracticeCommand,
  LabPracticeParameter,
  LabPracticeDevice,
  LabPractice,
  LabOutputOut
};