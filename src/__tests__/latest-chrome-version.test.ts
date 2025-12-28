import { describe, it, expect, vi, beforeEach } from 'vitest'
import { latestChromeVersion } from '../latest-chrome-version'
import * as http from '../utils/http-client'

vi.mock('../utils/http-client')

describe('latestChromeVersion', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return version for mac platform', async () => {
    const mockXml = '<?xml version="1.0" encoding="UTF-8"?><response><app><updatecheck status="ok"><manifest version="120.0.6099.129"/></updatecheck></app></response>'
    const mockedHttpPost = vi.mocked(http.post)
    mockedHttpPost.mockResolvedValue({
      data: mockXml,
      status: 200,
      headers: {}
    } as any)

    const version = await latestChromeVersion('mac')
    expect(version).toBe('120.0.6099.129')
    expect(http.post).toHaveBeenCalledWith(
      expect.stringContaining('tools.google.com'),
      expect.stringContaining('com.google.Chrome'),
      expect.any(Object)
    )
  })

  it('should throw error if status is not 200', async () => {
    const mockedHttpPost = vi.mocked(http.post)
    mockedHttpPost.mockResolvedValue({
      data: '',
      status: 500,
      headers: {}
    } as any)

    await expect(latestChromeVersion()).rejects.toThrow('Request failed. Response status should be 200')
  })

  it('should throw error if updatecheck status is not ok', async () => {
    const mockXml = '<?xml version="1.0" encoding="UTF-8"?><response><app><updatecheck status="noupdate"/></app></response>'
    const mockedHttpPost = vi.mocked(http.post)
    mockedHttpPost.mockResolvedValue({
      data: mockXml,
      status: 200,
      headers: {}
    } as any)

    await expect(latestChromeVersion()).rejects.toThrow('[NoUpdate]: Check params: platform, os_version')
  })

  it('should throw error if parsing fails', async () => {
    const mockXml = '<?xml version="1.0" encoding="UTF-8"?><response><app><updatecheck status="ok"></updatecheck></app></response>'
    const mockedHttpPost = vi.mocked(http.post)
    mockedHttpPost.mockResolvedValue({
      data: mockXml,
      status: 200,
      headers: {}
    } as any)

    await expect(latestChromeVersion()).rejects.toThrow('parseVersion failed')
  })
})
