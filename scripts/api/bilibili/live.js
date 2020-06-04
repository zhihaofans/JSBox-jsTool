let _BILIURL = require("../urlData.js").BILIBILI,
    _USER = require("./user.js"),
    _GIFT = require("./gift.js"),
    _UA = require("../user-agent.js");
// 粉丝勋章
function getFansMedalList() {
    const ak = _USER.getAccessKey();
    // 已拥有的粉丝勋章
    $ui.loading(true);
    if (ak) {
        const link = _BILIURL.LIVE_FANS_MEDAL + ak;
        $http
            .get({
                url: link
            })
            .then(function (resp) {
                var data = resp.data;
                if (data.code == 0) {
                    $ui.toast(data.message || data.msg || "已拥有的粉丝勋章");
                    const medalData = data.data;
                    const medalList = medalData.list;
                    if (medalList.length > 0) {
                        var onlineList = [];
                        var offlineList = [];
                        medalList.map(m =>
                            m.live_stream_status == 1 ?
                            onlineList.push(m) :
                            offlineList.push(m)
                        );
                        medalList.map(
                            m =>
                            `[${m.medal_name}]${m.target_name}` +
                            (m.icon_code ? `[${m.icon_text}]` : "")
                        );
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
                                            rows: onlineList.map(
                                                m =>
                                                `[${m.medal_name}]${m.target_name}` +
                                                (m.icon_code ?
                                                    `[${m.icon_text}]` :
                                                    "") +
                                                (m.today_feed ==
                                                    m.day_limit ?
                                                    `[已满]` :
                                                    `[还差${m.day_limit -
                                                                  m.today_feed}]`)
                                            )
                                        },
                                        {
                                            title: "咕咕咕",
                                            rows: offlineList.map(
                                                m =>
                                                `[${m.medal_name}]${m.target_name}` +
                                                (m.icon_code ?
                                                    `[${m.icon_text}]` :
                                                    "") +
                                                (m.today_feed ==
                                                    m.day_limit ?
                                                    `[已满]` :
                                                    `[还差${m.day_limit -
                                                                  m.today_feed}]`)
                                            )
                                        }
                                    ],
                                    menu: {
                                        title: "菜单",
                                        items: [{
                                                title: "详细信息",
                                                symbol: "play.rectangle",
                                                handler: (
                                                    sender,
                                                    indexPath
                                                ) => {
                                                    const liveData =
                                                        indexPath.section ==
                                                        0 ?
                                                        onlineList[
                                                            indexPath
                                                            .row
                                                        ] :
                                                        offlineList[
                                                            indexPath
                                                            .row
                                                        ];
                                                    $ui.alert({
                                                        title: `[${liveData.medal_name}]${liveData.target_name}`,
                                                        message: liveData
                                                    });
                                                }
                                            },
                                            {
                                                title: "通过vtbs.moe获取vTuber信息",
                                                symbol: "play.rectangle",
                                                handler: (
                                                    sender,
                                                    indexPath
                                                ) => {
                                                    const liveData =
                                                        indexPath.section ==
                                                        0 ?
                                                        onlineList[
                                                            indexPath
                                                            .row
                                                        ] :
                                                        offlineList[
                                                            indexPath
                                                            .row
                                                        ];
                                                    getVtbLiveroomInfo(
                                                        liveData.target_id
                                                    );
                                                }
                                            },
                                            {
                                                title: "赠送礼物",
                                                symbol: "gift",
                                                handler: (
                                                    sender,
                                                    indexPath
                                                ) => {
                                                    const liveData =
                                                        indexPath.section ==
                                                        0 ?
                                                        onlineList[
                                                            indexPath
                                                            .row
                                                        ] :
                                                        offlineList[
                                                            indexPath
                                                            .row
                                                        ];
                                                    if (
                                                        liveData.day_limit -
                                                        liveData.today_feed >
                                                        0
                                                    ) {
                                                        _GIFT.getLiveGiftList(
                                                            liveData
                                                        );
                                                    } else {
                                                        $ui.alert({
                                                            title: "不用送了",
                                                            message: "今日亲密度已满"
                                                        });
                                                    }
                                                }
                                            },
                                            {
                                                title: "赠送银瓜子辣条",
                                                symbol: "gift",
                                                handler: (
                                                    sender,
                                                    indexPath
                                                ) => {
                                                    const liveData =
                                                        indexPath.section ==
                                                        0 ?
                                                        onlineList[
                                                            indexPath
                                                            .row
                                                        ] :
                                                        offlineList[
                                                            indexPath
                                                            .row
                                                        ];
                                                    if (
                                                        liveData.day_limit -
                                                        liveData.today_feed >
                                                        0
                                                    ) {
                                                        _GIFT.getLiveGiftList(
                                                            liveData
                                                        );
                                                    } else {
                                                        $ui.alert({
                                                            title: "不用送了",
                                                            message: "今日亲密度已满"
                                                        });
                                                    }
                                                }
                                            },
                                            {
                                                title: "自动赠送礼物",
                                                symbol: "gift",
                                                handler: (
                                                    sender,
                                                    indexPath
                                                ) => {
                                                    const liveData =
                                                        indexPath.section ==
                                                        0 ?
                                                        onlineList[
                                                            indexPath
                                                            .row
                                                        ] :
                                                        offlineList[
                                                            indexPath
                                                            .row
                                                        ];
                                                    if (
                                                        liveData.day_limit -
                                                        liveData.today_feed >
                                                        0
                                                    ) {
                                                        _GIFT.getLiveGiftList(
                                                            liveData,
                                                            1
                                                        );
                                                    } else {
                                                        $ui.alert({
                                                            title: "不用送了",
                                                            message: "今日亲密度已满"
                                                        });
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                layout: $layout.fill,
                                events: {
                                    didSelect: function (
                                        sender,
                                        indexPath,
                                        data
                                    ) {
                                        const liveData =
                                            indexPath.section == 0 ?
                                            onlineList[indexPath.row] :
                                            offlineList[
                                                indexPath.row
                                            ];
                                        $app.openURL(
                                            _BILIURL.LIVE_WEB_ROOM +
                                            liveData.room_id
                                        );
                                    }
                                }
                            }]
                        });
                    } else {
                        $ui.loading(false);
                        $ui.alert({
                            title: "没有勋章",
                            message: `粉丝勋章数量为${medalData.cnt ||
                                medalList.length}`
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
            message: "未登录"
        });
    }
}

function wearFanMedal(media_id) {
    $http.post({
        url: `${ _BILIURL.LIVE_FANS_MEDAL_WEAR}?access_key=${_USER.getAccessKey()}&medal_id=${media_id}`,
        header: {
            "User-Agent": _UA.BILIBILI.APP_IPHONE
        },
        body: {},
        handler: resp => {
            var data = resp.data;
            $console.info(data);
            $ui.alert({
                title: "",
                message: data,
                actions: [{
                    title: "OK",
                    disabled: false, // Optional
                    handler: function () {}
                }]
            });
        }
    });
}
// 钱包
function getWallet() {
    if (_USER.isLogin()) {
        $ui.loading(true);
        $http.get({
                url: _BILIURL.GET_WALLET + _USER.getAccessKey()
            })
            .then(function (resp) {
                var data = resp.data;
                $console.info(data);
                if (data) {
                    if (data.code == 0) {
                        let walletData = data.data;
                        const canCoin = walletData.silver_2_coin_left > 0 && walletData.status > 0;
                        $ui.loading(false);
                        $ui.alert({
                            title: "钱包余额",
                            message: `金瓜子：${walletData.gold}\n` +
                                `银瓜子：${walletData.silver}\n` +
                                `硬币：${walletData.coin}\n` +
                                `vip(老爷?)：${
                                    walletData.vip == 1 ? "已开通" : "未开通"
                                }\n` +
                                `硬币换银瓜子额度：${walletData.coin_2_silver_left}\n` +
                                `银瓜子换硬币额度：${walletData.silver_2_coin_left}\n` +
                                `银瓜子换硬币：${
                                    walletData.status == 1 ? "允许" : "不允许"
                                }`,
                            actions: [{
                                    title: "换硬币",
                                    disabled: !canCoin,
                                    handler: function () {
                                        if (canCoin) {
                                            $http.post({
                                                url: _BILIURL.SILVER_TO_COIN,
                                                header: {
                                                    "User-Agent": _UA.BILIBILI.APP_IPHONE,
                                                    "Content-Type": "application/x-www-form-urlencoded"
                                                },
                                                body: {
                                                    access_key: _USER.getAccessKey()
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
                                                                message: data.message || data.msg || "未知错误"
                                                            });
                                                        }
                                                    } else {
                                                        $ui.alert({
                                                            title: "错误",
                                                            message: "空白数据"
                                                        });
                                                    }
                                                }
                                            });
                                        } else {
                                            $ui.error("错误，额度已空");
                                        }
                                    }
                                },
                                {
                                    title: "OK",
                                    disabled: false,
                                    handler: function () {}
                                }
                            ]
                        });
                    } else {
                        $ui.loading(false);
                        $ui.alert({
                            title: `错误${data.code}`,
                            message: data.message || data.msg || "未知错误"
                        });
                    }
                } else {
                    $ui.loading(false);
                    $ui.alert({
                        title: "错误",
                        message: "空白数据"
                    });
                }
            });
    } else {
        $ui.error("未登录");
    }
}
// 关注列表
function getOnlineLiver() {
    if (_USER.isLogin()) {
        $ui.loading(true);
        $http.get({
                url: _BILIURL.LIVE_ONLINE + _USER.getAccessKey()
            })
            .then(function (resp) {
                var data = resp.data;
                if (data) {
                    if (data.code == 0) {
                        const rData = data.data;
                        if (rData.total_count > 0) {
                            const liveRoomList = rData.rooms;
                            $ui.loading(false);
                            $ui.push({
                                props: {
                                    title: rData.total_count + `人在播`
                                },
                                views: [{
                                    type: "list",
                                    props: {
                                        data: liveRoomList.map(room => room.uname)
                                    },
                                    layout: $layout.fill,
                                    events: {
                                        didSelect: function (_sender, indexPath, _data) {
                                            const thisRoom = liveRoomList[indexPath.row];
                                            const liveTime = sys.getNowUnixTimeSecond() - thisRoom.live_time;
                                            $ui.push({
                                                props: {
                                                    title: thisRoom.uname
                                                },
                                                views: [{
                                                    type: "list",
                                                    props: {
                                                        data: [{
                                                                title: "数据",
                                                                rows: [
                                                                    `名字：${thisRoom.uname}`,
                                                                    `标题：${thisRoom.title}`,
                                                                    `直播时长：${liveTime}秒`,
                                                                    `分区：${thisRoom.area_v2_parent_name} - ${thisRoom.area_v2_name}`,
                                                                    `人气：${thisRoom.online}`
                                                                ]
                                                            },
                                                            {
                                                                title: "操作",
                                                                rows: [
                                                                    "观看直播",
                                                                    "实时弹幕",
                                                                    "查看封面",
                                                                    "个人空间",
                                                                    "我觉得这是vtb"
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    layout: $layout.fill,
                                                    events: {
                                                        didSelect: function (__sender, _indexPath, __data) {
                                                            switch (_indexPath.section) {
                                                                case 1:
                                                                    switch (_indexPath.row) {
                                                                        case 0:
                                                                            $app.openURL(thisRoom.link);
                                                                            break;
                                                                        case 1:
                                                                            openLiveDanmuku(thisRoom.roomid);
                                                                            break;
                                                                        case 2:
                                                                            $ui.preview({
                                                                                title: thisRoom.title,
                                                                                url: thisRoom.cover
                                                                            });
                                                                            break;
                                                                        case 3:
                                                                            $app.openURL(_BILIURL.BILIBILI_SPACE + thisRoom.uid);
                                                                            break;
                                                                        case 4:
                                                                            getVtbLiveroomInfo(thisRoom.uid);
                                                                            break;
                                                                    }
                                                                    break;
                                                                default:
                                                                    $ui.alert({
                                                                        title: "",
                                                                        message: thisRoom
                                                                    });
                                                            }
                                                        }
                                                    }
                                                }]
                                            });
                                        }
                                    }
                                }]
                            });
                        } else {
                            $ui.loading(false);
                            $ui.alert({
                                title: "错误",
                                message: "没人在播"
                            });
                        }
                    } else {
                        $ui.loading(false);
                        $ui.alert({
                            title: `错误代码:${data.code}`,
                            message: data.message
                        });
                    }
                } else {
                    $ui.loading(false);
                    $ui.error("未知错误");
                }
            });
    } else {
        $ui.error("未登录");
    }
}

function getOfflineLiver() {
    if (_USER.isLogin()) {
        $ui.loading(true);
        $http.get({
            url: _BILIURL.LIVE_OFFLINE + _USER.getAccessKey()
        }).then(function (resp) {
            var data = resp.data;
            if (data) {
                if (data.code == 0) {
                    const rData = data.data;
                    if (rData.total_count > 0) {
                        const liveRoomList = rData.rooms;
                        $ui.loading(false);
                        $ui.push({
                            props: {
                                title: rData.total_count + `人在咕咕咕`
                            },
                            views: [{
                                type: "list",
                                props: {
                                    data: liveRoomList.map(room => room.uname)
                                },
                                layout: $layout.fill,
                                events: {
                                    didSelect: function (_sender, indexPath, _data) {
                                        const thisRoom = liveRoomList[indexPath.row];
                                        $ui.push({
                                            props: {
                                                title: thisRoom.uname
                                            },
                                            views: [{
                                                type: "list",
                                                props: {
                                                    data: [{
                                                            title: "数据",
                                                            rows: [
                                                                `名字：${thisRoom.uname}`,
                                                                `分区：${thisRoom.area_v2_parent_name} - ${thisRoom.area_v2_name}`,
                                                                `上次直播：${thisRoom.live_desc}`
                                                            ]
                                                        },
                                                        {
                                                            title: "操作",
                                                            rows: [
                                                                "进入直播间",
                                                                "实时弹幕",
                                                                "查看封面",
                                                                "个人空间",
                                                                "我觉得这是vtb"
                                                            ]
                                                        }
                                                    ]
                                                },
                                                layout: $layout.fill,
                                                events: {
                                                    didSelect: function (__sender, _indexPath, __data) {
                                                        switch (_indexPath.section) {
                                                            case 1:
                                                                switch (_indexPath.row) {
                                                                    case 0:
                                                                        $app.openURL(thisRoom.link);
                                                                        break;
                                                                    case 1:
                                                                        openLiveDanmuku(thisRoom.roomid);
                                                                        break;
                                                                    case 2:
                                                                        $ui.preview({
                                                                            title: thisRoom.title,
                                                                            url: thisRoom.cover
                                                                        });
                                                                        break;
                                                                    case 3:
                                                                        $app.openURL(_BILIURL.BILIBILI_SPACE + thisRoom.uid);
                                                                        break;
                                                                    case 4:
                                                                        getVtbLiveroomInfo(thisRoom.uid);
                                                                        break;
                                                                }
                                                                break;
                                                            default:
                                                                $ui.alert({
                                                                    title: "",
                                                                    message: thisRoom
                                                                });
                                                        }
                                                    }
                                                }
                                            }]
                                        });
                                    }
                                }
                            }]
                        });
                    } else {
                        $ui.loading(false);
                        $ui.alert({
                            title: "错误",
                            message: "没人在播"
                        });
                    }
                } else {
                    $ui.loading(false);
                    $ui.alert({
                        title: `错误代码:${data.code}`,
                        message: data.message
                    });
                }
            } else {
                $ui.loading(false);
                $ui.error("未知错误");
            }
        });
    } else {
        $ui.error("未登录");
    }
}
module.exports = {
    getFansMedalList,
    getWallet,
    wearFanMedal
};