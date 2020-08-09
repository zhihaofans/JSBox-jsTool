function getViewer(uid) {
    $ui.loading(true);
    $http.get({
        url: `https://api.neeemooo.com/viewer/${uid}`,
        header: {
            origin: "https://matsuri.icu/"
        },
        handler: resp => {
            var result = resp.data;
            $console.info(result);
            $ui.loading(false);
            if (result.status == 0) {
                showViewerList(result.data);
            } else {
                $ui.alert({
                    title: "错误",
                    message: result.message || "未知错误",
                    actions: [
                        {
                            title: "OK",
                            disabled: false, // Optional
                            handler: function() {}
                        }
                    ]
                });
            }
        }
    });
}
function showViewerList(viewerData) {
    $console.info(viewerData);
    const userInfo = viewerData[0].full_comments[0];
    $ui.push({
        props: {
            title: userInfo.username || `uid:${userInfo.user_id}`
        },
        views: [
            {
                type: "list",
                props: {
                    data: viewerData.map(x => {
                        return {
                            title: x.clip_info.name,
                            rows: [x.clip_info.title]
                        };
                    })
                },
                layout: $layout.fill,
                events: {
                    didSelect: function(_sender, indexPath, _data) {
                        const section = indexPath.section;
                        const row = indexPath.row;
                        const thisLive = viewerData[section];
                        //                        $ui.alert({
                        //                            title: "",
                        //                            message: thisLive,
                        //                            actions: [
                        //                                {
                        //                                    title: "OK",
                        //                                    disabled: false, // Optional
                        //                                    handler: function() {}
                        //                                }
                        //                            ]
                        //                        });
                        showViewerDanmu(thisLive);
                    }
                }
            }
        ]
    });
}
function showViewerDanmu(liveData) {
    const clipData = liveData.clip_info;
    const danmuList = liveData.full_comments;
    $ui.push({
        props: {
            title: clipData.title
        },
        views: [
            {
                type: "list",
                props: {
                    data: danmuList.map(danmu => danmu.text)
                },
                layout: $layout.fill,
                events: {
                    didSelect: function(_sender, indexPath, _data) {
                        const section = indexPath.section;
                        const row = indexPath.row;
                    }
                }
            }
        ]
    });
}
function init() {
    $input.text({
        placeholder: "",
        text: "",
        handler: input => {
            if (input) {
                getViewer(input);
            } else {
                $ui.error("请输入uid");
            }
        }
    });
}
module.exports = {
    init
};