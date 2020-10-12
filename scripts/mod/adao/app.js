let appScheme = require("AppScheme");
let openAppThread = t => {
    appScheme.adaoThread(t);
};
module.exports = {
    openAppThread
};