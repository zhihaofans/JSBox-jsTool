$include("./codePrototype.js");
let sys = require("./system.js"),
    cheerio = require("cheerio"),
    _URL = require("./urlData.js"),
    appScheme = require("./app_scheme.js"),
    _UA = require("./user-agent.js");
// 新版模块
let _CHECKIN = require("./bilibili/check_in.js"),
    _LIVE = require("./bilibili/live.js"),
    _USER = require("./bilibili/user.js"),
    _GIFT = require("./bilibili/gift.js"),
    _AVBV = require("../api/bilibili/av-bv.js"),
    _VIDEO = require("./bilibili/video.js");

let _cacheKey = {
        access_key: "bilibili_access_key",
        uid: "bilibili_uid"
    },
    _userData = {
        access_key: "",
        loginData: {},
        uid: 0
    },
    _cacheDir = ".cache/bilibili/";
// function
function init() {
    //初始化，加载缓存
    loadLoginData();
    return _USER.isLogin();
}

function saveCache(mode, str) {
    $file.mkdir(_cacheDir + mode);
    return $file.write({
        path: `${_cacheDir}${mode}/${sys.getNowUnixTime()}.json`,
        data: $data({
            string: str
        })
    });
}

function saveLoginData(access_key, uid) {
    _userData.access_key = access_key;
    _userData.uid = uid;
    $cache.set(_cacheKey.access_key, access_key);
    $cache.set(_cacheKey.uid, uid);
}

function loadLoginData() {
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

function saveAccessKey(access_key) {
    _userData.access_key = access_key;
    $cache.set(_cacheKey.access_key, _userData.access_key);
    $ui.toast("已保存access key");
}

function getUserInfo() {
    // furtherInfo: 是否获取详细用户信息
    if (_USER.isLogin()) {
        const url = `${_URL.BILIBILI.GET_USER_INFO}&access_key=${_userData.access_key}&furtherInfo=true`;
        $ui.loading(true);
        $http.get({
            url: url,
            header: {
                "User-Agent": _UA.KAAASS
            },
            handler: function (userResp) {
                var userData = userResp.data;
                if (userData.status == "OK") {
                    saveCache("getUserInfo", userResp.rawData);
                    const user_info = userData.info;
                    const user_further = userData.further;
                    // 用户数据
                    const user = {
                        uid: user_info.mid,
                        userName: user_info.uname,
                        loginId: user_info.userid,
                        registerTime: user_info.create_at,
                        loginExpireTime: user_info.expires,
                        accessKey: user_info.access_key,
                        uploadVideo: user_further.archive,
                        liveStream: user_further.live,
                        playGame: user_further.play_game,
                        anime: user_further.season,
                        giveCoin: user_further.coin_archive,
                        likeVideo: user_further.like_archive,
                        favourite: user_further.favourite2,
                        subscribeComic: user_further.sub_comic
                    };
                    saveLoginData(user.accessKey, user.uid);
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
                    const view = {
                        props: {
                            title: "加载成功",
                            navButtons: [{
                                title: "打开网页版",
                                icon: "068", // Or you can use icon name
                                symbol: "checkmark.seal", // SF symbols are supported
                                handler: () => {
                                    $ui.preview({
                                        title: user.userName,
                                        url: _URL.BILIBILI.BILIBILI_SPACE +
                                            user.uid
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
                                didSelect: function (
                                    _sender,
                                    indexPath,
                                    _data
                                ) {
                                    switch (indexPath.section) {
                                        case 0:
                                            switch (indexPath.row) {
                                                case 0:
                                                    $input.text({
                                                        placeholder: "access key",
                                                        text: _userData.access_key,
                                                        handler: function (
                                                            inputKey
                                                        ) {
                                                            saveAccessKey(
                                                                inputKey
                                                            );
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
                                                            $ui.toast(
                                                                "已复制"
                                                            );
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
                    };
                    $ui.push(view);
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
    checkAccessKey: _USER.isLogin,
    getAccessKey: _USER.getAccessKey,
    getAv: _AVBV.getAv,
    getAvOnline: _AVBV.getAvOnline,
    getBv: _AVBV.getBv,
    getBvOnline: _AVBV.getBvOnline,
    getCoverFromGalmoe: _VIDEO.getCoverFromGalmoe,
    getFansMedalList: _LIVE.getFansMedalList,
    getLiveGiftList: _GIFT.getLiveGiftList,
    getLiveroomInfo: _LIVE.getLiveroomInfo,
    getMyInfo: _USER.getMyInfo,
    getOfflineLiver: _LIVE.getOfflineLiver,
    getOnlineLiver: _LIVE.getOnlineLiver,
    getUserInfo,
    getVideo: _VIDEO.getVideo,
    getVideoData: _VIDEO.getVideoData,
    getVideoInfo: _VIDEO.getVideoInfo,
    getVidFromUrl: _VIDEO.getVidFromUrl,
    getWallet: _LIVE.getWallet,
    init,
    isLogin: _USER.isLogin,
    laterToWatch: _VIDEO.laterToWatch,
    mangaClockin: _CHECKIN.mangaClockin,
    openLiveDanmuku: _LIVE.openLiveDanmuku,
    removeLoginData: _USER.removeLoginCache,
    saveAccessKey: _USER.setAccessKey,
    vipCheckin: _CHECKIN.vipCheckin,
};