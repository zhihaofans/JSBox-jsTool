const SQLite = {
  init: () => {
    return $sqlite.open("/assets/.files/mods.db");
  },
  update: (sql, args) => {
    const db = SQLite.init();
    db.update({
      sql: sql,
      args: args
    });
    db.close();
  },
  createTable: () => {
    try {
      const db = SQLite.init(),
        sql = `CREATE TABLE IF NOT EXISTS acfun(id TEXT PRIMARY KEY NOT NULL, value TEXT)`;
      db.update(sql);
      db.close();
    } catch (_ERROR) {
      $console.error(_ERROR);
    }
  },
  parse: result => {
    if (result.error !== null) {
      $console.error(result.error);
      return undefined;
    }
    const data = [];
    while (result.result.next()) {
      data.push({
        id: result.result.get("id"),
        value: result.result.get("value")
      });
    }
    result.result.close();
    return data;
  },
  getData: key => {
    SQLite.createTable();
    const db = SQLite.init(),
      sql = "SELECT * FROM acfun WHERE id = ?",
      args = [key],
      result = db.query({
        sql: sql,
        args: args
      }),
      sql_data = SQLite.parse(result);
    return sql_data.length == 1 ? sql_data[0].value : undefined;
  },
  setData: (key, value) => {
    SQLite.createTable();
    if (key) {
      const db = SQLite.init(),
        sql = SQLite.getData(key)
          ? "UPDATE acfun SET value=? WHERE id=?"
          : "INSERT INTO acfun (value,id) VALUES (?, ?)";

      const update_result = db.update({
        sql: sql,
        args: [value, key]
      });
      db.close();
      return update_result.result || false;
    } else {
      return false;
    }
  },
  acSecurity: (value = undefined) => {
    const sql_key = "acSecurity";
    SQLite.createTable();
    if (value) {
      SQLite.setData(sql_key, value);
    }
    return SQLite.getData(sql_key) || undefined;
  },
  acPassToken: (value = undefined) => {
    const sql_key = "acPassToken";
    SQLite.createTable();
    if (value) {
      SQLite.setData(sql_key, value);
    }
    return SQLite.getData(sql_key) || undefined;
  },
  token: (value = undefined) => {
    const sql_key = "token";
    SQLite.createTable();
    if (value) {
      SQLite.setData(sql_key, value);
    }
    return SQLite.getData(sql_key) || undefined;
  },
  access_token: (value = undefined) => {
    const sql_key = "access_token";
    SQLite.createTable();
    if (value) {
      SQLite.setData(sql_key, value);
    }
    return SQLite.getData(sql_key) || undefined;
  },
  username: (value = undefined) => {
    const sql_key = "username";
    SQLite.createTable();
    if (value) {
      SQLite.setData(sql_key, value);
    }
    return SQLite.getData(sql_key) || undefined;
  }
};
