let _modInfo = {
    id: "mod_news",
    title: "新闻模块",
    version: 1,
    updateLink: "",
    modType: 1
};
let fileUtil = require("/scripts/api/file");
let newsDir = "/scripts/mod/news/";
function _get_mod_info_() {
    return _modInfo;
}
function init() {
    const newsList = fileUtil.getFileList(newsDir, "js");
    if (newsList) {
        if (newsList.length > 0) {
            $console.info(newsList);
            $ui.push({
                props: {
                    title: "新闻模块"
                },
                views: [
                    {
                        type: "list",
                        props: {
                            data: newsList
                        },
                        layout: $layout.fill,
                        events: {
                            didSelect: function(_sender, indexPath, _data) {
                                const section = indexPath.section;
                                const row = indexPath.row;
                                initMod(newsList[row]);
                            }
                        }
                    }
                ]
            });
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
function initMod(modName) {
    const fileName = `${newsDir}${modName}`;
    if ($file.exists(fileName)) {
        if ($file.isDirectory(fileName)) {
            $ui.error("这是目录");
        } else {
            const modData = require(fileName);
            if (modData) {
                try {
                    modData.init();
                    $console.info(`Mod加载完毕:${modName}`);
                } catch (error) {
                    $ui.alert({
                        title: `${modName}加载失败`,
                        message: error.message,
                        actions: [
                            {
                                title: "OK",
                                disabled: false, // Optional
                                handler: function() {}
                            }
                        ]
                    });
                }
            } else {
                $ui.error("请确认是否为mod文件");
            }
        }
    } else {
        $ui.error("不存在该文件");
    }
}
module.exports = {
    init,
    _get_mod_info_
};