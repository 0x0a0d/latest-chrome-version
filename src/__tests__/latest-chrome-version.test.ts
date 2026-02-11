import { describe, it, expect, vi, beforeEach } from 'vitest'
import { latestChromeVersion } from '../latest-chrome-version'
import * as http from '../utils/http-client'

vi.mock('../utils/http-client')

describe('latestChromeVersion', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return version from Chrome for Testing API', async () => {
    const mockJson = {
      channels: {
        Stable: { version: '121.0.6167.85' }
      }
    }
    const mockedHttpGet = vi.mocked(http.get)
    mockedHttpGet.mockResolvedValue({
      data: mockJson,
      status: 200,
      headers: { 'content-type': 'application/json' }
    } as any)

    const version = await latestChromeVersion()
    expect(version).toBe('121.0.6167.85')
    expect(http.get).toHaveBeenCalledWith(
      'https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json'
    )
  })

  it('should throw error if CfT API fails', async () => {
    const mockedHttpGet = vi.mocked(http.get)
    mockedHttpGet.mockResolvedValue({
      data: null,
      status: 500,
      headers: {}
    } as any)

    await expect(latestChromeVersion()).rejects.toThrow('Request failed. Response status should be 200, got 500')
  })
})
