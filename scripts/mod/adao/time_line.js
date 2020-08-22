var API_URL = require("./api_url");
async function init(serverDomain) {
    $console.info(`serverDomain:${serverDomain}`);
    $ui.loading(true);
    const timeLine = await getTimeLine(serverDomain);
    $ui.loading(false);
    if (timeLine) {
        $console.info(`获取时间线成功:`);
        $console.info(timeLine);
        showTimeLine(timeLine);
    } else {
        $ui.alert({
            title: "错误",
            message: "获取数据失败",
            actions: [
                {
                    title: "OK",
                    disabled: false, // Optional
                    handler: function() {}
                }
            ]
        });
    }
}
async function getTimeLine(hosts) {
    const result = await $http.get({ url: hosts + API_URL.GET_TIMELINE });
    $console.info(result);
    return result.data;
}
function showTimeLine(timeLine) {
    $ui.push({
        props: {
            title: "时间线"
        },
        views: [
            {
                type: "list",
                props: {
                    data: timeLine.map(t => t.content)
                },
                layout: $layout.fill,
                events: {
                    didSelect: function(_sender, indexPath, _data) {
                        const section = indexPath.section;
                        const row = indexPath.row;

                        const thisItem = timeLine[row];
                        $console.info(thisItem);
$ui.alert({
    title: "",
    message: thisItem,
    actions: [
        {
            title: "OK",
            disabled: false, // Optional
            handler: function() {}
        }
    ]
});                        
                    }
                }
            }
        ]
    });
}
module.exports = {
    init
};