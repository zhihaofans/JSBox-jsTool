const Lib = require("./lib");
class Mod {
  constructor(mod, database_file = undefined) {
    this.MOD_ID = mod;
    this.MOD_DATABASE_FILE = database_file || "/assets/.files/mods.db";
  }
  getModKey(key) {
    return `mod.${this.MOD_ID}.${key}`;
  }
  getPref(key) {
    const Prefs = new Lib.Prefs(this.getModKey(key));
    return Prefs.get();
  }
  setPref(key, value) {
    const Prefs = new Lib.Prefs(this.getModKey(key));
    Prefs.set(value);
    return Prefs.get() === value;
  }
  getSql(key) {
    const SQLite = new Lib.SQLite(this.MOD_DATABASE_FILE);
    return SQLite.getSimpleData(this.MOD_ID, key);
  }
  setSql(key, value) {
    const SQLite = new Lib.SQLite(this.MOD_DATABASE_FILE);
    return SQLite.setSimpleData(this.MOD_ID, key, value);
  }
}

module.exports = Mod;
