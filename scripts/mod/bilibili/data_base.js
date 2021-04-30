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
    getAccessKey: handler => {
      const db = $sqlite.open("/assets/mods.db");
      db.query("SELECT value FROM bilibili where id = 'access_key'", handler);
      db.query("SELECT * FROM User", (rs, err) => {
        while (rs.next()) {
          const values = rs.values;
          const name = rs.get("name"); // Or rs.get(0);
        }
        rs.close();
      });
      db.close();
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
