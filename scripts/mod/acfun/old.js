const appScheme = require("AppScheme"),
    $$ = require("$$"),
    _UA = require("./common").USER_AGENT,
    urlCheck = {
        acVideoSiteList: [
            "acfun://detail/upPage/",
            "https://www.acfun.cn/v/ac",
            "https://m.acfun.cn/v/?"
        ],
        acUploaderSiteList: [
            "https://www.acfun.cn/u/",
            "https://m.acfun.cn/upPage/"
        ],
        getAcfunVideoUrlList: () => {
            return acVideoSiteList;
        },
        getAcfunUploaderUrlList: () => {
            return acUploaderSiteList;
        },
        isAcfunVideoUrl: url => {
            return $$.Str.startsWithList(url, acVideoSiteList);
            //return url.startsWithList(acVideoSiteList);
        },
        isAcfunUploaderUrl: url => {
            return $$.Str.startsWithList(url, acUploaderSiteList);
            //return url.startsWithList(acUploaderSiteList);
        },
        isAcfunUrl: url => {
            return url && (isAcfunVideoUrl(url) || isAcfunUploaderUrl(url));
        }
    },
    _ACFUN = {
        LOGIN: "https://id.app.acfun.cn/rest/app/login/signin",
        GET_USER_INFO:
            "https://api-new.app.acfun.cn/rest/app/user/personalInfo",
        DOWNLOAD_VIDEO:
            "https://api-new.app.acfun.cn/rest/app/play/playInfo/mp4",
        GET_VIDEO_INFO:
            "https://api-new.app.acfun.cn/rest/app/douga/info?dougaId=",
        SIGN_IN: "https://api-new.app.acfun.cn/rest/app/user/signIn",
        GET_UPLOADER_VIDEO:
            "https://api-new.app.acfun.cn/rest/app/user/resource/query",
        ACFUN_DETAIL_VIDEO: "acfun://detail/video/",
        ACFUN_WWW_V_AC: "https://www.acfun.cn/v/ac",
        ACFUN_M_V_AC: "https://m.acfun.cn/v/?",
        ACFUN_DETAIL_UPPAGE: "acfun://detail/upPage/",
        ACFUN_WWW_UPPAGE: "https://www.acfun.cn/u/",
        ACFUN_M_UPPAGE: "https://m.acfun.cn/upPage/",
        VIDEO_CDN_ALICDN: "http://ali-video.acfun.cn/",
        VIDEO_CDN_TXCDN: "http://tx-video.acfun.cn/",
        ADD_FRIENDS: "https://wpa.qq.com/msgrd?v=3&site=acfun.cn&menu=yes&uin=",
        ACFUN_DETAIL_UPLOADER: "acfun://detail/uploader/"
    },
    acVideoSiteList = [
        _ACFUN.ACFUN_DETAIL_VIDEO,
        _ACFUN.ACFUN_WWW_V_AC,
        _ACFUN.ACFUN_M_V_AC
    ],
    acUploaderSiteList = [
        _ACFUN.ACFUN_DETAIL_UPLOADER,
        _ACFUN.ACFUN_WWW_V_AC,
        _ACFUN.ACFUN_M_V_AC
    ],
    acHeaders = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": _UA.APP_IOS,
        deviceType: 0,
        market: "appstore",
        appVersion: "6.17.0.349"
    },
    _cacheKey = {
        acPassToken: "acfun_acPassToken",
        token: "acfun_token",
        acSecurity: "acfun_acSecurity",
        auth_key: "acfun_auth_key",
        userid: "acfun_userid",
        uploaderVideo_lastUid: "acfun_uploaderVideo_lastUid",
        uploaderVideo_lastPage: "acfun_uploaderVideo_lastPage_",
        lastClickedVid: "acfun_lastClickedVid"
    },
    acUserData = {
        acPassToken: "",
        token: "",
        acSecurity: "",
        isLogin: false,
        auth_key: "",
        userid: ""
    },
    login = (id, pwd) => {
        $ui.loading(true);
        $http.post({
            url: _ACFUN.LOGIN,
            header: acHeaders,
            body: {
                username: id,
                password: pwd
            },
            handler: function (resp) {
                const acResult = resp.data;
                $console.info(acResult);
                if (acResult.result === 0) {
                    saveUserToken(acResult);
                    loadUserToken();
                    $ui.loading(false);
                    $ui.alert({
                        title: "登录结果",
                        message: JSON.stringify(acResult)
                    });
                } else {
                    $ui.loading(false);
                    $ui.alert({
                        title: "登录失败",
                        message: acResult.error_msg
                    });
                }
            }
        });
    },
    saveUserToken = acResult => {
        $cache.set(_cacheKey.acPassToken, acResult.acPassToken);
        $cache.set(_cacheKey.token, acResult.token);
        $cache.set(_cacheKey.acSecurity, acResult.acSecurity);
        $cache.set(_cacheKey.auth_key, acResult.auth_key.toString());
        $cache.set(_cacheKey.userid, acResult.userid.toString());
        $ui.toast("已保存登录信息");
    },
    loadUserToken = () => {
        acUserData.acPassToken = $cache.get(_cacheKey.acPassToken) || "";
        acUserData.token = $cache.get(_cacheKey.token) || "";
        acUserData.acSecurity = $cache.get(_cacheKey.acSecurity) || "";
        acUserData.auth_key = $cache.get(_cacheKey.auth_key) || "";
        acUserData.userid = $cache.get(_cacheKey.userid) || "";
        acUserData.isLogin =
            acUserData.acPassToken.length > 0 &&
            acUserData.token.length > 0 &&
            acUserData.acSecurity.length > 0 &&
            acUserData.auth_key.length > 0 &&
            acUserData.userid.length > 0
                ? true
                : false;
        $console.info(acUserData);
    },
    logout = () => {
        $cache.remove(_cacheKey.acPassToken);
        $cache.remove(_cacheKey.token);
        $cache.remove(_cacheKey.acSecurity);
        $cache.remove(_cacheKey.auth_key);
        $cache.remove(_cacheKey.userid);
        acUserData = {};
        $ui.alert({
            title: "已退出",
            message: "退出成功"
        });
        loadUserToken();
    },
    isLogin = () => {
        loadUserToken();
        return acUserData.isLogin;
    },
    getCookies = () => {
        return isLogin()
            ? `acPasstoken=${acUserData.acPassToken};auth_key=${acUserData.auth_key}`
            : "";
    },
    getVideoInfo = () => {
        $ui.loading(true);
        $input.text({
            type: $kbType.number,
            autoFontSize: true,
            placeholder: "输入vid(不带ac)",
            /* text: "12702163", */
            handler: function (vid) {
                if (vid.length > 0) {
                    getVideoPid(vid);
                } else {
                    $ui.loading(false);
                    $ui.error("空白vid");
                }
            }
        });
    },
    getVideoPid = vid => {
        $ui.loading(true);
        $http.get({
            url: _ACFUN.GET_VIDEO_INFO + vid,
            handler: function (resp) {
                let videoResult = resp.data;
                $console.info(videoResult);
                if (videoResult.result === 0) {
                    const partList = videoResult.videoList;
                    let pid = -1;
                    if (partList.length === 1) {
                        pid = videoResult.videoList[0].id;
                    } else {
                        const pidList = partList.map(function (x) {
                            return x;
                        });
                        $ui.menu({
                            items: pidList,
                            handler: function (title, idx) {
                                pid = title;
                            }
                        });
                    }
                    downloadVideo(vid, pid);
                } else {
                    $ui.loading(false);
                    $ui.alert({
                        title: `错误代码${videoResult.result}`,
                        message: videoResult.error_msg
                    });
                }
            }
        });
    },
    downloadVideo = (vid, pid) => {
        $console.info(`vid:${vid}\npid:${pid}`);
        $http.post({
            url: _ACFUN.DOWNLOAD_VIDEO + `?resourceId=${vid}&videoId=${pid}`,
            header: {
                /* Cookie: getCookies() */
            },
            handler: function (resp) {
                let videoResult = resp.data;
                $console.info(videoResult);
                if (videoResult.result === 0) {
                    const playInfo = videoResult.playInfo;
                    const videoData = playInfo.streams;
                    const thisVideoFile = videoData[videoData.length - 1];
                    const cdnUrl = thisVideoFile.cdnUrls;
                    const cdnTitleList = cdnUrl.map(function (x) {
                        const thisUrl = x.url;
                        if (thisUrl.startsWith(_ACFUN.VIDEO_CDN_TXCDN)) {
                            return "腾讯源";
                        } else if (
                            thisUrl.startsWith(_ACFUN.VIDEO_CDN_ALICDN)
                        ) {
                            return "阿里源";
                        } else {
                            return "未知源";
                        }
                    });
                    $ui.loading(false);
                    $ui.push({
                        props: {
                            title: "下载地址"
                        },
                        views: [
                            {
                                type: "list",
                                props: {
                                    data: cdnTitleList
                                },
                                layout: $layout.fill,
                                events: {
                                    didSelect: function (
                                        _sender,
                                        indexPath,
                                        _data
                                    ) {
                                        const idx = indexPath.row;
                                        const videoUrl = cdnUrl[idx].url;
                                        $ui.alert({
                                            title: cdnTitleList[idx],
                                            message: videoUrl,
                                            actions: [
                                                {
                                                    title:
                                                        "使用Alook浏览器打开",
                                                    disabled: false,
                                                    handler: function () {
                                                        $ui.menu({
                                                            items: [
                                                                "网页浏览",
                                                                "下载"
                                                            ],
                                                            handler: function (
                                                                title,
                                                                idx
                                                            ) {
                                                                switch (idx) {
                                                                    case 0:
                                                                        appScheme.Browser.Alook.open(
                                                                            videoUrl
                                                                        );
                                                                        break;
                                                                    case 1:
                                                                        appScheme.Browser.Alook.download(
                                                                            videoUrl
                                                                        );
                                                                        break;
                                                                }
                                                            }
                                                        });
                                                    }
                                                },
                                                {
                                                    title: "分享",
                                                    disabled: false,
                                                    handler: function () {
                                                        $share.sheet([
                                                            videoUrl
                                                        ]);
                                                    }
                                                },
                                                {
                                                    title: "关闭",
                                                    disabled: false,
                                                    handler: function () {}
                                                }
                                            ]
                                        });
                                    }
                                }
                            }
                        ]
                    });
                } else {
                    $ui.loading(false);
                    $ui.alert({
                        title: `错误代码${videoResult.result}`,
                        message: videoResult.error_msg
                    });
                }
            }
        });
    },
    signIn = () => {
        if (isLogin()) {
            $ui.loading(true);
            $http.post({
                url: _ACFUN.SIGN_IN,
                header: {
                    Cookie: getCookies(),
                    acPlatform: "IPHONE"
                },
                handler: function (resp) {
                    let signinResult = resp.data;
                    $console.info(signinResult);
                    $ui.loading(false);
                    signinResult.result === 0
                        ? $ui.alert({
                              title: "签到成功",
                              message: signinResult.msg
                          })
                        : $ui.alert({
                              title: `错误代码${signinResult.result}`,
                              message: signinResult.msg
                                  ? signinResult.msg
                                  : signinResult.error_msg
                          });
                }
            });
        } else {
            $ui.error("未登录");
        }
    },
    getUploaderVideo = (uid, page = 1, count = 20) => {
        $http
            .post({
                url: _ACFUN.GET_UPLOADER_VIDEO,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: {
                    authorId: uid,
                    count: count,
                    pcursor: page - 1,
                    resourceType: 2,
                    sortType: 3,
                    status: 1
                }
            })
            .then(function (resp) {
                let acData = resp.data;
                if (acData.result === 0) {
                    const feedList = acData.feed;
                    if (feedList.length > 0) {
                        $cache.set(_cacheKey.uploaderVideo_lastUid, uid);
                        $cache.set(
                            _cacheKey.uploaderVideo_lastPage + uid,
                            page
                        );
                        showUploaderVideoList(acData);
                    } else {
                        $ui.error(`第${page}页空白`);
                    }
                } else {
                    $ui.alert({
                        title: `错误代码 ${acData.result}`,
                        message: acData.error_msg
                    });
                }
            });
    },
    showUploaderVideoList = acData => {
        const videoList = acData.feed;
        const listClickedVid = $cache.get(_cacheKey.lastClickedVid);
        $ui.push({
            props: {
                title: videoList[0].user.name
            },
            views: [
                {
                    type: "list",
                    props: {
                        data: [
                            {
                                title: "结果",
                                rows: [
                                    `全部${acData.totalNum}共个视频`,
                                    `当前第${acData.pcursor}页，有${videoList.length}个视频`
                                ]
                            },
                            {
                                title: "视频列表",
                                rows: videoList.map(v => {
                                    if (listClickedVid) {
                                        if (listClickedVid == v.dougaId) {
                                            return `[上次]${v.title}`;
                                        }
                                    }
                                    return v.title;
                                })
                            }
                        ],
                        menu: {
                            title: "菜单",
                            items: [
                                {
                                    title: "打开客户端",
                                    symbol: "arrowshape.turn.up.right",
                                    handler: (sender, indexPath) => {
                                        const vid =
                                            videoList[indexPath.row].dougaId;
                                        if (indexPath.section === 1) {
                                            $cache.set(
                                                _cacheKey.lastClickedVid,
                                                vid
                                            );
                                            appScheme.Video.Acfun.video(vid);
                                        } else {
                                            $ui.error(
                                                "这里长按无效，请在视频列表长按"
                                            );
                                        }
                                    }
                                },
                                {
                                    title: "分享网址",
                                    symbol: "square.and.arrow.up",
                                    handler: (sender, indexPath) => {
                                        const vid =
                                            videoList[indexPath.row].dougaId;
                                        if (indexPath.section === 1) {
                                            $cache.set(
                                                _cacheKey.lastClickedVid,
                                                vid
                                            );
                                            $share.sheet([
                                                appScheme.Video.Acfun.getVideoWebUrl(
                                                    vid
                                                )
                                            ]);
                                        } else {
                                            $ui.error(
                                                "这里长按无效，请在视频列表长按"
                                            );
                                        }
                                    }
                                },
                                {
                                    title: "分享打开客户端的链接",
                                    symbol: "square.and.arrow.up",
                                    handler: (sender, indexPath) => {
                                        const vid =
                                            videoList[indexPath.row].dougaId;
                                        if (indexPath.section === 1) {
                                            $cache.set(
                                                _cacheKey.lastClickedVid,
                                                vid
                                            );
                                            $share.sheet([
                                                appScheme.Video.Acfun.getVideoUrl(
                                                    vid
                                                )
                                            ]);
                                        } else {
                                            $ui.error(
                                                "这里长按无效，请在视频列表长按"
                                            );
                                        }
                                    }
                                },
                                {
                                    title: "分享网址(二维码)",
                                    symbol: "qrcode",
                                    handler: (sender, indexPath) => {
                                        const vid =
                                            videoList[indexPath.row].dougaId;
                                        if (indexPath.section === 1) {
                                            $cache.set(
                                                _cacheKey.lastClickedVid,
                                                vid
                                            );
                                            $quicklook.open({
                                                image: appScheme.Video.Acfun.getVideoWebUrl(
                                                    vid
                                                ).getQrcode()
                                            });
                                        } else {
                                            $ui.error(
                                                "这里长按无效，请在视频列表长按"
                                            );
                                        }
                                    }
                                },
                                {
                                    title: "分享打开客户端的链接(二维码)",
                                    symbol: "qrcode",
                                    handler: (sender, indexPath) => {
                                        const vid =
                                            videoList[indexPath.row].dougaId;
                                        if (indexPath.section === 1) {
                                            $cache.set(
                                                _cacheKey.lastClickedVid,
                                                vid
                                            );
                                            $quicklook.open({
                                                image: appScheme.Video.Acfun.getVideoWebUrl(
                                                    vid
                                                ).getQrcode()
                                            });
                                        } else {
                                            $ui.error(
                                                "这里长按无效，请在视频列表长按"
                                            );
                                        }
                                    }
                                },
                                {
                                    title: "视频解析",
                                    symbol: "square.and.arrow.down",
                                    handler: (sender, indexPath) => {
                                        if (indexPath.section === 1) {
                                            const vid =
                                                videoList[indexPath.row]
                                                    .dougaId;
                                            $cache.set(
                                                _cacheKey.lastClickedVid,
                                                vid
                                            );
                                            getVideoPid(
                                                videoList[indexPath.row].dougaId
                                            );
                                        } else {
                                            $ui.error(
                                                "这里长按无效，请在视频列表长按"
                                            );
                                        }
                                    }
                                }
                            ]
                        }
                    },
                    layout: $layout.fill,
                    events: {
                        didSelect: function (_sender, indexPath, _data) {
                            switch (indexPath.section) {
                                case 1:
                                    const _vid =
                                        videoList[indexPath.row].dougaId;
                                    $cache.set(_cacheKey.lastClickedVid, _vid);
                                    appScheme.Video.Acfun.video(_vid);
                                    break;
                            }
                        }
                    }
                }
            ]
        });
    },
    getVidFromUrl = url => {
        let vid = undefined;
        if (urlCheck.isAcfunVideoUrl(url)) {
            acVideoSiteList.map(s => {
                if (s == _ACFUN.ACFUN_M_V_AC) {
                    let newUrl = url.remove(s);
                    const paramsList = newUrl.split("&");
                    paramsList.map(p => {
                        if (p.startsWith("ac=")) {
                            vid = p.split("=")[1];
                        }
                    });
                } else if (url.startsWith(s)) {
                    vid = url.remove(s);
                }
            });
        }
        $console.info(`getVidFromUrl:${vid}`);
        return vid;
    },
    getuidFromUrl = url => {
        let uid = undefined;
        if (urlCheck.isAcfunUploaderUrl(url)) {
            acUploaderSiteList.map(s => {
                if (url.startsWith(s)) {
                    // uid = strUril.remove(url, s).remove(url, ".aspx");
                    uid = url.remove(s).remove(".aspx");
                }
            });
        }
        $console.info(`getuidFromUrl:${uid}`);
        return uid;
    },
    init = () => {
        loadUserToken();
    };
module.exports = {
    login,
    logout,
    isLogin,
    init,
    getVideoInfo,
    signIn,
    getUploaderVideo,
    _cacheKey,
    getVidFromUrl,
    getVideoPid,
    getuidFromUrl,
    urlCheck
};
