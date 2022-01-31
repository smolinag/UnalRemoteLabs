var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();

const TABLE_NAME = "User-bd36mmgvjjcjzfrtzph2g44mqq-dev";

readItem = async () => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      KEY_NAME: { S: "001" },
    },
    ProjectionExpression: "ATTRIBUTE_NAME",
  };

  // Call DynamoDB to read the item from the table
  ddb.getItem(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Item);
    }
  });
};

writeItem = async (id, userName, email) => {
  const date = new Date();
  let ans = "Success";

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
    await ddb.putItem(params).promise();
    console.log(ans);
  } catch (err) {
    ans = "Error";
    console.log(ans, err);
  }
  return ans;
};

exports.handler = async (event, context) => {
  const cognitoUserId = event.request.userAttributes.sub;
  if (cognitoUserId) {
    await writeItem(
      cognitoUserId,
      event.userName,
      event.request.userAttributes.email
    );
    console.log(
      "Success: User with id " + cognitoUserId + " Inserted correctly"
    );
    return event;
  } else {
    console.log("Error: Nothing was written to DynamoDB");
    return event;
  }
};
