let modDir = "/scripts/mod/";
function loadModJson() {
    const modJson = $file.read(`${modDir}mod.json`).string;
    if (modJson) {
        $console.info(modJson);
        try {
            return JSON.parse(modJson);
        } catch (error) {
            $console.error("loadModJson:failed");
            $console.error(error);
            return undefined;
        }
    } else {
        return undefined;
    }
}
function loadMod(modName) {
    return require(`${modDir}${modName}`);
}

function initMod(modName) {
    const fileName = `${modDir}${modName}`;
    if ($file.exists(fileName)) {
        if ($file.isDirectory(fileName)) {
            $ui.error("这是目录");
        } else {
            const modData = require(fileName);
            if (modData) {
                try {
                    modData.init();
                    $console.info("Mod加载完毕");
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
function getModList() {
    var modList = [];
    const fileList = $file.list(modDir);
    fileList.map(f => {
        if (!$file.isDirectory(f)) {
            if (f.endsWith(".js")) {
                modList.push(f);
            }
        }
    });
    return modList;
}
function showModList() {
    const modList = getModList();
    const modJson = loadModJson();
    const modJsonObj = {};
    $console.info(modJson);
    if (modJson) {
        modJson.map(m => {
            modJsonObj[m.file] = m;
        });
    }
    $console.info(modJsonObj);
    if (modList) {
        if (modList.length > 0) {
            $ui.push({
                props: {
                    title: "Mod列表"
                },
                views: [
                    {
                        type: "list",
                        props: {
                            data: modList.map(mod => {
                                if (modJson) {
                                    return mod;
                                } else {
                                    return mod;
                                }
                            })
                        },
                        layout: $layout.fill,
                        events: {
                            didSelect: function(_sender, indexPath, _data) {
                                const section = indexPath.section;
                                const row = indexPath.row;
                                $console.info(_data);
                                initMod(modList[row]);
                            }
                        }
                    }
                ]
            });
        } else {
            $ui.alert({
                title: "Mod列表",
                message: "空白",
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
        $ui.error("返回错误列表");
    }
}
module.exports = {
    loadMod,
    initMod,
    getModList,
    showModList
};