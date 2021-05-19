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
// <Core.js use guide>
const _SUPPORT_COREJS_ = 1,
  run = () => {
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
  };
module.exports = { Core, Result, _SUPPORT_COREJS_, run };
