var AWS = require("aws-sdk");
var ses = new AWS.SES({ region: "us-east" });

exports.handler = async function (event) {
  const { message, topic, emailList } = event.arguments.input;

  console.log("Message: " + message);
  console.log("Topic: " + topic);
  console.log("EmailList: " + emailList);

  var params = {
    Destination: {
      ToAddresses: ["santiago.molina.g@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: message },
      },

      Subject: { Data: topic },
    },
    Source: "smolinag@unal.edu.co",
  };

  return ses.sendEmail(params).promise();
};
