var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();
const cognito = new aws.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

const TABLE_NAME = process.env.USER_TABLE;

readItem = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    IndexName: "byEmail",
    KeyConditionExpression: "#email = :email",
    ExpressionAttributeNames: {
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
  };

  // Call DynamoDB to read the item from the table
  try {
    const data = await ddb.query(params).promise();
    return data;
  } catch (err) {
    console.log("Error", err);
    return null;
  }
};

writeItem = async (id, userName, email) => {
  const date = new Date();

  const params = {
    Item: {
      id: { S: id },
      __typename: { S: "User" },
      userName: { S: userName },
      email: { S: email },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
    },
    // TableName: process.env.USERTABLE,
    TableName: TABLE_NAME,
  };

  try {
    const data = await ddb.putItem(params).promise();
    return data;
  } catch (err) {
    console.log("Error", err);
    return null;
  }
};

addUserToStudentsGroup = async (userPoolId, userName) => {
  const GROUP = "Students";

  const groupParams = {
    GroupName: GROUP,
    UserPoolId: userPoolId,
  };
  const addUserParams = {
    GroupName: GROUP,
    UserPoolId: userPoolId,
    Username: userName,
  };
  /**
   * Check if the group exists; if it doesn't, create it.
   */
  try {
    const data = await cognito.getGroup(groupParams).promise();
    console.log(JSON.stringify(data));
  } catch (err) {
    console.log("Error", err);
    await cognito.createGroup(groupParams).promise();
  }
  /**
   * Then, add the user to the group.
   */
  try {
    await cognito.adminAddUserToGroup(addUserParams).promise();
  } catch (err) {
    console.log("Error", err);
  }
  return "Ok";
};

exports.handler = async (event, context) => {
  const cognitoUserId = event.request.userAttributes.sub;
  const userName = event.userName;
  const email = event.request.userAttributes.email;
  const userPoolId = event.userPoolId;
  if (cognitoUserId) {
    const data = await readItem(email);
    if (data.Count == 0) {
      await writeItem(cognitoUserId, userName, email);
      console.log(
        "Success: User with id " + cognitoUserId + " Inserted correctly"
      );
    } else {
      console.log("User with id " + cognitoUserId + " already exist");
    }

    await addUserToStudentsGroup(userPoolId, userName);

    return event;
  } else {
    console.log("Error: Nothing was written to DynamoDB");
    return event;
  }
};
