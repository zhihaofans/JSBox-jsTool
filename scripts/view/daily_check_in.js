let _MOD = require("../mod"),
    auto = () => {
        $ui.loading(true);
        let checkinTasks = {
            "bilibili.comic": {
                title: "Bilibili漫画",
                action: _MOD.BILIBILI.Comic.autoCheckIn,
                result: false
            },
            "bilibili.live": {
                title: "Bilibili直播签到",
                action: _MOD.BILIBILI.Live.autoCheckIn,
                result: false
            },
            "bilibili.silver2coin": {
                title: "Bilibili银瓜子兑换硬币",
                action: _MOD.BILIBILI.Live.autoSilver2coin,
                result: false
            }
        };
        Object.keys(checkinTasks).map(_taskId => {
            const _result = checkinTasks[_taskId].action();
            $console.error(_result);
            checkinTasks[_taskId].result = _result;
        });
        $ui.loading(false);
        $console.info(checkinTasks);
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
                            "一键签到"
                        ]
                    },
                    layout: $layout.fill,
                    events: {
                        didSelect: function (sender, indexPath, data) {
                            const row = indexPath.row;
                            switch (row) {
                                case 0:
                                    _MOD.ACFUN.User.DailyCheckIn();
                                    break;
                                case 1:
                                    _MOD.BILIBILI.Comic.checkIn();

                                    break;
                                case 2:
                                    _MOD.BILIBILI.Live.silver2coin();
                                    break;
                                case 3:
                                    _MOD.BILIBILI.Live.checkIn();
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