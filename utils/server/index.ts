/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { availableModels } from '../app/models'

export class OllamaError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OllamaError'
  }
}

const host = process.env.OLLAMA_HOST || 'http://127.0.0.1:11434'

const getModelUrl = (model: string): string => {
  const selectedModel = availableModels.find(m => m.name === model)
  return selectedModel ? selectedModel.url : host
}

export const OllamaStream = async (
  model: string,
  systemPrompt: string,
  temperature: number,
  num_predict: number,
  prompt: string,
) => {
  const modelUrl = getModelUrl(model)
  const url = `${modelUrl}/api/generate`
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      prompt,
      system: systemPrompt,
      options: {
        temperature,
        num_predict,
      },
    }),
  })

  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  if (res.status !== 200) {
    const result = await res.json()
    if (result.error) {
      throw new OllamaError(result.error)
    }
  }

  const responseStream = new ReadableStream({
    async start(controller) {
      try {
        if (res.body === null) {
          throw new Error('Response body is null')
        }

        const reader = res.body.getReader()
        let partialData = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = partialData + decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i]
            if (line.trim() !== '') {
              const parsedData = JSON.parse(line)
              if (parsedData.response) {
                controller.enqueue(encoder.encode(parsedData.response))
              }
            }
          }

          partialData = lines[lines.length - 1]
        }

        controller.close()
      } catch (e) {
        controller.error(e)
      }
    },
  })

  return responseStream
}
