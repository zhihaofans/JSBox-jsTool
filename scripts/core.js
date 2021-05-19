const CORE_VERSION = 1,
  SQLITE_FILE = "/assets/.files/mods.db";
class Core {
  constructor(
    mod_name,
    version,
    author,
    need_database,
    database_id,
    need_core_version
  ) {
    this.MOD_NAME = mod_name ?? "core";
    this.MOD_VERSION = version ?? 1;
    this.MOD_AUTHOR = author ?? "zhihaofans";
    this.NEED_DATABASE = need_database ?? false;
    this.DATABASE_ID = need_database ? database_id : undefined;
    this.NEED_CORE_VERSION = need_core_version ?? 0;
    this.SQLITE = this.initSQLite();
    this.$$ = require("$$");
    this.$_ = require("$_");
    this.HttpLib = new this.$_.Http();
    this.Result = Result;
  }
  run() {
    $console.info("Core: run");
    return;
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
    const DataBase = require("DataBase"),
      SQLite = new DataBase.SQLite(SQLITE_FILE);
    SQLite.createSimpleTable(this.DATABASE_ID);
    return SQLite;
  }
  getSql(key) {
    return this.SQLITE.getSimpleData(this.DATABASE_ID, key);
  }
  setSql(key, value) {
    return this.SQLITE.setSimpleData(this.DATABASE_ID, key, value);
  }
  async getAwait(url, header) {
    const result = await $http.get({
      url: url,
      timeout: this.TIMEOUT,
      header: header
    });
    return url ? result : undefined;
  }
  async postAwait(url, postBody, header = undefined) {
    const result = await $http.post({
      url: url,
      header: header,
      timeout: this.TIMEOUT,
      body: postBody
    });
    return url ? result : undefined;
  }
}
class Result {
  constructor({ success, code, data, error_message }) {
    this.success = success ?? false;
    this.data = data;
    this.code = code ?? -1;
    this.error = success ? undefined : error_message;
  }
}
module.exports = Core;
