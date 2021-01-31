let appScheme = require("AppScheme"),
    openAppThread = t => {
        appScheme.Social.adaoThread(t);
    };
module.exports = {
    openAppThread
};