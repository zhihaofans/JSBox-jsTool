const _URL = require("./api_url"),
    _API = require("./api"),
    app = require("./app");
async function getTimeLine(hosts) {
    const result = await $http.get({ url: hosts + _URL.EXT.GET_TIMELINE });
    $console.info(result);
    return result.data;
}
async function getForum(forumId) {
    $ui.loading(true);
    const httpGet = await _API.httpGet(
        _URL.EXT.GET_FORUM + `?page=0&id=${forumId}`
    );
    $console.info(httpGet);
    $ui.loading(false);
    if (httpGet.error) {
        $ui.error("加载失败");
        $console.error(httpGet.error);
    } else {
        if (httpGet.data) {
            showForum(httpGet.data);
        } else {
            $ui.alert({
                title: "加载失败",
                message: "空白数据",
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
}
function showForum(forumData) {
    $ui.push({
        props: {
            title: "板块"
        },
        views: [
            {
                type: "list",
                props: {
                    data: forumData.map(f => f.content)
                },
                layout: $layout.fill,
                events: {
                    didSelect: function(_sender, indexPath, _data) {
                        const section = indexPath.section;
                        const row = indexPath.row;

                        const thisItem = forumData[row];
                        $console.info(thisItem);
                        $ui.alert({
                            title: thisItem.userid,
                            message: thisItem.content,
                            actions: [
                                {
                                    title: "打开",
                                    disabled: false,
                                    handler: function() {
                                        app.openAppThread(thisItem.id);
                                    }
                                },
                                {
                                    title: "OK",
                                    disabled: false,
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
    getForum,
    showForum,
    getTimeLine
};