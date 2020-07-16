let sys = require("../system.js"),
    cheerio = require("cheerio"),
    _BILIURL = require("./api_url.js").BILIBILI,
    _USER = require("./user.js"),
    _UA = require("../user-agent.js");

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
            handler: function (postResp) {
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
module.exports = {
    mangaClockin,
    silverToCoin,
    vipCheckin
};