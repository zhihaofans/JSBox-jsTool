let _Live = require("./live"),
    _Comic = require("./comic"),
    _User = require("./user"),
    Live = {
        checkIn: _Live.User.checkIn,
        silver2coin: _Live.User.silver2coin
    },
    Comic = {
        checkIn: _Comic.User.checkIn
    },
    User = {
        vipMonthCheckIn: _User.Info.vipMonthCheckIn
    };
module.exports = {
    Comic,
    Live,
    User
};