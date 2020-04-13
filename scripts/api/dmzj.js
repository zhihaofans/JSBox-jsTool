let baseUrl = "http://v3api.dmzj.com",
    dmzj_version = "2.7.019";
let myGet = url => {
    return $http.get({
        url: url,
        header: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 Tachiyomi/1.0",
            Referer: "http://www.dmzj.com/"
        }
    });
};