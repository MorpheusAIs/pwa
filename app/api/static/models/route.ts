import { availableModels, type StaticModel } from '@/utils/app/models'

export function GET() {
  const models: StaticModel[] = availableModels
    .map((model: StaticModel) => {
      return {
        id: model.name,
        ...model,
      }
    })
    .filter(Boolean)

  return Response.json(models)
}
