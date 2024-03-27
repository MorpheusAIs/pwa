import { type OllamaModel } from '@/types/ollama'
import { OLLAMA_HOST } from '@/utils/app/const'
import { OllamaError } from '@/utils/server'

type Response = {
  models: OllamaModel[]
}

export async function GET() {
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/tags`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: 5000,
      },
    })
    const data: Response = (await res.json()) as Response

    const models: OllamaModel[] = data.models
      .map((model: OllamaModel) => {
        return {
          id: model.name,
          ...model,
        }
      })
      .filter(Boolean)

    return Response.json(models)
  } catch (error) {
    if (error instanceof OllamaError) {
      return new Response('Error', { status: 500, statusText: error.message })
    } else {
      return new Response('Error', { status: 500 })
    }
  }
}
