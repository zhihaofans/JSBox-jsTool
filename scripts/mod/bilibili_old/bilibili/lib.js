const _URL = require("./api_url.js"),
  _UA = {
    BILIBILI: {
      APP_IPHONE:
        "bili-universal/9320 CFNetwork/1125.2 Darwin/19.5.0 os/ios model/iPhone 11 mobi_app/iphone osVer/13.4.5 network/1",
      BLUE_IOS:
        "bili-blue/10150 CFNetwork/1183 Darwin/20.0.0 os/ios model/iPhone12,8 mobi_app/iphone_b build/10150 osVer/14.0 network/1 channel/AppStore",
      COMIC:
        "comic-universal/802 CFNetwork/1125.2 Darwin/19.4.0 os/ios model/iPhone 11 mobi_app/iphone_comic osVer/13.4 network/2",
      VIP_CHECKIN: "bili-universal/9290 CFNetwork/1125.2 Darwin/19.4.0"
    },
    KAAASS: "JSBox-jsTool/0.1 (github:zhihaofans) <zhuang@zhihao.io>"
  },
  getSignUrl = (host, param, android = false) => {
    return $http.get({
      url: `${_URL.KAAASS.GET_SIGN_URL}?host=${encodeURI(
        host
      )}&param=${encodeURI(param)}&android=${android}`,
      header: {
        "user-agent": _UA.KAAASS
      }
    });
  };

module.exports = {
  getSignUrl,
  UA: _UA
};
