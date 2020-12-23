let appScheme = require("AppScheme"),
    openAppThread = t => {
        appScheme.adaoThread(t);
    };
module.exports = {
    openAppThread
};