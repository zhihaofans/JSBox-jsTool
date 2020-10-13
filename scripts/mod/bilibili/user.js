let $B_database = require("./data_base"),
    $B_api = require("./api"),
    $B_ua = require("./user_agent");
let $B_cache = new $B_database.Cache(),
    $U_user = new $B_api.User(),
    $UA_user = new $B_ua.User();
module.exports = {
    Auth,
    Info
};
class Auth {
    async getSignUrl(host, param, android) {
        const url = `https://api.kaaass.net/biliapi/urlgen?host=${encodeURI(host)}&param=${encodeURI(param)}&android=${android}`,
            headers = {
                "user-agent": _UA.KAAASS
            };
        const $_get = await $B_api.getAwait(url, headers);
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
            const respKaaass = $B_auth.getSignUrl($U_user.MY_INFO, `access_key=${access_key}`);
            const dataKaaass = respKaaass.data;
            $console.info(dataKaaass);
            if (dataKaaass) {
                $http.get({
                    url: dataKaaass.url,
                    header: {
                        "User-Agent": $UA_user.APP_IPHONE
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