const timeLine = require("./time_line"),
    _FORUM = require("./forum");
function showMainPage(serverDomain) {
    $ui.push({
        props: {
            title: "A岛"
        },
        views: [
            {
                type: "list",
                props: {
                    data: [
                        {
                            title: "板块",
                            rows: ["时间线", "速报2"]
                        },
                        {
                            title: "设置",
                            rows: []
                        }
                    ]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function(_sender, indexPath, _data) {
                        const section = indexPath.section;
                        const row = indexPath.row;
                        switch (section) {
                            case 0:
                                switch (row) {
                                    case 0:
                                        timeLine.init(serverDomain);
                                        break;
                                    case 1:
                                        _FORUM.getForum(121);
                                        break;
                                    default:
                                        $ui.error("错误选项");
                                }
                                break;
                            default:
                                $ui.error("错误选项");
                        }
                    }
                }
            }
        ]
    });
}
module.exports = {
    showMainPage
};
