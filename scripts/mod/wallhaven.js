const Core = require("../core"),
  MOD_NAME = "Wallhaven",
  MOD_VERSION = 1,
  MOD_AUTHOR = "zhihaofans",
  NEED_DATABASE = true,
  DATABASE_ID = "wallhaven",
  NEED_CORE_VERSION = 1;
class Wallhaven extends Core {
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
  run() {
    const ver = this.checkCoreVersion();
    if (ver === 0) {
      this.initView();
      return new this.Result({
        success: true,
        code: 0
      });
    } else {
      return new this.Result({
        success: false,
        code: 1,
        error_message: `need update core.js(${ver})`
      });
    }
  }
  initView() {
    try {
      $ui.menu({
        items: ["随机"],
        handler: function (title, idx) {
          switch (idx) {
            case 0:
              // animeRandom();
              break;
          }
        }
      });
    } catch (_ERROR) {
      $console.error(_ERROR);
      $ui.alert({
        title: "wallhaven.init",
        message: _ERROR.message
      });
      $ui.loading(false);
    }
  }
  async animeRandom() {
    $ui.loading(true);
    const query = `id%3A5type:png`,
      sorting = `random`,
      randomSeed = this.getSql("nextseed") || `XekqJ6`,
      page = 1,
      purity = "111",
      categories = "010",
      api_key = this.getSql("api_key") || "",
      url = `https://wallhaven.cc/api/v1/search?q=${query}&sorting=${sorting}&seed=${randomSeed}&page=${page}&purity=${purity}&categories=${categories}&apikey=${api_key}`,
      httpResult = await this.HttpLib.getAwait(url);
    if (httpResult.error) {
      $console.error(httpResult.error);
      $ui.loading(false);
      $ui.alert({
        title: "misc.wallhaven.error",
        message: httpResult.error.message
      });
    }
  }
}
module.exports = Wallhaven;
