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

module.exports = {
    getBackupUrl
};