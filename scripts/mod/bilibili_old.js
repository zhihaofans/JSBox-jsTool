let _BILIAPI = require("./bilibili_old/bilibili");

function init(url) {
  if (url) {
    if (_BILIAPI.checkBiliUrl(url)) {
      $ui.menu({
        items: ["new", "old"],
        handler: function (title, idx) {
          if (idx === 0) {
            _BILIAPI.getVideoInfo(url);
          } else {
            _BILIAPI.getVideoInfo(_BILIAPI.getVidFromUrl(url));
          }
        }
      });
    } else {
      $ui.error("不支持该链接");
    }
  } else {
    $ui.push({
      props: {
        title: $l10n("BILIBILI")
      },
      views: [
        {
          type: "list",
          props: {
            data: [
              {
                title: "账号",
                rows: ["登录账号", "获取用户信息", "稍后再看", "我的个人资料"]
              },
              {
                title: "视频",
                rows: ["获取视频信息", "AV&BV互转", "获取投稿封面"]
              },
              {
                title: "直播",
                rows: [
                  "获取直播间拥有礼物",
                  "查看vTuber状态",
                  "粉丝勋章",
                  "瓜子钱包",
                  "我的关注"
                ]
              },
              {
                title: "漫画",
                rows: ["签到"]
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
                      _BILIAPI.isLogin()
                        ? $ui.alert({
                            title: "已登录",
                            message: "本地发现登录缓存，还要登录吗",
                            actions: [
                              {
                                title: "获取用户信息",
                                disabled: false, // Optional
                                handler: function () {
                                  _BILIAPI.getMyInfo();
                                }
                              },
                              {
                                title: "清空登录缓存重新登录",
                                disabled: false, // Optional
                                handler: function () {
                                  _BILIAPI.removeLoginData();
                                  login();
                                }
                              },
                              {
                                title: "关闭",
                                disabled: false, // Optional
                                handler: function () {}
                              }
                            ]
                          })
                        : login();
                      break;
                    case 1:
                      $ui.error("该功能暂停使用");
                      // biliApi.isLogin()? biliApi.getUserInfo(): $ui.error("未登录");
                      break;
                    case 2:
                      _BILIAPI.laterToWatch();
                      break;
                    case 3:
                      _BILIAPI.getMyInfo();
                      break;
                    default:
                      $ui.error("未知错误");
                  }
                  break;
                case 1:
                  switch (indexPath.row) {
                    case 0:
                      $ui.menu({
                        items: ["打开网址", "通过vid"],
                        handler: function (title, idx) {
                          switch (idx) {
                            case 0:
                              $input.text({
                                type: $kbType.url,
                                autoFontSize: true,
                                text: _BILIAPI.DEBUG_DEFAULT.VIDEO_LINK,
                                placeholder: "输入视频网址",
                                handler: function (url) {
                                  if (url.length > 0) {
                                    const vid = _BILIAPI.getVidFromUrl(url);
                                    if (vid.length > 0) {
                                      _BILIAPI.getVideoInfo(vid);
                                    } else if (vid == url) {
                                      $ui.error("解析网址失败");
                                    } else {
                                      $ui.error("空白id");
                                    }
                                  } else {
                                    $ui.error("空白网址");
                                  }
                                }
                              });
                              break;
                            case 1:
                              $input.text({
                                type: $kbType.number,
                                autoFontSize: true,
                                text: _BILIAPI.DEBUG_DEFAULT.VID,
                                placeholder: "输入视频id(不包含av)",
                                handler: function (vid) {
                                  if (vid.length > 0) {
                                    _BILIAPI.getVideoInfo(vid);
                                  } else {
                                    $ui.error("空白id");
                                  }
                                }
                              });
                              break;
                            default:
                              $ui.error("暂未支持");
                          }
                        }
                      });
                      break;
                    case 1:
                      $ui.menu({
                        items: ["AV->BV", "BV->AV"],
                        handler: function (_title, menuIdx) {
                          switch (menuIdx) {
                            case 0:
                              $input.text({
                                placeholder: "输入AV号,不包含开头的av",
                                text: _BILIAPI.DEBUG_DEFAULT.VID,
                                handler: function (AV) {
                                  if (AV) {
                                    const bv = _BILIAPI.getBv(AV);
                                    if (bv) {
                                      $input.text({
                                        placeholder:
                                          "点击复制，修改文本并不会改变复制的内容",
                                        text: bv,
                                        handler: function (result) {
                                          $clipboard.copy({
                                            text: bv,
                                            ttl: 30,
                                            locally: true
                                          });
                                          $ui.toast("复制完毕");
                                        }
                                      });
                                    } else {
                                      $ui.alert({
                                        title: "错误",
                                        message: "空白结果"
                                      });
                                    }
                                  } else {
                                    $ui.alert({
                                      title: "错误",
                                      message: "请输入内容"
                                    });
                                  }
                                }
                              });
                              break;
                            case 1:
                              $input.text({
                                placeholder: "输入BV",
                                text: _BILIAPI.DEBUG_DEFAULT.BVID,
                                handler: function (BV) {
                                  if (BV) {
                                    const av = _BILIAPI.getAv(BV);
                                    if (av) {
                                      $input.text({
                                        placeholder:
                                          "点击复制，修改文本并不会改变复制的内容",
                                        text: av,
                                        handler: function (result) {
                                          $clipboard.copy({
                                            text: av,
                                            ttl: 30,
                                            locally: true
                                          });
                                          $ui.toast("复制完毕");
                                        }
                                      });
                                    } else {
                                      $ui.alert({
                                        title: "错误",
                                        message: "空白结果"
                                      });
                                    }
                                  } else {
                                    $ui.alert({
                                      title: "错误",
                                      message: "请输入内容"
                                    });
                                  }
                                }
                              });
                              break;
                          }
                        }
                      });
                      break;
                    case 2:
                      $input.text({
                        placeholder: "av/bv",
                        text: "av" + _BILIAPI.DEBUG_DEFAULT.VID,
                        handler: function (vid) {
                          if (vid.length > 0) {
                            if (vid.startsWith("av") || vid.startsWith("bv")) {
                              $ui.loading(true);
                              _BILIAPI
                                .getCoverFromGalmoe(vid)
                                .then(function (resp) {
                                  let data = resp.data;
                                  $ui.loading(false);
                                  if (data) {
                                    if (data.result === 0) {
                                      $ui.alert({
                                        title: "错误",
                                        message: "服务器返回空白结果"
                                      });
                                    } else {
                                      $ui.preview({
                                        title: vid,
                                        url: data.url
                                      });
                                    }
                                  } else {
                                    $ui.alert({
                                      title: "错误",
                                      message: "服务器返回空白数据"
                                    });
                                  }
                                });
                            } else {
                              $ui.alert({
                                title: "错误",
                                message: "请输入正确的av或者bv"
                              });
                            }
                          } else {
                            $ui.alert({
                              title: "错误",
                              message: "请输入av或者bv"
                            });
                          }
                        }
                      });
                      break;
                    default:
                      $ui.error("暂未支持");
                  }
                  break;
                case 2:
                  switch (indexPath.row) {
                    case 0:
                      _BILIAPI.isLogin()
                        ? _BILIAPI.getLiveGiftList()
                        : $ui.error("未登录");
                      break;
                    case 1:
                      $input.text({
                        type: $kbType.number,
                        placeholder: "用户个人空间数字id,不是直播间id",
                        text: "",
                        handler: function (mid) {
                          if (mid) {
                            _BILIAPI.getLiveroomInfo(mid);
                          } else {
                            $ui.alert({
                              title: "错误",
                              message: "请输入id"
                            });
                          }
                        }
                      });
                      break;
                    case 2:
                      _BILIAPI.isLogin()
                        ? _BILIAPI.getFansMedalList()
                        : $ui.error("未登录");
                      break;
                    case 3:
                      _BILIAPI.isLogin()
                        ? _BILIAPI.getWallet()
                        : $ui.error("未登录");
                      break;
                    case 4:
                      _BILIAPI.isLogin()
                        ? $ui.menu({
                            items: ["在播", "没播"],
                            handler: function (title, idx) {
                              switch (idx) {
                                case 0:
                                  _BILIAPI.getOnlineLiver();
                                  break;
                                case 1:
                                  _BILIAPI.getOfflineLiver();
                                  break;
                              }
                            }
                          })
                        : $ui.error("未登录");
                      break;
                    default:
                      $ui.error("暂未支持");
                  }
                  break;
                case 3:
                  switch (indexPath.row) {
                    case 0:
                      _BILIAPI.isLogin()
                        ? _BILIAPI.mangaCheckin()
                        : $ui.error("未登录");
                      break;
                    default:
                      $ui.error("未知错误");
                  }
                  break;
                default:
                  $ui.error("暂未支持");
              }
            }
          }
        }
      ],
      events: {
        appeared: function () {
          if (_BILIAPI.isLogin()) {
            $ui.toast("已登录");
          }
        }
      }
    });
  }
}

