import type { RequestHandler } from './$types';
import {OpenAIApi, Configuration} from "openai-edge"
import { json } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

// Create an OpenAI API client
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);


export const POST = async ({ request }) => {

    // Extract the `prompt` from the body of the request
    const { message} = await request.json()
    console.log("got request")

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo-0613",
        messages: [
            {"role": "system", content: "You are transforming raw descriptions into usable data."},
            {"role": "user", content: "Here is a character description, fill out the relevant details. If no age is specified, make a best guess with the available information"},
            {"role": "user", content: message}
        ],
        functions: [
            {
                "name": "get_character_details",
                "description": "Get the details of a character",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "description": "The name of the character",
                        },
                        "one_line_description": {
                            "type": "string",
                            "description": "A one line description of the character"
                        },
                        "short_description": {
                            "type": "string",
                            "description": "A short description of the character"
                        },
                        "long_description": {
                            "type": "string",
                            "description": "A long description of the character"
                        },
                        "age": {
                            "type": "integer",
                            "description": "The age of the character"
                        },
                        "birthdate": {
                            "type": "string",
                            "description": "The birthdate of the character",
                        },
                        "core_cast": {
                            "type": "boolean",
                            "description": "Is the character part of the core cast?"
                        },
                    },
                    "required": ["name", "one_line_description", "age"],
                },
            }
        ],
        function_call: "auto"
    })
    try {
    const data = await completion.json()
    const completionResponse = data.choices[0].message; // Extract the generated completion from the OpenAI API respons
    
    const completionArguments = JSON.parse(completionResponse.function_call.arguments); // Extract the argument for the function call
    console.log(completionArguments)

    return json(completionArguments)

    } catch (err) {
        console.log(err)
        return json({})
    }
};


