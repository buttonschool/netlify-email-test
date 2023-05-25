import type { Handler } from "@netlify/functions";
import { sendEmail } from "@netlify/emails";

const handler: Handler = async function (event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const requestBody = JSON.parse(event.body) as {
    name: string;
    email: string;
  };

  //automatically generated snippet from the email preview
  //sends a request to an email handler for a subscribed email

  await sendEmail({
    from: "nevan@buttonschool.com",
    to: requestBody.email,
    subject: "Test email",
    template: "test",
    parameters: {
      name: requestBody.name,
    },
  });
  return {
    statusCode: 200,
    body: JSON.stringify("Email sent!"),
  };
};

export { handler };
