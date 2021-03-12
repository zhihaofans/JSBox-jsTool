class V4 {
    constructor(indexJsPath) {
        this._indexJsPath = indexJsPath;
    }
    get indexJs() {
        const _f = require("$$").File;
        return this._indexJsPath
            ? _f.isFile(this.vindexJsPath)
                ? require(this._indexJsPath) || undefined
                : undefined
            : undefined;
    }
    showModList(_title, modDir, listData) {
        $console.error(modDir);
        $console.error(listData);
        $ui.push({
            props: {
                title: _title
            },
            views: [
                {
                    type: "list",
                    props: {
                        data: listData.map(_mod => _mod.modTitle)
                    },
                    layout: $layout.fill,
                    events: {
                        didSelect: function (_sender, indexPath, _data) {
                            const row = indexPath.row,
                                thisMod = listData[row];
                            require(modDir + thisMod.modId)[
                                thisMod.modAction
                            ]();
                        }
                    }
                }
            ]
        });
    }
}
let ModV4 = new V4("/scripts/mod/ModV3/mod.js"),
    init = () => {
        $console.warn(ModV4.indexJs);
        $console.error(ModV4);
    };
module.exports = {
    init
};
