import { IncomingMessage } from 'http'

export interface HttpResponse<T = any> {
  data: T
  status: number
  headers: IncomingMessage['headers']
}

export interface HttpOptions {
  params?: Record<string, string>
  headers?: Record<string, string>
}
