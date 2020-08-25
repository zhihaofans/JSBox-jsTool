var API_URL = require("./api_url"),
    _forum = require("./forum");
async function init(serverDomain) {
    $console.info(`serverDomain:${serverDomain}`);
    $ui.loading(true);
    const timeLine = await _forum.getTimeLine(serverDomain);
    $ui.loading(false);
    if (timeLine) {
        $console.info(`获取时间线成功:`);
        $console.info(timeLine);
        _forum.showForum(timeLine, "时间线");
    } else {
        $ui.alert({
            title: "错误",
            message: "获取数据失败",
            actions: [
                {
                    title: "OK",
                    disabled: false,
                    handler: function() {}
                }
            ]
        });
    }
}
async function getTimeLine(hosts) {
    const result = await $http.get({ url: hosts + API_URL.EXT.GET_TIMELINE });
    $console.info(result);
    return result.data;
}
module.exports = {
    init
};