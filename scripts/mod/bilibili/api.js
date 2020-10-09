let http = require("/scripts/libs/http");
module.exports = {
    Comic,
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
class Comic {
    constructor() {
        this.COMIC_CHECK_IN =
            "https://manga.bilibili.com/twirp/activity.v1.Activity/ClockIn";
    }
}