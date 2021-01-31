let _Bilibili = require("./bilibili"),
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
                                _Bilibili.Comic.checkIn();
                                break;
                            case 1:
                                _Bilibili.Live.checkIn();
                                break;
                            case 2:
                                _Bilibili.Live.silver2coin();
                                break;
                            default:
                                $ui.error("待更新");
                        }
                    }
                }
            }]
        });
    };
module.exports = {
    initView
};