const $B_user = require("./user"),
  $_Static = require("./static"),
  User = {
    autoCheckIn: async () => {
      const header = {
          "User-Agent": $_Static.UA.USER.APP_IPHONE,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        httpGet = await $_Static.Http.getAwait(
          $_Static.URL.LIVE.CHECK_IN + $B_user.Auth.accessKey(),
          header
        );
      if (httpGet.error) {
        $console.error(httpGet.error);
        return false;
      } else {
        const data = httpGet.data;
        $console.info(data);
        if (data) {
          return data.code === 0;
        } else {
          return false;
        }
      }
    },
    checkIn: async () => {
      $ui.loading(true);
      const header = {
          "User-Agent": $_Static.UA.USER.APP_IPHONE,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        httpGet = await $_Static.Http.getAwait(
          $_Static.URL.LIVE.CHECK_IN + $B_user.Auth.accessKey(),
          header
        );
      if (httpGet.error) {
        $ui.loading(false);
        $console.error(httpGet.error);
      } else {
        const data = httpGet.data;
        $console.info(data);
        $ui.loading(false);
        if (data) {
          if (data.code === 0) {
            $ui.alert({
              title: "签到成功",
              message: data.message || "签到成功",
              actions: [
                {
                  title: "OK",
                  disabled: false, // Optional
                  handler: function () {}
                }
              ]
            });
          } else {
            $ui.alert({
              title: `错误代码${data.code}`,
              message: data.message || "未返回错误信息",
              actions: [
                {
                  title: "OK",
                  disabled: false, // Optional
                  handler: function () {}
                }
              ]
            });
          }
        } else {
          $ui.alert({
            title: "签到失败",
            message: "返回空白数据",
            actions: [
              {
                title: "OK",
                disabled: false, // Optional
                handler: function () {}
              }
            ]
          });
        }
      }
    },
    silver2coin: async () => {
      $ui.loading(true);
      const postHeader = {
          "User-Agent": $_Static.UA.USER.APP_IPHONE,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        postBody = {
          access_key: $B_user.Auth.accessKey()
        };
      $console.info(postHeader);
      $console.info(postBody);
      const httpPost = await $_Static.Http.postAwait(
        $_Static.URL.LIVE.SILVER_TO_COIN,
        postBody,
        postHeader
      );
      $console.info(httpPost);
      if (httpPost.error) {
        $ui.loading(false);
        $console.error(httpPost.error);
      } else {
        $ui.loading(false);
        if (httpPost.data) {
          const silver2coinData = httpPost.data;
          if (silver2coinData.code === 0) {
            $ui.alert({
              title:
                silver2coinData.data.message ||
                silver2coinData.data.msg ||
                "兑换成功",
              message: `剩余银瓜子：${silver2coinData.data.silver}\n得到硬币：${silver2coinData.data.coin}`
            });
          } else {
            $ui.alert({
              title: `错误代码${silver2coinData.code}`,
              message:
                silver2coinData.message || silver2coinData.msg || "未知错误"
            });
          }
        } else {
          $ui.alert({
            title: "错误",
            message: "空白数据"
          });
        }
      }
    },
    autoSilver2coin: async () => {
      const postHeader = {
          "User-Agent": $_Static.UA.USER.APP_IPHONE,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        postBody = {
          access_key: $B_user.Auth.accessKey()
        };
      $console.info(postHeader);
      $console.info(postBody);
      const httpPost = await $_Static.Http.postAwait(
        $_Static.URL.LIVE.SILVER_TO_COIN,
        postBody,
        postHeader
      );
      $console.info(httpPost);
      if (httpPost.error) {
        $console.error(httpPost.error);
        return false;
      } else {
        $ui.loading(false);
        if (httpPost.data) {
          return httpPost.data.code === 0;
        } else {
          return false;
        }
      }
    }
  },
  Liver = {
    onlineFollower: async () => {
      const ACCESS_KEY = $B_user.Auth.accessKey(),
        _url = $_Static.URL.LIVE.LIVER_ONLINE + ACCESS_KEY,
        _headers = {
          "User-Agent": $_Static.UA.BILIBILI
        },
        httpResult = await $_Static.Http.getAwait(_url, _headers);
      $console.info(_url);
      $console.info(_headers);
      $console.info(httpResult.data);
      if (httpResult.error) {
        $console.error(httpResult.error);
      } else if (httpResult.data) {
        const httpData = httpResult.data;
        if (httpData.code !== 0) {
          $console.error(
            `Bilibili.onlineFollower:(${httpData.code})${httpData.message}`
          );
        }
        return httpData || undefined;
      }
      return undefined;
    },
    offlineFollower: async () => {
      const ACCESS_KEY = $B_user.Auth.accessKey(),
        _url = $_Static.URL.LIVE.LIVER_OFFLINE + ACCESS_KEY,
        _headers = {
          "User-Agent": $_Static.UA.BILIBILI
        },
        httpResult = await $_Static.Http.getAwait(_url, _headers);
      $console.info(_url);
      $console.info(_headers);
      if (httpResult.error) {
        $console.error(httpResult.error);
      } else if (httpResult.data) {
        const httpData = httpResult.data;
        if (httpData.code !== 0) {
          $console.error(
            `Bilibili.offlineFollower:(${httpData.code})${httpData.message}`
          );
        }
        return httpData || undefined;
      }
      return undefined;
    }
  },
  View = {
    myFollow: async () => {
      $ui.loading(true);
      $ui.menu({
        items: ["在播", "未播"],
        handler: function (title, idx) {
          switch (idx) {
            case 0:
              try {
                View.showMyFollower(true);
                $ui.loading(false);
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
                View.showMyFollower(false);
                $ui.loading(false);
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
    showMyFollower: async (online = true) => {
      const httpData = online
        ? await Liver.onlineFollower()
        : await Liver.offlineFollower();
      if (httpData) {
        if (httpData.code === 0) {
          const myFollowData = httpData.data,
            myFollowList = myFollowData.data.rooms;
          if (
            myFollowData.data.total_count === 0 ||
            myFollowList.length === 0
          ) {
            $ui.alert({
              title: "关注列表为空，请登陆或关注主播",
              message: `showMyFollower.count = 0(online=${online})`
            });
          } else {
            $ui.loading(false);
            $ui.push({
              props: {
                title: ""
              },
              views: [
                {
                  type: "list",
                  props: {
                    data: myFollowList.map(liveRoom => {
                      return {
                        title: `@${liveRoom.uname}`,
                        rows: [
                          online
                            ? liveRoom.title
                            : liveRoom.announcement_content,
                          `直播间id:${liveRoom.roomid}`,
                          online
                            ? `直播间封面:${liveRoom.cover.repleace(
                                "http://i0.hdslb.com/bfs/live/new_room_cover/",
                                ""
                              )}`
                            : `${liveRoom.live_desc}播了`
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
                          $app.openURL(`bilibili://live/${thisRoom.roomid}`);
                          break;
                        case 2:
                          if (online) {
                            $quicklook.open({
                              url: thisRoom.cover,
                              handler: function () {
                                $console.info(thisRoom.cover);
                              }
                            });
                          }
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
          $ui.alert({
            title: `错误代码${httpData.code}`,
            message: httpData.message
          });
        }
      } else {
        $ui.loading(false);
        $ui.alert({
          title: "未知错误",
          message: "返回空白数据，请检查网络是否正常"
        });
      }
    }
  };

module.exports = {
  User,
  View
};
