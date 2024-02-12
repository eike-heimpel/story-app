import { OpenAIApi, Configuration } from "openai-edge";
import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { collections } from "$lib/collection_schemas";
import type { UserInputCollections } from "$lib/collection_schemas/user_input_collections.js";
import { error, redirect } from "@sveltejs/kit";

// Create an OpenAI API client
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const POST = async ({ request, locals }) => {
  // Extract the `prompt` from the body of the request

  const { message, collectionName } = await request.json();
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: "system", content: "You are transforming raw descriptions into an easily parsable data schema." },
      {
        role: "user",
        content:
          "Here is a character description, fill out the relevant details. If no age is specified, make a best guess with the available information",
      },
      { role: "user", content: message },
    ],
    temperature: 0,
    functions: [collections[collectionName as UserInputCollections].description],
    function_call: { name: collections[collectionName as UserInputCollections].description.name }, // figure out why it does not complain about a wrong description key
  });

  console.log(completion);

  let completionArguments;
  try {
    const data = await completion.json();
    const completionResponse = data.choices[0].message; // Extract the generated completion from the OpenAI API respons

    completionArguments = JSON.parse(completionResponse.function_call.arguments); // Extract the argument for the function call
    return json(completionArguments);
  } catch (err) {
    console.log(err);
    throw error(422, "unable to process LLM output");
  }
  try {
    collections[collectionName as UserInputCollections].schema.parse(completionArguments);
  } catch {
    throw error(422, "unable to zod parse LLM output");
  }

  completionArguments.user = locals.user.id;
  let insertedRecord;
  try {
    insertedRecord = await locals.pb.collection(collectionName).create(completionArguments);
  } catch (err) {
    return json({ message: "unable to create entry", error: JSON.stringify(err) }, { status: 422 });
  }
  return json(insertedRecord);
};
