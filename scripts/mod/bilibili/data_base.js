module.exports = {
    Cache
};
class CacheId {
    constructor() {
        this.ACCESS_KEY = "BILIBILI_ACCESS_KEY";
        this.UID = "BILIBILI_UID";
    }
}

class Cache {
    accessKey(access_key = undefined) {
        const $B_cacheId = new CacheId();
        if (access_key) {
            $cache.set($B_cacheId.ACCESS_KEY, access_key);
        } else {
            return $cache.get($B_cacheId.ACCESS_KEY);
        }
    }
    uid(uid = undefined) {
        const $B_cacheId = new CacheId();
        if (uid) {
            $cache.set($B_cacheId.UID, uid);
        } else {
            return $cache.get($B_cacheId.UID);
        }
    }
}