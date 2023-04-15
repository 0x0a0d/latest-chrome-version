import { v4 } from 'uuid'
import axios from 'axios'

const checkStatus = (xml: string): boolean => {
  const m = xml.match(/<updatecheck status="([^"]+)">/)
  return m?.[1] === 'ok'
}

const parseVersion = (xml: string): string => {
  const m = xml.match(/<manifest version="([^"]+)"/)
  if (m == null) throw new Error('parseVersion failed')
  return m[1]
}

const buildRequestData = (platform: Platform, os_version: string, app_id: string) => {
  return `<request protocol="3.0" version="KeystoneAdmin-1.2.5.1190" ismachine="0" requestid="{${v4()}}" dedup="cr" sessionid="{${v4()}}" installsource="ondemandupdate">
        <os platform="${platform}" version="${os_version}" arch="x64" sp="" />
        <app appid="${app_id}" version="1">
                <updatecheck />
        </app>
</request>`
}

/**
 * get latest chrome version
 */
export const latestChromeVersion = (platform: Platform = 'mac', os_version?: string): Promise<string> => {
  const requestData = platform === 'win'
    ? buildRequestData('win', os_version ?? '10.0.18363.0', '{8A69D345-D564-463C-AFF1-A69D9E530F96}')
    : buildRequestData('mac', os_version ?? '13.0', 'com.google.Chrome')

  return axios.post('https://tools.google.com/service/update2', requestData, {
    params: { cup2hreq: 'foo', cup2key: 'bar' },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.0.0 Safari/537.36',
    },
  }).then(res => {
    if (res.status !== 200) throw new Error('Request failed. Response status should be 200')
    if (!checkStatus(res.data)) {
      throw new Error('[NoUpdate]: Check params: platform, os_version')
    }
    return parseVersion(res.data)
  })
}
