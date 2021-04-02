const $B_user = require("./user"),
  $_Static = require("./static"),
  $$ = require("$$"),
  BiliScheme = require("AppScheme").Video.Bilibili,
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
    getFollower: (online = true) => {
      return online ? Liver.onlineFollower() : Liver.offlineFollower();
    },
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
    myFollow: () => {
      $ui.loading(true);
      $ui.menu({
        items: ["在播", "未播"],
        handler: function (title, idx) {
          switch (idx) {
            case 0:
              try {
                View.showOnlineFollower();
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
                View.showOfflineFollower();
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
    showOnlineFollower: async () => {
      const httpData = await Liver.onlineFollower();
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
    showOfflineFollower: async () => {
      const httpData = await Liver.offlineFollower();
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
    }
  };

module.exports = {
  User,
  View
};
