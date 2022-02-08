exports.handler = async (event) => {
  // allowed domains
  const DOMAIN_ALLOW_LIST = ["unal.edu.co", "gmail.com"];

  const { email } = event.request.userAttributes;
  const domain = email.substring(email.indexOf("@") + 1);

  if (!DOMAIN_ALLOW_LIST.includes(domain)) {
    console.log(`Invalid email domain: ${domain}`);
    throw new Error(`Invalid email domain: ${domain}`);
  } else {
    console.log(`Valid email domain: ${domain}`);
  }

  return event;
};
