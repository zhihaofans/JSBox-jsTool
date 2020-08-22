var serverDomain = "https://adnmb2.com";
var _MAIN = require("./adao/main"),
    timeLine = require("./adao/time_line");
async function init() {
    $ui.loading(true);
    await getHost();
    await timeLine.init(serverDomain);
    $ui.loading(false);
}
async function getHost() {
    const backupUrl = await _MAIN.getBackupUrl();
    serverDomain = backupUrl;
    $console.info(`获取主机成功: ${serverDomain}`);
}
module.exports = {
    init
};