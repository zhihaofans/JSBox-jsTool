let sys = require("../system.js"),
    _BILIURL = require("../urlData.js").BILIBILI,
    _UA = require("../user-agent.js"),
    _CACHE = require("./cache.js"),
    _LIB = require("./lib.js");

var _ACCESS_KEY = "",
    _LOGIN_DATA = {},
    _UID = 0;

// Login
function UserLoginData(_uid, _accessKey) {
    this.uid = _uid;
    this.accessKey = _accessKey;
}

function getLoginCache() {
    loadLoginCache();
    return UserLoginData(_ACCESS_KEY, _UID);
}


function isLogin() {
    return getAccessKey() ? true : false;
}

function loadLoginCache() {
    const cacheKey = _CACHE.loadAccesskey();
    const uid = _CACHE.loadUid();
    $console.info(`cacheKey:${cacheKey}\nuid:${uid}`);
    if (cacheKey) {
        _ACCESS_KEY = cacheKey;
    }
    if (uid) {
        _UID = uid;
    }
}

function login() {
    $ui.menu({
        items: ["输入Access key(推荐)", "账号密码(明文)"],
        handler: function (_title, idx) {
            switch (idx) {
                case 0:
                    $input.text({
                        autoFontSize: true,
                        placeholder: "输入账号",
                        handler: function (inputKey) {
                            if (inputKey.length > 0) {
                                setAccessKey(inputKey);
                                $ui.alert({
                                    title: "保存成功",
                                    message: "由于需要用户uid，所以建议获取用户信息",
                                });
                            } else {
                                $ui.error("空白key");
                            }
                        }
                    });
                    break;
                case 1:
                    $input.text({
                        autoFontSize: true,
                        placeholder: "输入账号",
                        handler: function (user) {
                            if (user.length > 0) {
                                $input.text({
                                    autoFontSize: true,
                                    placeholder: "输入密码",
                                    handler: function (pwd) {
                                        if (pwd.length > 0) {
                                            loginPasswordByKaaass(user, pwd);
                                        } else {
                                            $ui.error("空白密码");
                                        }
                                    }
                                });
                            } else {
                                $ui.error("空白账号");
                            }
                        }
                    });
                    break;
            }
        }
    });
}

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
                var success = _CACHE.saveCache("bilibiliPassport", loginResp.rawData);
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

function removeLoginCache() {
    _CACHE.removeLoginCache();
}

function saveLoginCache(access_key, uid) {
    setAccessKey(access_key);
    setUid(uid);
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
// Uid
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
// User info
function getMyInfo() {
    if (isLogin()) {
        const _AK = getAccessKey();
        $ui.loading(true);
        _LIB.getSignUrl(_BILIURL.MY_INFO, "access_key=" + _AK).then(respKaaass => {
            const dataKaaass = respKaaass.data;
            $console.info(dataKaaass);
            if (dataKaaass) {
                $http.get({
                    url: dataKaaass.url,
                    header: {
                        "User-Agent": _UA.BILIBILI.APP_IPHONE
                    },
                    handler: respBili => {
                        var resultBili = respBili.data;
                        if (resultBili.code == 0) {
                            const myInfoData = resultBili.data;
                            saveLoginCache(_AK, myInfoData.mid);
                            $ui.loading(false);
                            $ui.success("已更新登录数据");
                            $ui.alert({
                                title: "结果",
                                message: myInfoData,
                                actions: [{
                                    title: "ok",
                                    disabled: false, // Optional
                                    handler: function () {}
                                }]
                            });
                        } else {
                            $ui.loading(false);
                            $ui.alert({
                                title: "Error ${resultBili.code}",
                                message: resultBili.message || "未知错误",
                                actions: [{
                                    title: "OK",
                                    disabled: false, // Optional
                                    handler: function () {}
                                }]
                            });
                        }
                    }
                });
            } else {
                $ui.loading(false);
                $ui.error("获取签名url失败");
            }
        });
    } else {
        $ui.error("请登录");
    }
}
module.exports = {
    checkAccessKey,
    getLoginCache,
    getAccessKey,
    getMyInfo,
    getUid,
    login,
    loadLoginCache,
    loginPasswordByKaaass,
    removeLoginCache,
    setAccessKey,
    saveLoginCache,
    setUid,
    isLogin
};