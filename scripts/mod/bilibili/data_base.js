let Cache = {
    ACCESS_KEY: "MOD_BILIBILI_ACCESS_KEY",
    UID: "MOD_BILIBILI_UID",
    accessKey: (access_key = undefined) => {
        if (access_key) {
            $cache.set(Cache.ACCESS_KEY, access_key);
        }
        return $cache.get(Cache.ACCESS_KEY);
    },
    uid: (uid = undefined) => {
        if (uid) {
            $cache.set(Cache.UID, uid);
        }
        return $cache.get(Cache.UID);
    }
};
module.exports = {
    Cache
};