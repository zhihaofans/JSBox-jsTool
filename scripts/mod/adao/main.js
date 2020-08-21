let API_URL = require("./api_url.js");

function getBackupUrl() {
  return await $http.get({ url: API_URL.GET_BACKUP_URL }).data;
}

function getTimeLine() {
  return await $http.get({ url: API_URL.GET_TIMELINE }).data;
}

module.exports = {
    getBackupUrl
};