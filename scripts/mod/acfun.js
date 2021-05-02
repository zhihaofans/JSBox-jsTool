let $User = require("./acfun/user"),
  init = () => {
    $ui.push({
      props: {
        title: "Acfun"
      },
      views: [
        {
          type: "list",
          props: {
            data: [
              {
                title: "Acfun",
                rows: ["登录", "签到", "同步数据库"]
              }
            ]
          },
          layout: $layout.fill,
          events: {
            didSelect: function (_sender, indexPath, _data) {
              switch (indexPath.row) {
                case 0:
                  $User.Auth.loginBySetting();
                  break;
                case 1:
                  $User.Daily.checkIn();
                  break;
                case 2:
                  $User.Auth.syncDatabase();
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
