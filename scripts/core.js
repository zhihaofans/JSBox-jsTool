const CORE_VERSION = 1,
  SQLITE_FILE = "/assets/.files/mods.db";
class Core {
  constructor({
    mod_name,
    version,
    author,
    need_database,
    database_id,
    need_core_version
  }) {
    this.$$ = require("$$");
    this.$_ = require("$_");
    this.DataBase = require("DataBase");
    this.AppScheme = require("AppScheme");
    this.HttpLib = new this.$_.Http();
    this.MOD_NAME = mod_name ?? "core";
    this.MOD_VERSION = version ?? 1;
    this.MOD_AUTHOR = author ?? "zhihaofans";
    this.NEED_CORE_VERSION = need_core_version ?? 0;
    this.NEED_DATABASE = need_database ?? false;
    this.DATABASE_ID = this.NEED_DATABASE ? database_id : undefined;
    this.SQLITE = this.NEED_DATABASE ? this.initSQLite() : undefined;
  }
  checkCoreVersion() {
    if (CORE_VERSION === this.NEED_CORE_VERSION) {
      return 0;
    }
    if (CORE_VERSION > this.NEED_CORE_VERSION) {
      return -1;
    }

    if (CORE_VERSION < this.NEED_CORE_VERSION) {
      return 1;
    }
  }
  initSQLite() {
    const SQLite = new this.DataBase.SQLite(SQLITE_FILE);
    SQLite.createSimpleTable(this.DATABASE_ID);
    return SQLite;
  }
  getSql(key) {
    return this.SQLITE.getSimpleData(this.DATABASE_ID, key);
  }
  setSql(key, value) {
    return this.SQLITE.setSimpleData(this.DATABASE_ID, key, value);
  }
}
class Result {
  constructor({ success, code, data, error_message }) {
    this.success = success ?? false;
    this.data = data;
    this.code = code ?? -1;
    this.error_message = success ? undefined : error_message;
  }
}
class CoreChecker {
  constructor(mod_dir) {
    this.MOD_DIR = mod_dir;
  }
  runMod(mod) {
    let fileName = `${this.MOD_DIR}${mod.file}`;
    if (!fileName.endsWith(".js")) {
      fileName += ".js";
    }
    if ($file.exists(fileName)) {
      if ($file.isDirectory(fileName)) {
        $ui.error("这是目录");
      } else {
        const coreMod = require(fileName),
          runMod = coreMod.run,
          _SUPPORT_COREJS_ = coreMod._SUPPORT_COREJS_;
        if (typeof runMod === "function" && _SUPPORT_COREJS_ === 1) {
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
          $ui.alert({
            title: `该Mod不支持core.js`,
            message: "是否用旧版加载模式？",
            actions: [
              {
                title: "YES",
                disabled: false, // Optional
                handler: function () {
                  coreMod.init();
                }
              },
              {
                title: "NO",
                disabled: false, // Optional
                handler: function () {}
              }
            ]
          });
        }
      }
    } else {
      $ui.error("不存在该文件");
    }
  }
}
module.exports = {
  Core,
  Result,
  CoreChecker,
  // <Core.js use guide>
  _SUPPORT_COREJS_: 1,
  run: () => {
    const _core = new Core();
    const ver = _core.checkCoreVersion();
    if (ver === 0) {
      _core.initView();
      return new _core.Result({
        success: true,
        code: 0
      });
    } else {
      return new _core.Result({
        success: false,
        code: 1,
        error_message: `need update core.js(${ver})`
      });
    }
  }
};
