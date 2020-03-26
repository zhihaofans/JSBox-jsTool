let updateConfig = {
    github: "https://github.com/zhuangzhihao-io/JSBox-jsTool/raw/master/config.json",
    jsdelivr: "https://cdn.jsdelivr.net/gh/zhuangzhihao-io/JSBox-jsTool@master/config.json"
}
let checkUpdate = () => {
    getConfigFile(updateConfig.jsdelivr).then(function (resp) {
        var data = resp.data;

    });
};
let getConfigFile = url => {
    return $http.get({
        url: url
    });
    /* .then(function (resp) {
            var data = resp.data;

        }); */
};