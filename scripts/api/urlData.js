let ACFUN = {
        LOGIN: "https://id.app.acfun.cn/rest/app/login/signin",
        GET_USER_INFO: "https://api-new.app.acfun.cn/rest/app/user/personalInfo",
        DOWNLOAD_VIDEO: "https://api-new.app.acfun.cn/rest/app/play/playInfo/mp4",
        GET_VIDEO_INFO: "https://api-new.app.acfun.cn/rest/app/douga/info?dougaId=",
        SIGN_IN: "https://api-new.app.acfun.cn/rest/app/user/signIn",
        GET_UPLOADER_VIDEO: "https://api-new.app.acfun.cn/rest/app/user/resource/query",
        ACFUN_DETAIL_VIDEO: "acfun://detail/video/",
        ACFUN_WWW_V_AC: "https://www.acfun.cn/v/ac",
        ACFUN_M_V_AC: "https://m.acfun.cn/v/?",
        ACFUN_DETAIL_UPPAGE: "acfun://detail/upPage/",
        ACFUN_WWW_UPPAGE: "https://www.acfun.cn/u/",
        ACFUN_M_UPPAGE: "https://m.acfun.cn/upPage/",
        VIDEO_CDN_ALICDN: "http://ali-video.acfun.cn/",
        VIDEO_CDN_TXCDN: "http://tx-video.acfun.cn/",
        ADD_FRIENDS: "https://wpa.qq.com/msgrd?v=3&site=acfun.cn&menu=yes&uin=",
        ACFUN_DETAIL_UPLOADER: "acfun://detail/uploader/"
    },
    API_66MZ8_COM = {
        PHONE_WALLPAPER: "https://api.66mz8.com/api/rand.img.php?type=%E5%A3%81%E7%BA%B8"
    },
    APPLE = {
        IOS_APP_STORE_RANK: {
            HOST: "https://itunes.apple.com/",
            FREE_APP: "/rss/topfreeapplications/limit=100/genre=25129/json",
            PAID_APP: "/rss/toppaidapplications/limit=100/genre=25129/json",
            GROSSING_APP: "/rss/topgrossingapplications/limit=100/genre=25129/json"
        }
    },
    ISOYU = {
        BING: "https://api.isoyu.com/bing_images.php"
    },
    JISHUWEN = {
        MAIN: "https://www.jishuwen.com/?p="
    },
    JSBOX = {
      APP_CONFIG: "https://cdn.jsdelivr.net/gh/zhuangzhihao-io/JSBox-jsTool@master/config.json"
    },
    MEOWV = {
        WALLPAPER: "https://api.meowv.com/wallpaper",
        SOUL: "https://api.meowv.com/soul",
        CAT: "https://api.meowv.com/common/cat"
    },
    TENCENT = {
        ADD_FRIENDS: "https://wpa.qq.com/msgrd?v=3&site=acfun.cn&menu=yes&uin="
    },
    TOPHUB = {
        DASHBOARD: "https://tophub.today/dashboard"
    },
    UPDATE_CONFIG_GITHUB = "https://github.com/zhuangzhihao-io/JSBox-jsTool/raw/master/config.json",
    UPDATE_CONFIG_JSDELIVR = "https://cdn.jsdelivr.net/gh/zhuangzhihao-io/JSBox-jsTool@master/config.json";
module.exports = {
    ACFUN,
    API_66MZ8_COM,
    APPLE,
    ISOYU,
    JISHUWEN,
    JSBOX,
    MEOWV,
    TENCENT,
    TOPHUB,
    UPDATE_CONFIG_GITHUB,
    UPDATE_CONFIG_JSDELIVR
};