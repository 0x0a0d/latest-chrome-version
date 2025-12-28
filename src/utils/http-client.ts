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
 * Minimal HTTPS POST client to replace axios
 */
export const post = <T = any>(
  url: string,
  data: any,
  options: HttpOptions = {}
): Promise<HttpResponse<T>> => {
  const fullUrl = buildUrl(url, options.params)
  const body = typeof data === 'string' ? data : JSON.stringify(data)

  const requestOptions: RequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': typeof data === 'string' ? 'application/xml' : 'application/json',
      'Content-Length': Buffer.byteLength(body),
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
        resolve({
          data: responseBody as unknown as T,
          status: res.statusCode || 0,
          headers: res.headers
        })
      })
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}
