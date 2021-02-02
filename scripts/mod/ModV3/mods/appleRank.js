let _apple = {
        IOS_APP_STORE_RANK: {
            HOST: "https://itunes.apple.com/",
            FREE_APP: "/rss/topfreeapplications/limit=100/genre=25129/json",
            PAID_APP: "/rss/toppaidapplications/limit=100/genre=25129/json",
            GROSSING_APP:
                "/rss/topgrossingapplications/limit=100/genre=25129/json"
        }
    },
    regionCodeList = [
        {
            title: "中国大陆",
            id: "cn"
        },
        {
            title: "美国",
            id: "us"
        }
    ],
    regionList = getRegionCode(),
    rankResultItem = (_title, _url, _icon = undefined) => {
        this.title = _title;
        this.url = _url;
        this.icon = _icon;
    },
    myGet = url => {
        return $http.get({
            url: url
        });
    };
function iosRank(mode, region = "cn") {
    const IOS_RANK = _apple.IOS_APP_STORE_RANK;
    switch (mode) {
        case "FREE_APP":
            return myGet(IOS_RANK.HOST + region + IOS_RANK.FREE_APP);
        case "PAID_APP":
            return myGet(IOS_RANK.HOST + region + IOS_RANK.PAID_APP);
        case "GROSSING_APP":
            return myGet(IOS_RANK.HOST + region + IOS_RANK.GROSSING_APP);
        default:
            $ui.alert({
                title: "iosRank error",
                message: "mode error"
            });
            return undefined;
    }
}
function RegionCode(_title, _id) {
    this.title = _title;
    this.id = _id;
}
function getRegionCode() {
    return regionCodeList.map(i => new RegionCode(i.title, i.id));
}
function showResultList(mode) {
    $ui.loading(true);
    $ui.menu({
        items: regionList.map(i => i.title),
        handler: (title, idx) => {
            iosRank(mode, regionList[idx].id).then(function (resp) {
                var data = resp.data;
                if (data) {
                    const resultData = data.feed;
                    const rankResultList = resultData.entry.map(
                        item =>
                            new rankResultItem(
                                item.title.label,
                                item.id.label,
                                item["im:image"][0].label
                            )
                    );
                    $ui.loading(false);
                    $ui.push({
                        props: {
                            title: resultData.title.label.replace(
                                "iTunes Store：",
                                ""
                            )
                        },
                        views: [
                            {
                                type: "list",
                                props: {
                                    data: rankResultList.map(item => item.title)
                                },
                                layout: $layout.fill,
                                events: {
                                    didSelect: function (
                                        _sender,
                                        indexPath,
                                        _data
                                    ) {
                                        $app.openURL(
                                            rankResultList[indexPath.row].url
                                        );
                                    }
                                }
                            }
                        ]
                    });
                } else {
                    $ui.loading(false);
                    $ui.error("错误数据");
                }
            });
        }
    });
}

function init() {
    $ui.push({
        props: {
            title: "App store排行榜"
        },
        views: [
            {
                type: "list",
                props: {
                    data: [
                        {
                            title: "iOS",
                            rows: ["免费APP", "收费APP", "畅销APP"]
                        }
                    ]
                },
                layout: $layout.fill,
                events: {
                    didSelect: function (_sender, indexPath, _data) {
                        const section = indexPath.section;
                        const row = indexPath.row;
                        switch (section) {
                            case 0:
                                // iOS
                                switch (row) {
                                    case 0:
                                        showResultList("FREE_APP");
                                        break;
                                    case 1:
                                        showResultList("PAID_APP");
                                        break;
                                    case 2:
                                        showResultList("GROSSING_APP");
                                        break;
                                    default:
                                        $ui.error("未知错误");
                                }
                        }
                    }
                }
            }
        ]
    });
}

module.exports = {
    init
};