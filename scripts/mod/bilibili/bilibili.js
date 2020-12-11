let _Live = require("./live"),
    _LiveUser = new _Live.User(),
    _Comic = require("./comic"),
    _ComicUser = new _Comic.User(),
    Live = {
        checkIn: _LiveUser.checkIn,
        silver2coin: _LiveUser.silver2coin
    },
    Comic = {
        checkIn: _ComicUser.checkIn
    };
module.exports = {
    Comic,
    Live
};