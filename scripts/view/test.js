const matsuri_icu = require("../api/bilibili/matsuri.icu");
function init() {
    $ui.push({
        props: {
            title: "TEST"
        },
        views: [
            {
                type: "list",
                props: {
                    data: [
                        {
                            title: "Section 0",
                            rows: ["matsuri.icu"]
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
                                    matsuri_icu.init();
                                        break;
                                }
                                break;
                        }
                    }
                }
            }
        ]
    });
}
module.exports = {
    init
};
