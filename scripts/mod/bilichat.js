let appScheme = require("AppScheme");

function showHistory() {
    $ui.loading(true);
    $http
        .get({
            url: "https://bilichat.3shain.com/api/history"
        })
        .then(function (resp) {
            var data = resp.data;
            if (data) {
                if (data.length > 0) {
                    $ui.loading(false);
                    $ui.push({
                        props: {
                            title: "Bilichat历史记录"
                        },
                        views: [
                            {
                                type: "list",
                                props: {
                                    data: data.map(i => i.user_name)
                                },
                                layout: $layout.fill,
                                events: {
                                    didSelect: function (
                                        _sender,
                                        indexPath,
                                        _data
                                    ) {
                                        const section = indexPath.section;
                                        const row = indexPath.row;
                                        const thisRoom = data[row];
                                        $ui.alert({
                                            title: "",
                                            message: thisRoom,
                                            actions: [
                                                {
                                                    title: "打开直播间",
                                                    disabled: false,
                                                    handler: function () {
                                                        appScheme.bilibiliLive(
                                                            thisRoom.room_id
                                                        );
                                                    }
                                                },
                                                {
                                                    title: "打开个人空间",
                                                    disabled: false,
                                                    handler: function () {
                                                        appScheme.bilibiliVideo(
                                                            thisRoom.user_id
                                                        );
                                                    }
                                                },
                                                {
                                                    title: "关闭",
                                                    disabled: false,
                                                    handler: function () {}
                                                }
                                            ]
                                        });
                                    }
                                }
                            }
                        ]
                    });
                } else {
                    $ui.loading(false);
                    $ui.error("没人用过");
                }
            } else {
                $ui.loading(false);
                $ui.error("空白数据");
            }
        });
}
module.exports = {
    init: showHistory,
    showHistory
};