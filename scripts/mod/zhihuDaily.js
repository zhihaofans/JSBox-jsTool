const Core = require("../core").Core,
  Result = require("../core").Result,
  MOD_NAME = "知乎日报",
  MOD_VERSION = 1,
  MOD_AUTHOR = "zhihaofans",
  NEED_DATABASE = false,
  DATABASE_ID = "zhihudaily",
  NEED_CORE_VERSION = 1;
class ZhihuDaily extends Core {
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

const run = () => {
  const _zhihuDaily = new ZhihuDaily();
  const ver = _zhihuDaily.checkCoreVersion();
  if (ver === 0) {
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
};

module.exports = { run };
