let modules = {
        acfun: {
            filePath: "./view/acfun",
            action: "init",
            param: undefined
        },
        test: {
            filePath: "./view/test",
            action: "init",
            param: undefined
        }
    },
    loadModule = moduleId => {
        const moduleInfo = modules[moduleId];
        require(moduleInfo.filePath)[moduleInfo.action]();
    },
    $_str = require("./libs/string"),
    urlCheck = require("./api/urlCheck"),
    cdn = require("./view/cdn"),
    bilibili = require("./view/bilibili"),
    instagram = require("./view/instagram"),
    misc = require("./view/misc"),
    dailyCheckin = require("./view/daily_check_in"),
    bilichat = require("./view/bilichat"),
    test = require("./view/test"),
    mod = require("./mod_index"),
    init = require("./init"),
    gotoUrl = url => {
        const newUrl = $text.URLDecode(url);
        if ($_str.checkIfUrl(newUrl)) {
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
            case "instagram":
                instagram.init(url);
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
                if ($_str.checkIfUrl(str)) {
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
    instagram: instagram.init,
    misc: misc.initListView,
    dailyCheckin: dailyCheckin.initView,
    bilichat: bilichat.showHistory,
    test: test.init,
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