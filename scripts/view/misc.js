let _url = require("../api/urlData.js");
let QU = require("../api/quickUtil.js");
let mainList = [
    "meowv/wallpaper",
    "meowv/cat",
    "meowv/soul",
    "isoyu/bing",
    "66mz8/phoneWallpaper",
    "neeemooo"
];

let initListView = () => {
    $ui.push({
        props: {
            title: "杂烩"
        },
        views: [
            {
                type: "list",
                props: {
                    data: mainList
                },
                layout: $layout.fill,
                events: {
                    didSelect: function(_sender, indexPath, _data) {
                        // const section = indexPath.section;
                        const row = indexPath.row;
                        switch (_data) {
                            case "meowv/wallpaper":
                                meomvwallpaper();
                                break;
                            case "meowv/cat":
                                meowvRandomCat();
                                break;
                            case "meowv/soul":
                                meomvSoul();
                                break;
                            case "isoyu/bing":
                                isoyuBing();
                                break;
                            case "66mz8/phoneWallpaper":
                                api66mz8_PhoneWallpaper();
                                break;
                            case "neeemooo":
                                neeemooo();
                                break;
                            default:
                                $ui.toast("暂不支持该功能，请等待更新");
                        }
                    }
                }
            }
        ]
    });
};
let meomvwallpaper = () => {
    $ui.loading(true);
    $http
        .get({
            url: _url.MEOWV.WALLPAPER
        })
        .then(function(resp) {
            var data = resp.data;
            if (data) {
                if (data.result) {
                    let wpResult = data.result;
                    $ui.menu({
                        items: ["标题列表(快)", "直接预览(慢)"],
                        handler: function(title, idx) {
                            switch (idx) {
                                case 0:
                                    $ui.push({
                                        props: {
                                            title: "meowv/wallpaper"
                                        },
                                        views: [
                                            {
                                                type: "list",
                                                props: {
                                                    data: wpResult.map(
                                                        wp => wp.title
                                                    ),
                                                    menu: {
                                                        title: "菜单",
                                                        items: [
                                                            {
                                                                title:
                                                                    "Preview",
                                                                symbol: "photo",
                                                                handler: (
                                                                    sender,
                                                                    menuIdx
                                                                ) => {
                                                                    let thisWallpaper =
                                                                        wpResult[
                                                                            menuIdx
                                                                                .row
                                                                        ];
                                                                    $ui.preview(
                                                                        {
                                                                            title:
                                                                                thisWallpaper.title,
                                                                            url:
                                                                                thisWallpaper.url
                                                                        }
                                                                    );
                                                                }
                                                            },
                                                            {
                                                                title: "分享",
                                                                symbol: "share",
                                                                handler: (
                                                                    sender,
                                                                    menuIdx
                                                                ) => {
                                                                    $share.sheet(
                                                                        [
                                                                            wpResult[
                                                                                menuIdx
                                                                                    .row
                                                                            ]
                                                                                .url
                                                                        ]
                                                                    );
                                                                }
                                                            }
                                                        ]
                                                    }
                                                },
                                                layout: $layout.fill,
                                                events: {
                                                    didSelect: function(
                                                        _sender,
                                                        indexPath,
                                                        _data
                                                    ) {
                                                        const row =
                                                            indexPath.row;
                                                        QU.quicklookImageUrl(
                                                            wpResult[row].url
                                                        );
                                                    }
                                                }
                                            }
                                        ]
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
                        message: "空白结果"
                    });
                }
            } else {
                $ui.alert({
                    title: "错误",
                    message: "空白数据"
                });
            }
        });
};
let meowvRandomCat = () => {
    $ui.preview(_url.MEOWV.CAT);
};
let meomvSoul = () => {
    $ui.loading(true);
    $http.get({
        url: _url.MEOWV.SOUL,
        handler: resp => {
            var data = resp.data;
            $ui.loading(false);
            if (data.success) {
                $ui.alert({
                    title: "鸡汤",
                    message: data.result,
                    actions: [
                        {
                            title: "复制",
                            disabled: false, // Optional
                            handler: function() {
                                $clipboard.copy({
                                    text: data.result,
                                    ttl: 60
                                });
                            }
                        },
                        {
                            title: "关闭",
                            disabled: false, // Optional
                            handler: function() {}
                        }
                    ]
                });
            } else {
                $ui.error("Error");
            }
        }
    });
};
let isoyuBing = () => {
    $ui.preview({
        title: "isoyu/bing",
        url: _url.ISOYU.BING
    });
};

let api66mz8_PhoneWallpaper = () => {
    $ui.preview({
        title: "66mz8/phoneWallpaper",
        url: _url.API_66MZ8_COM.PHONE_WALLPAPER
    });
};
function neeemooo() {
    const images = [
        "不想努力了.png",
        "别骂了别骂了.png",
        "发呆.png",
        "吃瘪.png",
        "嚣张.png",
        "天才.png",
        "彩色的希望.png",
        "早上好.png",
        "星星眼.png",
        "晚上好.png",
        "生气.png",
        "疑惑.png",
        "病娇.png",
        "睡觉.png",
        "砸电脑.png",
        "线上对喷，带我一个！.png",
        "问好.png",
        "震撼鸟神.png",
        "鸟神的赐福.png"
    ];

    const fileName = images[Math.floor(Math.random() * 18)];
    const url = "https://neeemooo.com/hanon/" + encodeURI(fileName);
    $console.info(url);
    //QU.quicklookImageUrl(url);
    $ui.preview({
        title: fileName,
        url: url
    });
}
module.exports = {
    initListView
};