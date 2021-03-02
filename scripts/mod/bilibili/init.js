let _User = require("./user"),
    _CheckIn = require("./check_in"),
    _Comic = require("./comic"),
    init = () => {
        $ui.push({
            props: {
                title: "Bilibili Mod ver"
            },
            views: [
                {
                    type: "list",
                    props: {
                        data: [
                            {
                                title: "",
                                rows: [
                                    "设置Access Key",
                                    "签到",
                                    "获取个人信息",
                                    "刷新Access key",
                                    "获取饼干",
                                    "漫画剩余券"
                                ]
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
                                            _User.View.updateAccessKey();
                                            break;
                                        case 1:
                                            _CheckIn.initView();
                                            break;
                                        case 2:
                                            _User.View.getMyInfo();
                                            break;
                                        case 3:
                                            _User.View.refreshToken();
                                            break;
                                        case 4:
                                            _User.View.getCookiesByAccessKey();
                                            break;
                                        case 5:
                                            _Comic.Ticket.getTicketStates();
                                            break;
                                    }
                                    break;
                            }
                        }
                    }
                }
            ]
        });
    };
module.exports = {
    init
};
