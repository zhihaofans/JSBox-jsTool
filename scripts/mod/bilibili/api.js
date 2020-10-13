let http = require("../../libs/http");
module.exports = {
    Comic,
    Live,
    User,
    getApiJson,
    getAwait: http.getAwait,
    postAwait: http.postAwait
};
let getApiJson = () => {
    try {
        const fileData = $file.read("/assets/bilibili/api.json");
        return JSON.parse(fileData);
    } catch (_error) {
        $console.error(_error);
        return undefined;
    }
};
class User {
    constructor() {
        this.MY_INFO = "https://app.bilibili.com/x/v2/account/mine";
    }
}
class Live {
    constructor() {
        this.SIGN_IN =
            "https://api.live.bilibili.com/rc/v1/Sign/doSign?access_key=";
    }
}
class Comic {
    constructor() {
        this.COMIC_CHECK_IN =
            "https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn";
    }
}