let pref_cache_list = {
    "mod.bilibili.access_key": "MOD_BILIBILI_ACCESS_KEY",
    "mod.bilibili.uid": "MOD_BILIBILI_UID",
    "mod.acfun.cookies": "MOD_ACFUN_COOKIES",
    "mod.acfun.uid": "MOD_ACFUN_UID"
};
let initPrefs = () => {
    initPrefByList(pref_cache_list);
}
let initPrefByList = (_list) => {
    Object.keys(_list).map(_k => {
        $prefs.set(_k, $cache.get(_list[_k]) || "");
    });
}
let updatePrefs = () => {
    updatePrefByList(pref_cache_list);
}
let updatePrefByList = (_list) => {
    Object.keys(_list).map(_k => {
        $cache.set(_list[_k], $prefs.get(_k) || "");
    });
}

module.exports = {
    initPrefs,
    updatePrefs
};