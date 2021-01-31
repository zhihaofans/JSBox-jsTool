let app = require("/scripts/api/app.js");

let docScan = () => {
    $photo.scan({
        handler: data => {
            $console.info(data);
            if (data.status) {
                const resultList = data.results;
                if (resultList.length > 0) {
                    var imageDataList = [];
                    for (i in resultList) {
                        imageDataList.push(resultList[i].png)
                    }
                    $ui.push({
                        props: {
                            title: $l10n("SCAN_SUCCESS")
                        },
                        views: [{
                            type: "list",
                            props: {
                                data: app.getListFromL10n(["预览全部图片", "保存全部图片"])
                            },
                            layout: $layout.fill,
                            events: {
                                didSelect: function (_sender, indexPath, _data) {
                                    switch (indexPath.row) {
                                        case 0:
                                            $quicklook.open({
                                                list: imageDataList
                                            });
                                            break;
                                        default:
                                    }
                                }
                            }
                        }]
                    });
                } else {
                    $ui.alert({
                        title: $l10n("SCAN_FAILED"),
                        message: "系统返回0个结果",
                    });
                }
            } else {
                $ui.alert({
                    title: $l10n("SCAN_FAILED"),
                    message: data.error.description,
                });
            }
        }
    });

};

let init = () => {
    $ui.push({
        props: {
            title: $l10n("IMAGE")
        },
        views: [{
            type: "list",
            props: {
                data: [{
                    title: "",
                    rows: []
                }, {
                    title: "其他",
                    rows: app.getListFromL10n(["SCAN_DOCUMENTS"])
                }, ]
            },
            layout: $layout.fill,
            events: {
                didSelect: function (_sender, indexPath, _data) {
                    const section = indexPath.section;
                    const row = indexPath.row;
                    switch (section) {
                        case 0:
                            break;
                        case 1:
                            switch (row) {
                                case 0:
                                    docScan();
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
    init: init
};