function login() {
  $ui.menu({
    items: ["输入Access key(推荐)", "账号密码(明文)", "使用已保存的Access key"],
    handler: function (_title, idx) {
      switch (idx) {
        case 0:
          $input.text({
            autoFontSize: true,
            placeholder: "输入账号",
            handler: function (inputKey) {
              if (inputKey.length > 0) {
                _BILIAPI.saveAccessKey(inputKey);
              } else {
                $ui.error("空白key");
              }
            }
          });
          break;
        case 1:
          $input.text({
            autoFontSize: true,
            placeholder: "输入账号",
            handler: function (user) {
              if (user.length > 0) {
                $input.text({
                  autoFontSize: true,
                  placeholder: "输入密码",
                  handler: function (pwd) {
                    if (pwd.length > 0) {
                      _BILIAPI.getAccessKey(user, pwd);
                    } else {
                      $ui.error("空白密码");
                    }
                  }
                });
              } else {
                $ui.error("空白账号");
              }
            }
          });
          break;
        case 2:
          $ui.error("待开发");
          //                    const uidList = _BILIAPI.getUidList();
          //                    if (uidList.length > 0) {
          //                        $console.info(uidList)
          //                        let result = await $ui.menu({
          //                            items: uidList
          //                        })
          //                        $input.text({
          //                            placeholder: "",
          //                            text: _BILIAPI.getAccessKeyByUid(result.title),
          //                            handler: function (inputKey) {
          //                                $console.info(`${result.title}:${inputKey}`);
          //                                if (inputKey.length > 0) {
          //                                    _BILIAPI.saveAccessKey(inputKey);
          //                                } else {
          //                                    $ui.error("空白key");
          //                                }
          //                            }
          //                        });
          //                    } else {
          //                        $ui.error("未保存任何access_key");
          //                    }
          break;
        default:
          $ui.error("错误选项");
      }
    }
  });
}
module.exports = {
  init: init
};
