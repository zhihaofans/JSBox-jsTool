let page = require("./scripts/page_init"),
    main = require("./scripts/view/main");

function checkCacheDir() {
    const cacheDir = ".cache/";
    if (!$file.exists(cacheDir)) {
        $file.mkdir(cacheDir);
    } else if (!$file.isDirectory(cacheDir)) {
        $file.delete(cacheDir);
        $file.mkdir(cacheDir);
    }
    return $file.write({
        path: `${cacheDir}这个文件夹用来存成功请求的数据.txt`,
        data: $data({
            string: "这个文件夹用来存成功请求的数据"
        })
    });
}

function init() {
    var query = $context.query;
    if (query.mod) {
        page.contextOpen(query);
    } else if ($context.link) {
        page.gotoUrl($context.link);
    } else {
        if (!checkCacheDir()) {
            $console.error("初始化缓存目录失败");
        }
        main.loadMainView();
    }
}
init();