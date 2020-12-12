let Cache = {
    ACCESS_KEY = "MOD_BILIBILI_ACCESS_KEY",
    UID = "MOD_BILIBILI_UID",
    accessKey = (access_key = undefined) => {
        if (access_key) {
            $cache.set(this.ACCESS_KEY, access_key);
        }
        return $cache.get(this.ACCESS_KEY);
    },
    uid = (uid = undefined) => {
        if (uid) {
            $cache.set(this.UID, uid);
        }
        return $cache.get(this.UID);
    };
};
module.exports = {
    Cache
};