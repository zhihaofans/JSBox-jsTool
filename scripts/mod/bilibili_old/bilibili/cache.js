const cacheKey = {
        ACCESS_KEY: "bilibili_access_key",
        UID: "bilibili_uid"
    },
    loadAccesskey = () => {
        return $cache.get(cacheKey.ACCESS_KEY);
    },
    saveAccesskey = access_key => {
        $cache.set(cacheKey.ACCESS_KEY, access_key);
    },
    loadUid = () => {
        return $cache.get(cacheKey.UID);
    },
    saveUid = uid => {
        $cache.set(cacheKey.UID, uid);
    },
    removeLoginCache = () => {
        $cache.remove(cacheKey.ACCESS_KEY);
        $cache.remove(cacheKey.UID);
    };

module.exports = {
    loadAccesskey,
    saveAccesskey,
    loadUid,
    saveUid,
    removeLoginCache
};
