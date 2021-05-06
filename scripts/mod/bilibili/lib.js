const Database = require("./data_base"),
  SQLite = Database.SQLite,
  _http = require("../../libs/http"),
  Auth = {
    getAccesskey: SQLite.getAccessKey,
    getCookies: SQLite.getCookies,
    setAccesskey: SQLite.setAccessKey,
    setCookies: SQLite.setCookies,
    getUid: SQLite.getUid,
    setUid: SQLite.setUid
  },
  Http = {
    get: _http.getAwait,
    post: _http.postAwait
  };
module.exports = {
  Auth,
  Http
};
