const download = require("../api/download"),
    auth = require("../api/auth");

function init() {
    $ui.push({
        props: {
            title: "TEST"
        },
        views: [{
            type: "list",
            props: {
                data: [{
                    title: "Section 0",
                    rows: [
                        "instagram",
                        "Custom cache value"
                    ]
                }]
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
                                    $input.text({
                                        type: $kbType.text,
                                        placeholder: "",
                                        text: "",
                                        handler: text => {
                                            if (text) {
                                                download.instagram(text);
                                            } else {
                                                $ui.error("空白链接");
                                            }
                                        }
                                    });
                                    break;
                                case 1:
                                    $input.text({
                                        type: $kbType.text,
                                        placeholder: "",
                                        text: "",
                                        handler: inputId => {
                                            if (inputId) {
                                                $input.text({
                                                    type: $kbType.text,
                                                    placeholder: "",
                                                    text: $cache.get(
                                                        inputId
                                                    ) || "",
                                                    handler: inputValue => {
                                                        auth.customCache(
                                                            inputId,
                                                            inputValue
                                                        );
                                                    }
                                                });
                                            }
                                        }
                                    });
                                    break;
                            }
                            break;
                    }
                }
            }
        }]
    });
}
module.exports = {
    init
};