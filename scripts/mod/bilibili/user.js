let $_Cache = require("./data_base").Cache,
  $_Static = require("./static"),
  $$ = require("$$"),
  JSDialogs = require("JSDialogs"),
  BiliScheme = require("AppScheme").Video.Bilibili,
  Auth = {
    getSignUrl: async (host, param, android = false) => {
      const url = `${$_Static.URL.KAAASS.SIGN_URL}?host=${encodeURI(
          host
        )}&param=${encodeURI(param)}&android=${android}`,
        headers = {
          "user-agent": $_Static.UA.KAAASS.KAAASS
        };
      const $_get = await $_Static.Http.getAwait(url, headers);
      if ($_get.error) {
        $console.error($_get.error.message);
        return undefined;
      } else {
        return $_get.data;
      }
    },
    getSignUrl_A: async (param, android = false) => {
      const url = `${$_Static.URL.KAAASS.SIGN_URL}?host=&param=${encodeURI(
          param
        )}&android=${android}`,
        headers = {
          "user-agent": $_Static.UA.KAAASS.KAAASS
        };
      const $_get = await $_Static.Http.getAwait(url, headers);
      if ($_get.error) {
        $console.error($_get.error.message);
        return undefined;
      } else {
        return $_get.data;
      }
    },
    isLogin: () => {
      return Auth.accessKey() ? true : false;
    },
    accessKey: (access_key = undefined) => {
      if (access_key) {
        $_Cache.accessKey(access_key);
      }
      return $_Cache.accessKey();
    },
    uid: (uid = undefined) => {
      if (uid) {
        $_Cache.uid(uid);
      }
      return $_Cache.uid();
    },
    cookie: (cookies = undefined) => {
      if (cookies) {
        $_Cache.cookies(cookies);
      }
      return $_Cache.cookies();
    },
    cookies: (cookies = undefined) => {
      if (cookies) {
        $_Cache.cookies(cookies);
      }
      return $_Cache.cookies();
    },
    refreshToken: async () => {
      $ui.loading(true);
      const access_key = Auth.accessKey();
      if (access_key) {
        const url = `${$_Static.URL.KAAASS.REFRESH_TOKEN}?access_key=${access_key}`,
          headers = {
            "user-agent": $_Static.UA.KAAASS.KAAASS
          };
        const $_get = await $_Static.Http.getAwait(url, headers);
        $console.info($_get);
        $ui.loading(false);
        if ($_get.error) {
          $console.error($_get.error.message);
          return false;
        } else {
          return $_get.data.status == "OK";
        }
      } else {
        return false;
      }
    },
    getCookiesByAccessKey: async () => {
      $ui.loading(true);
      const access_key = Auth.accessKey();
      if (access_key) {
        const url = `${$_Static.URL.KAAASS.GET_COOKIES_BY_ACCESS_KEY}?access_key=${access_key}`,
          headers = {
            "user-agent": $_Static.UA.KAAASS.KAAASS
          },
          $_get = await $_Static.Http.getAwait(url, headers);
        $console.info($_get);
        $ui.loading(false);
        if ($_get.error) {
          $console.error($_get.error.message);
          return undefined;
        } else {
          if ($_get.data.status == "OK") {
            const userCookies = $_get.data.cookie;
            if (userCookies) {
              Auth.cookies(userCookies);
              return userCookies;
            } else {
              $ui.error("获取饼干失败");
              return undefined;
            }
          }
        }
      } else {
        return undefined;
      }
    }
  },
  Info = {
    getMyInfoByKaaass: async () => {
      const access_key = Auth.accessKey();
      if (access_key) {
        const url = `${$_Static.URL.KAAASS.MY_INFO}?furtherInfo=true&access_key=${access_key}`,
          headers = {
            "user-agent": $_Static.UA.KAAASS.KAAASS
          },
          $_get = await $_Static.Http.getAwait(url, headers);
        $console.error($_get);
        if ($_get.error) {
          $console.error($_get.error.message);
          return undefined;
        } else {
          const kaaassData = $_get.data;
          if (kaaassData.status == "OK") {
            const myInfoData = kaaassData.info;
            $ui.alert({
              title: "结果",
              message: myInfoData,
              actions: [
                {
                  title: "ok",
                  disabled: false, // Optional
                  handler: function () {}
                }
              ]
            });
          } else {
            $ui.loading(false);
            $ui.alert({
              title: `Error ${kaaassData.code}`,
              message: kaaassData.message || "未知错误",
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
      } else {
        return undefined;
      }
    },
    getMyInfo: () => {
      const access_key = Auth.accessKey();
      if (access_key) {
        const respKaaass = Auth.getSignUrl(
          $_Static.URL.USER.MY_INFO,
          `access_key=${access_key}`
        );
        const dataKaaass = respKaaass.data;
        $console.info(dataKaaass);
        if (dataKaaass) {
          $http.get({
            url: dataKaaass.url,
            header: {
              "User-Agent": $_Static.UA.USER.APP_IPHONE
            },
            handler: respBili => {
              let resultBili = respBili.data;
              if (resultBili.code === 0) {
                const myInfoData = resultBili.data;
                //saveLoginCache(_AK, myInfoData.mid);
                $ui.loading(false);
                $ui.success("已更新登录数据");
                $ui.alert({
                  title: "结果",
                  message: myInfoData,
                  actions: [
                    {
                      title: "ok",
                      disabled: false, // Optional
                      handler: function () {}
                    }
                  ]
                });
              } else {
                $ui.loading(false);
                $ui.alert({
                  title: `Error ${resultBili.code}`,
                  message: resultBili.message || "未知错误",
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
          });
        } else {
          $ui.loading(false);
          $ui.error("获取签名url失败");
        }
        return "";
      } else {
        return undefined;
      }
    },
    myInfo: () => {
      const access_key = Auth.accessKey();
      if (access_key) {
        $http.get({
          url: `${$_Static.URL.USER.MY_INFO}?access_key=${access_key}`,
          header: {
            "User-Agent": $_Static.UA.USER.APP_IPHONE
          },
          handler: respBili => {
            let resultBili = respBili.data;
            $console.warn(resultBili);
            if (resultBili.code === 0) {
              const myInfoData = resultBili.data;
              //saveLoginCache(_AK, myInfoData.mid);
              $ui.loading(false);
              $ui.success("已更新登录数据");
              $ui.alert({
                title: "结果",
                message: myInfoData,
                actions: [
                  {
                    title: "ok",
                    disabled: false, // Optional
                    handler: function () {}
                  }
                ]
              });
            } else {
              $ui.loading(false);
              $ui.alert({
                title: `Error ${resultBili.code}`,
                message: resultBili.message || "未知错误",
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
        });
      } else {
        $ui.loading(false);
        $ui.error("未登录");
      }
    },
    getSameFollow: async uid => {
      // TODO
      const access_key = Auth.accessKey(),
        cookie = Auth.cookies();
      if (uid) {
        if (access_key && cookie) {
          const url = `${$_Static.URL.USER.SAME_FOLLOW}?access_key=${access_key}&vmid=${uid}`,
            headers = {
              "User-Agent": $_Static.UA.BILIBILI,
              Cookie: cookie
            },
            httpResult = await $_Static.Http.getAwait(url, headers);
          $console.info(headers);
          $console.info(httpResult);
          if (httpResult.error) {
            $console.error(httpResult.error);
          } else if (httpResult.data) {
            const httpData = httpResult.data;
            if (httpData.code !== 0) {
              $console.error(
                `Bilibili.getSameFollow:(${httpData.code})${httpData.message}`
              );
            }
            return httpData || undefined;
          }
          return undefined;
        } else {
          $console.error("Bilibili.getSameFollow:未登录");
          return undefined;
        }
      } else {
        $console.error("Bilibili.getSameFollow:未输入uid");
        return undefined;
      }
    },
    getLaterToWatch: async () => {
      const _cookie = Auth.cookies(),
        _headers = {
          "User-Agent": $_Static.UA.USER.APP_IPHONE,
          Cookie: _cookie
        },
        httpResult = await $_Static.Http.getAwait(
          $_Static.URL.USER.LATER_TO_WATCH,
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
            `Bilibili.getLaterToWatch:(${httpData.code})${httpData.message}`
          );
        }
        return httpData || undefined;
      }
      return undefined;
    }
  },
  View = {
    getCookiesByAccessKey: async () => {
      const newCookie = await Auth.getCookiesByAccessKey();
      if (newCookie) {
        $input.text({
          type: $kbType.text,
          placeholder: newCookie,
          text: newCookie
        });
      } else {
        $ui.alert({
          title: "获取Cookies失败",
          message: newCookie || "undefined"
        });
      }
    },
    getMyInfo: Info.myInfo,
    updateAccessKey: () => {
      $input.text({
        type: $kbType.text,
        placeholder: "输入Access key",
        text: Auth.accessKey() || "",
        handler: function (access_key) {
          if (access_key) {
            const new_access_key = Auth.accessKey(access_key);
            if (new_access_key == access_key) {
              $ui.alert({
                title: "设置成功",
                message: "是否顺便更新cookies",
                actions: [
                  {
                    title: "更新",
                    disabled: false,
                    handler: function () {
                      View.getCookiesByAccessKey();
                    }
                  },
                  {
                    title: "不了",
                    disabled: false
                  }
                ]
              });
            } else {
              $ui.alert({
                title: "设置失败",
                message: "",
                actions: [
                  {
                    title: "OK",
                    disabled: false,
                    handler: function () {}
                  }
                ]
              });
            }
          }
        }
      });
    },
    refreshToken: async () => {
      if (await Auth.refreshToken()) {
        $ui.alert({
          title: "刷新成功",
          message: ""
        });
      } else {
        $ui.alert({
          title: "刷新失败",
          message: ""
        });
      }
    },
    getLaterToWatch: async () => {
      $ui.loading(true);
      const httpData = await Info.getLaterToWatch();
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
                title: `稍后再看：${later2watch.count || 0}个`
              },
              views: [
                {
                  type: "list",
                  props: {
                    data: later2watchList.map(video => {
                      return {
                        title: `@${video.owner.name} (uid:${video.owner.mid})`,
                        rows: [
                          video.title,
                          `av${video.aid}/${video.bvid}`,
                          "视频封面",
                          "个人空间",
                          "头像"
                        ]
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
                          BiliScheme.video(thisVideo.bvid);
                          break;
                        case 2:
                          $$.Image.single.showImageMenu(thisVideo.pic);
                          break;
                        case 3:
                          BiliScheme.space(thisVideo.owner.mid);
                          break;
                        case 4:
                          $$.Image.single.showImageMenu(thisVideo.owner.face);
                          break;
                        default:
                          $ui.error("?");
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
    },
    getSameFollow: async () => {
      // TODO
      const inputResult = await JSDialogs.showInputAlert(
        "共同关注",
        "请输入对方的uid",
        "70093"
      );
      if (inputResult) {
        $ui.loading(true);
        const httpData = await Info.getSameFollow(inputResult);
        $console.warn("getSameFollow");
        if (httpData) {
          if (httpData.code === 0) {
            const sameFollowData = httpData.data,
              sameFollowList = sameFollowData.list;
            if (sameFollowData.count === 0 || sameFollowList.length === 0) {
              $ui.alert({
                title: "共同关注为空，请添加内容",
                message: "later2watch.count = 0"
              });
            } else {
              $ui.push({
                props: {
                  title: `共同关注：${sameFollowData.count || 0}个`
                },
                views: [
                  {
                    type: "list",
                    props: {
                      data: sameFollowList.map(video => {
                        return {
                          title: `@${video.owner.name} (uid:${video.owner.mid})`,
                          rows: [
                            video.title,
                            `av${video.aid}/${video.bvid}`,
                            "视频封面",
                            "个人空间",
                            "头像"
                          ]
                        };
                      })
                    },
                    layout: $layout.fill,
                    events: {
                      didSelect: function (_sender, indexPath, _data) {
                        const section = indexPath.section,
                          row = indexPath.row,
                          thisVideo = sameFollowList[section];
                        switch (row) {
                          case 0:
                            $app.openURL(thisVideo.uri);
                            break;
                          case 1:
                            BiliScheme.video(thisVideo.bvid);
                            break;
                          case 2:
                            $$.Image.single.showImageMenu(thisVideo.pic);
                            break;
                          case 3:
                            BiliScheme.space(thisVideo.owner.mid);
                            break;
                          case 4:
                            $$.Image.single.showImageMenu(thisVideo.owner.face);
                            break;
                          default:
                            $ui.error("?");
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
            await JSDialogs.showPlainAlert(
              `错误代码${httpData.code}`,
              httpData.message
            );
          }
        } else {
          await JSDialogs.showPlainAlert(
            "未知错误",
            "返回空白数据，请检查网络是否正常"
          );
        }
        $ui.loading(false);
      } else {
        await JSDialogs.showPlainAlert("错误", "请输入对方的uid");
      }
    }
  };
module.exports = {
  Auth,
  Info,
  View
};
