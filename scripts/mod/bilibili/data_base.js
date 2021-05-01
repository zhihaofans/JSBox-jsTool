const Cache = {
    ACCESS_KEY: "MOD_BILIBILI_ACCESS_KEY",
    UID: "MOD_BILIBILI_UID",
    COOKIES: "MOD_BILIBILI_COOKIES",
    accessKey: (access_key = undefined) => {
      if (access_key) {
        $cache.set(Cache.ACCESS_KEY, access_key);
      }
      return $cache.get(Cache.ACCESS_KEY);
    },
    uid: (uid = undefined) => {
      if (uid) {
        $cache.set(Cache.UID, uid);
      }
      return $cache.get(Cache.UID);
    },
    cookies: (cookies = undefined) => {
      if (cookies) {
        $cache.set(Cache.COOKIES, cookies);
      }
      return $cache.get(Cache.COOKIES) || undefined;
    }
  },
  SQLite = {
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
          sql = `CREATE TABLE IF NOT EXISTS bilibili(id TEXT PRIMARY KEY NOT NULL, value TEXT)`;
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
        sql = "SELECT * FROM bilibili WHERE id = ?",
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
            ? "UPDATE bilibili SET value=? WHERE id=?"
            : "INSERT INTO bilibili (value,id) VALUES (?, ?)";

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
    getAccessKey: () => {
      return SQLite.getData("access_key");
    },
    setAccessKey: access_key => {
      SQLite.createTable();
      if (access_key) {
        const db = SQLite.init(),
          sql = SQLite.getAccessKey()
            ? "UPDATE bilibili SET value=? WHERE id=?"
            : "INSERT INTO bilibili (value,id) VALUES (?, ?)";

        const update_result = db.update({
          sql: sql,
          args: [access_key, "access_key"]
        });
        db.close();
        return update_result.result || false;
      } else {
        return false;
      }
    },
    setUid: uid => {
      SQLite.createTable();
      if (uid) {
        const sql = SQLite.getUid()
          ? "UPDATE bilibili SET value=? WHERE id=?"
          : "INSERT INTO bilibili (value,id) VALUES (?, ?)";
        const update_result = SQLite.update(sql, [uid, "uid"]);
        return update_result.result || false;
      } else {
        return false;
      }
    },
    getUid: () => {
      return SQLite.getData("uid");
    },
    setCookies: cookies => {
      return SQLite.setData("cookies", cookies);
    },
    getCookies: () => {
      return SQLite.getData("cookies");
    }
  };
module.exports = {
  Cache,
  SQLite
};
