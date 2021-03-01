let modules = {
        acfun: {
            filePath: "./view/acfun",
            action: "init",
            param: undefined
        }
    },
    loadModule = moduleId => {
        const moduleInfo = modules[moduleId];
        require(moduleInfo.filePath)[moduleInfo.action]();
    },
    urlCheck = require("./api/urlCheck"),
    cdn = require("./view/cdn"),
    bilibili = require("./view/bilibili"),
    mod = require("./mod_index"),
    init = require("./init"),
    $$ = require("$$"),
    gotoUrl = url => {
        const newUrl = $text.URLDecode(url);
        if ($$.Str.checkIfUrl(newUrl)) {
            checkMod(newUrl);
        } else {
            $ui.alert({
                title: "内容错误",
                message: "不是完整链接"
            });
        }
    },
    checkMod = url => {
        if (urlCheck.isBilibiliUrl(url)) {
            modOpen("bilibili", url);
        } else if (urlCheck.isAcfunUrl(url)) {
            modOpen("acfun", url);
        } else {
            $ui.error("不支持该网址的分享");
        }
    },
    modOpen = (mod, url) => {
        switch (mod) {
            case "bilibili":
                bilibili.init(url);
                break;
            default:
                $ui.error("不支持该功能");
        }
    },
    contextOpen = query => {
        switch (query.mod) {
            case "url":
                if (query.url) {
                    gotoUrl(query.url);
                } else {
                    $ui.alert({
                        title: "外部调用错误",
                        message: "空白url"
                    });
                }
                break;
            default:
                $ui.alert({
                    title: "外部调用错误",
                    message: "发现未支持的外部调用"
                });
        }
    },
    scanQrcodeToGo = () => {
        $qrcode.scan({
            handler(str) {
                if ($$.Str.checkIfUrl(str)) {
                    gotoUrl(str);
                } else {
                    $ui.error("不是链接");
                }
            },
            cancelled() {
                $ui.error("Cancelled");
            }
        });
    },
    openSettingPage = () => {
        init.initPrefs();
        $prefs.open(() => {
            init.updatePrefs();
        });
    };
module.exports = {
    cdn: cdn.init,
    bilibili: bilibili.init,
    mod: mod.showModList,
    setting: openSettingPage,
    initPrefs: init.initPrefs,
    updatePrefs: init.updatePrefs,
    contextOpen,
    gotoUrl,
    scanQrcodeToGo,
    modules,
    loadModule
};
