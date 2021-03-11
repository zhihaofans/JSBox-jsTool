let $$ = require("$$"),
    // Bilibili
    isBilibiliVideoUrl = url => {
        return (
            /https:\/\/www.bilibili.com\/av(.+?)/.test(url) ||
            /https:\/\/www.bilibili.com\/video\/av(.+?)/.test(url)
        );
    },
    isBilibiliUrl = url => {
        return url ? isBilibiliVideoUrl(url) : false;
    },
    // Acfun
    acVideoSiteList = [
        "acfun://detail/upPage/",
        "https://www.acfun.cn/v/ac",
        "https://m.acfun.cn/v/?"
    ],
    acUploaderSiteList = [
        "https://www.acfun.cn/u/",
        "https://m.acfun.cn/upPage/"
    ],
    getAcfunVideoUrlList = () => {
        return acVideoSiteList;
    },
    getAcfunUploaderUrlList = () => {
        return acUploaderSiteList;
    },
    isAcfunVideoUrl = url => {
        return $$.Str.startsWithList(url, acVideoSiteList);
        //return url.startsWithList(acVideoSiteList);
    },
    isAcfunUploaderUrl = url => {
        return $$.Str.startsWithList(url, acUploaderSiteList);
        //return url.startsWithList(acUploaderSiteList);
    },
    isAcfunUrl = url => {
        return url ? isAcfunVideoUrl(url) || isAcfunUploaderUrl(url) : false;
    };
module.exports = {
    isBilibiliVideoUrl,
    isBilibiliUrl,
    isAcfunUrl,
    getAcfunUploaderUrlList,
    getAcfunVideoUrlList,
    isAcfunUploaderUrl,
    isAcfunVideoUrl
};
