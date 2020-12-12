let _Live = require("./live"),
    _LiveUser = new _Live.User(),
    _Comic = require("./comic"),
    Live = {
        checkIn: _LiveUser.checkIn,
        silver2coin: _LiveUser.silver2coin
    },
    Comic = {
        checkIn: _Comic.User.checkIn
    };
module.exports = {
    Comic,
    Live
};