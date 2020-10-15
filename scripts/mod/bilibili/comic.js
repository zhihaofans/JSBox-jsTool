module.exports = {
    User
};
let $B_api = require("./api"),
    $B_user = require("./user"),
    $B_common = require("./common"),
    $User_auth = new $B_user.Auth(),
    $_Comic = new $B_common.Comic();

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
                "User-Agent": $_Comic._UA.CHECK_IN
            };
        if (accessKey && uid) {
            $ui.loading(true);
            const httpPost = await $B_api.postAwait(
                $_Comic._API.COMIC_CHECK_IN,
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
                actions: [{
                    title: "OK",
                    disabled: false, // Optional
                    handler: function () {}
                }]
            });
        }
    }
}