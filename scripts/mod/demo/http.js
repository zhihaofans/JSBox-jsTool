let init = async () => {
    let $$ = require("$$"),
        httpGet = await $$.Http.getAwait("https://httpbin.org/get");
    if (httpGet.error) {
        $ui.loading(false);
        $console.error(httpGet.error);
    }
    $console.info(httpGet.data);
};
module.exports = {
    init
};