let $_User = require("./bilibili/user");
let $_View = new $_User.View();
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
                    rows: ["设置Access Key"]
                }]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (_sender, indexPath, _data) {
                    switch (indexPath.section) {
                        case 0:
                            switch (indexPath.row) {
                                case 0:
                                    $_View.updateAccessKey();
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