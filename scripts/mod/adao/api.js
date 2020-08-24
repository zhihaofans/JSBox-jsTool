let API_URL = require("./api_url.js");

async function getBackupUrl() {
    const result = await $http.get({ url: API_URL.GET_BACKUP_URL });
    $console.info(result);
    if (result.error) {
        return undefined;
    } else {
        return result.data;
    }
}
async function httpGet(url, headers = undefined) {
    const result = $http.get({
        url: API_URL.DEFAULT_HOST + url,
        header: headers
    });
    return result;
}
module.exports = {
    getBackupUrl,
    httpGet
};