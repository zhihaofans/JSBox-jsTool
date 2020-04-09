$include("./codePrototype.js");
let sys = require("./system.js"),
    cheerio = require("cheerio"),
    _URL = require("./urlData.js"),
    _BILIURL = require("./urlData.js").BILIBILI,
    appScheme = require("./app_scheme.js");
let _cacheKey = {
        access_key: "bilibili_access_key",
        uid: "bilibili_uid",
    },
    _userData = {
        access_key: "",
        loginData: {},
        uid: 0
    },
    _cacheDir = ".cache/bilibili/",
    kaaassUA = "JSBox-jsTool/0.1 (github:zhuangzhihao-io) <zhuang@zhihao.io>"; // 请尊重API提供者

// function

let init = () => {
    //初始化，加载缓存
    loadLoginData();
    return checkAccessKey();
};

function GiftData(_giftId, _bagId, _number) {
    this.giftId = _giftId;
    this.bagId = _bagId;
    this.number = _number;
};
let getGiftListByExp = (giftData, exp) => {
    if (exp == 0) {
        return [];
    }
    var needExp = exp;
    $console.info(`needExp.start:${needExp}`);
    var giftList = [];
    for (g in giftData) {
        if (needExp == 0) {
            return giftList;
        } else {
            const thisGift = giftData[g];
            $console.info(thisGift);
            if (thisGift.corner_mark == "永久") {
                $console.error("跳过永久礼物");
            } else {
                var giftNum = 0;
                switch (thisGift.gift_id) {
                    case 6:
                        if (needExp >= 10) {
                            if ((thisGift.gift_num * 10) > needExp) {
                                giftNum = Math.floor(needExp / 10);
                            } else {
                                giftNum = Math.floor(thisGift.gift_num / 10);
                            }
                            // giftNum = thisGift.gift_num > Math.floor(needExp / 10) ? Math.floor(needExp / 10) : Math.floor(thisGift.gift_num / 10);
                            if (giftNum > 0) {
                                giftList.push(new GiftData(thisGift.gift_id, thisGift.bag_id, giftNum));
                                needExp = needExp - (giftNum * 10);
                            } else {
                                $console.error("跳过0个的礼物");
                            }
                        }
                        break;
                    case 1:
                        if (thisGift.gift_num > needExp) {
                            giftNum = needExp;
                        } else {
                            giftNum = thisGift.gift_num;
                        }
                        // giftNum = thisGift.gift_num > needExp ? needExp : thisGift.gift_num;
                        if (giftNum > 0) {
                            giftList.push(new GiftData(thisGift.gift_id, thisGift.bag_id, giftNum));
                            needExp = needExp - giftNum;
                        } else {
                            $console.error("跳过0个的礼物");
                        }
                        break;
                    default:
                        $console.error("跳过不支持的礼物");
                }
                $console.info(`needExp:${needExp}`);
            }
        }
    }
    if (needExp > 0) {
        $ui.toast("礼物不足以赠送满今日亲密度");
    }
    return giftList;
};
let getLiveGiftList = (liveData = undefined, mode = 0) => {
    var sendGiftToUid,
        sendGiftToRoom,
        needExp;
    if (liveData) {
        sendGiftToUid = liveData.target_id;
        sendGiftToRoom = liveData.room_id;
        needExp = liveData.day_limit - liveData.today_feed;
    }
    $ui.loading(true);
    const accessKey = checkAccessKey() ? _userData.access_key : undefined;
    if (accessKey) {
        $http.get({
            url: _URL.BILIBILI.GET_LIVE_GIFT_LIST + accessKey,
            header: {
                "User-Agent": kaaassUA
            },
            handler: function (resp) {
                const giftResult = resp.data;
                if (giftResult.code == 0) {
                    const giftList = giftResult.data.list;
                    const giftTitleList = giftList.map(gift =>
                        `${gift.gift_name}（${gift.corner_mark}）${gift.gift_num}个`
                    );
                    $ui.loading(false);
                    if (giftList.length) {
                        saveCache("getLiveGiftList", resp.rawData);
                        if (mode == 1) {
                            if (liveData) {
                                $ui.loading(true);
                                $ui.toast("正在计算所需的礼物");
                                const giftExpList = getGiftListByExp(giftList, needExp);
                                if (giftExpList.length > 0) {
                                    $console.info(giftExpList);
                                    $ui.loading(false);
                                    sendLiveGiftList(liveData, giftExpList, 0);
                                } else {
                                    $ui.loading(false);
                                    $ui.alert({
                                        title: "自动赠送失败",
                                        message: "计算得出所需的礼物为空白",
                                    });
                                }
                            } else {
                                $ui.alert({
                                    title: "错误",
                                    message: "空白liver信息",
                                });
                            }
                        } else {
                            $ui.push({
                                props: {
                                    title: $l10n("BILIBILI")
                                },
                                views: [{
                                    type: "list",
                                    props: {
                                        data: giftTitleList
                                    },
                                    layout: $layout.fill,
                                    events: {
                                        didSelect: function (_sender, indexPath, _data) {
                                            const thisGift = giftList[indexPath.row];
                                            if (liveData && sendGiftToUid && sendGiftToRoom) {
                                                if (thisGift.corner_mark == "永久") {
                                                    $ui.alert({
                                                        title: "警告",
                                                        message: "这是永久的礼物，你确定要送吗",
                                                        actions: [{
                                                            title: "取消",
                                                            disabled: false,
                                                            handler: function () {}
                                                        }, {
                                                            title: "取消",
                                                            disabled: false,
                                                            handler: function () {}
                                                        }, {
                                                            title: "确定",
                                                            disabled: false,
                                                            handler: function () {
                                                                $input.text({
                                                                    type: $kbType.number,
                                                                    placeholder: `输入数量，1-${thisGift.gift_num}`,
                                                                    text: "",
                                                                    handler: function (gift_number) {
                                                                        if (gift_number > 0 && gift_number <= thisGift.gift_num) {
                                                                            sendLiveGift(sendGiftToUid, sendGiftToRoom, thisGift.gift_id, thisGift.bag_id, gift_number);
                                                                        } else {
                                                                            $ui.alert({
                                                                                title: "赠送错误",
                                                                                message: `错误数量,请输入1-${thisGift.gift_num}`,
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        }, {
                                                            title: "取消",
                                                            disabled: false,
                                                            handler: function () {}
                                                        }, {
                                                            title: "取消",
                                                            disabled: false,
                                                            handler: function () {}
                                                        }]
                                                    });
                                                } else {
                                                    $input.text({
                                                        type: $kbType.number,
                                                        placeholder: `输入数量，1-${thisGift.gift_num}`,
                                                        text: "",
                                                        handler: function (gift_number) {
                                                            if (gift_number > 0 && gift_number <= thisGift.gift_num) {
                                                                sendLiveGift(sendGiftToUid, sendGiftToRoom, thisGift.gift_id, thisGift.bag_id, gift_number);
                                                            } else {
                                                                $ui.alert({
                                                                    title: "赠送错误",
                                                                    message: `错误数量,请输入1-${thisGift.gift_num}`,
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            } else {
                                                $ui.alert({
                                                    title: thisGift.gift_name,
                                                    message: `拥有数量:${thisGift.gift_num}个\n到期时间:${thisGift.corner_mark}`,
                                                });
                                            }
                                        }
                                    }
                                }]
                            });
                        }
                    } else {
                        $ui.error("你没有任何礼物");
                    }
                } else {
                    $ui.loading(false);
                    $ui.error(giftResult.message);
                }
            }
        })
    } else {
        $ui.loading(false);
        $ui.error("未登录");
    }
}
let getVidFromUrl = url => {
    const siteList = ['https://', 'http://', "b23.tv/", "www.bilibili.com/video/", "www.bilibili.com/", "av"];
    var newUrl = url;
    siteList.map(x => {
        if (newUrl.startsWith(x)) {
            newUrl = newUrl.remove(x);
        }
    });
    if (newUrl.indexOf("?")) {
        newUrl = newUrl.split("?")[0].remove("/");
    }
    return newUrl;
};

let saveCache = (mode, str) => {
    $file.mkdir(_cacheDir + mode);
    return $file.write({
        path: `${_cacheDir}${mode}/${sys.getNowUnixTime()}.json`,
        data: $data({
            string: str
        })
    });
};
let saveLoginData = (access_key, uid) => {
    _userData.access_key = access_key;
    _userData.uid = uid;
    $cache.set(_cacheKey.access_key, access_key);
    $cache.set(_cacheKey.uid, uid);
};
let removeLoginData = () => {
    _userData.access_key = "";
    _userData.uid = 0;
    $cache.remove(_cacheKey.access_key);
    $cache.remove(_cacheKey.uid);
    $ui.toast("已清除登录数据");
};
let loadLoginData = () => {
    const cacheKey = $cache.get(_cacheKey.access_key);
    const uid = $cache.get(_cacheKey.uid);
    $console.info(`cacheKey:${cacheKey}\nuid:${uid}`);
    if (cacheKey) {
        _userData.access_key = cacheKey;
    }
    if (uid) {
        _userData.uid = uid;
    }
};
let saveAccessKey = access_key => {
    _userData.access_key = access_key;
    $cache.set(_cacheKey.access_key, _userData.access_key);
    $ui.toast("已保存access key");
};

let loadAccessKey = () => {
    const cacheKey = $cache.get(_cacheKey.access_key);
    if (cacheKey) {
        _userData.access_key = cacheKey;
    }
};

let isLogin = () => {
    return checkAccessKey();
};
let checkAccessKey = () => {
    if (_userData.access_key) {
        return true;
    } else {
        /* 
                const accessKeyFromCache = loadAccessKey();
                if (accessKeyFromCache) {
                    _userData.access_key = accessKeyFromCache;
                    return true;
                } */
        return false;
    }
};

let getVideoInfo = vid => {
    $http.get({
        url: _URL.BILIBILI.GET_VIDEO_INFO + vid,
        header: {
            "User-Agent": kaaassUA
        },
        handler: function (resp) {
            const data = resp.data;
            if (resp.response.statusCode == 200) {
                if (data.status == "OK") {
                    const _biliData = data.data;
                    const allow_download = _biliData.allow_download ? "是" : "否";
                    var videoInfoList = [
                        "标题：" + _biliData.title,
                        "描述：" + _biliData.description,
                        "作者：" + _biliData.author,
                        "分类：" + _biliData.typename,
                        "投稿时间：" + _biliData.created_at,
                        "共有：" + _biliData.list.length + " 个分P",
                        "允许下载：" + allow_download,
                        "播放：" + _biliData.play,
                        "评论：" + _biliData.review,
                        "弹幕：" + _biliData.video_review,
                        "收藏：" + _biliData.favorites,
                        "投币：" + _biliData.coins,
                        "稿件类型：" + _biliData.arctype
                    ];
                    const listView = {
                        props: {
                            title: "加载成功",
                            navButtons: [{
                                title: "打开网页版",
                                icon: "068", // Or you can use icon name
                                symbol: "checkmark.seal", // SF symbols are supported
                                handler: () => {
                                    $ui.preview({
                                        title: "av" + vid,
                                        url: `https://www.bilibili.com/av${vid}`
                                    });
                                }
                            }]
                        },
                        views: [{
                            type: "list",
                            props: {
                                data: [{
                                        title: "功能",
                                        rows: ["下载封面", "下载up头像", "视频解析", "查看弹幕"]
                                    },
                                    {
                                        title: "数据",
                                        rows: videoInfoList
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
                                                    $ui.preview({
                                                        title: "av" + vid,
                                                        url: _biliData.pic
                                                    });
                                                    break;
                                                case 1:
                                                    $ui.preview({
                                                        title: _biliData.author,
                                                        url: _biliData.face
                                                    });
                                                    break;
                                                case 2:
                                                    getVideo(vid, _biliData);
                                                    break;
                                                case 3:
                                                    const partList = _biliData.list;
                                                    if (partList.length == 1) {
                                                        getVideoDanmuku(partList[0].cid);
                                                    } else {
                                                        $ui.menu({
                                                            items: partList.map(p => p.part),
                                                            handler: function (title, idx) {
                                                                getVideoDanmuku(partList[idx].cid);
                                                            }
                                                        });
                                                    }
                                                    break;
                                                default:
                                                    $ui.error("不支持");
                                            }
                                            break;
                                        case 1:
                                            const _list = _data.split("：");
                                            $ui.alert({
                                                title: _list[0],
                                                message: _list[1]
                                            });
                                            break;
                                    }
                                }
                            }
                        }]
                    };
                    switch ($app.env) {
                        case $env.app:
                            $ui.push(listView);
                            break;
                        default:
                            $ui.render(listView);
                    }
                } else {
                    $ui.alert({
                        title: `Error ${resp.response.statusCode}`,
                        message: data,
                    });
                }
            } else {
                $ui.alert({
                    title: `Error ${resp.response.statusCode}`,
                    message: data.code,
                });
            }
        }
    });
};

let getVideo = (vid, _biliData) => {
    const partList = _biliData.list;
    const partTitleList = partList.map(x => x.part);
    $ui.menu({
        items: partTitleList,
        handler: function (title, idx) {
            checkAccessKey() ?
                getVideoData(vid, idx + 1, 116, _userData.access_key) : //1080p以上需要带header
                getVideoData(vid, idx + 1, 80, "");

        }
    });
};

let getVideoData = (vid, page, quality, access_key) => {
    $ui.loading(true);
    $http.get({
        url: `${_URL.BILIBILI.GET_VIDEO_DATA}&id=${vid}&page=${page}&quality${quality}&access_key=${access_key}`,
        handler: function (videoResp) {
            var videoData = videoResp.data;
            if (videoData.status == "OK") {
                if (videoData.url.length > 0) {
                    const copyStr = JSON.stringify(videoData.headers);
                    $http.get({
                        url: videoData.url,
                        handler: function (biliResp) {
                            var biliData = biliResp.data;
                            if (biliData.code == 0) {
                                const downloadList = biliData.data.durl;
                                if (downloadList.length > 1) {
                                    var dList = [];
                                    for (i in downloadList) {
                                        dList.push(`第${(i + 1).toString()}个文件`);
                                    }
                                    $ui.loading(false);
                                    $ui.push({
                                        props: {
                                            title: "可下载文件列表"
                                        },
                                        views: [{
                                            type: "list",
                                            props: {
                                                data: dList
                                            },
                                            layout: $layout.fill,
                                            events: {
                                                didSelect: function (_sender, indexPath, data) {
                                                    showDownList(downloadList[indexPath.row], copyStr);
                                                }
                                            }
                                        }]
                                    });
                                } else {
                                    showDownList(downloadList[0], copyStr);
                                }

                            } else {
                                $ui.loading(false);
                                $ui.alert({
                                    title: `Error ${biliData.code}`,
                                    message: biliData.message,
                                });
                            }
                        }
                    });
                } else {
                    $ui.loading(false);
                    $ui.error("url.length==0");
                }
            } else {
                $ui.loading(false);
                $ui.alert({
                    title: `Error Code ${videoResp.code}`,
                    message: videoResp.message,
                });
            }

        }
    });
};
let showDownList = (thisFile, copyStr) => {
    var urlList = [thisFile.url];
    urlList = urlList.concat(thisFile.backup_url);
    $ui.push({
        props: {
            title: "可下载文件列表"
        },
        views: [{
            type: "list",
            props: {
                data: urlList
            },
            layout: $layout.fill,
            events: {
                didSelect: function (_sender, idxp, _data) {
                    if (copyStr.length > 0) {
                        $ui.toast("请复制headers");
                        $input.text({
                            placeholder: "",
                            text: copyStr,
                            handler: function (text) {
                                copyStr.copy();
                                $share.sheet([_data]);
                            }
                        });
                    } else {
                        $share.sheet([_data]);
                    }
                }
            }
        }]
    });
};
let getAccessKey = (userName, password) => {
    $ui.loading(true);
    $http.post({
        url: _URL.BILIBILI.GET_ACCESS_KEY,
        header: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: {
            user: userName,
            passwd: password
        },
        handler: function (kaaassResult) {
            var kaaassData = kaaassResult.data;
            if (kaaassData.status == "OK") {
                var success = saveCache("getAccessKey", kaaassResult.rawData);
                loginBilibili(kaaassData.url, kaaassData.body, kaaassData.headers);
            } else {
                $ui.loading(false);
                $ui.alert({
                    title: kaaassData.code,
                    message: kaaassData.info,
                });
            }
        }
    });
};

let loginBilibili = (loginUrl, bodyStr, headers) => {
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
                saveLoginData(loginData.data.token_info.access_token, loginData.data.token_info.mid);
                $console.info(`loginData.access_token:${_userData.access_key}`);
                $ui.loading(false);
                $input.text({
                    placeholder: "",
                    text: _userData.access_key,
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
};

let getUserInfo = () => {
    // furtherInfo: 是否获取详细用户信息
    if (checkAccessKey()) {
        const url = `${_URL.BILIBILI.GET_USER_INFO}&access_key=${_userData.access_key}&furtherInfo=true`;
        $ui.loading(true);
        $http.get({
            url: url,
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
                        `用户uid：${ user.uid}`,
                        `登录用id：${user.loginId}`,
                        `注册时间戳：${user.registerTime}`,
                        `此次登录到期时间戳：${user.loginExpireTime}`,
                        `登录用access key：${ user.accessKey}`,
                        `投稿视频：${user.uploadVideo.count} 个`,
                        `点赞视频：${ user.likeVideo.count} 个`,
                        `投硬币：${user.giveCoin.count} 个`,
                        `玩过游戏：${user.playGame.count} 个`,
                        `追番：${ user.anime.count} 部`,
                        `收藏夹：${user.favourite.count} 个`,
                        `追更漫画：${user.subscribeComic.count} 部`,
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
                                        url: `https://space.bilibili.com/${user.uid}`
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
                                                            saveAccessKey(inputKey)
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
                                                }, {
                                                    title: "关闭",
                                                    disabled: false, // Optional
                                                    handler: function () {}
                                                }]
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
                        message: userData.info,
                    });
                }
            }
        });
    } else {
        $ui.loading(false);
        $ui.error("未登录！");
    }
};

function LiveroomInfo(liveroomInfoData) {
    // https://api.vtbs.moe/v1/detail/:mid
    this.mid = liveroomInfoData.mid; //Int
    this.uuid = liveroomInfoData.uuid; //String
    this.uname = liveroomInfoData.uname; //String
    this.video = liveroomInfoData.video;
    this.roomid = liveroomInfoData.roomid;
    this.sign = liveroomInfoData.sign; //String
    this.notice = liveroomInfoData.notice; //String
    this.face = liveroomInfoData.face; //String
    this.rise = liveroomInfoData.rise; //Int
    this.topPhoto = liveroomInfoData.topPhoto; //String
    this.archiveView = liveroomInfoData.archiveView; //Int
    this.follower = liveroomInfoData.follower; //Int
    this.liveStatus = liveroomInfoData.liveStatus; //Int
    this.recordNum = liveroomInfoData.recordNum; //Int
    this.guardNum = liveroomInfoData.guardNum; //Int
    this.lastLive = {
        online: liveroomInfoData.lastLive.online, //Int
        time: liveroomInfoData.lastLive.time //Int
    };
    this.guardChange = liveroomInfoData.guardChange; //Int
    this.guardType = liveroomInfoData.guardType; //Array[Int]
    this.areaRank = liveroomInfoData.areaRank; //Int
    this.online = liveroomInfoData.online; //Int
    this.title = liveroomInfoData.title; //String
    this.time = liveroomInfoData.time; //Int
};
let getLiveroomInfo = mid => {
    $ui.loading(true);
    $http.get({
        url: `https://api.vtbs.moe/v1/detail/${mid}`
    }).then(function (resp) {
        $ui.loading(false);
        if (resp.error) {
            $ui.alert({
                title: `${resp.error.code} error`,
                message: resp.error.localizedDescription,
            });
        } else {
            if (resp.data) {
                const liveroomInfo = new LiveroomInfo(resp.data);
                $ui.alert({
                    title: "获取成功",
                    message: liveroomInfo,
                    actions: [{
                        title: "打开网页",
                        disabled: false,
                        handler: function () {
                            appScheme.safariPreview(`https://vtbs.moe/detail/${mid}`)
                        }
                    }, {
                        title: "关闭",
                        disabled: false,
                        handler: function () {}
                    }]
                });
            } else {
                $ui.alert({
                    title: `数据错误`,
                    message: "空白数据",
                });
            }

        }
    });
};
let getFansMedalList = () => {
    $ui.loading(true);
    if (_userData.access_key) {
        const link = `https://api.live.bilibili.com/fans_medal/v2/HighQps/received_medals?access_key=${_userData.access_key}`;
        $http.get({
            url: link
        }).then(function (resp) {
            var data = resp.data;
            if (data.code == 0) {
                $ui.toast(data.message || data.msg || "已拥有的粉丝勋章");
                const medalData = data.data;
                const medalList = medalData.list;
                if (medalList.length > 0) {
                    var onlineList = [];
                    var offlineList = [];
                    medalList.map(m => {
                        m.live_stream_status == 1 ?
                            onlineList.push(m) :
                            offlineList.push(m);
                    });
                    medalList.map(m => `[${m.medal_name}]${m.target_name}` + (m.icon_code ? `[${m.icon_text}]` : ""))
                    $ui.loading(false);
                    $ui.push({
                        props: {
                            title: `数量${medalData.cnt}/${medalData.max}`
                        },
                        views: [{
                            type: "list",
                            props: {
                                data: [{
                                        title: "在播了",
                                        rows: onlineList.map(m => `[${m.medal_name}]${m.target_name}` + (m.icon_code ? `[${m.icon_text}]` : "") + (m.today_feed == m.day_limit ? `[已满]` : `[还差${m.day_limit - m.today_feed}]`))
                                    },
                                    {
                                        title: "咕咕咕",
                                        rows: offlineList.map(m => `[${m.medal_name}]${m.target_name}` + (m.icon_code ? `[${m.icon_text}]` : "") + (m.today_feed == m.day_limit ? `[已满]` : `[还差${m.day_limit - m.today_feed}]`))
                                    }
                                ],
                                menu: {
                                    title: "菜单",
                                    items: [{
                                        title: "打开直播间",
                                        symbol: "play.rectangle",
                                        handler: (sender, indexPath) => {
                                            const liveData = indexPath.section == 0 ?
                                                onlineList[indexPath.row] :
                                                offlineList[indexPath.row];
                                            $app.openURL(`https://live.bilibili.com/${liveData.room_id}`);
                                        }
                                    }, {
                                        title: "通过vtbs.moe获取vTuber信息",
                                        symbol: "play.rectangle",
                                        handler: (sender, indexPath) => {
                                            const liveData = indexPath.section == 0 ?
                                                onlineList[indexPath.row] :
                                                offlineList[indexPath.row];
                                            getLiveroomInfo(liveData.target_id);
                                        }
                                    }, {
                                        title: "赠送礼物",
                                        symbol: "gift",
                                        handler: (sender, indexPath) => {
                                            const liveData = indexPath.section == 0 ?
                                                onlineList[indexPath.row] :
                                                offlineList[indexPath.row];
                                            if (liveData.day_limit - liveData.today_feed > 0) {
                                                getLiveGiftList(liveData);
                                            } else {
                                                $ui.alert({
                                                    title: "不用送了",
                                                    message: "今日亲密度已满",
                                                });
                                            }
                                        }
                                    }, {
                                        title: "自动赠送礼物",
                                        symbol: "gift",
                                        handler: (sender, indexPath) => {
                                            const liveData = indexPath.section == 0 ?
                                                onlineList[indexPath.row] :
                                                offlineList[indexPath.row];
                                            if (liveData.day_limit - liveData.today_feed > 0) {
                                                getLiveGiftList(liveData, 1);
                                            } else {
                                                $ui.alert({
                                                    title: "不用送了",
                                                    message: "今日亲密度已满",
                                                });
                                            }
                                        }
                                    }]
                                }
                            },
                            layout: $layout.fill,
                            events: {
                                didSelect: function (sender, indexPath, data) {
                                    const liveData = indexPath.section == 0 ?
                                        onlineList[indexPath.row] :
                                        offlineList[indexPath.row];
                                    $ui.alert({
                                        title: `[${liveData.medal_name}]${liveData.target_name}`,
                                        message: liveData,
                                    });
                                }
                            }
                        }]
                    });
                } else {
                    $ui.loading(false);
                    $ui.alert({
                        title: "没有勋章",
                        message: `粉丝勋章数量为${medalData.cnt||medalList.length}`,
                    });
                }
            } else {
                $ui.loading(false);
                $ui.error(data.message || data.msg || "未知错误");
            }
        });

    } else {
        $ui.loading(false);
        $ui.alert({
            title: "错误",
            message: "未登录",
        });
    }
};
let sendLiveGift = (user_id, room_id, gift_type, gift_id, gift_number) => {
    $ui.loading(true);
    const url = `https://api.live.bilibili.com/gift/v2/live/bag_send?access_key=${_userData.access_key}&bag_id=${gift_id}&biz_id=${room_id}&gift_id=${gift_type}&gift_num=${gift_number}&ruid=${user_id}`;
    $http.get({
        url: url
    }).then(function (resp) {
        var data = resp.data;
        if (data.code == 0) {
            const resultData = data.data;
            $ui.loading(false);
            $ui.alert({
                title: resultData.send_tips,
                message: `${resultData.uname} ${resultData.gift_action}${resultData.gift_num}个${resultData.gift_name}`,
            });
        } else {
            $ui.loading(false);
            $ui.alert({
                title: `Error ${data.code}`,
                message: data.message || data.msg || "未知错误",
            });
        }

    });
};
let sendLiveGiftList = (liveData, giftList, index = 0) => {
    $ui.loading(true);
    if (giftList.length > 0) {
        const thisGift = giftList[index],
            url = `https://api.live.bilibili.com/gift/v2/live/bag_send?access_key=${_userData.access_key}&ruid=${liveData.target_id}&biz_id=${liveData.room_id}&bag_id=${thisGift.bagId}&gift_id=${thisGift.giftId}&gift_num=${thisGift.number}`;
        if (index == 0) {
            $console.info(`共有${giftList.length}组礼物`);
        }
        $console.info(`正在赠送第${index + 1}组礼物`);
        $http.get({
            url: url
        }).then(function (resp) {
            var data = resp.data;
            if (data.code == 0) {
                const resultData = data.data;
                $console.info(`第${index + 1}组礼物：${resultData.send_tips}`);
                if (index == giftList.length - 1) {
                    $ui.loading(false);
                    $ui.alert({
                        title: "赠送完毕",
                        message: `尝试赠送了${giftList.length}组礼物给[${liveData.target_name}]，请查收`,
                    });
                } else {
                    sendLiveGiftList(liveData, giftList, index + 1);
                }
            } else {
                $ui.loading(false);
                $ui.alert({
                    title: `Error ${data.code}`,
                    message: data.message || data.msg || "未知错误",
                });
            }

        });
    } else {
        $ui.alert({
            title: "赠送错误",
            message: "空白礼物列表",
        });
    }
};
let getVideoDanmuku = mid => {
    $ui.loading(true);
    const danmukuUrl = `https://comment.bilibili.com/${mid}.xml`;
    $http.get({
        url: danmukuUrl
    }).then(function (resp) {
        $ui.loading(false);
        const danmuXmlList = [];
        const $ = cheerio.load(resp.data, {
            normalizeWhitespace: true,
            xmlMode: true
        });
        $console.info(resp.data);
        $console.info($.xml());
        $("i > d").each(function (i, elem) {
            danmuXmlList.push($(elem));
        });
        const danmuStrList = danmuXmlList.map(d => d.text());
        /* $ui.menu({
            items: [],
            handler: function (title, idx) {
                var findElement = danmuStrList.findIndex(element => element > 12);
            }
        }); */
        $ui.push({
            props: {
                title: "弹幕列表"
            },
            views: [{
                type: "list",
                props: {
                    data: [`显示全部(${danmuStrList.length}个)`, "搜索"]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function (sender, indexPath, data) {
                        const section = indexPath.section;
                        const row = indexPath.row;
                        switch (row) {
                            case 0:
                                $ui.push({
                                    props: {
                                        title: `${danmuStrList.length}个弹幕`
                                    },
                                    views: [{
                                        type: "list",
                                        props: {
                                            data: danmuStrList
                                        },
                                        layout: $layout.fill,
                                        events: {
                                            didSelect: function (_sender, _indexPath, _data) {
                                                const _section = _indexPath.section;
                                                const _row = _indexPath.row;
                                                $ui.alert({
                                                    title: _data,
                                                    message: danmuXmlList[_row].attr("p"),
                                                });
                                            }
                                        }
                                    }]
                                });
                                break;
                            default:
                                $ui.error("不支持");
                        }
                    }
                }
            }]
        });
    });
};
let getWallet = () => {
    if (isLogin()) {
        $http.get({
            url: _URL.BILIBILI.GET_WALLET + _userData.access_key
        }).then(function (resp) {
            var data = resp.data;
            $console.info(data);
            if (data) {
                if (data.code == 0) {
                    let walletData = data.data;
                    $ui.alert({
                        title: "钱包余额",
                        message: `金瓜子：${walletData.gold}\n` +
                            `银瓜子：${walletData.silver}\n` +
                            `硬币：${walletData.coin}\n` +
                            `vip(老爷?)：${walletData.vip==1?"已开通":"未开通"}\n` +
                            `硬币换银瓜子额度：${walletData.coin_2_silver_left}\n` +
                            `银瓜子换硬币额度：${walletData.silver_2_coin_left}\n` +
                            `银瓜子换硬币：${walletData.status==1?"允许":"不允许"}`,
                        actions: [{
                            title: "换硬币",
                            disabled: !(walletData.silver_2_coin_left > 0 && walletData.status > 0),
                            handler: function () {
                                if (walletData.silver_2_coin_left > 0 && walletData.status > 0) {
                                    $http.post({
                                        url: _URL.BILIBILI.SILVER_TO_COIN,
                                        header: {
                                            "User-Agent": "bili-universal/9290 CFNetwork/1125.2 Darwin/19.4.0 os/ios model/iPhone 11 mobi_app/iphone osVer/13.4 network/2",
                                            "Content-Type": "application/x-www-form-urlencoded"
                                        },
                                        body: {
                                            access_key: _userData.access_key
                                        },
                                        handler: function (resp) {
                                            var data = resp.data;
                                            $console.info(data);
                                            if (data) {
                                                if (data.code == 0) {
                                                    let silver2coinData = data.data;
                                                    $ui.alert({
                                                        title: data.message || data.msg || "兑换成功",
                                                        message: `金瓜子：${silver2coinData.gold}\n` +
                                                            `银瓜子：${silver2coinData.silver}\n` +
                                                            `硬币：${silver2coinData.coin}\n`
                                                    });
                                                } else {
                                                    $ui.alert({
                                                        title: `错误${data.code}`,
                                                        message: data.message || data.msg || "未知错误",
                                                    });
                                                }
                                            } else {
                                                $ui.alert({
                                                    title: "错误",
                                                    message: "空白数据",
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    $ui.error("错误，额度已空");
                                }
                            }
                        }, {
                            title: "OK",
                            disabled: false,
                            handler: function () {}
                        }]
                    });
                } else {
                    $ui.alert({
                        title: `错误${data.code}`,
                        message: data.message || data.msg || "未知错误",
                    });
                }
            } else {
                $ui.alert({
                    title: "错误",
                    message: "空白数据",
                });
            }
        });
    } else {

    }
};
let mangaClockin = () => {
    if (_userData.access_key == 0) {
        $ui.alert({
            title: "签到失败",
            message: "access_key为空，请登录",
        });
    } else if (_userData.uid == 0) {
        $ui.alert({
            title: "签到失败",
            message: "用户id为空，请获取用户信息",
        });
    } else {
        $ui.loading(true);
        $http.post({
            url: _URL.BILIBILI.MANGA_CLOCK_IN,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "comic-universal/802 CFNetwork/1125.2 Darwin/19.4.0 os/ios model/iPhone 11 mobi_app/iphone_comic osVer/13.4 network/2"
            },
            body: {
                platform: "ios",
                uid: _userData.uid,
                access_key: _userData.access_key
            },
            handler: function (postResp) {
                var clockinData = postResp.data;
                $console.info(clockinData);
                $ui.loading(false);
                if (clockinData) {
                    /* $ui.alert({
                        title: "签到结果",
                        message: clockinData,
                    }); */
                    if (clockinData.code == 0) {
                        $ui.alert({
                            title: "签到结果",
                            message: "签到成功",
                        });
                    } else {
                        $ui.alert({
                            title: `错误：${clockinData.code}`,
                            message: clockinData.msg,
                        });
                    }
                } else {
                    $ui.alert({
                        title: "签到失败",
                        message: "服务器返回空白结果",
                    });
                }
            }
        });
    }
};
let getCoverFromGalmoe = vid => {
    return $http.get({
        url: _BILIURL.COVER_GALMOE + vid
    });
    /* .then(function (resp) {
            var data = resp.data;

        }); */
};
let vipCheckin= ()  => {
  $http.post({
    url: _URL.BILIBILI.VIP_CHECKIN,
    header: {
      "User-Agent": "bili-universal/9290 CFNetwork/1125.2 Darwin/19.4.0"
    },
    body: {
      access_key:_userData.access_key
    },
    handler: resp => {
      var data = resp.data;
      $console.info(data)
    }
  });
};
let laterToWatch = () =>{
  $http.get({
    url: _URL.BILIBILI.LATER_TO_WATCH + _userData.access_key,
    handler: resp => {
      var data = resp.data;
      $console.info(data);
    }
  });
};
module.exports = {
    getVideoInfo,
    getAccessKey,
    checkAccessKey,
    getUserInfo,
    saveAccessKey,
    init,
    removeLoginData,
    getVideoData,
    getVideo,
    getVidFromUrl,
    getLiveGiftList,
    getLiveroomInfo,
    getFansMedalList,
    isLogin,
    getWallet,
    mangaClockin,
    getCoverFromGalmoe,
    vipCheckin,
    laterToWatch,
};