let URL = require("./urlData.js");

function UpdateData(name, version, icon, hasUpdate = false, updateUrl = null) {
    this.name = name;
    this.version = version;
    this.icon = icon;
    this.hasUpdate = hasUpdate;
    this.updateUrl = updateUrl;
}

function checkUpdate(CDN = true) {
    const remoteFile = CDN
        ? getRemoteConfigFromCDN()
        : getRemoteConfigFromGithub();
    if (remoteFile) {
        const newVersion = remoteFile.info.version;
        const newBox = remoteFile.info.url;
        const newName = remoteFile.info.name;
        const appIcon = CDN ? URL.JSBOX.APP_ICON : URL.JSBOX.APP_ICON_GITHUB;
        const localConfig = getLocalConfig();
        if (newVersion && newName && localConfig) {
            if (
                compareVersion(localConfig.info.version, newVersion) ||
                compareVersion1(localConfig.info.version, newVersion)
            ) {
                return UpdateData(newName, newVersion, appIcon, true, newBox);
            } else {
                return UpdateData(newName, newVersion, appIcon, false);
            }
        }
    } else {
        return null;
    }
}

async function getRemoteConfigFromCDN() {
    let resp = await $http.get({
        url: URL.JSBOX.APP_CONFIG
    });
    $console.info(resp.data);
    return resp.data;
}

async function getRemoteConfigFromGithub() {
    let resp = await $http.get({
        url: URL.JSBOX.APP_CONFIG_GITHUB
    });
    $console.info(resp.data);
    return resp.data;
}
// 版本号对比来自：https://gist.github.com/puterjam/8518259
function compareVersion(v1, v2) {
    let _v1 = v1.split("."),
        _v2 = v2.split("."),
        _r = _v1[0] - _v2[0];

    return _r === 0 && v1 != v2
        ? compareVersion(_v1.splice(1).join("."), _v2.splice(1).join("."))
        : _r;
}

function compareVersion1(v1 = "", v2 = "") {
    let _v1 = v1.split("."),
        _v2 = v2.split("."),
        // 或操作是为了占位，避免NaN
        _r = parseInt(_v1[0] || 0, 10) - parseInt(_v2[0] || 0, 10);

    return v1 !== v2 && _r === 0
        ? compareVersion1(_v1.splice(1).join("."), _v2.splice(1).join("."))
        : _r;
}

function installApp(updateUrl, updateName = "", updateIcon = "") {
    let installUrl = `jsbox://import?url=${$text.URLEncode(updateUrl)}`;
    if (updateName) {
        installUrl += `&name=${$text.URLEncode(updateName)}`;
    }
    if (updateIcon) {
        installUrl += `&icon=${$text.URLEncode(updateIcon)}`;
    }
    $app.openURL(installUrl);
}

function getLocalConfig() {
    return JSON.parse($file.read("/config.json"));
}

function checkLatestVersion() {
    const current_version = JSON.parse($file.read("config.json").string).info
        .version;
    const githubUrl =
        "https://api.github.com/repos/zhihaofans/JSBox-jsTool/releases/latest";
    $http.get({
        url: githubUrl,
        timeout: 10,
        handler: resp => {
            if (resp.data && resp.response.statusCode === 200) {
                const info = resp.data;
                const latest_version = info["tag_name"];
                if (current_version !== latest_version) {
                    const url = info.assets[0].browser_download_url;
                    $ui.alert({
                        title: $l10n("UPDATE_TIPS") + " " + latest_version,
                        message: info.body,
                        actions: [
                            {
                                title: $l10n("CANCEL_UPDATE")
                            },
                            {
                                title: $l10n("CONFIRM_UPDATE"),
                                handler: async () => {
                                    const { data } = await $http.download({
                                        url,
                                        showsProgress: true,
                                        backgroundFetch: false
                                    });
                                    $addin.save({
                                        name: "JSBooru",
                                        data,
                                        handler: success => $addin.restart()
                                    });
                                }
                            }
                        ]
                    });
                }
            }
        }
    });
}
module.exports = {
    checkUpdate,
    installApp,
    checkLatestVersion
};
