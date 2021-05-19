const Core = require("../core").Core,
  Result = require("../core").Result,
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
  initView() {
    const SuperThis = this;
    try {
      $ui.menu({
        items: ["随机"],
        handler: function (title, idx) {
          switch (idx) {
            case 0:
              SuperThis.animeRandom();
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
    const SuperThis = this;
    $ui.loading(true);
    const next_seed_id = "nextseed",
      query = `id%3A5type:png`,
      sorting = `random`,
      randomSeed = this.getSql(next_seed_id) || `XekqJ6`,
      page = 1,
      purity = "111",
      categories = "010",
      api_key = this.getSql("api_key") || "",
      url = `https://wallhaven.cc/api/v1/search?q=${query}&sorting=${sorting}&seed=${randomSeed}&page=${page}&purity=${purity}&categories=${categories}&apikey=${api_key}`,
      httpResult = await this.HttpLib.get(url);
    if (httpResult.error) {
      $console.error(httpResult.error);
      $ui.loading(false);
      $ui.alert({
        title: "misc.wallhaven.error",
        message: httpResult.error.message
      });
    } else if (httpResult.data) {
      const httpData = httpResult.data,
        apiData = httpData.data,
        apiMeta = httpData.meta,
        nextRandomSeed = apiMeta.seed;
      $console.info(`nextRandomSeed:${nextRandomSeed}`);
      this.setSql(next_seed_id, nextRandomSeed || randomSeed);
      $ui.loading(false);
      if (apiData && apiMeta) {
        $ui.push({
          props: {
            title: apiMeta.query.tag,
            navButtons: [
              {
                title: "api_key",
                symbol: "person", // SF symbols are supported
                handler: sender => {
                  const api_key = this.getSql("api_key");
                  $input.text({
                    type: $kbType.text,
                    placeholder: "api_key",
                    text: api_key,
                    handler: function (input) {
                      if (input) {
                        SuperThis.setSql("api_key", input);
                      }
                    }
                  });
                }
              }
            ]
          },
          views: [
            {
              type: "list",
              props: {
                menu: {
                  title: "Context Menu",
                  items: [
                    {
                      title: "查看全部",
                      handler: sender => {}
                    }
                  ]
                },
                data: apiData.map(
                  item => `${item.category} | ${item.purity} | ${item.id}`
                )
              },
              layout: $layout.fill,
              events: {
                didSelect: function (_sender, indexPath, _data) {
                  const View = new SuperThis.$_.View();
                  View.Image.showSingleMenu(apiData[indexPath.row].path);
                }
              }
            }
          ]
        });
      } else {
        $ui.loading(false);
        $console.error(`misc.wallhaven:(${httpData.code})${httpData.message}`);
        return;
      }
    } else {
      $ui.loading(false);
      $console.error(`misc.wallhaven:(httpResult.data==undefined`);
      return;
    }
  }
}

module.exports = {
  _SUPPORT_COREJS_: 1,
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
