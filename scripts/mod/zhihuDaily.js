const CoreJs = require("../core"),
  Core = CoreJs.Core,
  Result = CoreJs.Result,
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
  async init() {
    $ui.loading(true);
    const url = "https://news-at.zhihu.com/api/4/news/latest",
      httpResult = await this.HttpLib.get(url);
    if (httpResult.error) {
      $console.error(httpResult.error);
      $ui.loading(false);
      $ui.alert({
        title: "misc.wallhaven.error",
        message: httpResult.error.message
      });
    } else if (httpResult.data) {
      const zhihu = httpResult.data;
      if (zhihu) {
        const topList = zhihu.top_stories,
          storyList = zhihu.stories,
          topTitle = topList.map(t => t.title),
          storyTitle = storyList.map(s => s.title);
        $ui.loading(false);
        $ui.push({
          props: {
            title: zhihu.date
          },
          views: [
            {
              type: "list",
              props: {
                menu: {
                  title: "菜单",
                  items: [
                    {
                      title: "添到Safari阅读列表",
                      symbol: "book",
                      handler: (sender, indexPath) => {
                        const url =
                          indexPath.section === 0
                            ? topList[indexPath.row].url
                            : storyList[indexPath.row].url;
                        const title =
                          indexPath.section === 0
                            ? topList[indexPath.row].title
                            : storyList[indexPath.row].title;
                        const hint =
                          indexPath.section === 0
                            ? topList[indexPath.row].hint
                            : storyList[indexPath.row].hint;
                        this.AppScheme.Browser.Safari.AddReadingItem(
                          url,
                          title,
                          hint
                        );
                      }
                    },
                    {
                      title: "尝试使用阅读模式打开",
                      symbol: "book.fill",
                      handler: (sender, indexPath) => {
                        const url =
                          indexPath.section === 0
                            ? topList[indexPath.row].url
                            : storyList[indexPath.row].url;
                        this.AppScheme.Browser.Safari.ReadMode(url);
                      }
                    },
                    {
                      title: "使用[简悦 · 阅读器]打开",
                      symbol: "book.circle",
                      handler: (sender, indexPath) => {
                        const url =
                          indexPath.section === 0
                            ? topList[indexPath.row].url
                            : storyList[indexPath.row].url;
                        $clipboard.copy({
                          text: url,
                          ttl: 30,
                          locally: true
                        });
                        $addin.run("简悦 · 阅读器");
                      }
                    }
                  ]
                },
                data: [
                  {
                    title: "置顶",
                    rows: topTitle
                  },
                  {
                    title: "故事",
                    rows: storyTitle
                  }
                ]
              },
              layout: $layout.fill,
              events: {
                didSelect: function (_sender, indexPath, _data) {
                  switch (indexPath.section) {
                    case 0:
                      $ui.preview({
                        title: _data,
                        url: topList[indexPath.row].url
                      });
                      break;
                    case 1:
                      $ui.preview({
                        title: _data,
                        url: storyList[indexPath.row].url
                      });
                      break;
                  }
                }
              }
            }
          ]
        });
      } else {
      }
    } else {
      $ui.loading(false);
      $console.error(`httpResult.data==undefined`);
      $ui.alert({
        title: `ZhihuDaily`,
        message: `httpResult.data==undefined`,
        actions: [
          {
            title: "OK",
            disabled: false, // Optional
            handler: function () {}
          }
        ]
      });
      return;
    }
  }
}

const run = () => {
  const _zhihuDaily = new ZhihuDaily();
  const ver = _zhihuDaily.checkCoreVersion();
  if (ver === 0) {
    _zhihuDaily.init();
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
