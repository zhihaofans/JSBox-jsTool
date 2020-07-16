let _URL = require("./api_url.js"),
    _UA = require("../user-agent.js");

function getSignUrl(host, param, android = false) {
    return $http.get({
        url: `${_URL.KAAASS.GET_SIGN_URL}?host=${encodeURI(host)}&param=${encodeURI(param)}&android=${android}`,
        header: {
            "user-agent": _UA.KAAASS
        }
    });
}

module.exports = {
    getSignUrl
};