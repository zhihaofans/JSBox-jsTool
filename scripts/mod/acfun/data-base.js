const SQLite = {
  init: () => {
    return $sqlite.open("/assets/.files/mods.db");
  },
  update: (sql, args) => {
    SQLite.createTable();
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
          : "INSERT INTO acfun (value,id) VALUES (?, ?)",
        update_result = db.update({
          sql: sql,
          args: [value, key]
        });
      db.close();
      return update_result.result || false;
    } else {
      return false;
    }
  },
  auto: (sql_key, value = undefined) => {
    if (!sql_key) {
      return undefined;
    }
    if (value) {
      $console.warn(`${sql_key}:${value.toString()}`);
      SQLite.setData(sql_key, value.toString());
    }
    return SQLite.getData(sql_key) || undefined;
  },
  acSecurity: (value = undefined) => {
    return SQLite.auto("acSecurity", value);
  },
  acPassToken: (value = undefined) => {
    return SQLite.auto("acPassToken", value);
  },
  token: (value = undefined) => {
    return SQLite.auto("token", value);
  },
  access_token: (value = undefined) => {
    return SQLite.auto("access_token", value);
  },
  username: (value = undefined) => {
    return SQLite.auto("username", value);
  },
  uid: (value = undefined) => {
    return SQLite.auto("uid", value);
  }
};
module.exports = {
  SQLite
};
