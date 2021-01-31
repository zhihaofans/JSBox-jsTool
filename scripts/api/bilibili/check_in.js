let _BILIURL = require("./api_url.js").BILIBILI,
    _USER = require("./user.js"),
    _HTTP = require("$$").HTTP,
    _UA = require("../user-agent.js");
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
                    handler: function () {}
                }
            ]
        });
    }
};

let silverToCoin = async () => {
    $ui.loading(true);
    const postHeader = {
            "User-Agent": _UA.BILIBILI.APP_IPHONE,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        postBody = {
            access_key: _USER.getAccessKey()
        };
    const httpPost = await _HTTP.postAwait(
        _BILIURL.SILVER_TO_COIN,
        postBody,
        postHeader
    );
    if (httpPost.error) {
        $ui.loading(false);
        $console.error(httpPost.error);
    } else {
        var data = httpPost.data;
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
};

let vipCheckin = async () => {
    const postBody = {
            access_key: _USER.getAccessKey()
        },
        postHeader = {
            "User-Agent": _UA.BILIBILI.VIP_CHECKIN
        };
    $console.info(postBody);
    $console.info(postHeader);
    const httpPost = await _HTTP.postAwait(
        _BILIURL.VIP_CHECKIN,
        postBody,
        postHeader
    );
    if (httpPost.error) {
        $ui.loading(false);
        $console.error(httpPost.error);
    } else {
        $console.info(httpPost.data);
    }
};
let liveCheckIn = async () => {
    $ui.loading(true);
    const httpGet = await _HTTP.getAwait(
        _BILIURL.LIVE_CHECK_IN + _USER.getAccessKey()
    );
    if (httpGet.error) {
        $ui.loading(false);
        $console.error(httpGet.error);
    } else {
        var data = httpGet.data;
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
                            handler: function () {}
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
                            handler: function () {}
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
                        handler: function () {}
                    }
                ]
            });
        }
    }
};
module.exports = {
    mangaClockin: mangaCheckin,
    mangaCheckin,
    silverToCoin,
    vipCheckin,
    liveCheckIn
};