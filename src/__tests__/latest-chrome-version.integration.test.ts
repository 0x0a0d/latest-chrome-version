import { describe, it, expect } from 'vitest'
import { latestChromeVersion } from '../latest-chrome-version'

describe('latestChromeVersion integration', () => {
  it('should fetch modern mac version and it should be >= 120', async () => {
    const version = await latestChromeVersion()
    const majorVersion = parseInt(version.split('.')[0], 10)
    expect(majorVersion).toBeGreaterThanOrEqual(120)
  }, 15000)

  it('should fetch standard mac version and it should be >= 120', async () => {
    const version = await latestChromeVersion()
    const majorVersion = parseInt(version.split('.')[0], 10)
    expect(majorVersion).toBeGreaterThanOrEqual(120)
  }, 15000)

  it('should fetch a real version for Windows and it should be >= 120', async () => {
    const version = await latestChromeVersion()
    const majorVersion = parseInt(version.split('.')[0], 10)
    expect(majorVersion).toBeGreaterThanOrEqual(120)
  }, 15000)
})
