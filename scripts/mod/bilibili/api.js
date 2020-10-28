let http = require("../../libs/http");

let getApiJson = () => {
    try {
        const fileData = $file.read("/assets/bilibili/api.json");
        return JSON.parse(fileData);
    } catch (_error) {
        $console.error(_error);
        return undefined;
    }
};
class Common {
    constructor() {
        this.KAAASS_SIGN_URL = "https://api.kaaass.net/biliapi/urlgen";
    }
}
class User {
    constructor() {
        this.MY_INFO = "https://app.bilibili.com/x/v2/account/mine";
    }
}
class Live {
    constructor() {
        this.CHECK_IN = "https://api.live.bilibili.com/rc/v1/Sign/doSign?access_key=";
    }
}
class Comic {
    constructor() {
        this.COMIC_CHECK_IN = "https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn";
        this.COMIC_ = "https://manga.bilibili.com/twirp/comic.v1.Comic/ComicDetail";
    }
}
module.exports = {
    Comic,
    Live,
    User,
    Common,
    getApiJson,
    getAwait: http.getAwait,
    postAwait: http.postAwait
};