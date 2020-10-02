let http = require("../../api/libs/http");
module.exports = {
    getApiJson,
    http
};
let getApiJson = () => {
    try {
        const fileData = $file.read("/assets/api.json");
        return JSON.parse(fileData);
    } catch (_error) {
        $console.error(_error);
        return undefined;
    }
}