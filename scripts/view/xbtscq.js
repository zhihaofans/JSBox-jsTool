function start1(name, title1, title2) {
    // name:名字，title1:与事情有关的东西，title2:事情
    return (
        "Hi,大家好，这里是" +
        name +
        "。今天，我们来说一下" +
        title1 +
        title2 +
        "这件事。" +
        title1 +
        title2 +
        "是怎么回事呢？" +
        title1 +
        "相信大家都很熟悉，" +
        "但是" +
        title1 +
        title2 +
        "这件事究竟是怎么回事呢？可能有人不理解，" +
        "为什么" +
        title1 +
        "会" +
        title2 +
        "呢？所以，下面就让小编带大家一起了解吧" +
        "$" +
        title1 +
        title2 +
        "这件事吧，" +
        title1 +
        title2 +
        "其实就是" +
        title1 +
        title2 +
        "了。那么" +
        title1 +
        "为什么会" +
        title2 +
        "呢，相信大家都很好奇是怎么回事。大家可能会感到很惊讶，" +
        title1 +
        "怎么会" +
        title2 +
        "呢？" +
        title1 +
        title2 +
        "就是" +
        title1 +
        title2 +
        "啦，这是因为" +
        title1 +
        title2 +
        "就是" +
        title1 +
        title2 +
        "就是小编也感到非常惊讶。那么这就是关于" +
        title1 +
        title2 +
        "的事情了，大家有没有觉得很神奇呢？" +
        "感谢大家阅读小编的文章，谢谢啦。" +
        "如果大家有什么想法和评论，欢迎在文章结尾下方留言。"
    );
}
function init() {
    $input.text({
        placeholder: "name",
        handler: name => {
            if (name.length > 0) {
                $input.text({
                    placeholder: "与事情相关的东西",
                    handler: title1 => {
                        if (title1.length > 0) {
                            $input.text({
                                placeholder: "事情",
                                handler: title2 => {
                                    if (title2.length > 0) {
                                        const result = start1(
                                            name,
                                            title1,
                                            title2
                                        );
                                        $console.info(result);
                                        $ui.alert({
                                            title: "结果",
                                            message: result,
                                            actions: [
                                                {
                                                    title: "OK",
                                                    disabled: false, // Optional
                                                    handler: function() {}
                                                }
                                            ]
                                        });
                                    } else {
                                        $ui.error("空白内容");
                                    }
                                }
                            });
                        } else {
                            $ui.error("空白内容");
                        }
                    }
                });
            } else {
                $ui.error("空白内容");
            }
        }
    });
}
module.exports = {
    init
};