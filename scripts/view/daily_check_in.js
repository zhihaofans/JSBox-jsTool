let _ACFUN = require("../api/acfun.js"),
    _BILI = require("../api/bilibili/check_in.js"),
    _MOD = {
        _BILI: require("../mod/bilibili/bilibili")
    },
    initView = () => {
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
                            "Bilibili直播签到",
                            "Bilibili会员签到"
                        ]
                    },
                    layout: $layout.fill,
                    events: {
                        didSelect: function (sender, indexPath, data) {
                            const row = indexPath.row;
                            switch (row) {
                                case 0:
                                    _ACFUN.dailyCheckin();
                                    break;
                                case 1:
                                    _BILI.mangaCheckin();

                                    break;
                                case 2:
                                    _MOD._BILI.Live.silver2coin();
                                    break;
                                case 3:
                                    _MOD._BILI.Live.checkIn();
                                    break;
                                case 4:
                                    _BILI.vipCheckin();
                                    break;

                                default:
                                    $ui.error("暂不支持该功能");
                            }
                        }
                    }
                }
            ]
        });
    };
module.exports = {
    initView
};