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
}

module.exports = Mod;
