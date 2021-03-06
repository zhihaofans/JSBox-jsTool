let pref_cache_list = {
        "mod.bilibili.access_key": "MOD_BILIBILI_ACCESS_KEY",
        "mod.bilibili.uid": "MOD_BILIBILI_UID",
        "mod.bilibili.cookies": "MOD_BILIBILI_COOKIES",
        "mod.acfun.auth.login.id": "MOD_ACFUN_LOGIN_ID",
        "mod.acfun.auth.login.password": "MOD_ACFUN_LOGIN_PASSWORD",
        "mod.acfun.auth.acpasstoken": "MOD_ACFUN_AUTH_ACPASSTOKEN",
        "mod.acfun.auth.acsecurity": "MOD_ACFUN_AUTH_ACSECURITY",
        "mod.acfun.auth.token": "MOD_ACFUN_AUTH_TOKEN",
        "mod.acfun.auth.access_token": "MOD_ACFUN_AUTH_ACCESSTOKEN",
        "mod.acfun.auth.username": "MOD_ACFUN_AUTH_USERNAME",
        "mod.acfun.auth.uid": "MOD_ACFUN_AUTH_UID"
    },
    initPrefs = () => {
        initPrefByList(pref_cache_list);
    },
    initPrefByList = _list => {
        Object.keys(_list).map(_k => {
            $prefs.set(_k, $cache.get(_list[_k]) || "");
        });
    },
    updatePrefs = () => {
        updatePrefByList(pref_cache_list);
    },
    updatePrefByList = _list => {
        Object.keys(_list).map(_k => {
            $cache.set(_list[_k], $prefs.get(_k) || "");
        });
    };

module.exports = {
    initPrefs,
    updatePrefs,
    pref_cache_list
};
