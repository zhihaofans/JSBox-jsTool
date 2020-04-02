let _url = require("../api/urlData.js");
let QU = require("../api/quickUtil.js");
let mainList = ["meowv/wallpaper"];
let initListView = () => {
    $ui.push({
        props: {
            title: "杂烩"
        },
        views: [{
            type: "list",
            props: {
                data: mainList
            },
            layout: $layout.fill,
            events: {
                didSelect: function (_sender, indexPath, _data) {
                    // const section = indexPath.section;
                    const row = indexPath.row;
                    switch (row) {
                        case 0:
                            meomvwallpaper();
                            break;
                        default:
                            $ui.toast("暂不支持该功能，请等待更新");
                    }
                }
            }
        }]
    });
};
let meomvwallpaper = () => {
    $ui.loading(true);
    $http.get({
        url: _url.MEOWV.WALLPAPER
    }).then(function (resp) {
        var data = resp.data;
        if (data) {
            if (data.result) {
                let wpResult = data.result;
                $ui.menu({
                    items: ["标题列表(快)", "直接预览(慢)"],
                    handler: function (title, idx) {
                        switch (idx) {
                            case 0:
                                $ui.push({
                                    props: {
                                        title: "meowv/wallpaper"
                                    },
                                    views: [{
                                        type: "list",
                                        props: {
                                            data: wpResult.map(wp => wp.title),
                                            menu: {
                                                title: "菜单",
                                                items: [{
                                                    title: "Preview",
                                                    symbol: "photo",
                                                    handler: (sender, menuIdx) => {
                                                        let thisWallpaper = wpResult[menuIdx.row];
                                                        $ui.preview({
                                                            title: thisWallpaper.title,
                                                            url: thisWallpaper.url
                                                        });
                                                    }
                                                }, {
                                                    title: "分享",
                                                    symbol: "share",
                                                    handler: (sender, menuIdx) => {
                                                        $share.sheet([wpResult[menuIdx.row].url]);
                                                    }
                                                }, ]
                                            }
                                        },
                                        layout: $layout.fill,
                                        events: {
                                            didSelect: function (_sender, indexPath, _data) {
                                                const row = indexPath.row;
                                                QU.quicklookImageUrl(wpResult[row].url);
                                            }
                                        }
                                    }]
                                });
                                break;
                            case 1:
                                $quicklook.open({
                                    list: wpResult.map(wp => wp.url)
                                });
                                break;
                        }
                    }
                });
            } else {
                $ui.alert({
                    title: "错误",
                    message: "空白结果",
                });
            }
        } else {
            $ui.alert({
                title: "错误",
                message: "空白数据",
            });
        }
    });
};

module.exports = {
    initListView
};