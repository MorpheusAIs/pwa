// models.ts

export interface StaticModel {
  name: string
  url: string
  size: number
  modified_at: string
}

export const availableModels: StaticModel[] = [
  {
    name: 'mistral:latest',
    size: 4108916866,
    url: process.env.OLLAMA_HOST ?? '',
    modified_at: '2023-11-17T09:56:17.691351257-06:00',
  },
  {
    name: 'llama2:latest',
    size: 4108916866,
    url: process.env.OLLAMA_HOST_1 ?? '',
    modified_at: '2023-11-17T09:56:17.691351257-06:00',
  },
  {
    name: 'llama2:7b',
    size: 4108916866,
    url: process.env.OLLAMA_HOST_1 ?? '',
    modified_at: '2024-04-20T09:56:17.691351257-06:00',
  },
  // Add more models as needed
]
