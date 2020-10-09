module.exports = {
    User
};
let $B_api = require("./api"),
    $B_ua = require("user_agent");
let $U_comic = new $B_api.Comic(),
    $UA_comic = new $B_ua.Comic();
class User {
    async checkIn() {
        const accessKey = _USER.getAccessKey(),
            uid = _USER.getUid(),
            postBody = {
                platform: "ios",
                uid: uid,
                access_key: accessKey
            },
            postHeader = {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": $UA_comic
            };
        if (accessKey && uid) {
            $ui.loading(true);
            const httpPost = await $B_api.postAwait(
                $U_comic.COMIC_CHECK_IN,
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
    }
}