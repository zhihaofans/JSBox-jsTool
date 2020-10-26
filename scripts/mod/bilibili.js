let $_View = require("./bilibili/view");
let $View_User = new $_View.User();

let init = () => {
    $ui.push({
        props: {
            title: "Bilibili Mod ver"
        },
        views: [{
            type: "list",
            props: {
                data: [{
                    title: "",
                    rows: ["设置Access Key", "签到", "获取个人信息"]
                }]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (_sender, indexPath, _data) {
                    switch (indexPath.section) {
                        case 0:
                            switch (indexPath.row) {
                                case 0:
                                    $View_User.updateAccessKey();
                                    break;
                                case 1:
                                    $_View.CheckIn();
                                    break;
                                case 2:
                                    $View_User.getMyInfo();
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