let modDir = "/scripts/mod/";
function loadMod(modName) {
    return require(`${modDir}${modName}`);
}

function initMod(modName) {
    require(`${modDir}${modName}`).init();
}
function getModList() {
    return $file.list(modDir);
}
function showModList() {
    const modList = getModList();
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
                            data: modList
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