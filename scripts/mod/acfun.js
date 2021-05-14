const $User = require("./acfun/user"),
  dialogs = require("../libs/dialogs"),
  init = async () => {
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
                  //                  const result = await dialogs.login("登录", "输入帐号密码");
                  // $console.info(result);
                  $User.Auth.loginByInput();
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
