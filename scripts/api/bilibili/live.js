let _BILIURL = require("../urlData.js").BILIBILI,
    _USER = require("./user.js"),
    _UA = require("../user-agent.js");
function wearFanMedal(media_id) {
    const ak = _USER.getAccessKey();
    $http.post({
        url:
            _BILIURL.LIVE_FANS_MEDAL_WEAR +
            `?access_key=${ak}&medal_id=${media_id}`,
        header: {
          "User-Agent":_UA.BILIBILI.APP_IPHONE
        },
        body: {},
        handler: resp => {
            var data = resp.data;
            $console.info(data);
            $ui.alert({
                title: "",
                message: data,
                actions: [
                    {
                        title: "",
                        disabled: false, // Optional
                        handler: function() {}
                    }
                ]
            });
        }
    });
}
module.exports = {
    wearFanMedal
};