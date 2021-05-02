class SQLite {
  constructor(_dataBaseFile) {
    this.DATABASEFILE = _dataBaseFile;
  }
  init() {
    return $sqlite.open(this.DATABASEFILE);
  }
  update(sql, args = undefined) {
    this.createSimpleTable();
    const db = this.init();
    db.update(
      args
        ? sql
        : {
            sql: sql,
            args: args
          }
    );
    db.close();
  }
  createSimpleTable(table_id) {
    if (table_id) {
      try {
        const db = this.init(),
          sql = `CREATE TABLE IF NOT EXISTS ?(id TEXT PRIMARY KEY NOT NULL, value TEXT)`,
          args = [table_id];
        db.update(sql, args);
        db.close();
      } catch (_ERROR) {
        $console.error(_ERROR);
      }
    } else {
      $console.error("createSimpleTable:table_id = undefined");
    }
  }
  parseSimpleQuery(result) {
    if (result) {
      if (result.error !== null) {
        $console.error(result.error);
        return undefined;
      }
      const sqlResult = result.result,
        data = [];
      while (sqlResult.next()) {
        data.push({
          id: sqlResult.get("id"),
          value: sqlResult.get("value")
        });
      }
      sqlResult.close();
      return data;
    } else {
      return undefined;
    }
  }
  getSimpleData(table, key) {
    this.createSimpleTable(table);
    const db = this.init(),
      sql = "SELECT * FROM ? WHERE id = ?",
      args = [table, key],
      result = db.query({
        sql: sql,
        args: args
      }),
      sql_data = this.parseSimpleQuery(result);
    return sql_data.length == 1 ? sql_data[0].value : undefined;
  }
  setSimpleData(table, key, value) {
    this.createSimpleTable(table);
    if (key) {
      const db = this.init(),
        sql = this.getSimpleData(table, key)
          ? "UPDATE ? SET value=? WHERE id=?"
          : "INSERT INTO ? (value,id) VALUES (?, ?)",
        update_result = db.update({
          sql: sql,
          args: [table, value, key]
        });
      db.close();
      return update_result.result || false;
    } else {
      return false;
    }
  }
  auto(table, sql_key, value = undefined) {
    if (!sql_key) {
      return undefined;
    }
    try {
      if (value) {
        $console.warn(`${sql_key}:${value.toString()}`);
        this.setSimpleData(table, sql_key, value.toString());
      }
      return this.getSimpleData(table, sql_key) || undefined;
    } catch (_ERROR) {
      $console.error(_ERROR);
      return undefined;
    }
  }
}
module.exports = {
  SQLite
};
