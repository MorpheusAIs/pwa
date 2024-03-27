import { type ChatBody } from '@/types/chat'
import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const'
import { OllamaError, OllamaStream } from '@/utils/server'

export const maxDuration = 60

export async function POST(req: Request): Promise<Response> {
  try {
    const { model, system, options, prompt } = (await req.json()) as ChatBody

    let promptToSend = system
    if (!promptToSend) {
      promptToSend = DEFAULT_SYSTEM_PROMPT
    }

    let temperatureToUse = options?.temperature
    if (temperatureToUse === null) {
      temperatureToUse = DEFAULT_TEMPERATURE
    }

    const stream = await OllamaStream(model, promptToSend, temperatureToUse ?? 1, -1, prompt)

    return new Response(stream)
  } catch (error) {
    console.error(error)
    if (error instanceof OllamaError) {
      return new Response('Error', { status: 500, statusText: error.message })
    } else {
      return new Response('Error', { status: 500 })
    }
  }
}
