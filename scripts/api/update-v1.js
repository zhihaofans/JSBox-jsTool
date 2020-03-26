let urlData = require("./urlData.js");

function getConfig() {
    const file = $file.read("/config.json");
    return JSON.parse(file);
}

function checkUpdate(jsonUrl, appId) {
    const appVersion = getConfig().info.version;
    $ui.alert({
        title: "你要检测更新吗?",
        message: "你点了检测更新的按钮",
        actions: [{
                title: "好的",
                disabled: false, // Optional
                handler: function () {
                    $http.get({
                        url: "",
                        handler: function (_resp) {
                            const updateData = _resp.data;
                            $console.info("更新：获取服务器数据成功");
                            const _app = updateData[appId];
                            if (_app.version_name > appVersion) {
                                $console.info("更新：发现更新");
                                $ui.alert({
                                    title: "发现新版本",
                                    message: "版本号：" + _app.version_name + "\n你要更新吗?\n更新内容：\n" + _app.update_note,
                                    actions: [{
                                            title: "好的",
                                            disabled: false, // Optional
                                            handler: function () {
                                                installJs(
                                                    _app.update_url,
                                                    _app.name,
                                                    _app.update_icon
                                                );
                                            }
                                        },
                                        {
                                            title: "不了不了",
                                            disabled: false
                                        }
                                    ]
                                });
                            } else {
                                $console.info("更新：已经是最新版");
                                $ui.toast("已经是最新版");
                            }
                        }
                    });
                }
            },
            {
                title: "不了不了",
                disabled: false
            }
        ]
    });
}
let checkUpdateV2 = (appId) => {
    const appVersion = getConfig().info.version;
    $ui.alert({
        title: "你要检测更新吗?",
        message: "你点了检测更新的按钮",
        actions: [{
                title: "好的",
                disabled: false, // Optional
                handler: function () {
                    $http.get({
                        url: urlData.UPDATE_CONFIG_JSDELIVR,
                        handler: function (_resp) {
                            const updateData = _resp.data;
                            $console.info("更新：获取服务器数据成功");
                            const _app = updateData[appId];
                            if (_app.version_name > appVersion) {
                                $console.info("更新：发现更新");
                                $ui.alert({
                                    title: "发现新版本",
                                    message: "版本号：" + _app.version_name + "\n你要更新吗?\n更新内容：\n" + _app.update_note,
                                    actions: [{
                                            title: "好的",
                                            disabled: false, // Optional
                                            handler: function () {
                                                installJs(
                                                    _app.update_url,
                                                    _app.name,
                                                    _app.update_icon
                                                );
                                            }
                                        },
                                        {
                                            title: "不了不了",
                                            disabled: false
                                        }
                                    ]
                                });
                            } else {
                                $console.info("更新：已经是最新版");
                                $ui.toast("已经是最新版");
                            }
                        }
                    });
                }
            },
            {
                title: "不了不了",
                disabled: false
            }
        ]
    });
};

function installJs(updateUrl, updateName, updateIcon) {
    const url =
        "jsbox://import?url=" +
        $text.URLEncode(updateUrl) +
        "&name=" +
        $text.URLEncode(updateName) +
        "&icon=" +
        $text.URLEncode(updateIcon);
    $app.openURL(url);
}
module.exports = {
    checkUpdate: checkUpdate
};