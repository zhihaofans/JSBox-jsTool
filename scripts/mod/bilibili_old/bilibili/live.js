let _URL = require("./api_url"),
    _USER = require("./user"),
    _GIFT = require("./gift"),
    $$ = require("$$"),
    appScheme = require("AppScheme"),
    _UA = require("../user-agent");

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
}
// 粉丝勋章
function getFansMedalList() {
    const ak = _USER.getAccessKey();
    // 已拥有的粉丝勋章
    $ui.loading(true);
    if (ak) {
        const link = _URL.BILIBILI.LIVE_FANS_MEDAL + ak;
        $http
            .get({
                url: link
            })
            .then(function (resp) {
                let data = resp.data;
                $console.info(data);
                if (data.code === 0) {
                    $ui.toast(data.message || data.msg || "已拥有的粉丝勋章");
                    const medalData = data.data;
                    const medalList = medalData.list;
                    if (medalList.length > 0) {
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
                            views: [
                                {
                                    type: "list",
                                    props: {
                                        data: medalList.map(
                                            m =>
                                                `[${m.medal_name} ${m.level}]${m.target_name}` +
                                                (m.icon_code
                                                    ? `[${m.icon_text}]`
                                                    : "") +
                                                (m.today_feed >= m.day_limit
                                                    ? `[已满]`
                                                    : `[+${
                                                          m.day_limit -
                                                          m.today_feed
                                                      }]`)
                                        ),
                                        menu: {
                                            title: "菜单",
                                            items: [
                                                {
                                                    title: "详细信息",
                                                    symbol: "play.rectangle",
                                                    handler: (
                                                        sender,
                                                        indexPath
                                                    ) => {
                                                        const liveData =
                                                            medalList[
                                                                indexPath.row
                                                            ];
                                                        $ui.alert({
                                                            title: `[${liveData.medal_name}]${liveData.target_name}`,
                                                            message: liveData
                                                        });
                                                    }
                                                },
                                                {
                                                    title:
                                                        "通过vtbs.moe获取vTuber信息",
                                                    symbol: "play.rectangle",
                                                    handler: (
                                                        sender,
                                                        indexPath
                                                    ) => {
                                                        getVtbLiveroomInfo(
                                                            medalList[
                                                                indexPath.row
                                                            ].target_id
                                                        );
                                                    }
                                                },
                                                {
                                                    title: "查看舰长列表",
                                                    symbol: "play.rectangle",
                                                    handler: (
                                                        sender,
                                                        indexPath
                                                    ) => {
                                                        const liveData =
                                                            medalList[
                                                                indexPath.row
                                                            ];
                                                        $console.info(liveData);
                                                        getLiveroomGuardList(
                                                            liveData.room_id,
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
                                                            medalList[
                                                                indexPath.row
                                                            ];
                                                        if (
                                                            liveData.medal_level <
                                                                20 &&
                                                            liveData.day_limit -
                                                                liveData.today_feed >
                                                                0
                                                        ) {
                                                            _GIFT.getLiveGiftList(
                                                                liveData
                                                            );
                                                        } else {
                                                            $ui.alert({
                                                                title:
                                                                    "今日亲密度已满，不用送了",
                                                                message:
                                                                    "确定要送吗？",
                                                                actions: [
                                                                    {
                                                                        title:
                                                                            "不了",
                                                                        disabled: false,
                                                                        handler: function () {}
                                                                    },
                                                                    {
                                                                        title:
                                                                            "继续",
                                                                        disabled: false,
                                                                        handler: function () {
                                                                            _GIFT.getLiveGiftList(
                                                                                liveData
                                                                            );
                                                                        }
                                                                    }
                                                                ]
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
                                                        /*  const liveData = indexPath.section === 0 ? onlineList[indexPath.row] : offlineList[indexPath.row];
                                                if (liveData.day_limit - liveData.today_feed > 0) {
                                                    _GIFT.getLiveGiftList(liveData);
                                                } else {
                                                    $ui.alert({
                                                        title: "不用送了",
                                                        message: "今日亲密度已满"
                                                    });
                                                } */
                                                        $ui.alert({
                                                            title: "错误",
                                                            message: "未支持"
                                                        });
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
                                                            medalList[
                                                                indexPath.row
                                                            ];
                                                        if (
                                                            liveData.medal_level <
                                                                20 &&
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
                                                                title:
                                                                    "不用送了",
                                                                message:
                                                                    "今日亲密度已满"
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
                                            $app.openURL(
                                                _URL.BILIBILI.LIVE_WEB_ROOM +
                                                    medalList[indexPath.row]
                                                        .room_id
                                            );
                                        }
                                    }
                                }
                            ]
                        });
                    } else {
                        $ui.loading(false);
                        $ui.alert({
                            title: "没有勋章",
                            message: `粉丝勋章数量为${
                                medalData.cnt || medalList.length
                            }`
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
        url: `${
            _URL.BILIBILI.LIVE_FANS_MEDAL_WEAR
        }?access_key=${_USER.getAccessKey()}&medal_id=${media_id}`,
        header: {
            "User-Agent": _UA.BILIBILI.APP_IPHONE
        },
        body: {},
        handler: resp => {
            let data = resp.data;
            $console.info(data);
            $ui.alert({
                title: "",
                message: data,
                actions: [
                    {
                        title: "OK",
                        disabled: false, // Optional
                        handler: function () {}
                    }
                ]
            });
        }
    });
}
// 钱包
function getWallet() {
    if (_USER.isLogin()) {
        $ui.loading(true);
        $http
            .get({
                url: _URL.BILIBILI.GET_WALLET + _USER.getAccessKey()
            })
            .then(function (resp) {
                let data = resp.data;
                $console.info(data);
                if (data) {
                    if (data.code === 0) {
                        let walletData = data.data;
                        const canCoin =
                            walletData.silver_2_coin_left > 0 &&
                            walletData.status > 0;
                        $ui.loading(false);
                        $ui.alert({
                            title: "钱包余额",
                            message:
                                `金瓜子：${walletData.gold}\n` +
                                `银瓜子：${walletData.silver}\n` +
                                `硬币：${walletData.coin}\n` +
                                `vip(老爷?)：${
                                    walletData.vip === 1 ? "已开通" : "未开通"
                                }\n` +
                                `硬币换银瓜子额度：${walletData.coin_2_silver_left}\n` +
                                `银瓜子换硬币额度：${walletData.silver_2_coin_left}\n` +
                                `银瓜子换硬币：${
                                    walletData.status === 1 ? "允许" : "不允许"
                                }`,
                            actions: [
                                {
                                    title: "换硬币",
                                    disabled: !canCoin,
                                    handler: function () {
                                        if (canCoin) {
                                            $http.post({
                                                url:
                                                    _URL.BILIBILI
                                                        .SILVER_TO_COIN,
                                                header: {
                                                    "User-Agent":
                                                        _UA.BILIBILI.APP_IPHONE,
                                                    "Content-Type":
                                                        "application/x-www-form-urlencoded"
                                                },
                                                body: {
                                                    access_key: _USER.getAccessKey()
                                                },
                                                handler: function (resp) {
                                                    let data = resp.data;
                                                    $console.info(data);
                                                    if (data) {
                                                        if (data.code === 0) {
                                                            let silver2coinData =
                                                                data.data;
                                                            $ui.alert({
                                                                title:
                                                                    data.message ||
                                                                    data.msg ||
                                                                    "兑换成功",
                                                                message:
                                                                    `金瓜子：${silver2coinData.gold}\n` +
                                                                    `银瓜子：${silver2coinData.silver}\n` +
                                                                    `硬币：${silver2coinData.coin}\n`
                                                            });
                                                        } else {
                                                            $ui.alert({
                                                                title: `错误${data.code}`,
                                                                message:
                                                                    data.message ||
                                                                    data.msg ||
                                                                    "未知错误"
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
        $http
            .get({
                url: _URL.BILIBILI.LIVE_ONLINE + _USER.getAccessKey()
            })
            .then(function (resp) {
                let data = resp.data;
                if (data) {
                    if (data.code === 0) {
                        const rData = data.data;
                        if (rData.total_count > 0) {
                            const liveRoomList = rData.rooms;
                            $ui.loading(false);
                            $ui.push({
                                props: {
                                    title: rData.total_count + `人在播`
                                },
                                views: [
                                    {
                                        type: "list",
                                        props: {
                                            data: liveRoomList.map(
                                                room => room.uname
                                            )
                                        },
                                        layout: $layout.fill,
                                        events: {
                                            didSelect: function (
                                                _sender,
                                                indexPath,
                                                _data
                                            ) {
                                                const thisRoom =
                                                    liveRoomList[indexPath.row];
                                                const liveTime =
                                                    $$.Time.getNowUnixTimeSecond() -
                                                    thisRoom.live_time;
                                                $ui.push({
                                                    props: {
                                                        title: thisRoom.uname
                                                    },
                                                    views: [
                                                        {
                                                            type: "list",
                                                            props: {
                                                                data: [
                                                                    {
                                                                        title:
                                                                            "数据",
                                                                        rows: [
                                                                            `名字：${thisRoom.uname}`,
                                                                            `标题：${thisRoom.title}`,
                                                                            `直播时长：${liveTime}秒`,
                                                                            `分区：${thisRoom.area_v2_parent_name} - ${thisRoom.area_v2_name}`,
                                                                            `人气：${thisRoom.online}`
                                                                        ]
                                                                    },
                                                                    {
                                                                        title:
                                                                            "操作",
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
                                                            layout:
                                                                $layout.fill,
                                                            events: {
                                                                didSelect: function (
                                                                    __sender,
                                                                    _indexPath,
                                                                    __data
                                                                ) {
                                                                    switch (
                                                                        _indexPath.section
                                                                    ) {
                                                                        case 1:
                                                                            switch (
                                                                                _indexPath.row
                                                                            ) {
                                                                                case 0:
                                                                                    $app.openURL(
                                                                                        thisRoom.link
                                                                                    );
                                                                                    break;
                                                                                case 1:
                                                                                    openLiveDanmuku(
                                                                                        thisRoom.roomid
                                                                                    );
                                                                                    break;
                                                                                case 2:
                                                                                    $ui.preview(
                                                                                        {
                                                                                            title:
                                                                                                thisRoom.title,
                                                                                            url:
                                                                                                thisRoom.cover
                                                                                        }
                                                                                    );
                                                                                    break;
                                                                                case 3:
                                                                                    $app.openURL(
                                                                                        _URL
                                                                                            .BILIBILI
                                                                                            .BILIBILI_SPACE +
                                                                                            thisRoom.uid
                                                                                    );
                                                                                    break;
                                                                                case 4:
                                                                                    getVtbLiveroomInfo(
                                                                                        thisRoom.uid
                                                                                    );
                                                                                    break;
                                                                            }
                                                                            break;
                                                                        default:
                                                                            $ui.alert(
                                                                                {
                                                                                    title:
                                                                                        "",
                                                                                    message: thisRoom
                                                                                }
                                                                            );
                                                                    }
                                                                }
                                                            }
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
        $http
            .get({
                url: _URL.BILIBILI.LIVE_OFFLINE + _USER.getAccessKey()
            })
            .then(function (resp) {
                let data = resp.data;
                if (data) {
                    if (data.code === 0) {
                        const rData = data.data;
                        if (rData.total_count > 0) {
                            const liveRoomList = rData.rooms;
                            $ui.loading(false);
                            $ui.push({
                                props: {
                                    title: rData.total_count + `人在咕咕咕`
                                },
                                views: [
                                    {
                                        type: "list",
                                        props: {
                                            data: liveRoomList.map(
                                                room => room.uname
                                            )
                                        },
                                        layout: $layout.fill,
                                        events: {
                                            didSelect: function (
                                                _sender,
                                                indexPath,
                                                _data
                                            ) {
                                                const thisRoom =
                                                    liveRoomList[indexPath.row];
                                                $ui.push({
                                                    props: {
                                                        title: thisRoom.uname
                                                    },
                                                    views: [
                                                        {
                                                            type: "list",
                                                            props: {
                                                                data: [
                                                                    {
                                                                        title:
                                                                            "数据",
                                                                        rows: [
                                                                            `名字：${thisRoom.uname}`,
                                                                            `分区：${thisRoom.area_v2_parent_name} - ${thisRoom.area_v2_name}`,
                                                                            `上次直播：${thisRoom.live_desc}`
                                                                        ]
                                                                    },
                                                                    {
                                                                        title:
                                                                            "操作",
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
                                                            layout:
                                                                $layout.fill,
                                                            events: {
                                                                didSelect: function (
                                                                    __sender,
                                                                    _indexPath,
                                                                    __data
                                                                ) {
                                                                    switch (
                                                                        _indexPath.section
                                                                    ) {
                                                                        case 1:
                                                                            switch (
                                                                                _indexPath.row
                                                                            ) {
                                                                                case 0:
                                                                                    $app.openURL(
                                                                                        thisRoom.link
                                                                                    );
                                                                                    break;
                                                                                case 1:
                                                                                    openLiveDanmuku(
                                                                                        thisRoom.roomid
                                                                                    );
                                                                                    break;
                                                                                case 2:
                                                                                    $ui.preview(
                                                                                        {
                                                                                            title:
                                                                                                thisRoom.title,
                                                                                            url:
                                                                                                thisRoom.cover
                                                                                        }
                                                                                    );
                                                                                    break;
                                                                                case 3:
                                                                                    $app.openURL(
                                                                                        _URL
                                                                                            .BILIBILI
                                                                                            .BILIBILI_SPACE +
                                                                                            thisRoom.uid
                                                                                    );
                                                                                    break;
                                                                                case 4:
                                                                                    getVtbLiveroomInfo(
                                                                                        thisRoom.uid
                                                                                    );
                                                                                    break;
                                                                            }
                                                                            break;
                                                                        default:
                                                                            $ui.alert(
                                                                                {
                                                                                    title:
                                                                                        "",
                                                                                    message: thisRoom
                                                                                }
                                                                            );
                                                                    }
                                                                }
                                                            }
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

// vtb.moe
function getVtbLiveroomInfo(mid) {
    $ui.loading(true);
    $http
        .get({
            url: _URL.VTBS_MOE.V1_DETAIL + mid
        })
        .then(function (resp) {
            $ui.loading(false);
            if (resp.error) {
                $ui.alert({
                    title: `Error ${resp.error.code}`,
                    message: resp.error.localizedDescription
                });
            } else {
                if (resp.data) {
                    const liveroomInfo = new LiveroomInfo(resp.data);
                    $ui.push({
                        props: {
                            title: liveroomInfo.uname
                        },
                        views: [
                            {
                                type: "list",
                                props: {
                                    data: [
                                        {
                                            title: "数据",
                                            rows: [
                                                `昵称：${liveroomInfo.uname}`,
                                                `uid：${liveroomInfo.mid}`,
                                                `直播间id：${liveroomInfo.roomid}`,
                                                `唯一id：${liveroomInfo.uuid}`,
                                                `个人签名：${liveroomInfo.sign}`,
                                                `直播间通知：${liveroomInfo.notice}`,
                                                `标题：${liveroomInfo.title}`,
                                                `关注：${liveroomInfo.follower}`,
                                                `人气：${liveroomInfo.online}`,
                                                `投稿视频：${liveroomInfo.video}个`,
                                                `直播：${
                                                    liveroomInfo.liveStatus ===
                                                    1
                                                        ? "直播中"
                                                        : "未直播"
                                                }`,
                                                `总督/提督/舰长：${liveroomInfo.guardType[0]}/${liveroomInfo.guardType[1]}/${liveroomInfo.guardType[2]}`,
                                                `个人签名：${liveroomInfo.sign}`,
                                                `分区排名：${liveroomInfo.areaRank}`
                                            ]
                                        },
                                        {
                                            title: "操作",
                                            rows: [
                                                `查看头图`,
                                                `查看头像`,
                                                "查看舰长"
                                            ]
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
                                                $ui.alert({
                                                    title: row,
                                                    message: _data,
                                                    actions: [
                                                        {
                                                            title: "打开网页",
                                                            disabled: false,
                                                            handler: function () {
                                                                appScheme.Browser.Safari.Preview(
                                                                    _URL
                                                                        .VTBS_MOE
                                                                        .WEB_DETAIL +
                                                                        mid
                                                                );
                                                            }
                                                        },
                                                        {
                                                            title: "好的",
                                                            disabled: false,
                                                            handler: function () {}
                                                        }
                                                    ]
                                                });
                                                break;
                                            case 1:
                                                switch (row) {
                                                    case 0:
                                                        appScheme.Browser.Safari.Preview(
                                                            liveroomInfo.topPhoto
                                                        );
                                                        break;
                                                    case 1:
                                                        appScheme.Browser.Safari.Preview(
                                                            liveroomInfo.face
                                                        );
                                                        break;
                                                    case 2:
                                                        getLiveroomGuardList(
                                                            liveroomInfo.roomid,
                                                            liveroomInfo.mid,
                                                            1,
                                                            liveroomInfo.guardNum +
                                                                1
                                                        );
                                                        break;
                                                }
                                        }
                                    }
                                }
                            }
                        ]
                    });
                } else {
                    $ui.alert({
                        title: `数据错误`,
                        message: "空白数据"
                    });
                }
            }
        });
}
// Bilichat
function openLiveDanmuku(liveroomId) {
    $ui.preview({
        title: "BiliChat",
        url: _URL.BILIBILI.BILICHAT + liveroomId
    });
}

// 直播间舰长
function getLiveroomGuardList(roomid, uid, pageNo = 1, pageSize = 20) {
    $ui.error("维护中");

    $ui.loading(true);
    const url = `${_URL.BILIBILI.LIVE_GUARD}?roomid=${roomid}&ruid=${uid}&page=${pageNo}&page_size=${pageSize}`;
    $console.info(url);
    $http
        .get({
            url: url,
            header: {
                "User-agent": _UA.BILIBILI
            }
        })
        .then(function (resp) {
            let data = resp.data;
            $console.info(data);
            if (data.code === 0) {
                const guardInfo = data.data.info;
                const guardList = data.data.top3.concat(data.data.list);
                if (guardInfo.num > 0 && guardList.length > 0) {
                    const aliveGuardList = [];
                    const otherGuardList = [];
                    guardList.map(guard => {
                        if (guard.is_alive) {
                            aliveGuardList.push(guard);
                        } else {
                            otherGuardList.push(guard);
                        }
                    });
                    $ui.loading(false);
                    $ui.push({
                        props: {
                            title: "舰长列表"
                        },
                        views: [
                            {
                                type: "list",
                                props: {
                                    data: [
                                        {
                                            title: "在看的",
                                            rows: aliveGuardList.map(guard => {
                                                let text = guard.username;
                                                switch (guard.guard_level) {
                                                    case 1:
                                                        text = `[总督]${text}`;
                                                        break;
                                                    case 2:
                                                        text = `[提督]${text}`;
                                                        break;
                                                    case 3:
                                                        text = `[舰长]${text}`;
                                                        break;
                                                    default:
                                                        text = `[未知]${text}`;
                                                }
                                                return text;
                                            })
                                        },
                                        {
                                            title: "没看的",
                                            rows: otherGuardList.map(guard => {
                                                let text = guard.username;
                                                switch (guard.guard_level) {
                                                    case 1:
                                                        text = `[总督]${text}`;
                                                        break;
                                                    case 2:
                                                        text = `[提督]${text}`;
                                                        break;
                                                    case 3:
                                                        text = `[舰长]${text}`;
                                                        break;
                                                    default:
                                                        text = `[未知]${text}`;
                                                }
                                                return text;
                                            })
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
                                                $ui.alert({
                                                    title: "",
                                                    message: aliveGuardList[row]
                                                });
                                                break;
                                            case 1:
                                                $ui.alert({
                                                    title: "",
                                                    message: otherGuardList[row]
                                                });
                                                break;
                                        }
                                    }
                                }
                            }
                        ]
                    });
                } else {
                    $ui.loading(false);
                    $ui.error(data.message);
                }
            } else {
                $ui.loading(false);
                $ui.alert({
                    title: `错误代码：${data.code}`,
                    message: data.message
                });
            }
        });
}
module.exports = {
    getFansMedalList,
    getLiveroomGuardList,
    getWallet,
    getOfflineLiver,
    getOnlineLiver,
    getVtbLiveroomInfo,
    wearFanMedal
};
