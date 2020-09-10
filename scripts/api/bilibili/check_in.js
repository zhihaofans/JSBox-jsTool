let _BILIURL = require("./api_url.js").BILIBILI,
    _USER = require("./user.js"),
    _HTTP = require("/scripts/api/http"),
    _UA = require("/scripts/api/user-agent.js");
let mangaCheckin = async () => {
    const accessKey = _USER.getAccessKey(),
        uid = _USER.getUid(),
        postBody = {
            platform: "ios",
            uid: uid,
            access_key: accessKey
        },
        postHeader = {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": _UA.BILIBILI.COMIC
        };
    if (accessKey && uid) {
        $ui.loading(true);
        const httpPost = await _HTTP.postAwait(
            _BILIURL.MANGA_CLOCK_IN,
            postBody,
            postHeader
        );
        if (httpPost.error) {
            $ui.loading(false);
            $console.error(httpPost.error);
        } else {
            var clockinData = httpPost.data;
            $console.info(clockinData);
            $ui.loading(false);
            if (clockinData) {
                if (clockinData.code == 0) {
                    $ui.alert({
                        title: "签到结果",
                        message: "签到成功"
                    });
                } else {
                    $ui.alert({
                        title: `错误：${clockinData.code}`,
                        message: clockinData.msg
                    });
                }
            } else {
                $ui.alert({
                    title: "签到失败",
                    message: "服务器返回空白结果"
                });
            }
        }
    } else {
        $ui.alert({
            title: "哔哩哔哩漫画签到失败",
            message: "未登录",
            actions: [
                {
                    title: "OK",
                    disabled: false, // Optional
                    handler: function() {}
                }
            ]
        });
    }
};
function mangaClockin() {
    const accessKey = _USER.getAccessKey();
    const uid = _USER.getUid();
    if (accessKey && uid) {
        $ui.loading(true);
        $http.post({
            url: _BILIURL.MANGA_CLOCK_IN,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": _UA.BILIBILI.COMIC
            },
            body: {
                platform: "ios",
                uid: uid,
                access_key: accessKey
            },
            handler: function(postResp) {
                var clockinData = postResp.data;
                $console.info(clockinData);
                $ui.loading(false);
                if (clockinData) {
                    if (clockinData.code == 0) {
                        $ui.alert({
                            title: "签到结果",
                            message: "签到成功"
                        });
                    } else {
                        $ui.alert({
                            title: `错误：${clockinData.code}`,
                            message: clockinData.msg
                        });
                    }
                } else {
                    $ui.alert({
                        title: "签到失败",
                        message: "服务器返回空白结果"
                    });
                }
            }
        });
    } else {
        $ui.alert({
            title: "签到失败",
            message: "用户id或access_key为空，请登录"
        });
    }
}

function silverToCoin() {
    $ui.loading(true);
    $http.post({
        url: _BILIURL.SILVER_TO_COIN,
        header: {
            "User-Agent": _UA.BILIBILI.APP_IPHONE,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: {
            access_key: _USER.getAccessKey()
        },
        handler: function(resp) {
            var data = resp.data;
            $ui.loading(false);
            $console.info(data);
            if (data) {
                if (data.code == 0) {
                    let silver2coinData = data.data;
                    $ui.alert({
                        title: data.message || data.msg || "兑换成功",
                        message: `剩余银瓜子：${silver2coinData.silver}\n得到硬币：${silver2coinData.coin}`
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
}

function vipCheckin() {
    $http.post({
        url: _BILIURL.VIP_CHECKIN,
        header: {
            "User-Agent": _UA.BILIBILI.VIP_CHECKIN
        },
        body: {
            access_key: _USER.getAccessKey()
        },
        handler: resp => {
            var data = resp.data;
            $console.info(data);
        }
    });
}
function liveCheckIn() {
    $ui.loading(true);
    $http.get({
        url: _BILIURL.LIVE_CHECK_IN + _USER.getAccessKey(),
        handler: resp => {
            var data = resp.data;
            $ui.loading(false);
            if (data) {
                if (data.code == 0) {
                    $ui.alert({
                        title: "签到成功",
                        message: data.message || "签到成功",
                        actions: [
                            {
                                title: "OK",
                                disabled: false, // Optional
                                handler: function() {}
                            }
                        ]
                    });
                } else {
                    $ui.alert({
                        title: "签到失败",
                        message: data.message || "未返回错误信息",
                        actions: [
                            {
                                title: "OK",
                                disabled: false, // Optional
                                handler: function() {}
                            }
                        ]
                    });
                }
            } else {
                $ui.alert({
                    title: "签到失败",
                    message: "返回空白数据",
                    actions: [
                        {
                            title: "OK",
                            disabled: false, // Optional
                            handler: function() {}
                        }
                    ]
                });
            }
        }
    });
}
module.exports = {
    mangaClockin,
    mangaCheckin,
    silverToCoin,
    vipCheckin,
    liveCheckIn
};