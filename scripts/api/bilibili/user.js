let sys = require("../system.js"),
    cheerio = require("cheerio"),
    _URL = require("../urlData.js"),
    _BILIURL = require("../urlData.js").BILIBILI,
    appScheme = require("../app_scheme.js"),
    _UA = require("../user-agent.js");

var access_key = "",
    loginData = {},
    uid = 0


function getLoginData() {

}

function checkAccessKey() {
    return getAccessKey() ? true : false;
}

function getAccessKey() {
    return access_key;
}

module.exports = {
    checkAccessKey,
    getAccessKey,
};