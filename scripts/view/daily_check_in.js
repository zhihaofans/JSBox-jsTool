let _ACFUN = require("../api/acfun.js"),
    _BILI = require("../api/bilibili/check_in.js");
function initView() {
    $ui.push({
        props: {
            title: "每日签到"
        },
        views: [
            {
                type: "list",
                props: {
                    data: [
                        "Acfun",
                        "Bilibili漫画",
                        "Bilibili银瓜子兑换硬币",
                        "Bilibili直播签到"
                    ]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function(sender, indexPath, data) {
                        const row = indexPath.row;
                        switch (row) {
                            case 0:
                                _ACFUN.dailyCheckin();
                                break;
                            case 1:
                                _BILI.mangaCheckin();
                                break;
                            case 2:
                                _BILI.silverToCoin();
                                break;
                            case 3:
                                _BILI.liveCheckIn();
                                break;
                            default:
                                $ui.error("暂不支持该功能");
                        }
                    }
                }
            }
        ]
    });
}
module.exports = {
    initView
};