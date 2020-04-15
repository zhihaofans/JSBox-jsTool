// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != "undefined" ? args[number] : match;
        });
    };
}
let API_URL = {
        HOME_PAGE: "http://www.dmzj.com/",
        GET_COMIC: "http://v2.api.dmzj.com/comic/{0}.json"
    },
    dmzj_version = "2.7.019";
let myGet = url => {
    return $http.get({
        url: url,
        header: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 Tachiyomi/1.0"
        }
    });
};
let getComicInfo = comicId => {
    myGet(API_URL.GET_COMIC.format(comicId)).then(result => {
        const _data = result.data;
        $console.info(_data);
        if (_data) {
            $ui.alert({
                title: _data.title,
                message: _data,
            });
            $ui.push({
                props: {
                    title: _data.title
                },
                views: [{
                    type: "list",
                    props: {
                        data: [{
                            title: "",
                            rows: []
                        }, ]
                    },
                    layout: $layout.fill,
                    events: {
                        didSelect: function (_sender, indexPath, _data) {
                            const section = indexPath.section;
                            const row = indexPath.row;

                        }
                    }
                }]
            });
        } else {
            $ui.error("加载失败");
        }
    });
};
let init = () => {
    getComicInfo(21202);
};
module.exports = {
    init
};