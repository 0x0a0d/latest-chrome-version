import { latestChromeVersion } from './latest-chrome-version'

describe('latestChromeVersion', function() {
  it('mac', async() => {
    expect(await latestChromeVersion('mac', '10.6')).toBe('49.0.2623.112')
    expect(await latestChromeVersion('mac', '10.6')).toBe('49.0.2623.112')
    expect(await latestChromeVersion('mac', '10.12')).toBe('103.0.5060.134')

    const version = await latestChromeVersion('mac', '13')
    expect(parseInt(version.split('.')[0]) >= 112).toBe(true)
  })
  it('win', async() => {
    const version = await latestChromeVersion('win')
    expect(parseInt(version.split('.')[0]) >= 112).toBe(true)
  })
})
