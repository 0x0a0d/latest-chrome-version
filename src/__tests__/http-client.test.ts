import { describe, it, expect, vi } from 'vitest'
import * as http from '../utils/http-client'
import https from 'https'
import { EventEmitter } from 'events'

vi.mock('https')

describe('http-client', () => {
  describe('post', () => {
    it('should send a POST request with correct options', async () => {
      const mockReq = new EventEmitter() as any
      mockReq.write = vi.fn()
      mockReq.end = vi.fn()

      const mockRes = new EventEmitter() as any
      mockRes.statusCode = 200
      mockRes.headers = { 'content-type': 'application/json' }

      const mockedHttpsRequest = https.request as any
      mockedHttpsRequest.mockImplementation((url: string, options: any, callback: any) => {
        if (callback) callback(mockRes)
        return mockReq
      })

      const promise = http.post('https://example.com/api', { foo: 'bar' }, {
        params: { q: 'search' },
        headers: { 'X-Custom': 'value' }
      })

      mockRes.emit('data', '{"result":"ok"}')
      mockRes.emit('end')

      const response = await promise

      expect(https.request).toHaveBeenCalledWith(
        'https://example.com/api?q=search',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'X-Custom': 'value',
            'Content-Type': 'application/json'
          })
        }),
        expect.any(Function)
      )
      expect(response.data).toBe('{"result":"ok"}')
      expect(response.status).toBe(200)
    })

    it('should handle request errors', async () => {
      const mockReq = new EventEmitter() as any
      mockReq.write = vi.fn()
      mockReq.end = vi.fn()

      const mockedHttpsRequest = https.request as any
      mockedHttpsRequest.mockReturnValue(mockReq)

      const promise = http.post('https://example.com/api', {})

      const error = new Error('Network error')
      mockReq.emit('error', error)

      await expect(promise).rejects.toThrow('Network error')
    })
  })
})
