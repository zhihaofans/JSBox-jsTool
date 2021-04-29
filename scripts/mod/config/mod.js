const Lib = require("./lib");
class Mod {
  constructor(mod) {
    this.MOD_ID = mod;
    this.MOD_DATABASE_ID = "MOD_DATABASE";
  }
  getConfig(key) {
    const Cache = new Lib.Cache(`mod.${this.MOD_ID}.${key}`);
    return Cache.get();
  }
  setConfig(key, value) {
    const Cache = new Lib.Cache(`mod.${this.MOD_ID}.${key}`);
    return Cache.set(value);
  }
  getSQL() {
    const SQLite = new Lib.SQLite(this.MOD_DATABASE_ID);
    //`mod.${this.MOD_ID}.${key}`
  }
}

module.exports = Mod;
