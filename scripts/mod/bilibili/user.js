const $B_cache = require("./cache");
module.exports = {
    Info,
    Login
};
class Login {
    isLogin() {
        const access_key = this.accessKey();
        if (access_key) {
            return true;
        } else {
            return false;
        }
    }

    accessKey(access_key = undefined) {
        if (access_key) {
            $cache.set(this.cache_id.ACCESS_KEY, access_key);
        } else {
            return $cache.get(this.cache_id.ACCESS_KEY);
        }
    }
}
class Info {
    getMyInfo() {
        const $B_login = new Login();
        if ($B_login.isLogin()) {
            const accessKey = this.$B_login.accessKey();
            return "";
        } else {
            return undefined;
        }
    }
}