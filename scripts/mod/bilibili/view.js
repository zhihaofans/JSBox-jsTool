let $_User = require("./user"),
    $_CheckIn = require("./check_in");

module.exports = {
    User: $_User.View,
    CheckIn: $_CheckIn.initView
};