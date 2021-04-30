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
      return $sqlite.open("/assets/mods.db");
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
      const db = $sqlite.open("/assets/mods.db"),
        sql = `CREATE TABLE IF NOT EXISTS bilibili(id TEXT PRIMARY KEY NOT NULL, value TEXT)`;
      db.update(sql);
      db.close();
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
    getAccessKey: () => {
      const db = $sqlite.open("/assets/mods.db"),
        result = db.query("SELECT * FROM bilibili WHERE id = 'access_key'"),
        sql_data = SQLite.parse(result);
      return sql_data.length == 1 ? sql_data[0].value : undefined;
    },
    setAccessKey: access_key => {
      $console.info(access_key);
      const db = $sqlite.open("/assets/mods.db");
      db.update({
        sql: "INSERT INTO bilibili (id,value) VALUES ('access_key', '?')",
        args: [access_key]
      });
    }
  };
module.exports = {
  Cache,
  SQLite
};
