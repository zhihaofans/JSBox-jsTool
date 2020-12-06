let UA = {
        COMIC: {
            CHECK_IN: "comic-universal/802 CFNetwork/1125.2 Darwin/19.4.0 os/ios model/iPhone 11 mobi_app/iphone_comic osVer/13.4 network/2",
        },
        USER: {
            APP_IPHONE: "bili-universal/9320 CFNetwork/1125.2 Darwin/19.5.0 os/ios model/iPhone 11 mobi_app/iphone osVer/13.4.5 network/1",
        },
        KAAASS: {
            KAAASS: "JSBox-jsTool/0.1 (github:zhuangzhihao-io) <zhuang@zhihao.io>"
        }
    },
    URL = {
        KAAASS: {
            MY_INFO: "https://api.kaaass.net/biliapi/user/info",
            REFRESH_TOKEN: "https://api.kaaass.net/biliapi/user/refreshToken",
            SIGN_URL: "https://api.kaaass.net/biliapi/urlgen"
        },
        USER: {
            MY_INFO: "https://app.bilibili.com/x/v2/account/mine",
        },
        LIVE: {
            CHECK_IN: "https://api.live.bilibili.com/rc/v1/Sign/doSign?access_key=",
            SILVER_TO_COIN: "https://api.live.bilibili.com/pay/v1/Exchange/silver2coin"
        },
        COMIC: {
            CHECK_IN: "https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn",
            COMIC_DETAIL: "https://manga.bilibili.com/twirp/comic.v1.Comic/ComicDetail"
        },
    };
module.exports = {
    UA,
    URL
};