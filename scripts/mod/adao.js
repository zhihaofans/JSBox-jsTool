var serverDomain = "https://adnmb2.com";
const _MAIN = require("./adao/main"),
    timeLine = require("./adao/time_line");
async function init() {
    $ui.loading(true);
    await getHost();
    await timeLine.init(serverDomain);
    $ui.loading(false);
}
async function getHost() {
    try {
        const backupUrl = await _MAIN.getBackupUrl();
        serverDomain = backupUrl;
        $console.info(`获取主机成功: ${serverDomain}`);
    } catch (_error) {
        $console.error(`获取主机失败，使用自带主机名:${serverDomain}`);
    }
}
module.exports = {
    init
};