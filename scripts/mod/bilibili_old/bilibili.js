const _urlCheck = {
    isBilibiliVideoUrl: url => {
      return (
        url &&
        (/https:\/\/www.bilibili.com\/av(.+?)/.test(url) ||
          /https:\/\/www.bilibili.com\/video\/av(.+?)/.test(url))
      );
    },
    isBilibiliUrl: url => {
      return url ? isBilibiliVideoUrl(url) : false;
    }
  },
  _AVBV = require("./bilibili/av_bv"),
  _CHECKIN = require("./bilibili/check_in"),
  _GIFT = require("./bilibili/gift"),
  _LIVE = require("./bilibili/live"),
  _USER = require("./bilibili/user"),
  _VIDEO = require("./bilibili/video"),
  _ACCOUNTS = require("./bilibili/accounts"),
  DEBUG_DEFAULT = {
    BVID: "BV17x411w7KC",
    VID: "90035938",
    VIDEO_LINK: "https://b23.tv/av90035938"
  };

module.exports = {
  checkAccessKey: _USER.isLogin,
  checkBiliUrl: _urlCheck.isBilibiliVideoUrl,
  DEBUG_DEFAULT,
  getAccessKey: _USER.getAccessKey,
  getAccessKeyByUid: _ACCOUNTS.getAccessKey,
  getAccessKeyList: _ACCOUNTS.getAccessKeyList,
  getAv: _AVBV.getAv,
  getAvOnline: _AVBV.getAvOnline,
  getBv: _AVBV.getBv,
  getBvOnline: _AVBV.getBvOnline,
  getCoverFromGalmoe: _VIDEO.getCoverFromGalmoe,
  getFansMedalList: _LIVE.getFansMedalList,
  getLiveGiftList: _GIFT.getLiveGiftList,
  getLiveroomInfo: _LIVE.getLiveroomInfo,
  getMyInfo: _USER.getMyInfo,
  getOfflineLiver: _LIVE.getOfflineLiver,
  getOnlineLiver: _LIVE.getOnlineLiver,
  getUidList: _ACCOUNTS.getUidList,
  getUserInfo: _USER.getUserInfo,
  getVideo: _VIDEO.getVideo,
  getVideoData: _VIDEO.getVideoData,
  getVideoInfo: _VIDEO.getVideoInfo,
  getVidFromUrl: _VIDEO.getVidFromUrl,
  getWallet: _LIVE.getWallet,
  isLogin: _USER.isLogin,
  laterToWatch: _VIDEO.laterToWatch,
  mangaCheckin: _CHECKIN.mangaCheckin,
  mangaClockin: _CHECKIN.mangaCheckin,
  openLiveDanmuku: _LIVE.openLiveDanmuku,
  removeLoginData: _USER.removeLoginCache,
  saveAccessKey: _USER.setAccessKey,
  vipCheckin: _CHECKIN.vipCheckin
};
