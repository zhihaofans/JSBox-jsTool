let $B_api = require("./api"),
    $B_user = require("./user"),
    $B_common = require("./common"),
    $User_auth = new $B_user.Auth(),
    $_Live = new $B_common.Live();
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
}

module.exports = {
    User
};