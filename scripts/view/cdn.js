let cdn = require("../api/cdn.js");

let init = () => {
    input($context.link);
};

let getClipboardLink = () => {
    const clipUrl = $clipboard.link;
    return clipUrl ? clipUrl : "";
};

let input = inputUrl => {
    $console.info(inputUrl);
    const sourceUrl = (inputUrl && inputUrl.length > 0) ? inputUrl : getClipboardLink();
    $ui.menu({
        items: [$l10n("IMAGE"), "Github raw"],
        handler: function (title, idx) {
            $input.text({
                type: $kbType.url,
                autoFontSize: true,
                text: sourceUrl,
                placeholder: `(${title})输入源地址`,
                handler: function (text) {
                    if (text.length > 0) {
                        switch (idx) {
                            case 0:
                                showResult(title, cdn.getWeserv(text));
                                break;
                            case 1:
                                showResult(title, cdn.getGithubRaw(text));
                                break;
                            default:
                                $ui.error("Error");
                        }
                    } else {
                        $ui.error("空白内容");
                    }
                }
            });
        }
    });
};

let showResult = (_title, resultUrl) => {
    $ui.alert({
        title: _title,
        message: resultUrl,
        actions: [{
            title: "打开链接",
            disabled: false, // Optional
            handler: function () {
                $ui.menu({
                    items: ["内置浏览器", "Safari"],
                    handler: function (title, idx) {
                        switch (idx) {
                            case 0:
                                $ui.preview({
                                    title: _title,
                                    url: resultUrl
                                });
                                break;
                            case 1:
                                $app.openURL(resultUrl);
                                break;
                            default:
                                $ui.error("Error");
                        }
                    }
                });
            }
        }, {
            title: "分享链接",
            handler: function () {
                $share.sheet([resultUrl]);
            }
        }, {
            title: "复制链接",
            handler: function () {
                $clipboard.text = resultUrl;
                $ui.toast("Copy!");
            }
        }, {
            title: "关闭"
        }]
    });
};
module.exports = {
    init: init
};