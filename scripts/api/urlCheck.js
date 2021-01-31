let $str = require("../libs/string");
// Bilibili
let isBilibiliVideoUrl = url => {
    return url
        ? url.startsWithList([
              "https://www.bilibili.com/av",
              "https://www.bilibili.com/video/av",
              "https://b23.tv/av"
          ])
        : false;
};
let isBilibiliUrl = url => {
    return url ? isBilibiliVideoUrl(url) : false;
};
// Acfun
let acVideoSiteList = [
    "acfun://detail/upPage/",
    "https://www.acfun.cn/v/ac",
    "https://m.acfun.cn/v/?"
];
let acUploaderSiteList = [
    "https://www.acfun.cn/u/",
    "https://m.acfun.cn/upPage/"
];

let getAcfunVideoUrlList = () => {
    return acVideoSiteList;
};
let getAcfunUploaderUrlList = () => {
    return acUploaderSiteList;
};
let isAcfunVideoUrl = url => {
    return $str.startsWithList(url, acVideoSiteList);
    //return url.startsWithList(acVideoSiteList);
};
let isAcfunUploaderUrl = url => {
    return $str.startsWithList(url, acUploaderSiteList);
    //return url.startsWithList(acUploaderSiteList);
};
let isAcfunUrl = url => {
    return url ? isAcfunVideoUrl(url) || isAcfunUploaderUrl(url) : false;
};
let isInstagramUrl = url => {
    return url ? url.startsWith("https://www.instagram.com/p/") : false;
};
module.exports = {
    isBilibiliVideoUrl,
    isBilibiliUrl,
    isAcfunUrl,
    isInstagramUrl,
    getAcfunUploaderUrlList,
    getAcfunVideoUrlList,
    isAcfunUploaderUrl,
    isAcfunVideoUrl
};