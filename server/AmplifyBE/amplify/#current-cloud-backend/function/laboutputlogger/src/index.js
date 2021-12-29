exports.handler = async (event) => {
  let ans = null;
  try {
    console.log(event.arguments.input);
    ans = event.arguments.input;
  } catch (e) {
    console.log(e);
  }
  return ans;
};
