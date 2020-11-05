let _comic = () => {
    const $B_comic = require("./comic");
    (new $B_comic.User()).checkIn();
};
let _live = () => {
    const $B_comic = require("./live");
    (new $B_comic.User()).checkIn();
}
let _liveSilver2Coin = () => {
    try {
        const $B_comic = require("./live");
        (new $B_comic.User()).silver2coin();
    } catch (_error) {
        $console.error(_error);
        $ui.loading(false);
    }
}
let initView = () => {
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