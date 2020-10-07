const $$http = require("/scripts/libs/http");
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
    $$Login = new Login();
    getMyInfo() {
        if ($$Login.isLogin()) {
            const accessKey = this.$$Login.accessKey();
            return "";
        } else {
            return undefined;
        }
    }
}