let modules = {
        acfun: {
            filePath: "./mod/acfun",
            action: "init",
            param: undefined
        },
        bilibili: {
            filePath: "./mod/bilibili",
            action: "init",
            param: undefined
        }
    },
    mod = require("./mod_index"),
    init = require("./init"),
    loadModule = moduleId => {
        const moduleInfo = modules[moduleId];
        require(moduleInfo.filePath)[moduleInfo.action]();
    },
    openSettingPage = () => {
        init.initPrefs();
        $prefs.open(() => {
            init.updatePrefs();
        });
    };
module.exports = {
    mod: mod.showModList,
    setting: openSettingPage,
    initPrefs: init.initPrefs,
    updatePrefs: init.updatePrefs,
    modules,
    loadModule
};
