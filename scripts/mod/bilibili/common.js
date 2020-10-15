module.exports = {
    Comic,
    Common,
    Live,
    User,
    getAwait: $B_api.getAwait,
    postAwait: $B_api.postAwait,
    Cache: $_DB.Cache
};
let $B_useragent = require("./user_agent"),
    $B_api = require("./api"),
    $_DB = require("./data_base");
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
class Common {
    constructor() {
        this._UA = new $B_useragent.Common();
        this._API = new $B_api.Common();
    }
}