let _Live = require("./live"),
  _Comic = require("./comic"),
  _User = require("./user"),
  Live = {
    checkIn: _Live.User.checkIn,
    autoCheckIn: _Live.User.autoCheckIn,
    silver2coin: _Live.User.silver2coin,
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
