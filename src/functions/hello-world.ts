// Imports global types
import "@twilio-labs/serverless-runtime-types";
// Fetches specific types
import { ServerlessFunctionSignature } from "@twilio-labs/serverless-runtime-types/types";
import { BaseContext } from "../types";

type MyEvent = {
  Body?: string;
};

export const handler: ServerlessFunctionSignature<BaseContext, MyEvent> = (
  context,
  event,
  callback
) => {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say(`Hello"} ${event.Body ? event.Body : "World"}!`);
  callback(null, twiml);
};
