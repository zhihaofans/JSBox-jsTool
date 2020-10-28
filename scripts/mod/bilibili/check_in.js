let _comic = () => {
    const $B_comic = require("./comic");
    (new $B_comic.User()).checkIn();
};
let _live = () => {
    const $B_comic = require("./live");
    (new $B_comic.User()).checkIn();
}
let initView = () => {
    $ui.push({
        props: {
            title: "Bilibili 签到"
        },
        views: [{
            type: "list",
            props: {
                data: ["漫画", "直播签到"]
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
                    }
                }
            }
        }]
    });
};
module.exports = {
    initView
};