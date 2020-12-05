let _User = require("./user"),
    _Daily = new _User.Daily(),
    User = {
        DailyCheckIn: _Daily.checkIn
    };
module.exports = {
    User
};