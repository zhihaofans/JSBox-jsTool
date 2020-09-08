let getAwait = async (url, headerList) => {
    const result = $http.get({
        url: url,
        header: headerList
    });
    return result;
};

module.exports = {
    getAwait
};