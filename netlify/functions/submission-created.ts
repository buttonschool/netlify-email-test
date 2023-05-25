import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { sendEmail } from "@netlify/emails";

interface SubmissionBody {
  payload: {
    name: string;
    email: string;
    data: {
      name: string;
      email: string;
      course?: string;
      format?: string;
      request?: string;
    };
  };
}

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const body: SubmissionBody = JSON.parse(event.body ? event.body : "");
  const { name, email, course, request } = body.payload.data;

  await sendEmail({
    from: "nevan@buttonschool.com",
    to: email,
    subject: "Test email",
    template: "test",
    parameters: {
      name: name,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World",
      name,
      email,
    }),
  };
};

export { handler };
