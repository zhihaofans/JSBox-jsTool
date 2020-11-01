let $User = require("./acfun/user");
let $Auth = new $User.Auth();
let init = () => {
    $ui.success("Acfun mod:init");
    $ui.push({
        props: {
            title: "Acfun"
        },
        views: [{
            type: "list",
            props: {
                data: [{
                    title: "",
                    rows: ["登录"]
                }, ]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (_sender, indexPath, _data) {
                    const section = indexPath.section;
                    const row = indexPath.row;
                    switch (section) {
                        case 0:
                            switch (row) {
                                case 0:
                                    $Auth.loginBySetting();
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