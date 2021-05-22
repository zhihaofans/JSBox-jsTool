const CoreJs = require("../../Core.js/core"),
  Core = CoreJs.Core,
  Result = CoreJs.Result,
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
  initView(coreFile) {
    require("./bilibili/init").init(coreFile);
  }
}
module.exports = {
  init: require("./bilibili/init").init,
  _SUPPORT_COREJS_: 1,
  run: () => {
    const _mod = new Bilibili();
    const ver = _mod.checkCoreVersion();
    if (ver === 0) {
      _mod.initView(CoreJs);
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
