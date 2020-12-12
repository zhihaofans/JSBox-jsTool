let $_Cache = require("./data_base").Cache,
    $_Static = require("./static");
let Auth = {
        getSignUrl: async (host, param, android = false) => {
            const url = `${$_Static.URL.KAAASS.SIGN_URL}?host=${encodeURI(host)}&param=${encodeURI(param)}&android=${android}`,
                headers = {
                    "user-agent": $_Static.UA.KAAASS.KAAASS
                };
            const $_get = await $_Static.HTTP.getAwait(url, headers);
            if ($_get.error) {
                $console.error($_get.error.message);
                return undefined;
            } else {
                return $_get.data;
            }

        },
        getSignUrl_A: async (param, android = false) => {
            const url = `${$_Static.URL.KAAASS.SIGN_URL}?host=&param=${encodeURI(param)}&android=${android}`,
                headers = {
                    "user-agent": $_Static.UA.KAAASS.KAAASS
                };
            const $_get = await $_Static.HTTP.getAwait(url, headers);
            if ($_get.error) {
                $console.error($_get.error.message);
                return undefined;
            } else {
                return $_get.data;
            }

        },
        isLogin: () => {
            return Auth.accessKey() ? true : false;
        },

        accessKey: (access_key = undefined) => {
            if (access_key) {
                $_Cache.accessKey(access_key);
            }
            return $_Cache.accessKey();
        },
        uid: (uid = undefined) => {
            if (uid) {
                $_Cache.uid(uid);
            }
            return $_Cache.uid();
        },
        refreshToken: async () => {
            $ui.loading(true);
            const access_key = Auth.accessKey();
            if (access_key) {
                const url = `${$_Static.URL.KAAASS.REFRESH_TOKEN}?access_key=${access_key}`,
                    headers = {
                        "user-agent": $_Static.UA.KAAASS.KAAASS
                    };
                const $_get = await $_Static.HTTP.getAwait(url, headers);
                $console.info($_get);
                $ui.loading(false);
                if ($_get.error) {
                    $console.error($_get.error.message);
                    return false;
                } else {
                    return $_get.data.status == "OK";
                }
            } else {
                return false;
            }
        }
    },
    Info = {
        getMyInfoByKaaass: async () => {
            const access_key = Auth.accessKey();
            if (access_key) {
                const url = `${$_Static.URL.KAAASS.MY_INFO}?furtherInfo=true&access_key=${access_key}`,
                    headers = {
                        "user-agent": $_Static.UA.KAAASS.KAAASS
                    },
                    $_get = await $_Static.HTTP.getAwait(url, headers);
                $console.error($_get);
                if ($_get.error) {
                    $console.error($_get.error.message);
                    return undefined;
                } else {
                    const kaaassData = $_get.data;
                    if (kaaassData.status == "OK") {
                        const myInfoData = kaaassData.info;
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
                            title: `Error ${kaaassData.code}`,
                            message: kaaassData.message || "未知错误",
                            actions: [{
                                title: "OK",
                                disabled: false, // Optional
                                handler: function () {}
                            }]
                        });
                    }
                }
            } else {
                return undefined;
            }
        },
        getMyInfo: () => {
            const access_key = Auth.accessKey();
            if (access_key) {
                const respKaaass = $B_auth.getSignUrl($_Static.URL.USER.MY_INFO, `access_key=${access_key}`);
                const dataKaaass = respKaaass.data;
                $console.info(dataKaaass);
                if (dataKaaass) {
                    $http.get({
                        url: dataKaaass.url,
                        header: {
                            "User-Agent": $_Static.UA.USER.APP_IPHONE
                        },
                        handler: respBili => {
                            var resultBili = respBili.data;
                            if (resultBili.code == 0) {
                                const myInfoData = resultBili.data;
                                //saveLoginCache(_AK, myInfoData.mid);
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
        },
        myInfo: () => {
            const access_key = Auth.accessKey();
            if (access_key) {
                $http.get({
                    url: $_Static.URL.USER.MY_INFO + `?access_key=${access_key}`,
                    header: {
                        "User-Agent": $_Static.UA.USER.APP_IPHONE
                    },
                    handler: respBili => {
                        var resultBili = respBili.data;
                        $console.warn(resultBili);
                        if (resultBili.code == 0) {
                            const myInfoData = resultBili.data;
                            //saveLoginCache(_AK, myInfoData.mid);
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
                return undefined;
            }
        }
    },
    View = {
        updateAccessKey: () => {
            $input.text({
                type: $kbType.text,
                placeholder: "输入Access key",
                text: Auth.accessKey() || "",
                handler: function (access_key) {
                    if (access_key) {
                        const new_access_key = Auth.accessKey(access_key);
                        if (new_access_key == access_key) {
                            $ui.success("设置成功");
                        } else {
                            $ui.alert({
                                title: "设置失败",
                                message: "",
                                actions: [{
                                    title: "OK",
                                    disabled: false,
                                    handler: function () {}
                                }]
                            });
                        }
                    }
                }
            });
        },
        getMyInfo: Info.myInfo,
        refreshToken: async () => {
            if (await Auth.refreshToken()) {
                $ui.alert({
                    title: "刷新成功",
                    message: "",
                });
            } else {
                $ui.alert({
                    title: "刷新失败",
                    message: "",
                });
            }
        }
    };
module.exports = {
    Auth,
    Info,
    View
};