let $User = require("./acfun/user"),
    $Local = require("./acfun/local_data"),
    $Auth = new $User.Auth(),
    $Daily = new $User.Daily(),
    $loginData = new $Local.Login();
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
                    rows: ["登录", "签到"]
                }, {
                    title: "测试",
                    rows: ["1", "2"]
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
                                case 1:
                                    $Daily.dailyCheckIn();
                                    break;
                            }
                            break;
                        case 1:
                            switch (row) {
                                case 0:
                                    $console.info($loginData.loadLoginData());
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