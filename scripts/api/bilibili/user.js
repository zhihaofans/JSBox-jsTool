let sys = require("../system.js"),
    cheerio = require("cheerio"),
    _URL = require("../urlData.js"),
    _BILIURL = require("../urlData.js").BILIBILI,
    appScheme = require("../app_scheme.js"),
    _UA = require("../user-agent.js");

var access_key = "",
    loginData = {},
    uid = 0;

function loadLoginDataCache() {
    const cacheKey = $cache.get(_cacheKey.access_key);
    const uid = $cache.get(_cacheKey.uid);
    $console.info(`cacheKey:${cacheKey}\nuid:${uid}`);
    if (cacheKey) {
        _userData.access_key = cacheKey;
    }
    if (uid) {
        _userData.uid = uid;
    }
}
// Access key
function checkAccessKey() {
    return getAccessKey() ? true : false;
}

function getAccessKey() {
    return access_key;
}
//uid
function getUid() {
    return uid;
}
module.exports = {
    checkAccessKey,
    getAccessKey,
    getUid,
};