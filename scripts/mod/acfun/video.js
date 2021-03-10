let $AC_api = require("./api");
let getUserPostWithoutBanana = uid => {
        $http
            .post({
                url: $AC_api.API_VIDEO.GET_UPLOADER_VIDEO,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: {
                    authorId: uid,
                    count: count,
                    pcursor: page - 1,
                    resourceType: 2,
                    sortType: 3,
                    status: 1
                }
            })
            .then(function (resp) {
                let acData = resp.data;
                if (acData.result === 0) {
                    const feedList = acData.feed;
                    if (feedList.length > 0) {
                        $cache.set(_cacheKey.uploaderVideo_lastUid, uid);
                        $cache.set(
                            _cacheKey.uploaderVideo_lastPage + uid,
                            page
                        );
                        showUploaderVideoList(acData);
                    } else {
                        $ui.error(`第${page}页空白`);
                    }
                } else {
                    $ui.alert({
                        title: `错误代码 ${acData.result}`,
                        message: acData.error_msg
                    });
                }
            });
    },
    getUserPost = uid => {
        $http
            .post({
                url: $AC_api.API_VIDEO.GET_UPLOADER_VIDEO,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: {
                    authorId: uid,
                    count: 100,
                    pcursor: page - 1,
                    resourceType: 2,
                    sortType: 3,
                    status: 1
                }
            })
            .then(function (resp) {
                let acData = resp.data;
                if (acData.result === 0) {
                    const feedList = acData.feed;
                    if (feedList.length > 0) {
                        $cache.set(_cacheKey.uploaderVideo_lastUid, uid);
                        $cache.set(
                            _cacheKey.uploaderVideo_lastPage + uid,
                            page
                        );
                        showUploaderVideoList(acData);
                    } else {
                        $ui.error(`第${page}页空白`);
                    }
                } else {
                    $ui.alert({
                        title: `错误代码 ${acData.result}`,
                        message: acData.error_msg
                    });
                }
            });
    },
    getUploaderVideo = (uid, page = 1, count = 20) => {
        $http
            .post({
                url: _ACFUN.GET_UPLOADER_VIDEO,
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: {
                    authorId: uid,
                    count: count,
                    pcursor: page - 1,
                    resourceType: 2,
                    sortType: 3,
                    status: 1
                }
            })
            .then(function (resp) {
                let acData = resp.data;
                if (acData.result === 0) {
                    const feedList = acData.feed;
                    if (feedList.length > 0) {
                        $cache.set(_cacheKey.uploaderVideo_lastUid, uid);
                        $cache.set(
                            _cacheKey.uploaderVideo_lastPage + uid,
                            page
                        );
                        showUploaderVideoList(acData);
                    } else {
                        $ui.error(`第${page}页空白`);
                    }
                } else {
                    $ui.alert({
                        title: `错误代码 ${acData.result}`,
                        message: acData.error_msg
                    });
                }
            });
    };

module.exports = {
    getUserPostWithoutBanana,
    getUserPost,
    getUploaderVideo
};
