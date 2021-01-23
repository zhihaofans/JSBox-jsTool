let _apple = {
    IOS_APP_STORE_RANK: {
        HOST: "https://itunes.apple.com/",
        FREE_APP: "/rss/topfreeapplications/limit=100/genre=25129/json",
        PAID_APP: "/rss/toppaidapplications/limit=100/genre=25129/json",
        GROSSING_APP: "/rss/topgrossingapplications/limit=100/genre=25129/json"
    }
};
let regionCodeList = [
    {
        title: "中国大陆",
        id: "cn"
    },
    {
        title: "美国",
        id: "us"
    }
];
function myGet(url) {
    return $http.get({
        url: url
    });
    /* .then(function (resp) {
            var data = resp.data;

        }); */
}

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
module.exports = {
    iosRank,
    getRegionCode
};