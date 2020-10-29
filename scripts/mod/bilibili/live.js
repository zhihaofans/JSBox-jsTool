let $B_api = require("./api"),
    $B_user = require("./user"),
    $B_common = require("./common"),
    $User_auth = new $B_user.Auth(),
    $_Live = new $B_common.Live(),
    $_User = new $B_common.User();
class User {
    async checkIn() {
        $ui.loading(true);
        const httpGet = await $B_api.getAwait(
            $_Live._API.CHECK_IN + $User_auth.accessKey()
        );
        if (httpGet.error) {
            $ui.loading(false);
            $console.error(httpGet.error);
        } else {
            const data = httpGet.data;
            $console.info(data);
            $ui.loading(false);
            if (data) {
                if (data.code == 0) {
                    $ui.alert({
                        title: "签到成功",
                        message: data.message || "签到成功",
                        actions: [{
                            title: "OK",
                            disabled: false, // Optional
                            handler: function () {}
                        }]
                    });
                } else {
                    $ui.alert({
                        title: `错误代码${data.code}`,
                        message: data.message || "未返回错误信息",
                        actions: [{
                            title: "OK",
                            disabled: false, // Optional
                            handler: function () {}
                        }]
                    });
                }
            } else {
                $ui.alert({
                    title: "签到失败",
                    message: "返回空白数据",
                    actions: [{
                        title: "OK",
                        disabled: false, // Optional
                        handler: function () {}
                    }]
                });
            }
        }
    }
    async silver2coin() {
        $ui.loading(true);
        const postHeader = {
                "User-Agent": $_User._UA.APP_IPHONE,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            postBody = {
                access_key: $User_auth.accessKey()
            };
        $console.info($_Live._API.SILVER_TO_COIN);
        $console.info(postHeader);
        $console.info(postBody);
        const httpPost = await _HTTP.postAwait(
            $_Live._API.SILVER_TO_COIN,
            postBody,
            postHeader
        );
        $console.info(httpPost);
        if (httpPost.error) {
            $ui.loading(false);
            $console.error(httpPost.error);
        } else {
            $ui.loading(false);
            if (httpPost.data) {
                const silver2coinData = httpPost.data;
                if (silver2coinData.code == 0) {
                    $ui.alert({
                        title: silver2coinData.data.message || silver2coinData.data.msg || "兑换成功",
                        message: `剩余银瓜子：${silver2coinData.data.silver}\n得到硬币：${silver2coinData.data.coin}`
                    });
                } else {
                    $ui.alert({
                        title: `错误代码${silver2coinData.code}`,
                        message: silver2coinData.message || silver2coinData.msg || "未知错误"
                    });
                }
            } else {
                $ui.alert({
                    title: "错误",
                    message: "空白数据"
                });
            }
        }
    }
}

module.exports = {
    User
};