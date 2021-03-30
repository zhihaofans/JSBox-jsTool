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
      const _cookie = Auth.cookies(),
        _headers = {
          "User-Agent": $_Static.UA.USER.APP_IPHONE,
          Cookie: _cookie
        },
        httpResult = await $_Static.Http.getAwait(
          $_Static.URL.LIVE.LIVER_ONLINE,
          _headers
        );
      $console.info(_headers);
      $console.info(httpResult);
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
    }
  },
  View = {
    myFollower: async () => {
      $ui.loading(true);
      $ui.menu({
        items: [],
        handler: function (title, idx) {}
      });
      $ui.loading(false);
      const httpData = await Liver.onlineFollower();
      if (httpData) {
        if (httpData.code === 0) {
          const later2watch = httpData.data,
            later2watchList = later2watch.list;
          if (later2watch.count === 0 || later2watchList.length === 0) {
            $ui.alert({
              title: "稍后再看为空，请添加内容",
              message: "later2watch.count = 0"
            });
          } else {
            $ui.push({
              props: {
                title: ""
              },
              views: [
                {
                  type: "list",
                  props: {
                    data: later2watchList.map(video => {
                      return {
                        title: `@${video.owner.name}`,
                        rows: [video.title, `av${video.aid}/${video.bvid}`]
                      };
                    })
                  },
                  layout: $layout.fill,
                  events: {
                    didSelect: function (_sender, indexPath, _data) {
                      const section = indexPath.section,
                        row = indexPath.row,
                        thisVideo = later2watchList[section];
                      switch (row) {
                        case 0:
                          $app.openURL(thisVideo.uri);
                          break;
                        case 1:
                          $app.openURL(`bilibili://video/${thisVideo.bvid}`);
                          break;
                      }
                    }
                  }
                }
              ]
            });
          }
        } else {
          $ui.alert({
            title: `错误代码${httpData.code}`,
            message: httpData.message
          });
        }
      } else {
        $ui.alert({
          title: "未知错误",
          message: "返回空白数据，请检查网络是否正常"
        });
      }
      $ui.loading(false);
    }
  };

module.exports = {
  User
};
