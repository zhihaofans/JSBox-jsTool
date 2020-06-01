let sys = require("../system.js"),
    cheerio = require("cheerio"),
    _URL = require("../urlData.js"),
    _BILIURL = require("../urlData.js").BILIBILI,
    appScheme = require("../app_scheme.js"),
    _user = require("./user.js")
    _UA = require("../user-agent.js");

function mangaClockin() {
    const accessKey=_user.getAccessKey()
    if (accessKey == 0) {
        $ui.alert({
            title: "签到失败",
            message: "access_key为空，请登录"
        });
    } else if (_userData.uid == 0) {
        $ui.alert({
            title: "签到失败",
            message: "用户id为空，请获取我的个人资料"
        });
    } else {
        $ui.loading(true);
        $http.post({
            url: _URL.BILIBILI.MANGA_CLOCK_IN,
            header: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": _UA.BILIBILI.COMIC
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
    }
}

function vipCheckin() {
    $http.post({
        url: _URL.BILIBILI.VIP_CHECKIN,
        header: {
            "User-Agent": _UA.BILIBILI.VIP_CHECKIN
        },
        body: {
            access_key: _user.getAccessKey()
        },
        handler: resp => {
            var data = resp.data;
            $console.info(data);
        }
    });
}