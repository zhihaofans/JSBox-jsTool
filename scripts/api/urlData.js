let UPDATE_CONFIG_GITHUB =
  "https://github.com/zhuangzhihao-io/JSBox-jsTool/raw/master/config.json",
  UPDATE_CONFIG_JSDELIVR =
  "https://cdn.jsdelivr.net/gh/zhuangzhihao-io/JSBox-jsTool@master/config.json",
  BILIBILI = {
    GET_VIDEO_INFO: "https://api.kaaass.net/biliapi/video/info?jsonerr=true&id=",
    GET_ACCESS_KEY: "https://api.kaaass.net/biliapi/user/login?jsonerr=true&direct=true",
    GET_USER_INFO: "https://api.kaaass.net/biliapi/user/info?jsonerr=true",
    GET_VIDEO_DATA: "https://api.kaaass.net/biliapi/video/resolve?jsonerr=true&direct=true",
    GET_LIVE_GIFT_LIST: "https://api.live.bilibili.com/xlive/app-room/v1/gift/bag_list?access_key=",
    GET_WALLET: "https://api.live.bilibili.com/pay/v1/Exchange/getStatus?access_key=",
    SILVER_TO_COIN: "https://api.live.bilibili.com/pay/v1/Exchange/silver2coin",
    MANGA_CLOCK_IN: "https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn",
    COVER_GALMOE: "https://www.galmoe.com/t.php?aid=",
    VIP_CHECKIN: "https://api.bilibili.com/x/vip/privilege/receive",
    LATER_TO_WATCH: "https://api.bilibili.com/x/v2/history/toview?access_key="
  },
  MEOWV = {
    WALLPAPER: "https://api.meowv.com/wallpaper",
    SOUL: "https://api.meowv.com/soul"
  },
  ISOYU = {
    BING: "https://api.isoyu.com/bing_images.php",
  },
  API_66MZ8_COM = {
    PHONE_WALLPAPER: "https://api.66mz8.com/api/rand.img.php?type=%E5%A3%81%E7%BA%B8",
  },
  ACFUN = {
    LOGIN: "https://id.app.acfun.cn/rest/app/login/signin",
    GET_USER_INFO: "https://api-new.app.acfun.cn/rest/app/user/personalInfo",
    DOWNLOAD_VIDEO: "https://api-new.app.acfun.cn/rest/app/play/playInfo/mp4",
    GET_VIDEO_INFO: "https://api-new.app.acfun.cn/rest/app/douga/info?dougaId=",
    SIGN_IN: "https://api-new.app.acfun.cn/rest/app/user/signIn",
    GET_UPLOADER_VIDEO: "https://api-new.app.acfun.cn/rest/app/user/resource/query"
};;
module.exports = {
  UPDATE_CONFIG_GITHUB,
  UPDATE_CONFIG_JSDELIVR,
  BILIBILI,
  MEOWV,
  ISOYU,
  API_66MZ8_COM,
  ACFUN
};