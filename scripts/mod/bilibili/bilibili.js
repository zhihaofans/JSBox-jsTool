let _Live = require("./live"),
    _LiveUser = new _Live.User(),
    Live = {
        checkIn: _LiveUser.checkIn,
        silver2coin: _LiveUser.silver2coin
    };
module.exports = {
    Live
};