let { Browser } = require("AppScheme"),
    cheerio = require("cheerio"),
    cacheId = "tophub_cookies_itc_center_user";

function ResultItem(_title, _subtitle, _link) {
    this.title = _title;
    this.subtitle = _subtitle;
    this.link = _link;
}

function getWeb(authkey) {
    $ui.loading(true);
    $http
        .get({
            url: "https://tophub.today/dashboard",
            header: {
                Cookie: `itc_center_user=${authkey}`,
                "User-Agent":
                    "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36"
            }
        })
        .then(function (resp) {
            var httpData = resp.data;
            if (httpData) {
                const $ = cheerio.load(httpData);
                var resultList = [];
                $("div.weui-panel__bd")
                    .find("a.weui-media-box.weui-media-box_appmsg")
                    .each(function (i, elem) {
                        var sub = $(this).find("p.weui-media-box__desc").text();
                        sub = sub.substring(1, sub.indexOf(" ", 1));
                        const media_item = new ResultItem(
                            $(this)
                                .find(
                                    "div.weui-media-box__bd > h4.weui-media-box__title"
                                )
                                .text(),
                            sub,
                            $(this).attr("href")
                        );
                        resultList[i] = media_item;
                    });
                $console.info(`resultList.length:${resultList.length}`);
                if (resultList.length > 0) {
                    $ui.loading(false);
                    $ui.push({
                        props: {
                            title: ""
                        },
                        views: [
                            {
                                type: "list",
                                props: {
                                    data: resultList.map(
                                        i => `[${i.subtitle}]${i.title}`
                                    )
                                },
                                layout: $layout.fill,
                                events: {
                                    didSelect: function (
                                        _sender,
                                        indexPath,
                                        _data
                                    ) {
                                        const row = indexPath.row;
                                        Browser.Safari.ReadMode(
                                            resultList[row].link
                                        );
                                    }
                                }
                            }
                        ]
                    });
                } else {
                    $ui.loading(false);
                    $ui.error("空白结果");
                }
            } else {
                $ui.loading(false);
                $ui.error("返回空白内容");
            }
        });
}

function init() {
    const authkey = $cache.get(cacheId);
    if (authkey) {
        getWeb(authkey);
    } else {
        $ui.alert({
            title: "未设置用户数据",
            message: "请输入itc_center_user的值",
            actions: [
                {
                    title: "输入",
                    disabled: false,
                    handler: function () {
                        $input.text({
                            placeholder: "itc_center_user",
                            handler: function (text) {
                                if (text && text.length > 0) {
                                    $cache.set(cacheId, text);
                                    $ui.success("保存完毕");
                                } else {
                                    $ui.error("未输入");
                                }
                            }
                        });
                    }
                },
                {
                    title: "不了",
                    disabled: false,
                    handler: function () {}
                }
            ]
        });
    }
}
module.exports = {
    getWeb,
    init
};