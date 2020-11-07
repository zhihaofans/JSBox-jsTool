class Url {
    constructor() {
        // Kaaass
        this.KAAASS_SIGN_URL = "https://api.kaaass.net/biliapi/urlgen";
        // User
        this.USER_MY_INFO = "https://app.bilibili.com/x/v2/account/mine";
        this.USER_MY_INFO_KAAASS = "https://api.kaaass.net/biliapi/user/info";
        this.USER_REFRESH_TOKEN = "https://api.kaaass.net/biliapi/user/refreshToken";
        // Live
        this.LIVE_CHECK_IN = "https://api.live.bilibili.com/rc/v1/Sign/doSign?access_key=";
        this.LIVE_SILVER_TO_COIN = "https://api.live.bilibili.com/pay/v1/Exchange/silver2coin";
        // Comic
        this.COMIC_CHECK_IN = "https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn";
        this.COMIC_DETAIL = "https://manga.bilibili.com/twirp/comic.v1.Comic/ComicDetail";
    }
}
class UA {
    constructor() {
        // Comic
        this.COMIC_CHECK_IN = "comic-universal/802 CFNetwork/1125.2 Darwin/19.4.0 os/ios model/iPhone 11 mobi_app/iphone_comic osVer/13.4 network/2";
        // User
        this.USER_APP_IPHONE = "bili-universal/9320 CFNetwork/1125.2 Darwin/19.5.0 os/ios model/iPhone 11 mobi_app/iphone osVer/13.4.5 network/1";
        // Kaaass
        this.KAAASS = "JSBox-jsTool/0.1 (github:zhuangzhihao-io) <zhuang@zhihao.io>"
    }
}

module.exports = {
    UA,
    Url
};