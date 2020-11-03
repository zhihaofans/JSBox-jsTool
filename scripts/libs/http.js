let getAwait = async (url, headerList = undefined) => {
    if (url) {
        const result = $http.get({
            url: url,
            timeout: 5,
            header: headerList
        });
        return result;
    } else {
        return undefined;
    }
};

let postAwait = async (url, postBody, headerList = undefined) => {
    if (url) {
        const result = $http.post({
            url: url,
            header: headerList,
            timeout: 5,
            body: postBody
        });
        return result;
    } else {
        return undefined;
    }
};
module.exports = {
    getAwait,
    postAwait
};