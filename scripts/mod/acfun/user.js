class Auth {
    constructor() {

    }
    loginBySetting() {
        const _acfunLogin = {
            uid: $prefs.get("mod.acfun.login.uid") || "",
            password: $prefs.get("mod.acfun.login.password") || ""
        };
        if (_acfunLogin.uid && _acfunLogin.password) {
            $prefs.set("mod.acfun.login.uid", undefined);
            $prefs.set("mod.acfun.login.password", undefined);
            this.login(_acfunLogin.uid, _acfunLogin.password);
        } else {
            $ui.alert({
                title: "Acfun登录失败",
                message: "请确保账号密码已设置",
                actions: [{
                    title: "关闭",
                    disabled: false,
                    handler: function () {}
                }]
            });
        }
    }
    async login(login_id, password) {
        $ui.loading(true);
        const $Api = require("./api").API_USER,
            $Common = require("./common"),
            postBody = {
                username: login_id,
                password: password
            };
        const httpPost = await $Common.postAwait(
            $Api.LOGIN,
            postBody,
            $Common.USER_AGENT
        );
        $ui.loading(false);
        if (httpPost.error) {
            $console.error(httpPost.error);
        } else {
            const httpData = httpPost.data;
            $console.info(httpData);
            if (httpData.result == 0) {
                $ui.alert({
                    title: "登录结果",
                    message: JSON.stringify(httpData)
                });
            } else {
                $ui.alert({
                    title: "登录失败",
                    message: httpData.error_msg
                });
            }
        }
    }
}

module.exports = {
    Auth
};