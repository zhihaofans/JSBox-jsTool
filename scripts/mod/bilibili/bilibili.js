const _Live = require("./live"),
  liveUser = require("./live/user"),
  _Comic = require("./comic"),
  Live = {
    checkIn: liveUser.checkIn,
    autoCheckIn: _Live.User.autoCheckIn,
    silver2coin: liveUser.silver2coin,
    autoSilver2coin: _Live.User.autoSilver2coin
  },
  Comic = {
    checkIn: _Comic.User.checkIn,
    autoCheckIn: _Comic.User.autoCheckIn
  },
  User = {};
module.exports = {
  Comic,
  Live,
  User
};
