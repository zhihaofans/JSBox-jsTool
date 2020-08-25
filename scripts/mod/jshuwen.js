let cheerio = require("cheerio"),
    _URL = require("/scripts/api/urlData.js"),
    appScheme = require("/scripts/api/app_scheme.js");

function linkItem(_title, _link) {
    this.title = _title;
    this.link = _link;
}
let getList = (page = 1) => {
    $ui.loading(true);
    $http
        .get({
            url: _URL.JISHUWEN.MAIN + page
        })
        .then(function(resp) {
            if (resp.error) {
                $ui.loading(false);
                $ui.error("加载失败!");
            } else {
                var data = resp.data;
                if (data) {
                    const $ = cheerio.load(data);
                    let linkList = [];
                    $("div.aricle_item_info > div.title > a").each(function(
                        i,
                        elem
                    ) {
                        const thisLink = $(elem)
                            .attr("href")
                            .startsWith("/d/")
                            ? `https://www.jishuwen.com${$(elem).attr("href")}`
                            : $(elem).attr("href");
                        linkList.push(new linkItem($(elem).text(), thisLink));
                    });
                    $console.info(linkList);
                    $ui.loading(false);
                    $ui.push({
                        props: {
                            title: "技术文"
                        },
                        views: [
                            {
                                type: "list",
                                props: {
                                    data: linkList.map(i => i.title),
                                    menu: {
                                        title: "测试功能",
                                        items: [
                                            {
                                                title: "添加到Safari阅读列表",
                                                symbol: "book",
                                                handler: (
                                                    sender,
                                                    indexPath
                                                ) => {
                                                    const thisItem =
                                                        linkList[indexPath.row];
                                                    appScheme.safariAddReadingItem(
                                                        thisItem.link,
                                                        thisItem.title,
                                                        thisItem.title
                                                    );
                                                }
                                            },
                                            {
                                                title: "预览模式",
                                                symbol: "book",
                                                handler: (
                                                    sender,
                                                    indexPath
                                                ) => {
                                                    const thisItem =
                                                        linkList[indexPath.row];
                                                    $ui.preview({
                                                        title: "技术文",
                                                        url: thisItem.link
                                                    });
                                                }
                                            }
                                        ]
                                    }
                                },
                                layout: $layout.fill,
                                events: {
                                    didSelect: function(
                                        _sender,
                                        indexPath,
                                        _data
                                    ) {
                                        const thisItem =
                                            linkList[indexPath.row];
                                        $console.info(thisItem.link);
                                        appScheme.safariReadMode(thisItem.link);
                                    }
                                }
                            }
                        ]
                    });
                } else {
                    $ui.loading(false);
                    $ui.error("加载失败");
                }
            }
        });
};

module.exports = {
    getList,
    init: getList
};