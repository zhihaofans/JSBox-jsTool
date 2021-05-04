const $$ = require("$$"),
  httpLib = require("../libs/http"),
  Config = require("./config/mod"),
  ModConfig = new Config("wallhaven"),
  init = () => {
    try {
      $ui.menu({
        items: ["随机"],
        handler: function (title, idx) {
          switch (idx) {
            case 0:
              animeRandom();
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
  },
  animeRandom = async () => {
    $ui.loading(true);
    const next_seed_id = "nextseed",
      query = `id%3A5type:png`,
      sorting = `random`,
      randomSeed = ModConfig.getSql(next_seed_id) || `XekqJ6`,
      page = 1,
      purity = "111",
      categories = "010",
      api_key = ModConfig.getSql("api_key") || "",
      url = `https://wallhaven.cc/api/v1/search?q=${query}&sorting=${sorting}&seed=${randomSeed}&page=${page}&purity=${purity}&categories=${categories}&apikey=${api_key}`,
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
            title: apiMeta.query.tag,
            navButtons: [
              {
                title: "api_key",
                symbol: "person", // SF symbols are supported
                handler: sender => {
                  const api_key = ModConfig.getSql("api_key");
                  $input.text({
                    type: $kbType.text,
                    placeholder: "api_key",
                    text: api_key,
                    handler: function (input) {
                      if (input) {
                        ModConfig.setSql("api_key", input);
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
