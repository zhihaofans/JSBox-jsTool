let $_View = require("./bilibili/view"),
    init = () => {
        $ui.push({
            props: {
                title: "Bilibili Mod ver"
            },
            views: [{
                type: "list",
                props: {
                    data: [{
                        title: "",
                        rows: ["设置Access Key", "签到", "获取个人信息", "刷新Access key", "获取饼干"]
                    }]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function (_sender, indexPath, _data) {
                        switch (indexPath.section) {
                            case 0:
                                switch (indexPath.row) {
                                    case 0:
                                        $_View.User.updateAccessKey();
                                        break;
                                    case 1:
                                        $_View.CheckIn();
                                        break;
                                    case 2:
                                        $_View.User.getMyInfo();
                                        break;
                                    case 3:
                                        $_View.User.refreshToken();
                                        break;
                                    case 4:
                                        $_View.User.getCookiesByAccessKey();
                                        break;
                                }
                                break;
                        }
                    }
                }
            }]
        });
    };
module.exports = {
    init
};