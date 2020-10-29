let getAwait = async (url, headerList = undefined) => {
    const result = $http.get({
        url: url,
        timeout: 10,
        header: headerList
    });
    return result;
};

let postAwait = async (url, postBody, headerList = undefined) => {
    const result = $http.post({
        url: url,
        header: headerList,
        timeout: 10,
        body: postBody
    });
    return result;
};
module.exports = {
    getAwait,
    postAwait
};