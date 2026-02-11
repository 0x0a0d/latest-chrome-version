import * as http from './utils/http-client'

type CfIDownload = {
  platform: 'linux64' | 'mac-arm64' | 'mac-x64' | 'win32' | 'win64';
  url: string;
}

type CfTItem = {
  channel: string;
  version: string;
  revision: string;
  downloads: {
    chrome: CfIDownload[];
    chromedriver: CfIDownload[];
    "chrome-headless-shell": CfIDownload[];
  };
}

type CfTChannels = 'Stable' | 'Beta' | 'Dev' | 'Canary'

interface CfTResponse {
  timestamp: string;
  channels: Record<CfTChannels, CfTItem>
}

const url = 'https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json'
/**
 * get latest chrome version
 */
export const latestChromeVersion = async (): Promise<string> => {
  const res = await http.get<CfTResponse>(url)

  if (res.status !== 200) {
    throw new Error(`[latest-chrome-version] Request failed. Response status should be 200, got ${res.status}`)
  }

  const version = res.data?.channels?.Stable?.version
  if (!version) {
    throw new Error('[latest-chrome-version] Failed to parse version from Chrome for Testing API')
  }

  return version
}
