let page = require("./scripts/page_init.js");
let siteListL10n = ["MO_FISH", "ACFUN", "BILIBILI", "INSTAGRAM", "ZHIHU_DAILY"];
let moreListL10n = ["CDN", "KUAIDI", "SM_MS", "IMAGE", "MUSIC_SEARCH", "免费短信接收", "天气查询"];
let siteList = siteListL10n.map(x => $l10n(x));
let moreList = moreListL10n.map(x => $l10n(x));
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
                            page.scanQrcodeToGo()
                            break;
                        case 1:
                            break;
                    }
                }
            });
        }
    }];
};
let checkCacheDir = () => {
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
};
let init = () => {
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
                            rows: siteList
                        },
                        {
                            title: $l10n("更多"),
                            rows: moreList
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
                                        page.kuaidi();
                                        break;
                                    case 2:
                                        page.smms();
                                        break;
                                    case 3:
                                        page.image();
                                        break;
                                    case 4:
                                        page.musicSearch();
                                        break;
                                    case 5:
                                        page.freeSms();
                                        break;
                                    case 6:
                                        page.weather();
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
                    $app.tips("右上角的按钮是更新按钮，摇一摇设备也可以触发检测更新");
                },
                shakeDetected: function () {
                    //摇一摇
                }
            }
        });
    }
};

init();