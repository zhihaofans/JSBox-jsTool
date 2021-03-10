let BILIBILI = {
        GET_VIDEO_INFO:
            "https://api.kaaass.net/biliapi/video/info?jsonerr=true&id=",
        GET_ACCESS_KEY:
            "https://api.kaaass.net/biliapi/user/login?jsonerr=true&direct=true",
        GET_USER_INFO: "https://api.kaaass.net/biliapi/user/info?jsonerr=true",
        GET_VIDEO_DATA:
            "https://api.kaaass.net/biliapi/video/resolve?jsonerr=true&direct=true",
        GET_LIVE_GIFT_LIST:
            "https://api.live.bilibili.com/xlive/app-room/v1/gift/bag_list?access_key=",
        GET_WALLET:
            "https://api.live.bilibili.com/pay/v1/Exchange/getStatus?access_key=",
        SILVER_TO_COIN:
            "https://api.live.bilibili.com/pay/v1/Exchange/silver2coin",
        MANGA_CLOCK_IN:
            "https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn",
        COVER_GALMOE: "https://www.galmoe.com/t.php?aid=",
        VIP_CHECKIN: "https://api.bilibili.com/x/vip/privilege/receive",
        LATER_TO_WATCH:
            "https://api.bilibili.com/x/v2/history/toview?access_key=",
        BILIBILI_VIDEO: "bilibili://video/",
        AV_BV_ONLINE: "http://api.bilibili.com/x/web-interface/archive/stat",
        BILIBILI_WWW_VIDEO: "https://www.bilibili.com/av",
        BILIBILI_SPACE: "https://space.bilibili.com/",
        LIVE_FANS_MEDAL:
            "https://api.live.bilibili.com/fans_medal/v2/HighQps/received_medals?access_key=",
        LIVE_WEB_ROOM: "https://live.bilibili.com/",
        LIVE_GIFT_SEND: "https://api.live.bilibili.com/gift/v2/live/bag_send",
        DANMUKU_LIST: "https://comment.bilibili.com/",
        B23_TV_VIDEO: "https://b23.tv/av",
        MY_INFO: "https://app.bilibili.com/x/v2/account/mine",
        GET_SIGN_URL: "https://api.kaaass.net/biliapi/urlgene",
        BILICHAT: "https://bilichat.3shain.com/gkd/",
        LIVE_ONLINE:
            "https://api.live.bilibili.com/xlive/app-interface/v1/relation/liveAnchor?access_key=",
        LIVE_OFFLINE:
            "https://api.live.bilibili.com/xlive/app-interface/v1/relation/unliveAnchor?page=1&pagesize=1000&access_key=",
        LIVE_FANS_MEDAL_WEAR:
            "https://api.live.bilibili.com/fans_medal/v1/fans_medal/wear_medal",
        UNION_FANS_APPLY_LIST:
            "https://api.live.bilibili.com/activity/v1/UnionFans/getApplyList?page=",
        LIVE_GUARD:
            "https://api.live.bilibili.com/xlive/app-room/v1/guardTab/topList",
        LIVE_FANS_MEDAL_INFO:
            "https://api.live.bilibili.com/xlive/app-room/v1/fansMedal/fans_medal_info?access_key=",
        LIVE_CHECK_IN:
            "https://api.live.bilibili.com/rc/v1/Sign/doSign?access_key="
    },
    BILICHAT = {
        HISTORY: "https://bilichat.3shain.com/api/history",
        DANMUKU: "https://bilichat.3shain.com/gkd/"
    },
    BILIOB = {
        VIDEO: "https://www.biliob.com/video/av",
        API_VIDEO: "https://www.biliob.com/api/video/v2/av"
    },
    GALMOE = {
        COVER_GALMOE: "https://www.galmoe.com/t.php?aid="
    },
    KAAASS = {
        GET_VIDEO_INFO:
            "https://api.kaaass.net/biliapi/video/info?jsonerr=true&id=",
        GET_ACCESS_KEY:
            "https://api.kaaass.net/biliapi/user/login?jsonerr=true&direct=true",
        GET_USER_INFO: "https://api.kaaass.net/biliapi/user/info?jsonerr=true",
        GET_VIDEO_DATA:
            "https://api.kaaass.net/biliapi/video/resolve?jsonerr=true&direct=true",
        GET_SIGN_URL: "https://api.kaaass.net/biliapi/urlgene"
    },
    VTBS_MOE = {
        V1_DETAIL: "https://api.vtbs.moe/v1/detail/",
        WEB_DETAIL: "https://vtbs.moe/detail/"
    };

module.exports = {
    BILIBILI,
    BILICHAT,
    BILIOB,
    GALMOE,
    KAAASS,
    VTBS_MOE
};
