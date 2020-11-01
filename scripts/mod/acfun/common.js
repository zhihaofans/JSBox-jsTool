let http = require("../../libs/http");
let APP_VERSION = "6.33.0.433",
    USER_AGENT = {
        APP_IOS: "AcFun/6.33.0 (iPhone; iOS 14.2; Scale/2.00)"
    };
let HEADERS = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": USER_AGENT.APP_IOS,
    deviceType: 0,
    market: "appstore",
    appVersion: APP_VERSION
};
module.exports = {
    getAwait: http.getAwait,
    postAwait: http.postAwait,
    USER_AGENT,
    HEADERS
};