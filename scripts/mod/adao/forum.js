const _URL = require("./api_url"),
    _API = require("./api");
function getForum(forumId) {
    const httpGet = _API.httpGet(_URL.EXT.GET_FORUM + `?page=0&id=${forumId}`);
    $console.info(httpGet);
}
module.exports = {
    getForum
};