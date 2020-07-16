let page = require("./scripts/page_init.js");
let siteListL10n = [
    "MO_FISH",
    "ACFUN",
    "BILIBILI",
    "INSTAGRAM",
    "ZHIHU_DAILY",
    "技术文",
    "每日签到",
    "苹果排行榜",
    "TOPHUB",
    "Bilichat历史"
];
let moreListL10n = [
    "CDN",
    "SM_MS",
    "IMAGE",
    "MUSIC_SEARCH",
    "杂项"
];
let getNavButton = () => {
    return [{
        title: $l10n("MENU"),
        icon: "067", // Or you can use icon name
        handler: () => {
            $ui.menu({
                items: ["SCAN_QRCODE", "TEST"].map(x => $l10n(x)),
                handler: function (title, idx) {
                    switch (idx) {
                        case 0:
                            page.scanQrcodeToGo();
                            break;
                    }
                }
            });
        }
    }];
};

function checkCacheDir() {
    const cacheDir = ".cache/";
    if (!$file.exists(cacheDir)) {
        $file.mkdir(cacheDir);
    } else if (!$file.isDirectory(cacheDir)) {
        $file.delete(cacheDir);
        $file.mkdir(cacheDir);
    }
    return $file.write({
        path: `${cacheDir}这个文件夹用来存成功请求的数据.txt`,
        data: $data({
            string: "这个文件夹用来存成功请求的数据"
        })
    });
}

function init() {
    // app.faceId();
    var query = $context.query;
    if (query.mod) {
        page.contextOpen(query);
    } else if ($context.link) {
        page.gotoUrl($context.link);
    } else {
        if (!checkCacheDir()) {
            $console.error("初始化缓存目录失败");
        }
        $ui.render({
            props: {
                id: "main",
                homeIndicatorHidden: false,
                modalPresentationStyle: 0,
                navButtons: getNavButton()
            },
            views: [{
                type: "list",
                props: {
                    data: [{
                            title: $l10n("SITE"),
                            rows: siteListL10n.map(x => $l10n(x))
                        },
                        {
                            title: $l10n("更多"),
                            rows: moreListL10n.map(x => $l10n(x))
                        }
                    ]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function (_sender, indexPath, _data) {
                        switch (indexPath.section) {
                            case 0:
                                switch (indexPath.row) {
                                    case 0:
                                        page.mofish();
                                        break;
                                    case 1:
                                        page.acfun();
                                        break;
                                    case 2:
                                        page.bilibili();
                                        break;
                                    case 3:
                                        page.instagram();
                                        break;
                                    case 4:
                                        page.zhihuDaily();
                                        break;
                                    case 5:
                                        page.jshuwen();
                                        break;
                                    case 6:
                                        page.dailyCheckin();
                                        break;
                                    case 7:
                                        page.appleRank();
                                        break;
                                    case 8:
                                        page.tophub();
                                        break;
                                    case 9:
                                        page.bilichat();
                                        break;
                                    default:
                                        $ui.error("错误选项");
                                }
                                break;
                            case 1:
                                switch (indexPath.row) {
                                    case 0:
                                        page.cdn();
                                        break;
                                    case 1:
                                        page.smms();
                                        break;
                                    case 2:
                                        page.image();
                                        break;
                                    case 3:
                                        page.musicSearch();
                                        break;
                                    case 4:
                                        page.misc();
                                        break;
                                    default:
                                        $ui.error("错误选项");
                                }
                                break;
                            default:
                                $ui.error("错误选项");
                        }
                    }
                }
            }],
            events: {
                appeared: function () {
                    $app.tips(
                        "右上角的按钮是更新按钮，摇一摇设备也可以触发检测更新"
                    );
                },
                shakeDetected: function () {
                    //摇一摇
                }
            }
        });
    }
}

init();