const APP_VERSION = {
    BILI_UNIVERSAl: "62105010",
    COMIC_UNIVERSAl: "802",
    CFNETWORK: "1237",
    DARWIN: "20.4.0",
    OS: "ios",
    MODEL: "iPhone 11",
    OSVER: "14.5",
    BUILD: "62105010",
    NETWORK: "2",
    CHANNEL: "AppStore"
  },
  UA = {
    BILIBILI: `bili-universal/${APP_VERSION.BILI_UNIVERSAl} CFNetwork/${APP_VERSION.CFNETWORK} Darwin/${APP_VERSION.DARWIN} os/${APP_VERSION.OS} model/${APP_VERSION.MODEL} mobi_app/iphone build/${APP_VERSION.BUILD} osVer/${APP_VERSION.OSVER} network/${APP_VERSION.NETWORK} channel/${APP_VERSION.CHANNEL}`,
    BILIBILI_COMIC: `comic-universal/${APP_VERSION.COMIC_UNIVERSAl} CFNetwork/${APP_VERSION.CFNETWORK} Darwin/${APP_VERSION.DARWIN} os/${APP_VERSION.OS} model/${APP_VERSION.MODEL} mobi_app/iphone build/${APP_VERSION.BUILD} osVer/${APP_VERSION.OSVER} network/${APP_VERSION.NETWORK} channel/${APP_VERSION.CHANNEL}`,
    COMIC: {
      CHECK_IN:
        "comic-universal/802 CFNetwork/1125.2 Darwin/19.4.0 os/ios model/iPhone 11 mobi_app/iphone_comic osVer/13.4 network/2"
    },
    USER: {
      APP_IPHONE:
        "bili-universal/62105010 CFNetwork/1237 Darwin/20.4.0 os/ios model/iPhone 11 mobi_app/iphone build/62105010 osVer/14.5 network/2 channel/AppStore",
      VIP_CHECKIN: "bili-universal/9290 CFNetwork/1125.2 Darwin/19.4.0"
    },
    KAAASS: {
      KAAASS: "JSBox-jsTool/0.1 (github:zhihaofans) <zhuang@zhihao.io>"
    }
  },
  URL = {
    KAAASS: {
      MY_INFO: "https://api.kaaass.net/biliapi/user/info",
      REFRESH_TOKEN: "https://api.kaaass.net/biliapi/user/refreshToken",
      SIGN_URL: "https://api.kaaass.net/biliapi/urlgen",
      GET_COOKIES_BY_ACCESS_KEY: "https://api.kaaass.net/biliapi/user/sso"
    },
    USER: {
      MY_INFO: "https://app.bilibili.com/x/v2/account/mine",
      VIP_CHECKIN: "https://api.bilibili.com/x/vip/privilege/receive",
      SAME_FOLLOW: "https://api.bilibili.com/x/relation/same/followings",
      LATER_TO_WATCH: "http://api.bilibili.com/x/v2/history/toview"
    },
    LIVE: {
      CHECK_IN: "https://api.live.bilibili.com/rc/v1/Sign/doSign?access_key=",
      SILVER_TO_COIN:
        "https://api.live.bilibili.com/pay/v1/Exchange/silver2coin",
      LIVER_ONLINE:
        "https://api.live.bilibili.com/xlive/app-interface/v1/relation/liveAnchor?access_key=",
      LIVER_OFFLINE:
        "https://api.live.bilibili.com/xlive/app-interface/v1/relation/unliveAnchor?pagesize=999&page=1&access_key=",
      LOTTERY_LIST:
        "https://api.live.bilibili.com/lottery/v1/Award/award_list?access_key="
    },
    COMIC: {
      CHECK_IN: "https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn",
      COMIC_DETAIL:
        "https://manga.bilibili.com/twirp/comic.v1.Comic/ComicDetail",
      TICKET_STATES:
        "https://manga.bilibili.com/twirp/user.v1.User/GetStates?access_key="
    },
    VIDEO: {
      GET_INFO: "http://api.bilibili.com/x/web-interface/view",
      GET_PLAY_URL: "http://api.bilibili.com/x/player/playurl"
    },
    AV_BV_ONLINE: "http://api.bilibili.com/x/web-interface/archive/stat"
  };
module.exports = {
  UA,
  URL,
  Http: require("/scripts/libs/http")
};
