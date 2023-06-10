// Imports global types
import "@twilio-labs/serverless-runtime-types";
// Fetches specific types
import { ServerlessFunctionSignature } from "@twilio-labs/serverless-runtime-types/types";
import { BaseContext } from "../../types";

interface Event {}

export const handler: ServerlessFunctionSignature<BaseContext, Event> = (
  context,
  event,
  callback
) => {
  const twiml = new Twilio.twiml.MessagingResponse();
  twiml.message("Hello World!");
  callback(null, twiml);
};
