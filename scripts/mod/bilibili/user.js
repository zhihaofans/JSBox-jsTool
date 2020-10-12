let $B_database = require("./data_base");
let $B_cache = new $B_database.Cache();
module.exports = {
    Auth,
    Info
};
class Auth {
    isLogin() {
        const access_key = this.accessKey();
        return access_key ? true : false;
    }

    accessKey(access_key = undefined) {
        if (access_key) {
            $B_cache.accessKey(access_key);
        } else {
            return $B_cache.accessKey();
        }
    }
    uid(uid = undefined) {
        if (uid) {
            $B_cache.uid(uid);
        } else {
            return $B_cache.uid();
        }
    }
}
class Info {
    getMyInfo() {
        const $B_auth = new Auth();
        const access_key = $B_auth.accessKey();
        if (access_key) {
            return "";
        } else {
            return undefined;
        }
    }
}