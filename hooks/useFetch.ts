export type RequestModel = {
  params?: string
  headers?: object
  signal?: AbortSignal
}

export type RequestType<T = unknown> = {
  params?: string
  body?: T
} & RequestInit

export type RequestWithBodyModel = RequestModel & {
  body?: object | FormData
}

export const useFetch = () => {
  const handleFetch = async <T>(
    url: string,
    request: RequestType<T>,
    signal?: AbortSignal,
  ): Promise<T> => {
    const requestUrl = request?.params ? `${url}${request.params}` : url

    const requestBody = request?.body
      ? request.body instanceof FormData
        ? { ...request, body: request.body }
        : { ...request, body: JSON.stringify(request.body) }
      : request

    const headers = {
      ...(request?.headers
        ? request.headers
        : request?.body && !(request.body instanceof FormData)
          ? { 'Content-type': 'application/json' }
          : {}),
    }

    return fetch(requestUrl, { ...requestBody, headers, signal })
      .then(response => {
        if (!response.ok) throw response

        const contentType = response.headers.get('content-type')
        const contentDisposition = response.headers.get('content-disposition')

        const result =
          contentType &&
          (contentType?.indexOf('application/json') !== -1 ||
            contentType?.indexOf('text/plain') !== -1)
            ? response.json()
            : contentDisposition?.indexOf('attachment') !== -1
              ? response.blob()
              : response

        return result as Promise<T>
      })
      .catch(async (err: Response) => {
        const contentType = err.headers.get('content-type')

        const errResult =
          contentType && contentType?.indexOf('application/problem+json') !== -1
            ? ((await err.json()) as T)
            : err

        throw errResult
      })
  }

  return {
    get: async <T>(url: string, request?: RequestType<T>): Promise<T> => {
      return handleFetch<T>(url, { ...request, method: 'get' })
    },
    post: async <T>(url: string, request?: RequestType<T>): Promise<T> => {
      return handleFetch<T>(url, { ...request, method: 'post' })
    },
    put: async <T>(url: string, request?: RequestType<T>): Promise<T> => {
      return handleFetch<T>(url, { ...request, method: 'put' })
    },
    patch: async <T>(url: string, request?: RequestType<T>): Promise<T> => {
      return handleFetch<T>(url, { ...request, method: 'patch' })
    },
    delete: async <T>(url: string, request?: RequestType<T>): Promise<T> => {
      return handleFetch<T>(url, { ...request, method: 'delete' })
    },
  }
}
