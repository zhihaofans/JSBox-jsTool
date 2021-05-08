const liveUser = require("./live/user"),
  comicUser = require("./comic/user"),
  Live = {
    checkIn: liveUser.checkIn,
    autoCheckIn: liveUser.autoCheckIn,
    silver2coin: liveUser.silver2coin,
    autoSilver2coin: liveUser.autoSilver2coin
  },
  Comic = {
    checkIn: comicUser.checkIn,
    autoCheckIn: comicUser.autoCheckIn
  };
module.exports = {
  Comic,
  Live
};
