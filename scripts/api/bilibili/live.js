let _BILIURL = require("../urlData.js").BILIBILI,
    _USER = require("./user.js"),
    _GIFT = require("./gift.js"),
    _UA = require("../user-agent.js");

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
            .then(function(resp) {
                var data = resp.data;
                if (data.code == 0) {
                    $ui.toast(data.message || data.msg || "已拥有的粉丝勋章");
                    const medalData = data.data;
                    const medalList = medalData.list;
                    if (medalList.length > 0) {
                        var onlineList = [];
                        var offlineList = [];
                        medalList.map(m =>
                            m.live_stream_status == 1
                                ? onlineList.push(m)
                                : offlineList.push(m)
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
                            views: [
                                {
                                    type: "list",
                                    props: {
                                        data: [
                                            {
                                                title: "在播了",
                                                rows: onlineList.map(
                                                    m =>
                                                        `[${m.medal_name}]${m.target_name}` +
                                                        (m.icon_code
                                                            ? `[${m.icon_text}]`
                                                            : "") +
                                                        (m.today_feed ==
                                                        m.day_limit
                                                            ? `[已满]`
                                                            : `[还差${m.day_limit -
                                                                  m.today_feed}]`)
                                                )
                                            },
                                            {
                                                title: "咕咕咕",
                                                rows: offlineList.map(
                                                    m =>
                                                        `[${m.medal_name}]${m.target_name}` +
                                                        (m.icon_code
                                                            ? `[${m.icon_text}]`
                                                            : "") +
                                                        (m.today_feed ==
                                                        m.day_limit
                                                            ? `[已满]`
                                                            : `[还差${m.day_limit -
                                                                  m.today_feed}]`)
                                                )
                                            }
                                        ],
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
                                                            indexPath.section ==
                                                            0
                                                                ? onlineList[
                                                                      indexPath
                                                                          .row
                                                                  ]
                                                                : offlineList[
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
                                                    title:
                                                        "通过vtbs.moe获取vTuber信息",
                                                    symbol: "play.rectangle",
                                                    handler: (
                                                        sender,
                                                        indexPath
                                                    ) => {
                                                        const liveData =
                                                            indexPath.section ==
                                                            0
                                                                ? onlineList[
                                                                      indexPath
                                                                          .row
                                                                  ]
                                                                : offlineList[
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
                                                            0
                                                                ? onlineList[
                                                                      indexPath
                                                                          .row
                                                                  ]
                                                                : offlineList[
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
                                                                title:
                                                                    "不用送了",
                                                                message:
                                                                    "今日亲密度已满"
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
                                                            0
                                                                ? onlineList[
                                                                      indexPath
                                                                          .row
                                                                  ]
                                                                : offlineList[
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
                                                                title:
                                                                    "不用送了",
                                                                message:
                                                                    "今日亲密度已满"
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
                                                            0
                                                                ? onlineList[
                                                                      indexPath
                                                                          .row
                                                                  ]
                                                                : offlineList[
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
                                        didSelect: function(
                                            sender,
                                            indexPath,
                                            data
                                        ) {
                                            const liveData =
                                                indexPath.section == 0
                                                    ? onlineList[indexPath.row]
                                                    : offlineList[
                                                          indexPath.row
                                                      ];
                                            $app.openURL(
                                                _BILIURL.LIVE_WEB_ROOM +
                                                    liveData.room_id
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
    const ak = _USER.getAccessKey();
    $http.post({
        url:
            _BILIURL.LIVE_FANS_MEDAL_WEAR +
            `?access_key=${ak}&medal_id=${media_id}`,
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
                actions: [
                    {
                        title: "OK",
                        disabled: false, // Optional
                        handler: function() {}
                    }
                ]
            });
        }
    });
}
module.exports = {
    getFansMedalList,
    wearFanMedal
};