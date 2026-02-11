import { request, RequestOptions } from 'https'
import { URL } from 'url'
import { HttpResponse, HttpOptions } from '../../types/http'

const buildUrl = (baseUrl: string, params?: Record<string, string>): string => {
  const url = new URL(baseUrl)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }
  return url.toString()
}

/**
 * Minimal HTTPS GET client
 */
export const get = <T = any>(
  url: string,
  options: HttpOptions = {}
): Promise<HttpResponse<T>> => {
  const fullUrl = buildUrl(url, options.params)

  const requestOptions: RequestOptions = {
    method: 'GET',
    headers: {
      ...options.headers
    }
  }

  return new Promise((resolve, reject) => {
    const req = request(fullUrl, requestOptions, (res) => {
      let responseBody = ''
      res.on('data', (chunk) => {
        responseBody += chunk
      })
      res.on('end', () => {
        let data = responseBody as unknown as T
        if (res.headers['content-type']?.includes('application/json')) {
          try {
            data = JSON.parse(responseBody)
          } catch (e) {
            // ignore
          }
        }
        resolve({
          data,
          status: res.statusCode || 0,
          headers: res.headers
        })
      })
    })

    req.on('error', reject)
    req.end()
  })
}
