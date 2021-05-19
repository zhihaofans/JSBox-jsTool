const CORE_VERSION = 1,
  SQLITE_FILE = "/assets/.files/mods.db";
class Core {
  constructor({
    name,
    version,
    author,
    need_database,
    database_id,
    need_core_version
  }) {
    this.MOD_NAME = name ?? "core";
    this.MOD_VERSION = version ?? 1;
    this.MOD_AUTHOR = author ?? "zhihaofans";
    this.NEED_DATABASE = need_database ?? false;
    this.DATABASE_ID = need_database ? database_id : "core";
    this.NEED_CORE_VERSION = need_core_version ?? 0;
    this.SQLITE = this.initSQLite();
  }
  checkCoreVersion() {
    if (CORE_VERSION == this.NEED_CORE_VERSION) {
      return 0;
    }
    if (CORE_VERSION > this.NEED_CORE_VERSION) {
      return -1;
    }

    if (CORE_VERSION < this.NEED_CORE_VERSION) {
      return 1;
    }
  }
  async httpRequest({ method, url, header, body }) {
    return await $http.request({
      method: method,
      url: url,
      header: header,
      body: body
    });
  }
  parseData(_data) {}
  initSQLite() {
    const DataBase = require("DataBase"),
      SQLite = new DataBase.SQLite(SQLITE_FILE);
    SQLite.createSimpleTable(this.DATABASE_ID);
    return SQLite;
  }
}

module.exports = Core;
