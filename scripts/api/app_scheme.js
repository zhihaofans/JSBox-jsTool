//Alook浏览器
let alookBrowserOpen = url => {
    $app.openURL(`Alook://${$text.URLEncode(url)}`);
};
let alookBrowserDownload = url => {
    $app.openURL(`Alook://download/${$text.URLEncode(url)}`);
};
// Chrome (使用jsbox接口)
let chromeBrowserOpen = url => {
    $app.openBrowser({
        type: 10000,
        url: url
    });
};
// QQ浏览器 (使用jsbox接口)
let qqBrowserOpen = url => {
    $app.openBrowser({
        type: 10003,
        url: url
    });
};
// 火狐浏览器 (使用jsbox接口)
let firefoxBrowserOpen = url => {
    $app.openBrowser({
        type: 10002,
        url: url
    });
};
// Safari
let safariPreview = url => {
    $safari.open({
        url: url
    });
};
let safariReadMode = (url, handler) => {
    $safari.open({
        url: url,
        entersReader: true,
        handler: handler
    });
};
let safariAddReadingItem = (url, title, previewText) => {
    $safari.addReadingItem({
        url: url,
        title: title,
        preview: previewText
    });
};
let safariOpen = (url, entersReader = false, height = 360, handler) => {
    $safari.open({
        url: url,
        entersReader: entersReader,
        height: height,
        handler: handler
    });
};
// Avplayer 视频播放器
let avplayerVideo = url => {
    $app.openURL(`AVPlayer://${$text.URLEncode(url)}`);
};
// nPlayer 视频播放器
let nplayerVideo = url => {
    $app.openURL(`nplayer-${url}`);
};
// Documents 文件管理器
let documentsOpen = url => {
    $app.openURL(`r${url}`);
};
// Bilibili
let bilibiliVideo = vid => {
    $app.openURL(getBilibiliVideoUrl(vid));
};
let getBilibiliVideoUrl = vid => {
    return `bilibili://video/${vid}`;
};
// Acfun
let acfunVideo = vid => {
    $app.openURL(getAcfunVideoUrl(vid));
};
let getAcfunVideoUrl = vid => {
    return `acfun://detail/video/${vid}`;
};
let getAcfunVideoWebUrl = vid => {
    return `https://www.acfun.cn/v/ac${vid}`;
};
// PPHub
let pphubOpenUser = user => {
    $app.openURL(`pphub://user?login=${user}`);
};
let pphubOpenRepository = (user, repository) => {
    $app.openURL(`pphub://repo?owner=${user}&repo=${repository}`);
};
module.exports = {
    alookBrowserOpen,
    chromeBrowserOpen,
    qqBrowserOpen,
    alookBrowserDownload,
    firefoxBrowserOpen,
    safariReadMode,
    safariAddReadingItem,
    avplayerVideo,
    nplayerVideo,
    documentsOpen,
    safariPreview,
    bilibiliVideo,
    getBilibiliVideoUrl,
    acfunVideo,
    getAcfunVideoUrl,
    getAcfunVideoWebUrl,
    safariOpen,
    pphubOpenUser,
    pphubOpenRepository
};