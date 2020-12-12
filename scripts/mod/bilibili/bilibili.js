let _Live = require("./live"),
    _Comic = require("./comic"),
    Live = {
        checkIn: _Live.User.checkIn,
        silver2coin: _Live.User.silver2coin
    },
    Comic = {
        checkIn: _Comic.User.checkIn
    };
module.exports = {
    Comic,
    Live
};