let $B_user = require("./user"),
    $_Static = require("./static"),
    User = {
        checkIn: async () => {
            $ui.loading(true);
            const header = {
                    "User-Agent": $_Static.UA.USER.APP_IPHONE,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                httpGet = await $_Static.HTTP.getAwait(
                    $_Static.URL.LIVE.CHECK_IN + $B_user.Auth.accessKey(),
                    header
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
                            title: `错误代码${data.code}`,
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
        },
        silver2coin: async () => {
            $ui.loading(true);
            const postHeader = {
                    "User-Agent": $_Static.UA.USER.APP_IPHONE,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                postBody = {
                    access_key: $B_user.Auth.accessKey()
                };
            $console.info(postHeader);
            $console.info(postBody);
            const httpPost = await $_Static.HTTP.postAwait(
                $_Static.URL.LIVE.SILVER_TO_COIN,
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
                            title:
                                silver2coinData.data.message ||
                                silver2coinData.data.msg ||
                                "兑换成功",
                            message: `剩余银瓜子：${silver2coinData.data.silver}\n得到硬币：${silver2coinData.data.coin}`
                        });
                    } else {
                        $ui.alert({
                            title: `错误代码${silver2coinData.code}`,
                            message:
                                silver2coinData.message ||
                                silver2coinData.msg ||
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
        }
    };

module.exports = {
    User
};