let API_URL = require("./api_url.js");
let USER_AGENT =
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 HavfunClient-iOS_LuWei",
  APPID = "e31c86032f0d607c";

async function getBackupUrl() {
  const result = await $http.get({
    url: API_URL.GET_BACKUP_URL + `?appid=${APPID}`
  });
  $console.info(result);
  if (result.error) {
    return undefined;
  } else {
    return result.data;
  }
}
async function httpGet(url, headers = getHeader()) {
  const result = $http.get({
    url: API_URL.DEFAULT_HOST + url,
    header: headers
  });
  return result;
}
function getHeader() {
  return {
    "User-Agent": USER_AGENT
  };
}
module.exports = {
  getBackupUrl,
  httpGet
};
