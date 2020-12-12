let _Bilibili = require("./bilibili"),
    _comic = () => {
        _Bilibili.Comic.checkIn();
    },
    _live = () => {
        _Bilibili.Live.checkIn();
    },
    _liveSilver2Coin = () => {
        _Bilibili.Live.silver2coin();
    },
    _vipCheckIn = () => {

    },
    initView = () => {
        $ui.push({
            props: {
                title: "Bilibili 签到"
            },
            views: [{
                type: "list",
                props: {
                    data: ["漫画", "直播签到", "直播银瓜子兑换硬币"]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function (_sender, indexPath, _data) {
                        switch (indexPath.row) {
                            case 0:
                                _comic();
                                break;
                            case 1:
                                _live();
                                break;
                            case 2:
                                _liveSilver2Coin();
                                break;
                        }
                    }
                }
            }]
        });
    };
module.exports = {
    initView
};