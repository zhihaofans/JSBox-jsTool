let $B_common = require("./common"),
    $B_cache = new $B_common.Cache(),
    $_User = new $B_common.User(),
    $_Common = new $B_common.Common();
module.exports = {
    Auth,
    Info,
    View
};
class Auth {
    async getSignUrl(host, param, android) {
        const url = `${$_Common._API.KAAASS_SIGN_URL}?host=${encodeURI(host)}&param=${encodeURI(param)}&android=${android}`,
            headers = {
                "user-agent": $_Common._UA.KAAASS
            };
        const $_get = await $B_common.getAwait(url, headers);
        if ($_get.error) {
            $console.error($_get.error.message);
            return undefined;
        } else {
            return $_get.data;
        }

    }
    isLogin() {
        const access_key = this.accessKey();
        return access_key ? true : false;
    }

    accessKey(access_key = undefined) {
        if (access_key) {
            $B_cache.accessKey(access_key);
        } else {
            return $B_cache.accessKey();
        }
    }
    uid(uid = undefined) {
        if (uid) {
            $B_cache.uid(uid);
        } else {
            return $B_cache.uid();
        }
    }
}
class Info {
    getMyInfo() {
        const $B_auth = new Auth();
        const access_key = $B_auth.accessKey();
        if (access_key) {
            const respKaaass = $B_auth.getSignUrl($_User._API.MY_INFO, `access_key=${access_key}`);
            const dataKaaass = respKaaass.data;
            $console.info(dataKaaass);
            if (dataKaaass) {
                $http.get({
                    url: dataKaaass.url,
                    header: {
                        "User-Agent": $_User._UA.APP_IPHONE
                    },
                    handler: respBili => {
                        var resultBili = respBili.data;
                        if (resultBili.code == 0) {
                            const myInfoData = resultBili.data;
                            saveLoginCache(_AK, myInfoData.mid);
                            $ui.loading(false);
                            $ui.success("已更新登录数据");
                            $ui.alert({
                                title: "结果",
                                message: myInfoData,
                                actions: [{
                                    title: "ok",
                                    disabled: false, // Optional
                                    handler: function () {}
                                }]
                            });
                        } else {
                            $ui.loading(false);
                            $ui.alert({
                                title: `Error ${resultBili.code}`,
                                message: resultBili.message || "未知错误",
                                actions: [{
                                    title: "OK",
                                    disabled: false, // Optional
                                    handler: function () {}
                                }]
                            });
                        }
                    }
                });
            } else {
                $ui.loading(false);
                $ui.error("获取签名url失败");
            }
            return "";
        } else {
            return undefined;
        }
    }
}
class View {
    constructor() {
        this._Auth = new Auth();
    }
    updateAccessKey() {
        $input.text({
            type: $kbType.text,
            placeholder: "输入Access key",
            text: this._Auth.accessKey() || "",
            handler: function (access_key) {
                if (access_key) {

                }
            }
        });
    }
}