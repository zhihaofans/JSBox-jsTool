let covid19 = require("../api/covid-19.js");
let initMainList = () => {
    let cacheData = covid19.readCacheData;
    if (cacheData) {

    } else {
        covid19.getRemoteData().then(function (resp) {
            var data = resp.data;
            if (data) {
                $picker.date({
                    handler: function(date) {
                        
                    }
                });
                covid19.saveRemoteData(data) ? $ui.toast("保存成功") : $ui.error("保存失败");


            } else {
                $ui.alert({
                    title: "错误",
                    message: "从服务器获取了空白数据",
                });
            }
        });;
    }
};

module.exports = {
    init: initMainList
};