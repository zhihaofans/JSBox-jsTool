let sys = require("../system.js"),
    cacheKey = {
        ACCESS_KEY: "bilibili_access_key",
        UID: "bilibili_uid"
    },
    cacheDir = ".cache/bilibili/";
// Access key
function loadAccesskey() {
    return $cache.get(cacheKey.ACCESS_KEY);
}

function saveAccesskey(access_key) {
    $cache.set(cacheKey.ACCESS_KEY, access_key);
}
// Uid
function loadUid() {
    return $cache.get(cacheKey.ACCESS_KEY);
}

function saveUid(uid) {
    $cache.set(cacheKey.UID, uid);
}
// Remove
function removeLoginCache() {
    $cache.remove(cacheKey.ACCESS_KEY);
    $cache.remove(cacheKey.UID);
}
// File cache
function saveCache(mode, str) {
    $file.mkdir(cacheDir + mode);
    return $file.write({
        path: `${cacheDir}${mode}/${sys.getNowUnixTime()}.json`,
        data: $data({
            string: str
        })
    });
}

module.exports = {
    loadAccesskey,
    saveAccesskey,
    loadUid,
    saveUid,
    removeLoginCache,
    saveCache
};