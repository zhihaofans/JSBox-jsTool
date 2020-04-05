let _url = require("./urlData.js");
let getRemoteData = (useCDN = true) => {
    return $http.get({
        url: useCDN ? _url.COVID19.MAIN_DATA_JSON_JSDELIVR : _url.COVID19.MAIN_DATA_JSON
    });
    /* .then(function (resp) {
            var data = resp.data;

        }); */
};

module.exports = {
    getRemoteData: getRemoteData
};