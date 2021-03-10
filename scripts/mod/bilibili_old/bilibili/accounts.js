const access_key_list_cacheId = `BILIBILI_ACCOUNTS_ACCESS_KEY`,
    getAccessKey = uid => {
        if (uid) {
            const accessKeyList = getAccessKeyList();
            if (accessKeyList) {
                if (uid in accessKeyList) {
                    return accessKeyList[uid];
                } else {
                    $console.error(`getAccesskey:${uid}不存在`);
                }
            } else {
                $console.error(`access_key_list:null`);
            }
        } else {
            $console.error(`uid:null`);
        }
    },
    setAccessKey = (uid, access_key) => {
        if (uid && access_key) {
            let accessKeyList = getAccessKeyList();
            accessKeyList = accessKeyList ? accessKeyList : {};
            $console.info(accessKeyList);
            accessKeyList[uid] = access_key;
            $console.info(accessKeyList);
            setAccessKeyList(accessKeyList);
        } else {
            $console.error(`uid && access_key:null`);
        }
    },
    setAccessKeyList = access_key_list => {
        $console.info(access_key_list);
        $cache.set(access_key_list_cacheId, JSON.stringify(access_key_list));
    },
    getAccessKeyList = () => {
        const accessKeyList = $cache.get(access_key_list_cacheId);
        $console.info(accessKeyList);
        return accessKeyList ? JSON.parse(accessKeyList) : null;
    },
    getUidList = () => {
        const list = getAccessKeyList();
        return list ? Object.keys(list) : [];
    },
    removeAccessKey = uid => {
        let accessKeyList = getAccessKeyList();
        if (accessKeyList) {
            if (uid in accessKeyList) {
                $console.info(accessKeyList);
                delete accessKeyList[uid];
                $console.info(accessKeyList);
                setAccessKeyList(accessKeyList);
            } else {
                $console.error(`access_key_list:${uid}不存在`);
            }
        } else {
            $console.error(`access_key_list:null`);
        }
    },
    removeAccessKeyList = () => {
        $cache.remove(access_key_list_cacheId);
    },
    backupAccessKeyList = (cloud = false) => {
        const accessKeyList = getAccessKeyList();
        if (accessKeyList) {
            $console.info(accessKeyList);
            const accessKeyJson = JSON.stringify(accessKeyList);
            if (cloud) {
                $drive.save({
                    data: $data({
                        string: accessKeyJson
                    }),
                    name: `bilibili_accesskey_list_backup_${$$.Time.getNowUnixTime()}.json`,
                    handler: function () {
                        $ui.alert({
                            title: "保存完毕",
                            message: "请确认是否保存成功"
                        });
                    }
                });
            } else {
                const saveDir = "/.backup/bilibili/",
                    success = $file.mkdir(saveDir);
                if (success) {
                    const success = $file.write({
                        data: $data({
                            string: accessKeyJson
                        }),
                        path: `${saveDir}bilibili_accesskey_list_backup_${$$.Time.getNowUnixTime()}.json`
                    });
                    $ui.alert({
                        title: "保存完毕",
                        message: success ? "成功" : "失败"
                    });
                } else {
                    $console.error(`backup:创建文件夹失败`);
                }
            }
        } else {
            $console.error(`access_key_list:null`);
        }
    };

module.exports = {
    backupAccessKeyList,
    getAccessKey,
    getAccessKeyList,
    getUidList,
    removeAccessKey,
    removeAccessKeyList,
    setAccessKey,
    setAccessKeyList
};
