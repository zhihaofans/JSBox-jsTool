var serverDomain = "https://adnmb2.com";
const _API = require("./adao/api"),
    _PAGE = require("./adao/page");
async function init() {
    $ui.loading(true);
    await getHost();
    _PAGE.showMainPage(serverDomain);
    $ui.loading(false);
}
async function getHost() {
    try {
        const backupUrl = await _API.getBackupUrl();
        serverDomain = backupUrl;
        $console.info(`获取主机成功: ${serverDomain}`);
    } catch (_error) {
        $console.error(`获取主机失败，使用自带主机名:${serverDomain}`);
    }
}
module.exports = {
    init
};