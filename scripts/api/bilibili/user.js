let sys = require("../system.js"),
    _BILIURL = require("./api_url.js").BILIBILI,
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
function UserInfo(_userInfo, _userFurther) {
    this.uid = _userInfo.mid;
    this.userName = _userInfo.uname;
    this.loginId = _userInfo.userid;
    this.registerTime = _userInfo.create_at;
    this.loginExpireTime = _userInfo.expires;
    this.accessKey = _userInfo.access_key;
    this.uploadVideo = _userFurther.archive;
    this.liveStream = _userFurther.live;
    this.playGame = _userFurther.play_game;
    this.anime = _userFurther.season;
    this.giveCoin = _userFurther.coin_archive;
    this.likeVideo = _userFurther.like_archive;
    this.favourite = _userFurther.favourite2;
    this.subscribeComic = _userFurther.sub_comic
}

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
                                title: `Error ${resultBili.code}`,
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

function getUserInfo() {
    // furtherInfo: 是否获取详细用户信息
    if (isLogin()) {
        $ui.loading(true);
        $http.get({
            url: `${_BILIURL.GET_USER_INFO}&access_key=${getAccessKey()}&furtherInfo=true`,
            header: {
                "User-Agent": _UA.KAAASS
            },
            handler: function (userResp) {
                var userData = userResp.data;
                if (userData.status == "OK") {
                    _CACHE.saveCache("getUserInfo", userResp.rawData);
                    // 用户数据
                    const user = UserInfo(userData.info, userData.further);
                    saveLoginCache(user.accessKey, user.uid);
                    const userDataList = [
                        `用户昵称：${user.userName}`,
                        `用户uid：${user.uid}`,
                        `登录用id：${user.loginId}`,
                        `注册时间戳：${user.registerTime}`,
                        `此次登录到期时间戳：${user.loginExpireTime}`,
                        `登录用access key：${user.accessKey}`,
                        `投稿视频：${user.uploadVideo.count} 个`,
                        `点赞视频：${user.likeVideo.count} 个`,
                        `投硬币：${user.giveCoin.count} 个`,
                        `玩过游戏：${user.playGame.count} 个`,
                        `追番：${user.anime.count} 部`,
                        `收藏夹：${user.favourite.count} 个`,
                        `追更漫画：${user.subscribeComic.count} 部`
                    ];
                    $ui.loading(false);
                    $ui.push({
                        props: {
                            title: "加载成功",
                            navButtons: [{
                                title: "打开网页版",
                                icon: "068", // Or you can use icon name
                                symbol: "checkmark.seal", // SF symbols are supported
                                handler: () => {
                                    $ui.preview({
                                        title: user.userName,
                                        url: _URL.BILIBILI.BILIBILI_SPACE + user.uid
                                    });
                                }
                            }]
                        },
                        views: [{
                            type: "list",
                            props: {
                                data: [{
                                        title: "功能",
                                        rows: ["编辑access key"]
                                    },
                                    {
                                        title: "数据",
                                        rows: userDataList
                                    }
                                ]
                            },
                            layout: $layout.fill,
                            events: {
                                didSelect: function (_sender, indexPath, _data) {
                                    switch (indexPath.section) {
                                        case 0:
                                            switch (indexPath.row) {
                                                case 0:
                                                    $input.text({
                                                        placeholder: "access key",
                                                        text: _userData.access_key,
                                                        handler: function (inputKey) {
                                                            setAccessKey(inputKey);
                                                        }
                                                    });
                                                    break;
                                                default:
                                                    $ui.error("不支持");
                                            }
                                            break;
                                        case 1:
                                            const _g = _data.split("：");
                                            $ui.alert({
                                                title: _g[0],
                                                message: _g[1],
                                                actions: [{
                                                        title: "复制",
                                                        disabled: false, // Optional
                                                        handler: function () {
                                                            _g[1].copy();
                                                            $ui.toast("已复制");
                                                        }
                                                    },
                                                    {
                                                        title: "关闭",
                                                        disabled: false, // Optional
                                                        handler: function () {}
                                                    }
                                                ]
                                            });
                                            break;
                                    }
                                }
                            }
                        }]
                    });
                } else {
                    $ui.loading(false);
                    $ui.alert({
                        title: userData.code,
                        message: userData.info
                    });
                }
            }
        });
    } else {
        $ui.loading(false);
        $ui.error("未登录！");
    }
}
module.exports = {
    checkAccessKey,
    getLoginCache,
    getAccessKey,
    getMyInfo,
    getUserInfo,
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