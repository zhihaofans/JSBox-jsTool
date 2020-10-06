let http = require("/scripts/libs/http");
module.exports = {
    getApiJson,
    getAwait: http.getAwait,
    postAwait: http.postAwait
};
let getApiJson = () => {
    try {
        const fileData = $file.read("/assets/bilibili/api.json");
        return JSON.parse(fileData);
    } catch (_error) {
        $console.error(_error);
        return undefined;
    }
};