module.exports = {
    Comic,
    Live,
    User
};
let $B_useragent = require("./user_agent");
let $B_api = require("./api");
class Comic {
    constructor() {
        this._UA = new $B_useragent.Comic();
        this._API = new $B_api.Comic();
    }
}
class User {
    constructor() {
        this._UA = new $B_useragent.User();
        this._API = new $B_api.User();
    }
}
class Live {
    constructor() {
        this._UA = new $B_useragent.Live();
        this._API = new $B_api.Live();
    }
}