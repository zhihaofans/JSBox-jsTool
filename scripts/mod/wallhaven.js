const $$ = require("$$"),
  httpLib = require("../libs/http"),
  Config = require("./config/mod"),
  ModConfig = new Config("wallhaven"),
  init = () => {
    try {
      animeRandomAll();
    } catch (_ERROR) {
      $console.error(_ERROR);
      $ui.alert({
        title: "wallhaven.init",
        message: _ERROR.message
      });
      $ui.loading(false);
    }
  },
  animeRandomAll = () => {
    const api_key = ModConfig.getSql("api_key");
    $input.text({
      type: $kbType.text,
      placeholder: "",
      text: api_key,
      handler: function (input) {
        if (input) {
          ModConfig.setSql("api_key", input);
        }
        animeRandom(input);
      }
    });
  },
  animeRandom = async (api_key = undefined) => {
    $ui.loading(true);
    const next_seed_id = "nextseed",
      query = `id%3A5type:png`,
      sorting = `random`,
      randomSeed = ModConfig.getSql(next_seed_id) || `XekqJ6`,
      page = 1,
      purity = "111",
      url = `https://wallhaven.cc/api/v1/search?q=${query}&sorting=${sorting}&seed=${randomSeed}&page=${page}&purity=${purity}&apikey=${api_key}`,
      httpResult = await httpLib.getAwait(url);
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
      ModConfig.setSql(next_seed_id, nextRandomSeed || randomSeed);
      $ui.loading(false);
      if (apiData && apiMeta) {
        $ui.push({
          props: {
            title: apiMeta.query.tag
          },
          views: [
            {
              type: "list",
              props: {
                data: apiData.map(
                  item => `${item.category} | ${item.purity} | ${item.id}`
                )
              },
              layout: $layout.fill,
              events: {
                didSelect: function (_sender, indexPath, _data) {
                  $$.Image.single.showImageMenu(apiData[indexPath.row].path);
                }
              }
            }
          ]
        });
      } else {
        $console.error(`misc.wallhaven:(${httpData.code})${httpData.message}`);
      }
    }
  };

module.exports = { init };
