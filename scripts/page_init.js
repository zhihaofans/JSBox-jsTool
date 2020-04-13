$include("./api/codePrototype.js");

// 模块
let urlCheck = require("./api/urlCheck.js"),
    mofish = require("./view/mofish.js"),
    cdn = require("./view/cdn.js"),
    kuaidi = require("./view/kuaidi.js"),
    smmsv2 = require("./view/sm_ms_v2.js"),
    image = require("./view/image.js"),
    bilibili = require("./view/bilibili.js"),
    musicSearch = require("./view/music_search.js"),
    zhihuDaily = require("./view/zhihu_daily.js"),
    acfun = require("./view/acfun.js"),
    instagram = require("./view/instagram.js"),
    freeSms = require("./view/free_sms_getter.js"),
    weather = require("./view/weather.js"),
    misc = require("./view/misc.js"),
    dmzj = require("./api/dmzj.js"),
    dailyCheckin = require("./view/daily_check_in.js"),
    jshuwen = require("./view/jshuwen.js");

let gotoUrl = url => {
    const newUrl = $text.URLDecode(url);
    if (newUrl.checkIfUrl()) {
        checkMod(newUrl);
    } else {
        $ui.alert({
            title: "内容错误",
            message: "不是完整链接"
        });
    }
};
let checkMod = url => {
    if (urlCheck.isBilibiliUrl(url)) {
        modOpen("bilibili", url);
    } else if (urlCheck.isAcfunUrl(url)) {
        modOpen("acfun", url);
    } else {
        $ui.error("不支持该网址的分享");
    }
};
let modOpen = (mod, url) => {
    switch (mod) {
        case "bilibili":
            bilibili.init(url);
            break;
        case "acfun":
            acfun.init(url);
            break;
        case "instagram":
            instagram.init(url);
            break;
        default:
            $ui.error("不支持该功能");
    }
};
let contextOpen = query => {
    switch (query.mod) {
        case "url":
            if (query.url) {
                gotoUrl(query.url);
            } else {
                $ui.alert({
                    title: "外部调用错误",
                    message: "空白url"
                });
            }
            break;
        case "mofish":
            mofish.init(true);
            break;
        default:
            $ui.alert({
                title: "外部调用错误",
                message: "发现未支持的外部调用"
            });
    }
};
let scanQrcodeToGo = () => {
    $qrcode.scan({
        handler(str) {
            if (str.checkIfUrl()) {
                gotoUrl(str);
            } else {
                $ui.error("不是链接");
            }
        },
        cancelled() {
            $ui.error("Cancelled");
        }
    });
};
module.exports = {
    mofish: mofish.init,
    cdn: cdn.init,
    kuaidi: kuaidi.init,
    smms: smmsv2.init,
    image: image.init,
    bilibili: bilibili.init,
    musicSearch: musicSearch.init,
    zhihuDaily: zhihuDaily.init,
    acfun: acfun.init,
    instagram: instagram.init,
    freeSms: freeSms.init,
    weather: weather.init,
    misc: misc.initListView,
    jshuwen: jshuwen.getList,
    dailyCheckin: dailyCheckin.initView,
    dmzj: dmzj.init,
    contextOpen,
    gotoUrl,
    scanQrcodeToGo
};