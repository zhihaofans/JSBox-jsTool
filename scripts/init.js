class ModLoader {
  constructor(modDir = "/scripts/mod/") {
    this.MOD_DIR = modDir;
  }
  loadMod(modName) {
    return require(`${this.MOD_DIR}${modName}`);
  }
  initMod(modName) {
    let fileName = `${this.MOD_DIR}${modName}`;
    if (!fileName.endsWith(".js")) {
      fileName += ".js";
    }
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
                  handler: function () {}
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
  initModWithCore(mod) {
    let fileName = `${this.MOD_DIR}${mod.file}`;
    if (!fileName.endsWith(".js")) {
      fileName += ".js";
    }
    if ($file.exists(fileName)) {
      if ($file.isDirectory(fileName)) {
        $ui.error("这是目录");
      } else {
        const runMod = require(fileName).run;
        if (typeof runMod === "function") {
          try {
            const runResult = runMod();
            if (runResult.success === true) {
              $console.info(`(core.js)Mod加载完毕:${mod.name}`);
            } else {
              $ui.alert({
                title: `Core.js加载[${mod.name}]失败(${runResult.code})`,
                message: runResult.error_message,
                actions: [
                  {
                    title: "OK",
                    disabled: false, // Optional
                    handler: function () {}
                  }
                ]
              });
            }
          } catch (error) {
            $ui.alert({
              title: `${mod.name}加载失败(catch)`,
              message: error.message,
              actions: [
                {
                  title: "OK",
                  disabled: false, // Optional
                  handler: function () {}
                }
              ]
            });
          }
        } else {
          $ui.error("请确认是否为支持core.js的mod文件");
        }
      }
    } else {
      $ui.error("不存在该文件");
    }
  }
  getModList() {
    let modList = [],
      fileList = $file.list(this.MOD_DIR);
    fileList.sort();
    fileList.map(f => {
      if (!$file.isDirectory(f)) {
        if (f.endsWith(".js")) {
          modList.push(f);
        }
      }
    });
    return modList;
  }
  loadModJson() {
    try {
      const modJson = $file.read(`${this.MOD_DIR}mod.json`).string;
      return modJson ? JSON.parse(modJson) : undefined;
    } catch (error) {
      $console.error("loadModJson:failed");
      $console.error(error);
      return undefined;
    }
  }
  showModList() {
    let modList = this.getModList(),
      modJson = this.loadModJson(),
      modJsonObj = {},
      coreModList = [],
      pinModList = [],
      otherModList = [];
    if (modJson) {
      modJson.map(mod => {
        modJsonObj[mod.file] = mod;
      });
    }
    $console.info(modJsonObj);
    if (modList) {
      if (modList.length > 0) {
        modList.map(mod => {
          if (modJsonObj[mod]) {
            if (modJsonObj[mod].core === true) {
              coreModList.push(modJsonObj[mod]);
            } else {
              pinModList.push(mod);
            }
          } else {
            otherModList.push(mod);
          }
        });
        const $this = this;
        $ui.push({
          props: {
            title: "Mod列表"
          },
          views: [
            {
              type: "list",
              props: {
                data: [
                  {
                    title: "支持Core.js",
                    rows: coreModList.map(core_mod => core_mod.name)
                  },
                  {
                    title: "常用Mod",
                    rows: pinModList
                  },
                  {
                    title: "其他Mod",
                    rows: otherModList
                  }
                ]
              },
              layout: $layout.fill,
              events: {
                didSelect: function (_sender, indexPath, _data) {
                  const section = indexPath.section;
                  const row = indexPath.row;
                  $console.info(_data);
                  switch (section) {
                    case 0:
                      $this.initModWithCore(coreModList[row]);
                      break;
                    case 1:
                      $this.initMod(pinModList[row]);
                      break;
                    case 2:
                      $this.initMod(otherModList[row]);
                      break;
                  }
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
              handler: function () {}
            }
          ]
        });
      }
    } else {
      $ui.error("返回错误列表");
    }
  }
}
const pref_cache_list = {
    "mod.bilibili.access_key": "MOD_BILIBILI_ACCESS_KEY",
    "mod.bilibili.uid": "MOD_BILIBILI_UID",
    "mod.bilibili.cookies": "MOD_BILIBILI_COOKIES",
    "mod.acfun.auth.login.id": "MOD_ACFUN_LOGIN_ID",
    "mod.acfun.auth.login.password": "MOD_ACFUN_LOGIN_PASSWORD",
    "mod.acfun.auth.acpasstoken": "MOD_ACFUN_AUTH_ACPASSTOKEN",
    "mod.acfun.auth.acsecurity": "MOD_ACFUN_AUTH_ACSECURITY",
    "mod.acfun.auth.token": "MOD_ACFUN_AUTH_TOKEN",
    "mod.acfun.auth.access_token": "MOD_ACFUN_AUTH_ACCESSTOKEN",
    "mod.acfun.auth.username": "MOD_ACFUN_AUTH_USERNAME",
    "mod.acfun.auth.uid": "MOD_ACFUN_AUTH_UID"
  },
  initPrefs = () => {
    initPrefByList(pref_cache_list);
  },
  initPrefByList = _list => {
    Object.keys(_list).map(_k => {
      $prefs.set(_k, $cache.get(_list[_k]) || "");
    });
  },
  updatePrefs = () => {
    updatePrefByList(pref_cache_list);
  },
  updatePrefByList = _list => {
    Object.keys(_list).map(_k => {
      $cache.set(_list[_k], $prefs.get(_k) || "");
    });
  },
  modules = {
    acfun: {
      filePath: "./mod/acfun",
      action: "init",
      param: undefined
    },
    bilibili: {
      filePath: "./mod/bilibili",
      action: "init",
      param: undefined
    },
    config: {
      filePath: "./mod/config",
      action: "init"
    },
    dailyCheckin: {
      filePath: "./mod/dailyCheckin"
    }
  },
  loadModule = moduleId => {
    const moduleInfo = modules[moduleId];
    require(moduleInfo.filePath)[moduleInfo.action || "init"]();
  },
  openSettingPage = () => {
    initPrefs();
    $prefs.open(() => {
      updatePrefs();
    });
  },
  initModLoader = () => {
    try {
      const _ModLoader = new ModLoader("/scripts/mod/");
      _ModLoader.showModList();
    } catch (_error) {
      $console.error(_error);
      $ui.error("ModLoader:init failed");
    }
  };

module.exports = {
  initPrefs,
  updatePrefs,
  pref_cache_list,
  ModLoader: ModLoader,
  setting: openSettingPage,
  mod: initModLoader,
  modules,
  loadModule
};
