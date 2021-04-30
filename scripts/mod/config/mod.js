const Lib = require("./lib");
class Mod {
  constructor(mod) {
    this.MOD_ID = mod;
    this.MOD_DATABASE_ID = "MOD_DATABASE";
  }
  getCache(key) {
    const Cache = new Lib.Cache(`MOD_${this.MOD_ID}_${key}`.toUpperCase());
    return Cache.get();
  }
  setCache(key, value) {
    const Cache = new Lib.Cache(`MOD_${this.MOD_ID}_${key}`.toUpperCase());
    return Cache.set(value);
  }
  getPref(key) {
    const Prefs = new Lib.Prefs(`mod.${this.MOD_ID}.${key}`);
    return Prefs.get();
  }
  setPref(key, value) {
    const Prefs = new Lib.Prefs(`mod.${this.MOD_ID}.${key}`);
    return Prefs.set(value);
  }
}

module.exports = Mod;
