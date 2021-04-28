class SQLite {
  constructor(date_base) {
    this.DATE_BASE_ID = date_base;
    this.DB = $sqlite.open(this.DATE_BASE_ID);
  }
  open(NEW_DATE_BASE_ID = undefined) {
    if (NEW_DATE_BASE_ID) {
      this.DATE_BASE_ID = NEW_DATE_BASE_ID;
    }
    this.DB = $sqlite.open(this.DATE_BASE_ID);
  }
  close() {
    try {
      this.DB.close();
    } catch (_ERROR) {
      $console.error(_ERROR);
      $sqlite.close(this.DB);
    }
    this.DB = undefined;
  }
  update(sql) {
    try {
      return this.DB.update(sql);
    } catch (_ERROR) {
      $console.error(_ERROR);
    }
    return undefined;
  }
  updateByArgList(sql, argList) {
    this.DB.update({
      sql: sql,
      args: argList
    });
    try {
      return this.DB.update(sql);
    } catch (_ERROR) {
      $console.error(_ERROR);
    }
    return undefined;
  }
  createTableByStr(table_id, args) {
    this.update(`CREATE TABLE ${table_id}(${args})`);
  }
  createTableByList(table_id, args) {
    const demo = [{ key: "arg_id", value: "" }];
    this.update(`CREATE TABLE ${table_id}(${args})`);
  }
}

module.exports = { SQLite };
