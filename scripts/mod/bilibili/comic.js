let $B_api = require("./api"),
    $B_user = require("./user"),
    $User_auth = new $B_user.Auth(),
    $_Static = require("./static");

class User {
    async checkIn() {
        const accessKey = $User_auth.accessKey(),
            uid = $User_auth.uid(),
            postBody = {
                platform: "ios",
                uid: uid,
                access_key: accessKey
            },
            postHeader = {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": $_Static.UA.COMIC.CHECK_IN
            };
        if (accessKey && uid) {
            $ui.loading(true);
            const httpPost = await $B_api.postAwait(
                $_Static.URL.COMIC.CHECK_IN,
                postBody,
                postHeader
            );
            if (httpPost.error) {
                $ui.loading(false);
                $console.error(httpPost.error);
            } else {
                var checkInData = httpPost.data;
                $console.info(checkInData);
                $ui.loading(false);
                if (checkInData) {
                    if (checkInData.code == 0) {
                        $ui.alert({
                            title: "签到结果",
                            message: "签到成功"
                        });
                    } else {
                        switch (checkInData.code) {
                            case "invalid_argument":
                                $ui.alert({
                                    title: `错误`,
                                    message: "今天已签到"
                                });
                                break;
                            default:
                                $ui.alert({
                                    title: `错误：${checkInData.code}`,
                                    message: checkInData.msg
                                });
                        }
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
                actions: [{
                    title: "OK",
                    disabled: false, // Optional
                    handler: function () {}
                }]
            });
        }
    }
}
module.exports = {
    User
};