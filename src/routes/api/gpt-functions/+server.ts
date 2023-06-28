import {OpenAIApi, Configuration} from "openai-edge"
import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import {descriptionsMap} from "$lib/collection_info"
import type { Collections } from '$lib/pocketbase_types';

// Create an OpenAI API client
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);


export const POST = async ({ request, locals }) => {

    // Extract the `prompt` from the body of the request
    const { message, collectionName } = await request.json()

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: [
            {"role": "system", content: "You are transforming raw descriptions into an easily parsable data schema."},
            {"role": "user", content: "Here is a character description, fill out the relevant details. If no age is specified, make a best guess with the available information"},
            {"role": "user", content: message}
        ],
        temperature: 0,
        functions: [
            descriptionsMap[collectionName as Collections] 
        ],
        function_call: {"name": descriptionsMap[collectionName as Collections].name}
    });

    try {
    const data = await completion.json()
    const completionResponse = data.choices[0].message; // Extract the generated completion from the OpenAI API respons
    
    const completionArguments = JSON.parse(completionResponse.function_call.arguments); // Extract the argument for the function call

    completionArguments.user = locals.user.id;
    let insertedRecord;
    try {
        insertedRecord = await locals.pb.collection(collectionName).create(completionArguments);
    } catch (err) {
        return json({"message": "unable to create entry", "error": JSON.stringify(err)}, { status: 422 })
    }
    return json(insertedRecord)

    } catch (err) {
        console.log(err)
        return json({})
    }
};


