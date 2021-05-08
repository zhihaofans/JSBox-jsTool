const liveUser = require("./live/user"),
  _Comic = require("./comic"),
  Live = {
    checkIn: liveUser.checkIn,
    autoCheckIn: liveUser.autoCheckIn,
    silver2coin: liveUser.silver2coin,
    autoSilver2coin: liveUser.autoSilver2coin
  },
  Comic = {
    checkIn: _Comic.User.checkIn,
    autoCheckIn: _Comic.User.autoCheckIn
  };
module.exports = {
  Comic,
  Live
};
