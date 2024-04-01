import { useCallback } from 'react'

import { useFetch } from '@/hooks/useFetch'
import { type OllamaModel } from '@/types/ollama'

const useApiService = () => {
  const fetchService = useFetch()

  const getModels = useCallback((): Promise<OllamaModel[]> => {
    return fetchService.get(`/api/static/models`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }, [fetchService])

  const getAboutPage = useCallback((): Promise<string> => {
    return fetchService.get(`/api/about`)
  }, [fetchService])

  // const getModelDetails = useCallback(
  //   (name: string) => {
  //     return fetchService.post(`/api/modeldetails`, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ name }),
  //     })
  //   },
  //   [fetchService],
  // )

  return {
    getModels,
    getAboutPage,
  }
}

export default useApiService
