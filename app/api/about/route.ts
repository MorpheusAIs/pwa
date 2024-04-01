//https://raw.githubusercontent.com/MorpheusAIs/Morpheus/blob/main/WhitePaper.md

import { OllamaError } from '@/utils/server'

export async function GET() {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/MorpheusAIs/Docs/main/!KEYDOCS%20README%20FIRST!/WhitePaper.md`,
    )
    const data = await res.text()

    return Response.json(data)
  } catch (error) {
    if (error instanceof OllamaError) {
      return new Response('Error', { status: 500, statusText: error.message })
    } else {
      return new Response('Error', { status: 500 })
    }
  }
}
