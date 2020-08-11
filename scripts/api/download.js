function instagram(link, cookie = undefined) {
    $ui.loading(true);
    $http.get({
        url: link,
        header: {
            host: "www.instagram.com",
            useragent:
                "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
            cookie: cookie||$cache.get("instagram_cookies")||""
        },
        handler: function(resp) {
            $ui.loading(false);
            var data = resp.data;
            var search = new RegExp(/display_url":".*?"/);
            var img = search.exec(data);
            var img1 = JSON.stringify(img);
            img1 = img1.slice(18);
            var img2 = img1.replace(new RegExp(/\\\\u0026/, "gm"), "&");
            var img3 = img2.replace("\\.", ".");
            var imglink = img3.slice(0, -4);
            $console.info(data);
            $console.info(imglink);
            $http.download({
                url: imglink,
                handler: function(resp) {
                    $photo.save({
                        data: resp.data,
                        handler: function(success) {
                            $push.schedule({
                                title: "success"
                            });
                        }
                    });
                }
            });
        }
    });
}
module.exports = {
    instagram
};