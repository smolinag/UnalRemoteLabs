exports.handler = (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(context));
  console.log(JSON.stringify(callback));
  return event;
};
