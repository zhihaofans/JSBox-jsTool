let _apple = require("../api/urlData.js").APPLE;

function initView() {
    $ui.push({
        props: {
            title: "App store排行榜"
        },
        views: [{
            type: "list",
            props: {
                data: [{
                    title: "iOS",
                    rows: ["免费APP", "收费APP", "畅销APP"]
                }]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (_sender, indexPath, _data) {
                    const section = indexPath.section;
                    const row = indexPath.row;
                    switch (section) {
                        case 0:
                            // iOS
                            switch (row) {
                                case 0:
                            }

                    }
                }
            }
        }]
    });
}