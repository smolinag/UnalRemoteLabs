/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
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
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncOrganizations = /* GraphQL */ `
  query SyncOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrganizations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUserLabPracticeSession = /* GraphQL */ `
  query GetUserLabPracticeSession($id: ID!) {
    getUserLabPracticeSession(id: $id) {
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
export const listUserLabPracticeSessions = /* GraphQL */ `
  query ListUserLabPracticeSessions(
    $filter: ModelUserLabPracticeSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserLabPracticeSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserLabPracticeSessions = /* GraphQL */ `
  query SyncUserLabPracticeSessions(
    $filter: ModelUserLabPracticeSessionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserLabPracticeSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
      startedAt
    }
  }
`;
export const getUserByEmail = /* GraphQL */ `
  query GetUserByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const getLabPracticeSessionCommand = /* GraphQL */ `
  query GetLabPracticeSessionCommand($id: ID!) {
    getLabPracticeSessionCommand(id: $id) {
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
export const listLabPracticeSessionCommands = /* GraphQL */ `
  query ListLabPracticeSessionCommands(
    $filter: ModelLabPracticeSessionCommandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabPracticeSessionCommands(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncLabPracticeSessionCommands = /* GraphQL */ `
  query SyncLabPracticeSessionCommands(
    $filter: ModelLabPracticeSessionCommandFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLabPracticeSessionCommands(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const getLabPracticeOutput = /* GraphQL */ `
  query GetLabPracticeOutput($id: ID!) {
    getLabPracticeOutput(id: $id) {
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
export const listLabPracticeOutputs = /* GraphQL */ `
  query ListLabPracticeOutputs(
    $filter: ModelLabPracticeOutputFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabPracticeOutputs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncLabPracticeOutputs = /* GraphQL */ `
  query SyncLabPracticeOutputs(
    $filter: ModelLabPracticeOutputFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLabPracticeOutputs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const getLabPracticeSession = /* GraphQL */ `
  query GetLabPracticeSession($id: ID!) {
    getLabPracticeSession(id: $id) {
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
export const listLabPracticeSessions = /* GraphQL */ `
  query ListLabPracticeSessions(
    $filter: ModelLabPracticeSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabPracticeSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncLabPracticeSessions = /* GraphQL */ `
  query SyncLabPracticeSessions(
    $filter: ModelLabPracticeSessionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLabPracticeSessions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const getLabPracticeParameter = /* GraphQL */ `
  query GetLabPracticeParameter($id: ID!) {
    getLabPracticeParameter(id: $id) {
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
export const listLabPracticeParameters = /* GraphQL */ `
  query ListLabPracticeParameters(
    $filter: ModelLabPracticeParameterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabPracticeParameters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncLabPracticeParameters = /* GraphQL */ `
  query SyncLabPracticeParameters(
    $filter: ModelLabPracticeParameterFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLabPracticeParameters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const getLabPracticeCommand = /* GraphQL */ `
  query GetLabPracticeCommand($id: ID!) {
    getLabPracticeCommand(id: $id) {
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
export const listLabPracticeCommands = /* GraphQL */ `
  query ListLabPracticeCommands(
    $filter: ModelLabPracticeCommandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabPracticeCommands(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncLabPracticeCommands = /* GraphQL */ `
  query SyncLabPracticeCommands(
    $filter: ModelLabPracticeCommandFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLabPracticeCommands(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const getLabPractice = /* GraphQL */ `
  query GetLabPractice($id: ID!) {
    getLabPractice(id: $id) {
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
export const listLabPractices = /* GraphQL */ `
  query ListLabPractices(
    $filter: ModelLabPracticeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabPractices(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncLabPractices = /* GraphQL */ `
  query SyncLabPractices(
    $filter: ModelLabPracticeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLabPractices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const getLabSemester = /* GraphQL */ `
  query GetLabSemester($id: ID!) {
    getLabSemester(id: $id) {
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
export const listLabSemesters = /* GraphQL */ `
  query ListLabSemesters(
    $filter: ModelLabSemesterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabSemesters(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncLabSemesters = /* GraphQL */ `
  query SyncLabSemesters(
    $filter: ModelLabSemesterFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLabSemesters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const getLaboratory = /* GraphQL */ `
  query GetLaboratory($id: ID!) {
    getLaboratory(id: $id) {
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
export const listLaboratorys = /* GraphQL */ `
  query ListLaboratorys(
    $filter: ModelLaboratoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLaboratorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
      startedAt
    }
  }
`;
export const syncLaboratories = /* GraphQL */ `
  query SyncLaboratories(
    $filter: ModelLaboratoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncLaboratories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
      nextToken
      startedAt
    }
  }
`;
export const getUserLabSemester = /* GraphQL */ `
  query GetUserLabSemester($id: ID!) {
    getUserLabSemester(id: $id) {
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
export const listUserLabSemesters = /* GraphQL */ `
  query ListUserLabSemesters(
    $filter: ModelUserLabSemesterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserLabSemesters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserLabSemesters = /* GraphQL */ `
  query SyncUserLabSemesters(
    $filter: ModelUserLabSemesterFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserLabSemesters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
        }
      }
      nextToken
      startedAt
    }
  }
`;
