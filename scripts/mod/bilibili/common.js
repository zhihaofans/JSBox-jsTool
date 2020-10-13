module.exports = {
    Comic
};
let $B_useragent = require("./user_agent");
let $B_api = require("./api");
class Comic {
    constructor() {
        this._UA = new $B_useragent.Comic();

    }
}