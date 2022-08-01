var AWS = require('aws-sdk');

var iotdata = new AWS.IotData({endpoint:"a18wpf5gcnjwiy-ats.iot.us-east-2.amazonaws.com"});

exports.handler = async (event) => {

    const { message, topic } = event.arguments.input;

    console.log("Message: " + message);
    console.log("Topic: " + topic);

    var params = {
        topic: topic,
        payload: message,
        qos: 0
        };

    try{
        const ans = await iotdata.publish(params).promise();
        console.log("Ans: ", ans);
    } catch(err){
            console.log("Error occured : ",err);
    };
    return "ok";
};
