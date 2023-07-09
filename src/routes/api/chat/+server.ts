import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

import { json } from "@sveltejs/kit";

import { env } from "$env/dynamic/private";
// You may want to replace the above with a static private env variable
// for dead-code elimination and build-time type-checking:
// import { OPENAI_API_KEY } from '$env/static/private'

import type { RequestHandler } from "../gpt-input/$types";

// Create an OpenAI API client
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const POST = (async ({ request, locals }) => {
  const { messages } = await request.json();

  if (!locals.pb) {
    return json({ message: "could not get promt info from DB, because there was no DB connection" });
  }

  const collectionData = await locals.pb.collection("prompt_info").getFullList({
    sort: "-created",
  });

  const promptInfo = collectionData[0];

  let baseMessage = `
  Here is a summary of our story so far. 
  SUMMARY:
  ${promptInfo.summary}
  ____
  Here is some additional context. This is not all the context that exists, just what the user chose to include.
  CONTEXT
  -----
`; // i had to make it so the context is simply the first message from the user

  const history = messages.map((message: any) => ({
    content: message.content,
    role: message.role,
  }));

  let finalMessages = [
    { role: "system", content: promptInfo.system_message },
    { role: "user", content: baseMessage },
  ];

  finalMessages = finalMessages.concat(history);
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: finalMessages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}) satisfies RequestHandler;
