const page = require("./page_init");
let siteListL10n = ["ACFUN", "BILIBILI"],
    moreListL10n = ["Mod", "设置"],
    getNavButton = () => {
        return [
            {
                title: $l10n("MENU"),
                icon: "067", // Or you can use icon name
                handler: () => {
                    $ui.success("Hi~");
                }
            }
        ];
    },
    loadMainView = () => {
        $ui.render({
            props: {
                id: "main",
                homeIndicatorHidden: false,
                modalPresentationStyle: 0,
                navButtons: getNavButton()
            },
            views: [
                {
                    type: "list",
                    props: {
                        data: [
                            {
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
                                            page.loadModule("acfun");
                                            break;
                                        case 1:
                                            page.loadModule("bilibili");
                                            break;

                                        default:
                                            $ui.error("错误选项");
                                    }
                                    break;
                                case 1:
                                    switch (indexPath.row) {
                                        case 0:
                                            page.mod();
                                            break;
                                        case 1:
                                            page.setting();
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
                }
            ],
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
    };
module.exports = {
    loadMainView
};
