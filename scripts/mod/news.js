let fileUtil = require("/scripts/api/file");
let newsDir = "./news/";
function init() {}
function getNewsList() {
    const newsList = fileUtil.getFileList(newsDir, "js");
}
module.exports = {
    init
};