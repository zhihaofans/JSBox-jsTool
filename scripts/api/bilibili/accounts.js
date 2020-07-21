function getAccesskeyList(uid) {
    const cacheId = "BILIBILI_ACCOUNTS_ACCESS_KEY";
    const aak = $cache.get(cacheId);
    if (aak) {
        const aakl = JSON.parse(aak);
        if (aakl) {
            if (aakl[uid]) {
                return aakl[uid];
            } else {
                setAccesskeyList(uid, []);
                return [];
            }
        } else {
            return null;
        }
    } else {
        setAccesskeyList(uid, []);
        return [];
    }
}

function setAccesskeyList(uid, access_key_list) {
    const cacheId = "BILIBILI_ACCOUNTS_ACCESS_KEY";
    var aak = $cache.get(cacheId);
    aak[uid] = access_key_list;
    $cache.set(cacheId, aak);
}

function addAccesskey(uid, access_key) {
    var old_list = getAccesskeyList(uid);
    if (old_list == null) {
        old_list = [access_key];
    } else {
        old_list.push(access_key);
    }
    setAccesskeyList(old_list);
}