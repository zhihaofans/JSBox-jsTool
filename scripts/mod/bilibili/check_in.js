let comic = () => {
    const $B_comic = require("./comic");
    const $C_User = new $B_comic.User();
    $C_User.checkIn();
};

let initView = () => {
    $ui.push({
        props: {
            title: "Bilibili 签到"
        },
        views: [{
            type: "list",
            props: {
                data: ["漫画"]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (_sender, indexPath, _data) {
                    switch (indexPath.row) {
                        case 0:
                            comic();
                            break;
                        case 1:
                            //$_View.updateAccessKey();
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