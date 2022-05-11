/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });

const USER_POOL_ID = "us-east-2_sYVFylt3P";

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

const getUsersByEmail = async (email) => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Filter: `email = "${email}"`,
  };

  let response;
  await cognitoidentityserviceprovider
    .listUsers(params)
    .promise()
    .then((ans) => {
      console.log(
        `Cognito users by email ${email} found: ${JSON.stringify(ans)}`
      );
      response = { status: "OK", data: ans };
    })
    .catch((error) => {
      console.log(
        `Error finding cognito users by email ${email}: ${JSON.stringify(
          error
        )}`
      );
      response = { status: "ERROR", data: error };
    });
  return response;
};

const deleteUserByUsername = async (username) => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: username,
  };

  let response;
  await cognitoidentityserviceprovider
    .adminDeleteUser(params)
    .promise()
    .then((ans) => {
      console.log(`Cognito user ${username} deleted successfully`);
      response = { status: "OK", data: ans };
    })
    .catch((error) => {
      console.log(
        `Error deleting coginto user ${username}: ${JSON.stringify(error)}`
      );
      response = { status: "ERROR", data: error };
    });
  return response;
};

exports.handler = async (event) => {
  console.log(
    `Function remove cognito user called with event: ${JSON.stringify(event)}`
  );
  const { email } = event.arguments;
  const ans = await getUsersByEmail(email);

  if (ans.status === "OK") {
    const users = ans.data.Users;

    if (users.length === 0) {
      return `No user found in cognito with email: ${email}`;
    }

    for (const user of users) {
      await deleteUserByUsername(user.Username);
    }
  } else {
    return "ERROR";
  }

  return "OK";
};
