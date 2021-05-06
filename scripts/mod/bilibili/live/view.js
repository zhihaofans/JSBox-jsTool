const Liver = require("./liver"),
  $$ = require("$$"),
  BiliScheme = require("AppScheme").Video.Bilibili,
  followLiver = () => {
    $ui.loading(true);
    $ui.menu({
      items: ["在播", "未播"],
      handler: function (title, idx) {
        switch (idx) {
          case 0:
            try {
              showOnlineFollower();
            } catch (error) {
              $ui.loading(false);
              $console.error(error);
              $ui.alert({
                title: "发生意外错误",
                message: error.message
              });
            }
            break;
          case 1:
            try {
              showOfflineFollower();
            } catch (error) {
              $ui.loading(false);
              $console.error(error);
              $ui.alert({
                title: "发生意外错误",
                message: error.message
              });
            }
            break;
          default:
            $ui.loading(false);
        }
      }
    });
  },
  showOnlineFollower = async () => {
    const httpData = await Liver.onlineLiver();
    if (httpData) {
      if (httpData.code === 0) {
        const myFollowData = httpData.data,
          myFollowList = myFollowData.rooms;
        if (myFollowList) {
          if (myFollowData.total_count === 0 || myFollowList.length === 0) {
            $ui.alert({
              title: "在播关注列表为空，请登陆、关注更多主播或者催主播开播",
              message: `showOnlineFollower.count = 0`
            });
            $ui.loading(false);
          } else {
            $ui.loading(false);
            $ui.push({
              props: {
                title: `${myFollowData.total_count}人在播`
              },
              views: [
                {
                  type: "list",
                  props: {
                    data: myFollowList.map(liveRoom => {
                      const official_verify_list = {
                        "-1": "未认证",
                        0: "个人认证",
                        1: "企业认证"
                      };
                      return {
                        title: `@${liveRoom.uname}（${liveRoom.live_tag_name}）`,
                        rows: [
                          liveRoom.title,
                          `直播间id：${liveRoom.roomid}`,
                          `uid：${liveRoom.uid}`,
                          `直播间封面`,
                          `认证：${
                            official_verify_list[
                              new String(liveRoom.official_verify)
                            ] || "[未知]"
                          }`
                        ]
                      };
                    })
                  },
                  layout: $layout.fill,
                  events: {
                    didSelect: function (_sender, indexPath, _data) {
                      const section = indexPath.section,
                        row = indexPath.row,
                        thisRoom = myFollowList[section];
                      switch (row) {
                        case 0:
                          $app.openURL(thisRoom.link);
                          break;
                        case 1:
                          BiliScheme.live(thisRoom.roomid);
                          break;
                        case 2:
                          BiliScheme.space(thisRoom.uid);
                          break;
                        case 3:
                          $$.Image.single.showImageMenu(thisRoom.cover);
                          break;
                      }
                    }
                  }
                }
              ]
            });
          }
        } else {
          $ui.loading(false);
          $console.warn(myFollowData);
          $ui.alert({
            title: "未知错误",
            message: "返回空白数据，请检查网络是否正常"
          });
        }
      } else {
        $ui.loading(false);
        $console.error(httpData);
        $ui.alert({
          title: `错误代码${httpData.code}`,
          message: httpData.message
        });
      }
    } else {
      $ui.loading(false);
      $console.error("返回空白数据，请检查网络是否正常");
      $ui.alert({
        title: "未知错误",
        message: "返回空白数据，请检查网络是否正常"
      });
    }
  },
  showOfflineFollower = async () => {
    const httpData = await Liver.offlineLiver();
    if (httpData) {
      if (httpData.code === 0) {
        const myFollowData = httpData.data,
          myFollowList = myFollowData.rooms;
        if (myFollowList) {
          if (myFollowData.total_count === 0 || myFollowList.length === 0) {
            $ui.alert({
              title: "未播关注列表为空，请登陆、关注更多主播或者催主播下播",
              message: `showOfflineFollower.count = 0`
            });
            $ui.loading(false);
          } else {
            $ui.loading(false);
            $ui.push({
              props: {
                title: `${myFollowData.total_count}人未播`
              },
              views: [
                {
                  type: "list",
                  props: {
                    data: myFollowList.map(liveRoom => {
                      const official_verify_list = {
                        "-1": "未认证",
                        0: "个人认证",
                        1: "企业认证"
                      };
                      return {
                        title: `@${liveRoom.uname}`,
                        rows: [
                          `${liveRoom.live_desc} 播了`,
                          `直播间id：${liveRoom.roomid}`,
                          `uid：${liveRoom.uid}`,
                          `个人头像`,
                          `认证：${
                            official_verify_list[
                              new String(liveRoom.official_verify)
                            ] || "[未知]"
                          }`
                        ]
                      };
                    })
                  },
                  layout: $layout.fill,
                  events: {
                    didSelect: function (_sender, indexPath, _data) {
                      const section = indexPath.section,
                        row = indexPath.row,
                        thisRoom = myFollowList[section];
                      switch (row) {
                        case 0:
                          $app.openURL(thisRoom.link);
                          break;
                        case 1:
                          BiliScheme.live(thisRoom.roomid);
                          break;
                        case 2:
                          BiliScheme.space(thisRoom.uid);
                          break;
                        case 3:
                          $$.Image.single.showImageMenu(thisRoom.face);
                          break;
                      }
                    }
                  }
                }
              ]
            });
          }
        } else {
          $ui.loading(false);
          $console.warn(myFollowData);
          $ui.alert({
            title: "未知错误",
            message: "返回空白数据，请检查网络是否正常"
          });
        }
      } else {
        $ui.loading(false);
        $console.error(httpData);
        $ui.alert({
          title: `错误代码${httpData.code}`,
          message: httpData.message
        });
      }
    } else {
      $ui.loading(false);
      $console.error("返回空白数据，请检查网络是否正常");
      $ui.alert({
        title: "未知错误",
        message: "返回空白数据，请检查网络是否正常"
      });
    }
  };
module.exports = {
  followLiver
};
