import { describe, it, expect } from 'vitest'
import { latestChromeVersion } from '../latest-chrome-version'

describe('latestChromeVersion integration', () => {
  it('should fetch version for mac legacy versions', async () => {
    expect(await latestChromeVersion('mac', '10.6')).toBe('49.0.2623.112')
    expect(await latestChromeVersion('mac', '10.12')).toBe('103.0.5060.134')
  })

  it('should fetch modern mac version and it should be >= 143', async () => {
    const version = await latestChromeVersion('mac', '14')
    const majorVersion = parseInt(version.split('.')[0], 10)
    expect(majorVersion).toBeGreaterThanOrEqual(143)
  }, 15000)

  it('should fetch standard mac version and it should be >= 143', async () => {
    const version = await latestChromeVersion('mac')
    const majorVersion = parseInt(version.split('.')[0], 10)
    expect(majorVersion).toBeGreaterThanOrEqual(143)
  }, 15000)

  it('should fetch a real version for Windows and it should be >= 143', async () => {
    const version = await latestChromeVersion('win')
    const majorVersion = parseInt(version.split('.')[0], 10)
    expect(majorVersion).toBeGreaterThanOrEqual(143)
  }, 15000)
})
