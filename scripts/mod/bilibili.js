const coreFile = require("../core"),
  Core = new coreFile.Core(),
  Result = require("../core").Result,
  MOD_NAME = "Bilibili",
  MOD_VERSION = 1,
  MOD_AUTHOR = "zhihaofans",
  NEED_DATABASE = true,
  DATABASE_ID = "bilibili",
  NEED_CORE_VERSION = 1;
class Bilibili extends Core {
  constructor() {
    super({
      title: MOD_NAME,
      version: MOD_VERSION,
      author: MOD_AUTHOR,
      need_database: NEED_DATABASE,
      database_id: DATABASE_ID,
      need_core_version: NEED_CORE_VERSION
    });
  }
}
module.exports = {
  init: require("./bilibili/init").init,
  _SUPPORT_COREJS_: 0,
  run: () => {
    const _wallhaven = new Wallhaven();
    const ver = _wallhaven.checkCoreVersion();
    if (ver === 0) {
      _wallhaven.initView();
      return new Result({
        success: true,
        code: 0
      });
    } else {
      return new Result({
        success: false,
        code: 1,
        error_message: `need update core.js(${ver})`
      });
    }
  }
};
