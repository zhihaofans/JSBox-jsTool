let cheerio = require("cheerio"),
    appScheme = require("AppScheme"),
    _URL = require("./api_url.js"),
    _UA = require("../user-agent.js"),
    _USER = require("./user.js"),
    $_str = require("../../libs/string");

function getBiliobVideo(avid) {
    $ui.loading(true);
    $http
        .get({
            url: _URL.BILIOB.API_VIDEO + avid
        })
        .then(function (resp) {
            var v = resp.data;
            $ui.loading(false);
            if (v) {
                $ui.push({
                    props: {
                        title: `av${v.aid}`
                    },
                    views: [
                        {
                            type: "list",
                            props: {
                                data: [
                                    {
                                        title: "",
                                        rows: [
                                            `标题：${v.title}`,
                                            `BV：${v.bvid}`,
                                            `作者：${v.authorName}`,
                                            `分类：${v.channel} > ${v.subChannel}`,
                                            `时间：${v.cDatetime}`,
                                            `观看：${v.cView}`,
                                            `收藏：${v.cFavorite}`,
                                            `弹幕：${v.cDanmaku}`,
                                            `硬币：${v.cCoin}`,
                                            `分享：${v.cShare}`,
                                            `点赞：${v.cLike}`
                                        ]
                                    },
                                    {
                                        title: "",
                                        rows: ["查看封面"]
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
                                    const section = indexPath.section;
                                    const row = indexPath.row;
                                    switch (section) {
                                        case 0:
                                            switch (row) {
                                                case 2:
                                                    $ui.alert({
                                                        title: v.authorName,
                                                        message: v.author
                                                    });
                                                    break;
                                                default:
                                                    const textList = _data.split(
                                                        "："
                                                    );
                                                    $ui.alert({
                                                        title: textList[0],
                                                        message: textList[1]
                                                    });
                                            }
                                            break;
                                        case 1:
                                            switch (row) {
                                                case 0:
                                                    $ui.preview({
                                                        title: `av${v.aid}`,
                                                        url: v.pic
                                                    });
                                                    break;
                                            }
                                    }
                                }
                            }
                        }
                    ]
                });
            } else {
                $ui.error("错误");
            }
        });
}
// 下载视频
function getVideo(vid, _biliData) {
    const partList = _biliData.list;
    const partTitleList = partList.map(x => x.part);
    $ui.menu({
        items: partTitleList,
        handler: function (title, idx) {
            //1080p以上需要带header
            if (_USER.isLogin()) {
                getVideoData(vid, idx + 1, 116, _USER.getAccessKey());
            } else {
                getVideoData(vid, idx + 1, 80, "");
            }
        }
    });
}

function getVideoData(vid, page, quality, access_key) {
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
                                switch (downloadList.length) {
                                    case 0:
                                        $ui.loading(false);
                                        $ui.error("空白可下载文件");
                                        break;
                                    case 1:
                                        showVideoDownList(
                                            downloadList[0],
                                            copyStr
                                        );
                                        break;
                                    default:
                                        var dList = [];
                                        for (i in downloadList) {
                                            dList.push(
                                                `第${(i + 1).toString()}个文件`
                                            );
                                        }
                                        $ui.loading(false);
                                        $ui.push({
                                            props: {
                                                title: "可下载文件列表"
                                            },
                                            views: [
                                                {
                                                    type: "list",
                                                    props: {
                                                        data: dList
                                                    },
                                                    layout: $layout.fill,
                                                    events: {
                                                        didSelect: function (
                                                            _sender,
                                                            indexPath,
                                                            data
                                                        ) {
                                                            showVideoDownList(
                                                                downloadList[
                                                                    indexPath
                                                                        .row
                                                                ],
                                                                copyStr
                                                            );
                                                        }
                                                    }
                                                }
                                            ]
                                        });
                                }
                            } else {
                                $ui.loading(false);
                                $ui.alert({
                                    title: `Error ${biliData.code}`,
                                    message: biliData.message
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
                    message: videoResp.message
                });
            }
        }
    });
}
// 获取弹幕列表
function getVideoDanmuku(mid) {
    $ui.loading(true);
    $http
        .get({
            url: `${_URL.BILIBILI.DANMUKU_LIST}${mid}.xml`
        })
        .then(function (resp) {
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
            $ui.push({
                props: {
                    title: "弹幕列表"
                },
                views: [
                    {
                        type: "list",
                        props: {
                            data: [`显示全部(${danmuStrList.length}个)`, "搜索"]
                        },
                        layout: $layout.fill,
                        events: {
                            didSelect: function (sender, indexPath, data) {
                                switch (indexPath.row) {
                                    case 0:
                                        $ui.push({
                                            props: {
                                                title: `${danmuStrList.length}个弹幕`
                                            },
                                            views: [
                                                {
                                                    type: "list",
                                                    props: {
                                                        data: danmuStrList
                                                    },
                                                    layout: $layout.fill,
                                                    events: {
                                                        didSelect: function (
                                                            _sender,
                                                            _indexPath,
                                                            _data
                                                        ) {
                                                            $ui.alert({
                                                                title: _data,
                                                                message: danmuXmlList[
                                                                    _indexPath
                                                                        .section
                                                                ].attr("p")
                                                            });
                                                        }
                                                    }
                                                }
                                            ]
                                        });
                                        break;
                                    default:
                                        $ui.error("不支持");
                                }
                            }
                        }
                    }
                ]
            });
        });
}
// 获取视频信息
function getVideoInfo(input) {
    const vid = input.startsWith("http") ? getVidFromUrl(input) : input;
    $ui.loading(true);
    $http.get({
        url: _URL.KAAASS.GET_VIDEO_INFO + vid,
        header: {
            "User-Agent": _UA.KAAASS
        },
        handler: function (resp) {
            const data = resp.data;
            if (resp.response.statusCode == 200) {
                if (data.status == "OK") {
                    const _biliData = data.data;
                    const allow_download = _biliData.allow_download
                        ? "是"
                        : "否";
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
                            navButtons: [
                                {
                                    title: "打开网页版",
                                    icon: "068", // Or you can use icon name
                                    symbol: "checkmark.seal", // SF symbols are supported
                                    handler: () => {
                                        $ui.preview({
                                            title: "av" + vid,
                                            url:
                                                _URL.BILIBILI
                                                    .BILIBILI_WWW_VIDEO + vid
                                        });
                                    }
                                }
                            ]
                        },
                        views: [
                            {
                                type: "list",
                                props: {
                                    data: [
                                        {
                                            title: "功能",
                                            rows: [
                                                "下载封面",
                                                "下载up头像",
                                                "视频解析",
                                                "查看弹幕",
                                                "BiliOB观测者"
                                            ]
                                        },
                                        {
                                            title: "数据",
                                            rows: videoInfoList
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
                                                        $ui.preview({
                                                            title: `av${vid}`,
                                                            url: _biliData.pic
                                                        });
                                                        break;
                                                    case 1:
                                                        $ui.preview({
                                                            title:
                                                                _biliData.author,
                                                            url: _biliData.face
                                                        });
                                                        break;
                                                    case 2:
                                                        getVideo(
                                                            vid,
                                                            _biliData
                                                        );
                                                        break;
                                                    case 3:
                                                        const partList =
                                                            _biliData.list;
                                                        if (
                                                            partList.length == 1
                                                        ) {
                                                            getVideoDanmuku(
                                                                partList[0].cid
                                                            );
                                                        } else {
                                                            $ui.menu({
                                                                items: partList.map(
                                                                    p => p.part
                                                                ),
                                                                handler: function (
                                                                    _,
                                                                    idx
                                                                ) {
                                                                    getVideoDanmuku(
                                                                        partList[
                                                                            idx
                                                                        ].cid
                                                                    );
                                                                }
                                                            });
                                                        }
                                                        break;
                                                    case 4:
                                                        getBiliobVideo(vid);
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
                            }
                        ]
                    };
                    $ui.loading(false);
                    switch ($app.env) {
                        case $env.app:
                            $ui.push(listView);
                            break;
                        default:
                            $ui.render(listView);
                    }
                } else {
                    $ui.loading(false);
                    $ui.alert({
                        title: `Error ${resp.response.statusCode}`,
                        message: data
                    });
                }
            } else {
                $ui.loading(false);
                $ui.alert({
                    title: `Error ${resp.response.statusCode}`,
                    message: data.code
                });
            }
        }
    });
}
// 稍后再看
function laterToWatch() {
    const accessKey = _USER.getAccessKey();
    if (accessKey) {
        $http
            .get({
                url: _URL.BILIBILI.LATER_TO_WATCH + accessKey,
                header: {
                    "User-Agent": _UA.BILIBILI.APP_IPHONE
                }
            })
            .then(function (resp) {
                var data = resp.data;
                $console.info(data);
                if (data.data) {
                    if (data.data.count > 0) {
                        let laterList = data.data.list;
                        $ui.push({
                            props: {
                                title: `稍后再看-${data.data.count}`
                            },
                            views: [
                                {
                                    type: "list",
                                    props: {
                                        data: laterList.map(v =>
                                            v.title
                                                .replace(/\【/g, "[")
                                                .replace(/\】/g, "]")
                                        )
                                    },
                                    layout: $layout.fill,
                                    events: {
                                        didSelect: function (
                                            _sender,
                                            indexPath,
                                            _data
                                        ) {
                                            getVideoInfo(
                                                laterList[indexPath.row].aid
                                            );
                                        }
                                    }
                                }
                            ]
                        });
                    } else {
                        $ui.error("稍后再看列表是空白的，请添加");
                    }
                } else {
                    $ui.error("空白数据");
                }
            });
    } else {
        $ui.error("请登录");
    }
}
// 显示可下载视频文件列表
function showVideoDownList(thisFile, copyStr) {
    var urlList = [thisFile.url];
    urlList = urlList.concat(thisFile.backup_url);
    $ui.push({
        props: {
            title: "可下载文件列表"
        },
        views: [
            {
                type: "list",
                props: {
                    data: urlList
                },
                layout: $layout.fill,
                events: {
                    didSelect: function (_sender, idxp, _data) {
                        if (copyStr) {
                            $ui.toast("请复制headers");
                            $input.text({
                                placeholder: "",
                                text: copyStr,
                                handler: function (text) {
                                    $_str.copy(copyStr);
                                    $ui.menu({
                                        items: [
                                            "分享",
                                            "使用外部播放器打开",
                                            "使用Alook浏览器打开"
                                        ],
                                        handler: function (title, idx) {
                                            switch (idx) {
                                                case 0:
                                                    $share.sheet([_data]);
                                                    break;
                                                case 1:
                                                    $ui.menu({
                                                        items: [
                                                            "AVPlayer",
                                                            "nplayer"
                                                        ],
                                                        handler: function (
                                                            titlePlayer,
                                                            idxPlayer
                                                        ) {
                                                            switch (idxPlayer) {
                                                                case 0:
                                                                    appScheme.avplayerVideo(
                                                                        _data
                                                                    );
                                                                    break;
                                                                case 1:
                                                                    appScheme.nplayerVideo(
                                                                        _data
                                                                    );
                                                                    break;
                                                            }
                                                        }
                                                    });
                                                    break;
                                                case 2:
                                                    appScheme.alookBrowserOpen(
                                                        _data
                                                    );
                                                    break;
                                            }
                                        }
                                    });
                                }
                            });
                        } else {
                            $share.sheet([_data]);
                        }
                    }
                }
            }
        ]
    });
}
// 通过链接获取av号
function getVidFromUrl(url) {
    const siteList = [
        "https://",
        "http://",
        "b23.tv/",
        "www.bilibili.com/video/",
        "www.bilibili.com/",
        "av"
    ];
    var newUrl = url;
    siteList.map(x => {
        if (newUrl.startsWith(x)) {
            newUrl = $_str.remove(newUrl, x);
        }
    });
    if (newUrl.indexOf("?")) {
        newUrl = $_str.remove(newUrl.split("?")[0], "/");
    }
    return newUrl;
}
// 获取视频封面
function getCoverFromGalmoe(vid) {
    return $http.get({
        url: _URL.GALMOE.COVER_GALMOE + vid
    });
    /* .then(function (resp) {
          var data = resp.data;

      }); */
}
module.exports = {
    getCoverFromGalmoe,
    getVideo,
    getVideoDanmuku,
    getVideoData,
    getVideoInfo,
    getVidFromUrl,
    laterToWatch
};