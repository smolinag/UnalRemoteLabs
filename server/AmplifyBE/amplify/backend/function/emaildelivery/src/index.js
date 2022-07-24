var AWS = require("aws-sdk");
var ses = new AWS.SES({ region: "us-east-2" });

exports.handler = async function (event) {
  const { message, topic, emailList } = event.arguments.input;

  console.log("Message: " + message);
  console.log("Topic: " + topic);
  console.log("EmailList: " + emailList);
  console.log("EmailListJson: " + JSON.parse(emailList))

  var params = {
    Destination: {
      ToAddresses: JSON.parse(emailList),
    },
    Message: {
      Body: {
        Text: { Data: message },
      },

      Subject: { Data: topic },
    },
    Source: "labremotosunalmzl@gmail.com",
  };

  return ses.sendEmail(params).promise();
};
