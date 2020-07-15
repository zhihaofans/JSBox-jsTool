let API_URL = require("./api_url.js");

function getBackupUrl() {
    return $http.get({
        url: API_URL.GET_BACKUP_URL
    });
    /* .then(function (resp) {
            var data = resp.data;
        }) */

}

function getTimeLine() {
    return $http.get({
        url: API_URL.GET_TIMELINE
    });
    /* .then(function (resp) {
            var data = resp.data;
        }) */

}

module.exports = {
    getBackupUrl
};