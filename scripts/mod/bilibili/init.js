const _User = require("./user"),
  _CheckIn = require("./check_in"),
  _Comic = require("./comic"),
  comicTicket = require("./comic/ticket"),
  _Live = require("./live/view"),
  init = () => {
    $ui.push({
      props: {
        title: "Bilibili"
      },
      views: [
        {
          type: "list",
          props: {
            data: [
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
          },
          layout: $layout.fill,
          events: {
            didSelect: function (_sender, indexPath, _data) {
              switch (indexPath.row) {
                case 0:
                  _User.View.updateAccessKey();
                  break;
                case 1:
                  _CheckIn.initView();
                  break;
                case 3:
                  _User.View.refreshToken();
                  break;
                case 4:
                  _User.View.getCookiesByAccessKey();
                  break;
                case 5:
                  comicTicket.showTicketStatesList();
                  break;
                case 6:
                  _Comic.View.getComicDetail();
                  break;
                case 7:
                  _User.View.getLaterToWatch();
                  break;
                case 8:
                  _Live.followLiver();
                  break;
                case 9:
                  _User.View.getSameFollow();
                  break;
                default:
                  $ui.error("skip");
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
