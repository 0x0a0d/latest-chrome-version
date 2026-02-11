import { describe, it, expect, vi } from 'vitest'
import * as http from '../utils/http-client'
import https from 'https'
import { EventEmitter } from 'events'

vi.mock('https')

describe('http-client', () => {
  describe('get', () => {
    it('should send a GET request with correct options', async () => {
      const mockReq = new EventEmitter() as any
      mockReq.end = vi.fn()

      const mockRes = new EventEmitter() as any
      mockRes.statusCode = 200
      mockRes.headers = { 'content-type': 'application/json' }

      const mockedHttpsRequest = https.request as any
      mockedHttpsRequest.mockImplementation((url: string, options: any, callback: any) => {
        if (callback) callback(mockRes)
        return mockReq
      })

      const promise = http.get('https://example.com/api', {
        params: { q: 'search' },
        headers: { 'X-Custom': 'value' }
      })

      mockRes.emit('data', '{"result":"ok"}')
      mockRes.emit('end')

      const response = await promise

      expect(https.request).toHaveBeenCalledWith(
        'https://example.com/api?q=search',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'X-Custom': 'value'
          })
        }),
        expect.any(Function)
      )
      expect(response.data).toEqual({ result: 'ok' })
      expect(response.status).toBe(200)
    })
  })
})
