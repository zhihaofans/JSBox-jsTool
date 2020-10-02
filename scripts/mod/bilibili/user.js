let $DB = require("./data_base");
module.exports = {
    Info,
    Login
};
class Login {
    $DBC = new $DB.Cache();
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
            this.$DB.accessKey(this.cache_id.ACCESS_KEY, access_key);
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