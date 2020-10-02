module.exports = {
    Cache
};
class Cache {
    cache_id = {
        ACCESS_KEY: "BILIBILI_ACCESS_KEY"
    };
    accessKey(access_key = undefined) {
        if (access_key) {
            $cache.set(this.cache_id.ACCESS_KEY, access_key);
        } else {
            return $cache.get(this.cache_id.ACCESS_KEY);
        }
    }
}