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
        LATER_TO_WATCH: "https://api.bilibili.com/x/v2/history/toview?access_key=",
        BILIBILI_VIDEO: "bilibili://video/",
        AV_BV_ONLINE: "http://api.bilibili.com/x/web-interface/archive/stat",
        BILIBILI_WWW_VIDEO: "https://www.bilibili.com/av",
        BILIBILI_SPACE: "https://space.bilibili.com/",
        LIVE_FANS_MEDAL: "https://api.live.bilibili.com/fans_medal/v2/HighQps/received_medals?access_key=",
        LIVE_WEB_ROOM: "https://live.bilibili.com/",
        LIVE_GIFT_SEND: "https://api.live.bilibili.com/gift/v2/live/bag_send",
        DANMUKU_LIST: "https://comment.bilibili.com/",
        B23_TV_VIDEO: "https://b23.tv/av",
        MY_INFO: "https://app.bilibili.com/x/v2/account/mine",
        GET_SIGN_URL: "https://api.kaaass.net/biliapi/urlgene",
        BILIOB: {
            VIDEO: "https://www.biliob.com/video/av",
            API_VIDEO: "https://www.biliob.com/api/video/v2/av"
        },
        BILICHAT: "https://bilichat.3shain.com/gkd/",
        LIVE_ONLINE: "https://api.live.bilibili.com/xlive/app-interface/v1/relation/liveAnchor?access_key=",
        LIVE_OFFLINE: "https://api.live.bilibili.com/xlive/app-interface/v1/relation/unliveAnchor?page=1&pagesize=1000&access_key=",
        LIVE_FANS_MEDAL_WEAR: "https://api.live.bilibili.com/fans_medal/v1/fans_medal/wear_medal",
        API_VTBS_MOE: {
            V1_DETAIL: "https://api.vtbs.moe/v1/detail/",
            WEB_DETAIL: "https://vtbs.moe/detail/"
        }
    },
    BILICHAT = {
        HISTORY: "https://bilichat.3shain.com/api/history",
        DANMUKU: "https://bilichat.3shain.com/gkd/"
    },
    BILIOB = {
        VIDEO: "https://www.biliob.com/video/av",
        API_VIDEO: "https://www.biliob.com/api/video/v2/av"
    },
    ISOYU = {
        BING: "https://api.isoyu.com/bing_images.php"
    },
    JISHUWEN = {
        MAIN: "https://www.jishuwen.com/?p="
    },
    KAAASS = {
        GET_VIDEO_INFO: "https://api.kaaass.net/biliapi/video/info?jsonerr=true&id=",
        GET_ACCESS_KEY: "https://api.kaaass.net/biliapi/user/login?jsonerr=true&direct=true",
        GET_USER_INFO: "https://api.kaaass.net/biliapi/user/info?jsonerr=true",
        GET_VIDEO_DATA: "https://api.kaaass.net/biliapi/video/resolve?jsonerr=true&direct=true",
        GET_SIGN_URL: "https://api.kaaass.net/biliapi/urlgene"
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
    UPDATE_CONFIG_JSDELIVR = "https://cdn.jsdelivr.net/gh/zhuangzhihao-io/JSBox-jsTool@master/config.json",
    VTBS_MOE = {
        V1_DETAIL: "https://api.vtbs.moe/v1/detail/",
        WEB_DETAIL: "https://vtbs.moe/detail/"
    };
module.exports = {
    ACFUN,
    API_66MZ8_COM,
    APPLE,
    BILIBILI,
    BILICHAT,
    BILIOB,
    ISOYU,
    JISHUWEN,
    KAAASS,
    MEOWV,
    TENCENT,
    TOPHUB,
    UPDATE_CONFIG_GITHUB,
    UPDATE_CONFIG_JSDELIVR,
    VTBS_MOE
};