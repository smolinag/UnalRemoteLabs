var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();

const TABLE_NAME = process.env.USER_TABLE;

readItem = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "byEmail",
    KeyConditionExpression: "#email = :email",
    FilterExpression: "#_deleted <> :_deleted",
    ExpressionAttributeNames: {
      "#email": "email",
      "#_deleted": "_deleted",
    },
    ExpressionAttributeValues: {
      ":email": { S: email },
      ":_deleted": { BOOL: true },
    },
  };

  // Call DynamoDB to read the item from the table
  try {
    const data = await ddb.query(params).promise();
    return data;
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`);
    return null;
  }
};

writeItem = async (id, userName, email) => {
  const date = new Date();

  const params = {
    Item: {
      id: { S: id },
      __typename: { S: "User" },
      organizationID: { S: "d80b954b-9477-4061-aa8a-c14c5711143b" },
      role: { S: "Students" },
      email: { S: email },
      createdAt: { S: date.toISOString() },
      createdBy: { S: "1" },
      updatedAt: { S: date.toISOString() },
      updatedBy: { S: "1" },
      _lastChangedAt: { N: date.getTime().toString() },
      _version: { N: "1" },
    },
    TableName: TABLE_NAME,
  };

  try {
    const data = await ddb.putItem(params).promise();
    return data;
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`);
    return null;
  }
};

exports.handler = async (event, context) => {
  const cognitoUserId = event.request.userAttributes.sub;
  const userName = event.userName;
  const email = event.request.userAttributes.email;

  if (cognitoUserId) {
    const data = await readItem(email);
    console.log(`DATA: ${JSON.stringify(data)}`);
    if (data.Count == 0) {
      const ans = await writeItem(cognitoUserId, userName, email);
      if (ans === null) {
        console.log("Error: Nothing was written to DynamoDB");
      } else {
        console.log(
          "Success: User with id " + cognitoUserId + " Inserted correctly"
        );
      }
    } else {
      console.log("User with id " + cognitoUserId + " already exist");
    }

    return event;
  } else {
    console.log("Error: Nothing was written to DynamoDB");
    return event;
  }
};
