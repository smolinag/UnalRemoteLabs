/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
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
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
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
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
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
export const createUserLabPracticeSession = /* GraphQL */ `
  mutation CreateUserLabPracticeSession(
    $input: CreateUserLabPracticeSessionInput!
    $condition: ModelUserLabPracticeSessionConditionInput
  ) {
    createUserLabPracticeSession(input: $input, condition: $condition) {
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
          professor
          monitorEmailList
          studentEmailList
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
export const updateUserLabPracticeSession = /* GraphQL */ `
  mutation UpdateUserLabPracticeSession(
    $input: UpdateUserLabPracticeSessionInput!
    $condition: ModelUserLabPracticeSessionConditionInput
  ) {
    updateUserLabPracticeSession(input: $input, condition: $condition) {
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
          professor
          monitorEmailList
          studentEmailList
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
export const deleteUserLabPracticeSession = /* GraphQL */ `
  mutation DeleteUserLabPracticeSession(
    $input: DeleteUserLabPracticeSessionInput!
    $condition: ModelUserLabPracticeSessionConditionInput
  ) {
    deleteUserLabPracticeSession(input: $input, condition: $condition) {
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
          professor
          monitorEmailList
          studentEmailList
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createLabPracticeSessionCommand = /* GraphQL */ `
  mutation CreateLabPracticeSessionCommand(
    $input: CreateLabPracticeSessionCommandInput!
    $condition: ModelLabPracticeSessionCommandConditionInput
  ) {
    createLabPracticeSessionCommand(input: $input, condition: $condition) {
      id
      requestDate
      executionDate
      status
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
          professor
          monitorEmailList
          studentEmailList
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
export const updateLabPracticeSessionCommand = /* GraphQL */ `
  mutation UpdateLabPracticeSessionCommand(
    $input: UpdateLabPracticeSessionCommandInput!
    $condition: ModelLabPracticeSessionCommandConditionInput
  ) {
    updateLabPracticeSessionCommand(input: $input, condition: $condition) {
      id
      requestDate
      executionDate
      status
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
          professor
          monitorEmailList
          studentEmailList
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
export const deleteLabPracticeSessionCommand = /* GraphQL */ `
  mutation DeleteLabPracticeSessionCommand(
    $input: DeleteLabPracticeSessionCommandInput!
    $condition: ModelLabPracticeSessionCommandConditionInput
  ) {
    deleteLabPracticeSessionCommand(input: $input, condition: $condition) {
      id
      requestDate
      executionDate
      status
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
          professor
          monitorEmailList
          studentEmailList
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
export const createLabPracticeOutput = /* GraphQL */ `
  mutation CreateLabPracticeOutput(
    $input: CreateLabPracticeOutputInput!
    $condition: ModelLabPracticeOutputConditionInput
  ) {
    createLabPracticeOutput(input: $input, condition: $condition) {
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
export const updateLabPracticeOutput = /* GraphQL */ `
  mutation UpdateLabPracticeOutput(
    $input: UpdateLabPracticeOutputInput!
    $condition: ModelLabPracticeOutputConditionInput
  ) {
    updateLabPracticeOutput(input: $input, condition: $condition) {
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
export const deleteLabPracticeOutput = /* GraphQL */ `
  mutation DeleteLabPracticeOutput(
    $input: DeleteLabPracticeOutputInput!
    $condition: ModelLabPracticeOutputConditionInput
  ) {
    deleteLabPracticeOutput(input: $input, condition: $condition) {
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
export const createLabPracticeSession = /* GraphQL */ `
  mutation CreateLabPracticeSession(
    $input: CreateLabPracticeSessionInput!
    $condition: ModelLabPracticeSessionConditionInput
  ) {
    createLabPracticeSession(input: $input, condition: $condition) {
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
        professor
        monitorEmailList
        studentEmailList
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
export const updateLabPracticeSession = /* GraphQL */ `
  mutation UpdateLabPracticeSession(
    $input: UpdateLabPracticeSessionInput!
    $condition: ModelLabPracticeSessionConditionInput
  ) {
    updateLabPracticeSession(input: $input, condition: $condition) {
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
        professor
        monitorEmailList
        studentEmailList
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
export const deleteLabPracticeSession = /* GraphQL */ `
  mutation DeleteLabPracticeSession(
    $input: DeleteLabPracticeSessionInput!
    $condition: ModelLabPracticeSessionConditionInput
  ) {
    deleteLabPracticeSession(input: $input, condition: $condition) {
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
        professor
        monitorEmailList
        studentEmailList
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
export const createLabPracticeParameter = /* GraphQL */ `
  mutation CreateLabPracticeParameter(
    $input: CreateLabPracticeParameterInput!
    $condition: ModelLabPracticeParameterConditionInput
  ) {
    createLabPracticeParameter(input: $input, condition: $condition) {
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
export const updateLabPracticeParameter = /* GraphQL */ `
  mutation UpdateLabPracticeParameter(
    $input: UpdateLabPracticeParameterInput!
    $condition: ModelLabPracticeParameterConditionInput
  ) {
    updateLabPracticeParameter(input: $input, condition: $condition) {
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
export const deleteLabPracticeParameter = /* GraphQL */ `
  mutation DeleteLabPracticeParameter(
    $input: DeleteLabPracticeParameterInput!
    $condition: ModelLabPracticeParameterConditionInput
  ) {
    deleteLabPracticeParameter(input: $input, condition: $condition) {
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
export const createLabPracticeCommand = /* GraphQL */ `
  mutation CreateLabPracticeCommand(
    $input: CreateLabPracticeCommandInput!
    $condition: ModelLabPracticeCommandConditionInput
  ) {
    createLabPracticeCommand(input: $input, condition: $condition) {
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
export const updateLabPracticeCommand = /* GraphQL */ `
  mutation UpdateLabPracticeCommand(
    $input: UpdateLabPracticeCommandInput!
    $condition: ModelLabPracticeCommandConditionInput
  ) {
    updateLabPracticeCommand(input: $input, condition: $condition) {
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
export const deleteLabPracticeCommand = /* GraphQL */ `
  mutation DeleteLabPracticeCommand(
    $input: DeleteLabPracticeCommandInput!
    $condition: ModelLabPracticeCommandConditionInput
  ) {
    deleteLabPracticeCommand(input: $input, condition: $condition) {
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
export const createLabPractice = /* GraphQL */ `
  mutation CreateLabPractice(
    $input: CreateLabPracticeInput!
    $condition: ModelLabPracticeConditionInput
  ) {
    createLabPractice(input: $input, condition: $condition) {
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
export const updateLabPractice = /* GraphQL */ `
  mutation UpdateLabPractice(
    $input: UpdateLabPracticeInput!
    $condition: ModelLabPracticeConditionInput
  ) {
    updateLabPractice(input: $input, condition: $condition) {
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
export const deleteLabPractice = /* GraphQL */ `
  mutation DeleteLabPractice(
    $input: DeleteLabPracticeInput!
    $condition: ModelLabPracticeConditionInput
  ) {
    deleteLabPractice(input: $input, condition: $condition) {
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
export const createLabSemester = /* GraphQL */ `
  mutation CreateLabSemester(
    $input: CreateLabSemesterInput!
    $condition: ModelLabSemesterConditionInput
  ) {
    createLabSemester(input: $input, condition: $condition) {
      id
      semesterName
      description
      professor
      monitorEmailList
      studentEmailList
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
export const updateLabSemester = /* GraphQL */ `
  mutation UpdateLabSemester(
    $input: UpdateLabSemesterInput!
    $condition: ModelLabSemesterConditionInput
  ) {
    updateLabSemester(input: $input, condition: $condition) {
      id
      semesterName
      description
      professor
      monitorEmailList
      studentEmailList
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
export const deleteLabSemester = /* GraphQL */ `
  mutation DeleteLabSemester(
    $input: DeleteLabSemesterInput!
    $condition: ModelLabSemesterConditionInput
  ) {
    deleteLabSemester(input: $input, condition: $condition) {
      id
      semesterName
      description
      professor
      monitorEmailList
      studentEmailList
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
export const createLaboratory = /* GraphQL */ `
  mutation CreateLaboratory(
    $input: CreateLaboratoryInput!
    $condition: ModelLaboratoryConditionInput
  ) {
    createLaboratory(input: $input, condition: $condition) {
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
          professor
          monitorEmailList
          studentEmailList
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
export const updateLaboratory = /* GraphQL */ `
  mutation UpdateLaboratory(
    $input: UpdateLaboratoryInput!
    $condition: ModelLaboratoryConditionInput
  ) {
    updateLaboratory(input: $input, condition: $condition) {
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
          professor
          monitorEmailList
          studentEmailList
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
export const deleteLaboratory = /* GraphQL */ `
  mutation DeleteLaboratory(
    $input: DeleteLaboratoryInput!
    $condition: ModelLaboratoryConditionInput
  ) {
    deleteLaboratory(input: $input, condition: $condition) {
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
          professor
          monitorEmailList
          studentEmailList
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
export const createUserLabSemester = /* GraphQL */ `
  mutation CreateUserLabSemester(
    $input: CreateUserLabSemesterInput!
    $condition: ModelUserLabSemesterConditionInput
  ) {
    createUserLabSemester(input: $input, condition: $condition) {
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
        professor
        monitorEmailList
        studentEmailList
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
export const updateUserLabSemester = /* GraphQL */ `
  mutation UpdateUserLabSemester(
    $input: UpdateUserLabSemesterInput!
    $condition: ModelUserLabSemesterConditionInput
  ) {
    updateUserLabSemester(input: $input, condition: $condition) {
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
        professor
        monitorEmailList
        studentEmailList
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
export const deleteUserLabSemester = /* GraphQL */ `
  mutation DeleteUserLabSemester(
    $input: DeleteUserLabSemesterInput!
    $condition: ModelUserLabSemesterConditionInput
  ) {
    deleteUserLabSemester(input: $input, condition: $condition) {
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
        professor
        monitorEmailList
        studentEmailList
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
export const publishMqttMessage = /* GraphQL */ `
  mutation PublishMqttMessage($input: LambdaInput!) {
    publishMqttMessage(input: $input)
  }
`;
export const labOutputListen = /* GraphQL */ `
  mutation LabOutputListen($input: LabOutputIn!) {
    labOutputListen(input: $input) {
      labPracticeOutputID
      value
      rpiID
      captureDate
    }
  }
`;
export const sendEmail = /* GraphQL */ `
  mutation SendEmail($input: EmailInput!) {
    sendEmail(input: $input)
  }
`;
export const createCognitoUser = /* GraphQL */ `
  mutation CreateCognitoUser($input: CreateCognitoUserInput!) {
    createCognitoUser(input: $input)
  }
`;
export const removeCognitoUser = /* GraphQL */ `
  mutation RemoveCognitoUser($email: String!) {
    removeCognitoUser(email: $email)
  }
`;
