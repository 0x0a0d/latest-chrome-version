const axios = require('axios')
const uuid_v1 = require('uuid/v1')

function parseVersion (xml) {
  const m = xml.match(/<manifest version="(\d[\d.]+)"/)
  return m == null ? null : m[1]
}

/**
 * get latest chrome version
 * @param {'mac'|'win'} platform
 * @return {Promise<string>}
 */
module.exports = async function getLatestChromeVersion (platform = 'win') {
  let os_version, arch, app_id
  if (platform === 'win') {
    os_version = '10.0.18363.0'
    app_id = '{8A69D345-D564-463C-AFF1-A69D9E530F96}'
  } else {
    platform = 'mac'
    os_version = '10.12'
    app_id = 'com.google.Chrome'
  }
  const xml = `<request protocol="3.0" version="KeystoneAdmin-1.2.5.1190" ismachine="0" requestid="{${uuid_v1()}}" dedup="cr" sessionid="{${uuid_v1()}}" installsource="ondemandupdate"> 
        <os platform="${platform}" version="${os_version}" arch="x64" sp="" />
        <app appid="${app_id}" version="71">
                <updatecheck />
        </app>
</request>`
  const response = await axios.request({
    url: 'https://tools.google.com/service/update2',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.0.0 Safari/537.36'
    },
    params: {'cup2hreq': 'foo', 'cup2key': 'bar'},
    data: xml,
    method: 'POST'
  })
  return response.status === 200 ? parseVersion(response.data) : null
}