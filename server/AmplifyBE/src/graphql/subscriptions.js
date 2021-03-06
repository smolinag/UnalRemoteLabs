/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization {
    onCreateOrganization {
      id
      country
      region
      city
      type
      name
      description
      phone
      address
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Users {
        items {
          id
          name
          identificationNumber
          email
          phone
          s3AvatarPath
          role
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Laboratories {
        items {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization {
    onUpdateOrganization {
      id
      country
      region
      city
      type
      name
      description
      phone
      address
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Users {
        items {
          id
          name
          identificationNumber
          email
          phone
          s3AvatarPath
          role
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Laboratories {
        items {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization {
    onDeleteOrganization {
      id
      country
      region
      city
      type
      name
      description
      phone
      address
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Users {
        items {
          id
          name
          identificationNumber
          email
          phone
          s3AvatarPath
          role
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Laboratories {
        items {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateUserLabPracticeSession = /* GraphQL */ `
  subscription OnCreateUserLabPracticeSession {
    onCreateUserLabPracticeSession {
      id
      sessionStartDate
      sessionEndDate
      userID
      labpracticesessionID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      User {
        id
        name
        identificationNumber
        email
        phone
        s3AvatarPath
        role
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        UserLabSemesters {
          nextToken
          startedAt
        }
      }
      LabPracticeSession {
        id
        startDate
        endDate
        description
        labpracticeID
        labSemesterID
        leaderUsers
        videoUrlCode
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabSemester {
          id
          semesterName
          description
          laboratoryID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onUpdateUserLabPracticeSession = /* GraphQL */ `
  subscription OnUpdateUserLabPracticeSession {
    onUpdateUserLabPracticeSession {
      id
      sessionStartDate
      sessionEndDate
      userID
      labpracticesessionID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      User {
        id
        name
        identificationNumber
        email
        phone
        s3AvatarPath
        role
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        UserLabSemesters {
          nextToken
          startedAt
        }
      }
      LabPracticeSession {
        id
        startDate
        endDate
        description
        labpracticeID
        labSemesterID
        leaderUsers
        videoUrlCode
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabSemester {
          id
          semesterName
          description
          laboratoryID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onDeleteUserLabPracticeSession = /* GraphQL */ `
  subscription OnDeleteUserLabPracticeSession {
    onDeleteUserLabPracticeSession {
      id
      sessionStartDate
      sessionEndDate
      userID
      labpracticesessionID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      User {
        id
        name
        identificationNumber
        email
        phone
        s3AvatarPath
        role
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        UserLabSemesters {
          nextToken
          startedAt
        }
      }
      LabPracticeSession {
        id
        startDate
        endDate
        description
        labpracticeID
        labSemesterID
        leaderUsers
        videoUrlCode
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabSemester {
          id
          semesterName
          description
          laboratoryID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      identificationNumber
      email
      phone
      s3AvatarPath
      role
      organizationID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Organization {
        id
        country
        region
        city
        type
        name
        description
        phone
        address
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Users {
          nextToken
          startedAt
        }
        Laboratories {
          nextToken
          startedAt
        }
      }
      UserLabPracticeSessions {
        items {
          id
          sessionStartDate
          sessionEndDate
          userID
          labpracticesessionID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      UserLabSemesters {
        items {
          id
          userID
          labsemesterID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      identificationNumber
      email
      phone
      s3AvatarPath
      role
      organizationID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Organization {
        id
        country
        region
        city
        type
        name
        description
        phone
        address
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Users {
          nextToken
          startedAt
        }
        Laboratories {
          nextToken
          startedAt
        }
      }
      UserLabPracticeSessions {
        items {
          id
          sessionStartDate
          sessionEndDate
          userID
          labpracticesessionID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      UserLabSemesters {
        items {
          id
          userID
          labsemesterID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      identificationNumber
      email
      phone
      s3AvatarPath
      role
      organizationID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Organization {
        id
        country
        region
        city
        type
        name
        description
        phone
        address
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Users {
          nextToken
          startedAt
        }
        Laboratories {
          nextToken
          startedAt
        }
      }
      UserLabPracticeSessions {
        items {
          id
          sessionStartDate
          sessionEndDate
          userID
          labpracticesessionID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      UserLabSemesters {
        items {
          id
          userID
          labsemesterID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateLabPracticeSessionCommand = /* GraphQL */ `
  subscription OnCreateLabPracticeSessionCommand {
    onCreateLabPracticeSessionCommand {
      id
      requestDate
      executionDate
      status
      username
      parameters
      labpracticesessionID
      labpracticecommandID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeSession {
        id
        startDate
        endDate
        description
        labpracticeID
        labSemesterID
        leaderUsers
        videoUrlCode
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabSemester {
          id
          semesterName
          description
          laboratoryID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      LabPracticeCommand {
        id
        name
        labelName
        order
        description
        labpracticeID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onUpdateLabPracticeSessionCommand = /* GraphQL */ `
  subscription OnUpdateLabPracticeSessionCommand {
    onUpdateLabPracticeSessionCommand {
      id
      requestDate
      executionDate
      status
      username
      parameters
      labpracticesessionID
      labpracticecommandID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeSession {
        id
        startDate
        endDate
        description
        labpracticeID
        labSemesterID
        leaderUsers
        videoUrlCode
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabSemester {
          id
          semesterName
          description
          laboratoryID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      LabPracticeCommand {
        id
        name
        labelName
        order
        description
        labpracticeID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onDeleteLabPracticeSessionCommand = /* GraphQL */ `
  subscription OnDeleteLabPracticeSessionCommand {
    onDeleteLabPracticeSessionCommand {
      id
      requestDate
      executionDate
      status
      username
      parameters
      labpracticesessionID
      labpracticecommandID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeSession {
        id
        startDate
        endDate
        description
        labpracticeID
        labSemesterID
        leaderUsers
        videoUrlCode
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabSemester {
          id
          semesterName
          description
          laboratoryID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      LabPracticeCommand {
        id
        name
        labelName
        order
        description
        labpracticeID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onCreateLabPracticeOutput = /* GraphQL */ `
  subscription OnCreateLabPracticeOutput {
    onCreateLabPracticeOutput {
      id
      name
      labelName
      order
      description
      units
      labpracticeID
      outputType
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onUpdateLabPracticeOutput = /* GraphQL */ `
  subscription OnUpdateLabPracticeOutput {
    onUpdateLabPracticeOutput {
      id
      name
      labelName
      order
      description
      units
      labpracticeID
      outputType
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onDeleteLabPracticeOutput = /* GraphQL */ `
  subscription OnDeleteLabPracticeOutput {
    onDeleteLabPracticeOutput {
      id
      name
      labelName
      order
      description
      units
      labpracticeID
      outputType
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onCreateLabPracticeSession = /* GraphQL */ `
  subscription OnCreateLabPracticeSession {
    onCreateLabPracticeSession {
      id
      startDate
      endDate
      description
      labpracticeID
      labSemesterID
      leaderUsers
      videoUrlCode
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      UserLabPracticeSessions {
        items {
          id
          sessionStartDate
          sessionEndDate
          userID
          labpracticesessionID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeSessionCommands {
        items {
          id
          requestDate
          executionDate
          status
          username
          parameters
          labpracticesessionID
          labpracticecommandID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      LabSemester {
        id
        semesterName
        description
        laboratoryID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessions {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        users {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onUpdateLabPracticeSession = /* GraphQL */ `
  subscription OnUpdateLabPracticeSession {
    onUpdateLabPracticeSession {
      id
      startDate
      endDate
      description
      labpracticeID
      labSemesterID
      leaderUsers
      videoUrlCode
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      UserLabPracticeSessions {
        items {
          id
          sessionStartDate
          sessionEndDate
          userID
          labpracticesessionID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeSessionCommands {
        items {
          id
          requestDate
          executionDate
          status
          username
          parameters
          labpracticesessionID
          labpracticecommandID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      LabSemester {
        id
        semesterName
        description
        laboratoryID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessions {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        users {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onDeleteLabPracticeSession = /* GraphQL */ `
  subscription OnDeleteLabPracticeSession {
    onDeleteLabPracticeSession {
      id
      startDate
      endDate
      description
      labpracticeID
      labSemesterID
      leaderUsers
      videoUrlCode
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      UserLabPracticeSessions {
        items {
          id
          sessionStartDate
          sessionEndDate
          userID
          labpracticesessionID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeSessionCommands {
        items {
          id
          requestDate
          executionDate
          status
          username
          parameters
          labpracticesessionID
          labpracticecommandID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      LabSemester {
        id
        semesterName
        description
        laboratoryID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessions {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        users {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onCreateLabPracticeParameter = /* GraphQL */ `
  subscription OnCreateLabPracticeParameter {
    onCreateLabPracticeParameter {
      id
      name
      labelName
      order
      description
      defaultValue
      minValue
      maxValue
      regex
      labpracticecommandID
      labpracticeID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeCommand {
        id
        name
        labelName
        order
        description
        labpracticeID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onUpdateLabPracticeParameter = /* GraphQL */ `
  subscription OnUpdateLabPracticeParameter {
    onUpdateLabPracticeParameter {
      id
      name
      labelName
      order
      description
      defaultValue
      minValue
      maxValue
      regex
      labpracticecommandID
      labpracticeID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeCommand {
        id
        name
        labelName
        order
        description
        labpracticeID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onDeleteLabPracticeParameter = /* GraphQL */ `
  subscription OnDeleteLabPracticeParameter {
    onDeleteLabPracticeParameter {
      id
      name
      labelName
      order
      description
      defaultValue
      minValue
      maxValue
      regex
      labpracticecommandID
      labpracticeID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeCommand {
        id
        name
        labelName
        order
        description
        labpracticeID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onCreateLabPracticeCommand = /* GraphQL */ `
  subscription OnCreateLabPracticeCommand {
    onCreateLabPracticeCommand {
      id
      name
      labelName
      order
      description
      labpracticeID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeSessionCommands {
        items {
          id
          requestDate
          executionDate
          status
          username
          parameters
          labpracticesessionID
          labpracticecommandID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeParameters {
        items {
          id
          name
          labelName
          order
          description
          defaultValue
          minValue
          maxValue
          regex
          labpracticecommandID
          labpracticeID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onUpdateLabPracticeCommand = /* GraphQL */ `
  subscription OnUpdateLabPracticeCommand {
    onUpdateLabPracticeCommand {
      id
      name
      labelName
      order
      description
      labpracticeID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeSessionCommands {
        items {
          id
          requestDate
          executionDate
          status
          username
          parameters
          labpracticesessionID
          labpracticecommandID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeParameters {
        items {
          id
          name
          labelName
          order
          description
          defaultValue
          minValue
          maxValue
          regex
          labpracticecommandID
          labpracticeID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onDeleteLabPracticeCommand = /* GraphQL */ `
  subscription OnDeleteLabPracticeCommand {
    onDeleteLabPracticeCommand {
      id
      name
      labelName
      order
      description
      labpracticeID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeSessionCommands {
        items {
          id
          requestDate
          executionDate
          status
          username
          parameters
          labpracticesessionID
          labpracticecommandID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeParameters {
        items {
          id
          name
          labelName
          order
          description
          defaultValue
          minValue
          maxValue
          regex
          labpracticecommandID
          labpracticeID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPractice {
        id
        name
        description
        duration
        laboratoryID
        LabPracticeDeviceId
        guideS3Path
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeOutputs {
          nextToken
          startedAt
        }
        LabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPracticeCommands {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onCreateLabPractice = /* GraphQL */ `
  subscription OnCreateLabPractice {
    onCreateLabPractice {
      id
      name
      description
      duration
      laboratoryID
      LabPracticeDeviceId
      guideS3Path
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeOutputs {
        items {
          id
          name
          labelName
          order
          description
          units
          labpracticeID
          outputType
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeSessions {
        items {
          id
          startDate
          endDate
          description
          labpracticeID
          labSemesterID
          leaderUsers
          videoUrlCode
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeParameters {
        items {
          id
          name
          labelName
          order
          description
          defaultValue
          minValue
          maxValue
          regex
          labpracticecommandID
          labpracticeID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeCommands {
        items {
          id
          name
          labelName
          order
          description
          labpracticeID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Laboratory {
        id
        name
        description
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabPractices {
          nextToken
          startedAt
        }
        LabSemesters {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onUpdateLabPractice = /* GraphQL */ `
  subscription OnUpdateLabPractice {
    onUpdateLabPractice {
      id
      name
      description
      duration
      laboratoryID
      LabPracticeDeviceId
      guideS3Path
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeOutputs {
        items {
          id
          name
          labelName
          order
          description
          units
          labpracticeID
          outputType
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeSessions {
        items {
          id
          startDate
          endDate
          description
          labpracticeID
          labSemesterID
          leaderUsers
          videoUrlCode
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeParameters {
        items {
          id
          name
          labelName
          order
          description
          defaultValue
          minValue
          maxValue
          regex
          labpracticecommandID
          labpracticeID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeCommands {
        items {
          id
          name
          labelName
          order
          description
          labpracticeID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Laboratory {
        id
        name
        description
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabPractices {
          nextToken
          startedAt
        }
        LabSemesters {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onDeleteLabPractice = /* GraphQL */ `
  subscription OnDeleteLabPractice {
    onDeleteLabPractice {
      id
      name
      description
      duration
      laboratoryID
      LabPracticeDeviceId
      guideS3Path
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeOutputs {
        items {
          id
          name
          labelName
          order
          description
          units
          labpracticeID
          outputType
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeSessions {
        items {
          id
          startDate
          endDate
          description
          labpracticeID
          labSemesterID
          leaderUsers
          videoUrlCode
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeParameters {
        items {
          id
          name
          labelName
          order
          description
          defaultValue
          minValue
          maxValue
          regex
          labpracticecommandID
          labpracticeID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabPracticeCommands {
        items {
          id
          name
          labelName
          order
          description
          labpracticeID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Laboratory {
        id
        name
        description
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabPractices {
          nextToken
          startedAt
        }
        LabSemesters {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onCreateLabSemester = /* GraphQL */ `
  subscription OnCreateLabSemester {
    onCreateLabSemester {
      id
      semesterName
      description
      laboratoryID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeSessions {
        items {
          id
          startDate
          endDate
          description
          labpracticeID
          labSemesterID
          leaderUsers
          videoUrlCode
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Laboratory {
        id
        name
        description
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabPractices {
          nextToken
          startedAt
        }
        LabSemesters {
          nextToken
          startedAt
        }
      }
      users {
        items {
          id
          userID
          labsemesterID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateLabSemester = /* GraphQL */ `
  subscription OnUpdateLabSemester {
    onUpdateLabSemester {
      id
      semesterName
      description
      laboratoryID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeSessions {
        items {
          id
          startDate
          endDate
          description
          labpracticeID
          labSemesterID
          leaderUsers
          videoUrlCode
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Laboratory {
        id
        name
        description
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabPractices {
          nextToken
          startedAt
        }
        LabSemesters {
          nextToken
          startedAt
        }
      }
      users {
        items {
          id
          userID
          labsemesterID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteLabSemester = /* GraphQL */ `
  subscription OnDeleteLabSemester {
    onDeleteLabSemester {
      id
      semesterName
      description
      laboratoryID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeSessions {
        items {
          id
          startDate
          endDate
          description
          labpracticeID
          labSemesterID
          leaderUsers
          videoUrlCode
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      Laboratory {
        id
        name
        description
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabPractices {
          nextToken
          startedAt
        }
        LabSemesters {
          nextToken
          startedAt
        }
      }
      users {
        items {
          id
          userID
          labsemesterID
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateLaboratory = /* GraphQL */ `
  subscription OnCreateLaboratory {
    onCreateLaboratory {
      id
      name
      description
      organizationID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Organization {
        id
        country
        region
        city
        type
        name
        description
        phone
        address
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Users {
          nextToken
          startedAt
        }
        Laboratories {
          nextToken
          startedAt
        }
      }
      LabPractices {
        items {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabSemesters {
        items {
          id
          semesterName
          description
          laboratoryID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateLaboratory = /* GraphQL */ `
  subscription OnUpdateLaboratory {
    onUpdateLaboratory {
      id
      name
      description
      organizationID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Organization {
        id
        country
        region
        city
        type
        name
        description
        phone
        address
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Users {
          nextToken
          startedAt
        }
        Laboratories {
          nextToken
          startedAt
        }
      }
      LabPractices {
        items {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabSemesters {
        items {
          id
          semesterName
          description
          laboratoryID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteLaboratory = /* GraphQL */ `
  subscription OnDeleteLaboratory {
    onDeleteLaboratory {
      id
      name
      description
      organizationID
      updatedBy
      createdBy
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Organization {
        id
        country
        region
        city
        type
        name
        description
        phone
        address
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Users {
          nextToken
          startedAt
        }
        Laboratories {
          nextToken
          startedAt
        }
      }
      LabPractices {
        items {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      LabSemesters {
        items {
          id
          semesterName
          description
          laboratoryID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateUserLabSemester = /* GraphQL */ `
  subscription OnCreateUserLabSemester {
    onCreateUserLabSemester {
      id
      userID
      labsemesterID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
        id
        name
        identificationNumber
        email
        phone
        s3AvatarPath
        role
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        UserLabSemesters {
          nextToken
          startedAt
        }
      }
      labsemester {
        id
        semesterName
        description
        laboratoryID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessions {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        users {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onUpdateUserLabSemester = /* GraphQL */ `
  subscription OnUpdateUserLabSemester {
    onUpdateUserLabSemester {
      id
      userID
      labsemesterID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
        id
        name
        identificationNumber
        email
        phone
        s3AvatarPath
        role
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        UserLabSemesters {
          nextToken
          startedAt
        }
      }
      labsemester {
        id
        semesterName
        description
        laboratoryID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessions {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        users {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onDeleteUserLabSemester = /* GraphQL */ `
  subscription OnDeleteUserLabSemester {
    onDeleteUserLabSemester {
      id
      userID
      labsemesterID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      user {
        id
        name
        identificationNumber
        email
        phone
        s3AvatarPath
        role
        organizationID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        Organization {
          id
          country
          region
          city
          type
          name
          description
          phone
          address
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        UserLabSemesters {
          nextToken
          startedAt
        }
      }
      labsemester {
        id
        semesterName
        description
        laboratoryID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessions {
          nextToken
          startedAt
        }
        Laboratory {
          id
          name
          description
          organizationID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        users {
          nextToken
          startedAt
        }
      }
    }
  }
`;
export const onLabOutputListen = /* GraphQL */ `
  subscription OnLabOutputListen($rpiID: ID!) {
    onLabOutputListen(rpiID: $rpiID) {
      labPracticeOutputID
      value
      rpiID
      captureDate
    }
  }
`;
export const onUpdateLabPracticeSessionCommandBySessionID = /* GraphQL */ `
  subscription OnUpdateLabPracticeSessionCommandBySessionID(
    $labpracticesessionID: ID!
  ) {
    onUpdateLabPracticeSessionCommandBySessionID(
      labpracticesessionID: $labpracticesessionID
    ) {
      id
      requestDate
      executionDate
      status
      username
      parameters
      labpracticesessionID
      labpracticecommandID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      LabPracticeSession {
        id
        startDate
        endDate
        description
        labpracticeID
        labSemesterID
        leaderUsers
        videoUrlCode
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        UserLabPracticeSessions {
          nextToken
          startedAt
        }
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        LabSemester {
          id
          semesterName
          description
          laboratoryID
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
      LabPracticeCommand {
        id
        name
        labelName
        order
        description
        labpracticeID
        updatedBy
        createdBy
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        LabPracticeSessionCommands {
          nextToken
          startedAt
        }
        LabPracticeParameters {
          nextToken
          startedAt
        }
        LabPractice {
          id
          name
          description
          duration
          laboratoryID
          LabPracticeDeviceId
          guideS3Path
          updatedBy
          createdBy
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
      }
    }
  }
`;
