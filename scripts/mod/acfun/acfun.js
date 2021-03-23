let _User = require("./user"),
  User = {
    DailyCheckIn: _User.Daily.checkIn,
    autoCheckIn: _User.Daily.autoCheckIn
  };
module.exports = {
  User
};
