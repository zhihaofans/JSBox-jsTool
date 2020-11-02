let http = require("../../libs/http");
let APP_VERSION = "6.33.1.436",
    IOS_VERSION = $device.info.version,
    USER_AGENT = {
        //APP_IOS: "AcFun/6.33.1 (iPhone; iOS 14.2; Scale/2.00)"
        APP_IOS: `AcFun/${APP_VERSION} (iPhone; iOS ${IOS_VERSION}; Scale/2.00)`
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