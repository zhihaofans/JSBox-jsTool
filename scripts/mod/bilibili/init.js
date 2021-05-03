let _User = require("./user"),
  _CheckIn = require("./check_in"),
  _Comic = require("./comic"),
  _Live = require("./live"),
  init = () => {
    $ui.push({
      props: {
        title: "Bilibili Mod ver"
      },
      views: [
        {
          type: "list",
          props: {
            data: [
              {
                title: "Bilibili",
                rows: [
                  "设置Access Key",
                  "签到",
                  "获取个人信息",
                  "刷新Access key",
                  "获取饼干",
                  "漫画剩余券",
                  "下载漫画",
                  "稍后再看",
                  "我关注的直播",
                  "查看共同关注"
                ]
              }
            ]
          },
          layout: $layout.fill,
          events: {
            didSelect: function (_sender, indexPath, _data) {
              switch (indexPath.section) {
                case 0:
                  switch (indexPath.row) {
                    case 0:
                      _User.View.updateAccessKey();
                      break;
                    case 1:
                      _CheckIn.initView();
                      break;
                    case 2:
                      // _User.View.getMyInfo();
                      $ui.error("skip");
                      break;
                    case 3:
                      _User.View.refreshToken();
                      break;
                    case 4:
                      _User.View.getCookiesByAccessKey();
                      break;
                    case 5:
                      _Comic.View.showTicketStatesList();
                      break;
                    case 6:
                      _Comic.View.getComicDetail();
                      break;
                    case 7:
                      _User.View.getLaterToWatch();
                      break;
                    case 8:
                      _Live.View.myFollow();
                      break;
                    case 9:
                      _User.View.getSameFollow();
                      break;
                  }
                  break;
              }
            }
          }
        }
      ]
    });
  };
module.exports = {
  init
};
