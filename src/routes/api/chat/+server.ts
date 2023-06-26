import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

import { env } from '$env/dynamic/private'
// You may want to replace the above with a static private env variable
// for dead-code elimination and build-time type-checking:
// import { OPENAI_API_KEY } from '$env/static/private'

import type { RequestHandler } from '../gpt-input/$types'

// Create an OpenAI API client
const config = new Configuration({
  apiKey: env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export const POST = (async ({ request }) => {

  // Extract the `prompt` from the body of the request
  const { messages} = await request.json()


  let baseMessage = `
  "Here is a summary of the story so far: 
    SUMMARY:
    In 'The Chronicles of Sunnyside,' 
    a close-knit village faces various challenges, with each narrative highlighting the unique abilities and personalities of its residents. 
    The vibrant characters range from Evelyn, the wise elder, to Samuel, the diligent carpenter, each providing a unique skill set and perspective that contributes to the prosperity of Sunnyside. 
    As they navigate severe droughts, harsh winters, and missing pets, they learn to leverage their shared histories and individual strengths to overcome hardship. 
    This heartwarming novel unfolds against a backdrop of camaraderie, adventure, and the resilience of the human spirit, exploring the power of unity and friendship in the face of adversity."
    ------
  Here is some additional context. This is not all the context that exists, just what the user chose to include.
  CONTEXT
  -----
` // i had to make it so the context is simply the first message from the user 

  const history = messages.map((message: any) => ({
    content: message.content,
    role: message.role}))

  let finalMessages = [{role: "system", content: "You are assisting our user to write stories."},
  {role: "user", content: baseMessage}
]

  finalMessages = finalMessages.concat(history);  
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: finalMessages
  })

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response)
  // Respond with the stream
  return new StreamingTextResponse(stream)
}) satisfies RequestHandler