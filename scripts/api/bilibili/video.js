let sys = require("../system.js"),
    _BILIURL = require("../urlData.js").BILIBILI,
    _UA = require("../user-agent.js"),
    _USER = require("./user.js"),
    _CACHE = require("./cache.js");

function getVideoInfo(vid) {
    $ui.loading(true);
    $http.get({
        url: _BILIURL.GET_VIDEO_INFO + vid,
        header: {
            "User-Agent": _UA.KAAASS
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
                                        url: _BILIURL.BILIBILI_WWW_VIDEO + vid
                                    });
                                }
                            }]
                        },
                        views: [{
                            type: "list",
                            props: {
                                data: [{
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
                        }]
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

function laterToWatch() {
    const accessKey = _USER.getAccessKey();
    if (accessKey) {
        $http.get({
            url: _BILIURL.LATER_TO_WATCH + accessKey,
            header: {
                "User-Agent": _UA.BILIBILI.APP_IPHONE
            }
        }).then(function (resp) {
            var data = resp.data;
            $console.info(data);
            if (data.data) {
                if (data.data.count > 0) {
                    let laterList = data.data.list;
                    $ui.push({
                        props: {
                            title: `稍后再看-${data.data.count}`
                        },
                        views: [{
                            type: "list",
                            props: {
                                data: laterList.map(v => v.title.replace(/\【/g, "[").replace(/\】/g, "]"))
                            },
                            layout: $layout.fill,
                            events: {
                                didSelect: function (_sender, indexPath, _data) {
                                    getVideoInfo(laterList[indexPath.row].aid);
                                }
                            }
                        }]
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

module.exports = {
    getVideoInfo,
    laterToWatch
};