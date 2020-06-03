let sys = require("../system.js"),
    cheerio = require("cheerio"),
    _BILIURL = require("../urlData.js").BILIBILI,
    appScheme = require("../app_scheme.js"),
    _UA = require("../user-agent.js"),
    _CACHE = require("./cache.js");

var _ACCESS_KEY = "",
    _LOGIN_DATA = {},
    _UID = 0;

// Login cache
function UserLoginData(_uid, _accessKey) {
    this.uid = _uid;
    this.accessKey = _accessKey;
}

function getLoginCache() {
    loadLoginCache();
    return UserLoginData(_ACCESS_KEY, _UID);
}

function loadLoginCache() {
    const cacheKey = _CACHE.getAccessKey();
    const uid = _CACHE.getUid();
    $console.info(`cacheKey:${cacheKey}\nuid:${uid}`);
    if (cacheKey) {
        _ACCESS_KEY = cacheKey;
    }
    if (uid) {
        _userData.uid = uid;
    }
}

function saveLoginCache(access_key, uid) {
    setAccessKey(access_key);
    setUid(uid);
}

function isLogin() {
    return getAccessKey() ? true : false;
}
// Access key
function checkAccessKey() {
    return getAccessKey() ? true : false;
}

function getAccessKey() {
    if (!_ACCESS_KEY) {
        loadLoginCache()
    }
    return _ACCESS_KEY;
}

function setAccessKey(access_key) {
    _ACCESS_KEY = access_key;
    _CACHE.saveAccesskey(access_key)
}
//uid
function getUid() {
    if (!_UID) {
        loadLoginCache()
    }
    return _UID;
}

function setUid(uid) {
    _UID = uid;
    _CACHE.saveUid(uid)
}
// Login
function loginPasswordByKaaass(userName, password) {
    // 获取加密链接登录
    $ui.loading(true);
    $http.post({
        url: _BILIURL.GET_ACCESS_KEY,
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": _UA.KAAASS
        },
        body: {
            user: userName,
            passwd: password
        },
        handler: function (kaaassResult) {
            var kaaassData = kaaassResult.data;
            if (kaaassData.status == "OK") {
                var success = _CACHE.saveCache("getAccessKey", kaaassResult.rawData);
                if (success) {
                    $console.info("登录成功");
                } else {
                    $console.error("登录失败");
                }
                loginBilibiliBySignUrl(kaaassData.url, kaaassData.body, kaaassData.headers);
            } else {
                $ui.loading(false);
                $ui.alert({
                    title: kaaassData.code,
                    message: kaaassData.info
                });
            }
        }
    });
}

function loginBilibiliBySignUrl(loginUrl, bodyStr, headers) {
    // 通过加密后的链接登录
    var passportBody = {};
    const bodyList = bodyStr.split("&");
    for (b in bodyList) {
        const thisBody = bodyList[b];
        const bb = thisBody.split("=");
        passportBody[bb[0]] = bb[1];
    }
    $http.post({
        url: loginUrl,
        header: headers,
        body: bodyStr,
        handler: function (loginResp) {
            var loginData = loginResp.data;
            $console.info(loginData);
            if (loginData.code == 0) {
                var success = saveCache("bilibiliPassport", loginResp.rawData);
                $console.info(`cache:${success}`);
                saveLoginCache(
                    loginData.data.token_info.access_token,
                    loginData.data.token_info.mid
                );
                $console.info(`loginData.access_token:${_ACCESS_KEY}`);
                $ui.loading(false);
                $input.text({
                    placeholder: "",
                    text: _ACCESS_KEY,
                    handler: function (text) {
                        text.copy();
                        $ui.toast("已复制！");
                    }
                });
            } else {
                $ui.loading(false);
                $console.error(`bilibiliLogin: ${loginData.message}`);
                $ui.error(`bilibiliLogin: ${loginData.message}`);
            }
        }
    });
}
module.exports = {
    getLoginCache,
    loadLoginCache,
    saveLoginCache,
    checkAccessKey,
    getAccessKey,
    setAccessKey,
    getUid,
    setUid,
    isLogin,
    loginPasswordByKaaass
};