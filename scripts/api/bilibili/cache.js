let sys = require("../system.js"),
    cheerio = require("cheerio"),
    _BILIURL = require("../urlData.js").BILIBILI,
    appScheme = require("../app_scheme.js"),
    _UA = require("../user-agent.js"),
    _user = require("./user.js");

let cacheKey = {
        ACCESS_KEY: "bilibili_access_key",
        UID: "bilibili_uid"
    },
    _cacheDir = ".cache/bilibili/";

function loadAccesskey() {
    return $cache.get(_cacheKey.access_key);
}

function saveAccesskey(access_key) {
    return $cache.get(_cacheKey.access_key);
}