let _apple = require("./urlData.js").APPLE;

function myGet(url) {
    return $http.get({
        url: url
    })
    /* .then(function (resp) {
            var data = resp.data;

        }); */
}

function iosRank(mode) {
    const _ios_rank = _apple.IOS_APP_STORE_RANK;
    switch (mode) {
        case "FREE_APP":
            return myGet(_ios_rank.FREE_APP);
        case "PAID_APP":
            return myGet(_ios_rank.PAID_APP);
        case "GROSSING_APP":
            return myGet(_ios_rank.GROSSING_APP);
        default:
            $ui.alert({
                title: "iosRank error",
                message: "mode error",
            });
            return undefined;
    }
}