let fileUtil = require("/scripts/api/file");
let newsDir = "/scripts/mod/news/";

function init() {
    const newsList = fileUtil.getFileList(newsDir, "js");
    if (newsList) {
        if (newsList.length > 0) {
            $console.info(newsList);
        } else {
            $ui.error("0个新闻模组");
        }
    } else {
        $ui.alert({
            title: "获取新闻模组列表失败",
            message: "得到未知的列表数据",
            actions: [
                {
                    title: "OK",
                    disabled: false, // Optional
                    handler: function() {}
                }
            ]
        });
    }
}

module.exports = {
    init
};