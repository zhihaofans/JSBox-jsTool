const init = require("./init"),
  siteListL10n = ["ACFUN", "BILIBILI", "一键签到"],
  moreListL10n = ["MOD", "SETTING"],
  getNavButton = () => {
    return [
      {
        title: $l10n("MENU"),
        icon: "067", // Or you can use icon name
        handler: () => {
          $ui.success("Hi~");
        }
      }
    ];
  },
  loadMainView = () => {
    $ui.render({
      props: {
        id: "main",
        homeIndicatorHidden: false,
        modalPresentationStyle: 0,
        navButtons: getNavButton()
      },
      views: [
        {
          type: "list",
          props: {
            data: [
              {
                title: $l10n("SITE"),
                rows: siteListL10n.map(x => $l10n(x))
              },
              {
                title: $l10n("更多"),
                rows: moreListL10n.map(x => $l10n(x))
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
                      init.loadModule("acfun");
                      break;
                    case 1:
                      init.loadModule("bilibili");
                      break;
                    case 2:
                      init.loadModule("dailyCheckin");
                      break;
                    default:
                      $ui.error("错误选项");
                  }
                  break;
                case 1:
                  switch (indexPath.row) {
                    case 0:
                      init.mod();
                      break;
                    case 1:
                      init.loadModule("config");
                      break;
                    default:
                      $ui.error("错误选项");
                  }
                  break;
                default:
                  $ui.error("错误选项");
              }
            }
          }
        }
      ],
      events: {
        appeared: function () {
          $app.tips("右上角的按钮是更新按钮，摇一摇设备也可以触发检测更新");
        },
        shakeDetected: function () {
          //摇一摇
        }
      }
    });
  };
module.exports = {
  loadMainView
};
