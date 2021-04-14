const httpLib = require("/scripts/libs/http"),
  $$ = require("$$"),
  mainList = ["66mz8/phoneWallpaper", "neeemooo", "wallhaven"],
  initListView = () => {
    $ui.push({
      props: {
        title: "杂烩"
      },
      views: [
        {
          type: "list",
          props: {
            data: mainList
          },
          layout: $layout.fill,
          events: {
            didSelect: function (_sender, indexPath, _data) {
              switch (_data) {
                case "66mz8/phoneWallpaper":
                  api66mz8_PhoneWallpaper();
                  break;
                case "neeemooo":
                  neeemooo();
                  break;
                case "wallhaven":
                  wallhaven();
                  break;
                default:
                  $ui.toast("暂不支持该功能，请等待更新");
              }
            }
          }
        }
      ]
    });
  },
  api66mz8_PhoneWallpaper = () => {
    $ui.preview({
      title: "66mz8/phoneWallpaper",
      url: "https://api.66mz8.com/api/rand.img.php?type=%E5%A3%81%E7%BA%B8"
    });
  },
  neeemooo = () => {
    const images = [
        "不想努力了.png",
        "别骂了别骂了.png",
        "发呆.png",
        "吃瘪.png",
        "嚣张.png",
        "天才.png",
        "彩色的希望.png",
        "早上好.png",
        "星星眼.png",
        "晚上好.png",
        "生气.png",
        "疑惑.png",
        "病娇.png",
        "睡觉.png",
        "砸电脑.png",
        "线上对喷，带我一个！.png",
        "问好.png",
        "震撼鸟神.png",
        "鸟神的赐福.png"
      ],
      fileName = images[Math.floor(Math.random() * 18)],
      url = "https://neeemooo.com/hanon/" + encodeURI(fileName);
    $console.info(url);
    $ui.preview({
      title: fileName,
      url: url
    });
  },
  wallhaven = async () => {
    $ui.loading(true);
    const cacheId = "mod.misc.wallhaven.next_seed",
      query = `id%3A5type:png`,
      sorting = `random`,
      randomSeed = $cache.get(cacheId) || `XekqJ6`,
      page = 1,
      url = `https://wallhaven.cc/api/v1/search?q=${query}&sorting=${sorting}&seed=${randomSeed}&page=${page}`,
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
      $cache.set(cacheId, nextRandomSeed || randomSeed);
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
module.exports = {
  init: initListView
};
