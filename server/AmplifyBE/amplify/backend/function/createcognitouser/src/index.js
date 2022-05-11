/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });

const USER_POOL_ID = "us-east-2_sYVFylt3P";

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

const createUser = async (email, password) => {
  var params = {
    UserPoolId: USER_POOL_ID,
    Username: email,
    DesiredDeliveryMediums: ["EMAIL"],
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "email_verified",
        Value: "true",
      },
    ],
  };

  let response;

  // This function also sends an email to the user.
  await cognitoidentityserviceprovider
    .adminCreateUser(params)
    .promise()
    .then((ans) => {
      console.log(
        `Cognito user ${email} created successfully: ${JSON.stringify(ans)}`
      );
      response = { status: "OK", data: ans };
    })
    .catch((error) => {
      console.log(
        `Error creating coginto user ${email}: ${JSON.stringify(error)}`
      );
      response = { status: "ERROR", data: error };
    });

  return response;
};

exports.handler = async (event) => {
  console.log(
    `Function create cognito user called with event: ${JSON.stringify(event)}`
  );
  const { email, password } = event.arguments.input;
  const ans = await createUser(email, password);
  return ans;
};
