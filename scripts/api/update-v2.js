let updateConfig = {
    github: "https://github.com/zhuangzhihao-io/JSBox-jsTool/raw/master/config.json",
    jsdelivr: "https://cdn.jsdelivr.net/gh/zhuangzhihao-io/JSBox-jsTool@master/config.json"
}
let URL = require("./urlData.js");

function checkUpdate(CDN = true) {
    const remoteFile = CDN ? getRemoteConfigFromCDN() : getRemoteConfigFromGithub();
    if (remoteFile) {
        const newVersion = remoteFile.info.version;
    } else {
        return null;
    }
}

function getRemoteConfigFromCDN() {
    var resp = await http.get({
        url: URL.JSBOX.APP_CONFIG
    })
    $console.info(resp.data);
    return resp.data;
}

function getRemoteConfigFromGithub() {
    var resp = await http.get({
        url: URL.JSBOX.APP_CONFIG_GITHUB
    })
    $console.info(resp.data);
    return resp.data;
}
// 版本号对比来自：https://gist.github.com/puterjam/8518259
function compareVersion(v1, v2) {
    var _v1 = v1.split("."),
        _v2 = v2.split("."),
        _r = _v1[0] - _v2[0];

    return _r == 0 && v1 != v2 ? compareVersion(_v1.splice(1).join("."), _v2.splice(1).join(".")) : _r;
}

function compareVersion1(v1 = '', v2 = '') {
    let _v1 = v1.split('.'),
        _v2 = v2.split('.'),
        // 或操作是为了占位，避免NaN
        _r = parseInt(_v1[0] || 0, 10) - parseInt(_v2[0] || 0, 10);

    return v1 !== v2 && _r === 0 ? compareVersion1(_v1.splice(1).join('.'), _v2.splice(1).join('.')) : _r;

}
module.exports = {
    checkUpdate
};