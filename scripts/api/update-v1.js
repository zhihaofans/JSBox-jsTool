let getConfig = () => {
    return JSON.parse($file.read("/config.json"));
};

function checkUpdate(jsonUrl, appId) {
    const appVersion = getConfig().info.version;
    $ui.alert({
        title: "你要检测更新吗?",
        message: "你点了检测更新的按钮",
        actions: [
            {
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
                                    message:
                                        "版本号：" +
                                        _app.version_name +
                                        "\n你要更新吗?\n更新内容：\n" +
                                        _app.update_note,
                                    actions: [
                                        {
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
let checkUpdateV2 = appId => {
    const appVersion = getConfig().info.version;
    $ui.alert({
        title: "你要检测更新吗?",
        message: "你点了检测更新的按钮",
        actions: [
            {
                title: "好的",
                disabled: false, // Optional
                handler: function () {
                    $http.get({
                        url:
                            "https://cdn.jsdelivr.net/gh/zhihaofans/JSBox-jsTool@master/config.json",
                        handler: function (_resp) {
                            const updateData = _resp.data;
                            $console.info("更新：获取服务器数据成功");
                            const _app = updateData[appId];
                            if (_app.version_name > appVersion) {
                                $console.info("更新：发现更新");
                                $ui.alert({
                                    title: "发现新版本",
                                    message:
                                        "版本号：" +
                                        _app.version_name +
                                        "\n你要更新吗?\n更新内容：\n" +
                                        _app.update_note,
                                    actions: [
                                        {
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

let installJs = (updateUrl, updateName, updateIcon) => {
    const url =
        "jsbox://import?url=" +
        $text.URLEncode(updateUrl) +
        "&name=" +
        $text.URLEncode(updateName) +
        "&icon=" +
        $text.URLEncode(updateIcon);
    $app.openURL(url);
};
/**
 * 判断两个版本字符串的大小
 * @param  {string} v1 原始版本
 * @param  {string} v2 目标版本
 * @return {number}    如果原始版本大于目标版本，则返回大于0的数值, 如果原始小于目标版本则返回小于0的数值。0当然是两个版本都相等拉。
 */
let compareVersion = (v1, v2) => {
    // 比较NaN
    // 感谢：https://gist.github.com/puterjam/8518259
    let _v1 = v1.split("."),
        _v2 = v2.split("."),
        _r = _v1[0] - _v2[0];
    return _r === 0 && v1 != v2
        ? compareVersion(_v1.splice(1).join("."), _v2.splice(1).join("."))
        : _r;
};
module.exports = {
    checkUpdate,
    checkUpdateV2
};
