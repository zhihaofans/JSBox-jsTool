let Cache = {
    ACCESS_KEY: "MOD_BILIBILI_ACCESS_KEY",
    UID: "MOD_BILIBILI_UID",
    COOKIES: "MOD_BILIBILI_COOKIES",
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
    },
    cookies: (cookies = undefined) => {
        if (cookies) {
            $cache.set(Cache.COOKIES, cookies);
        }
        return $cache.get(Cache.COOKIES);
    }
};
module.exports = {
    Cache
};