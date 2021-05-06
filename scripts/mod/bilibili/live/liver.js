const Lib = require("../lib"),
  Static = require("../static"),
  onlineLiver = async () => {
    const access_key = Lib.Auth.getAccesskey(),
      _url = Static.URL.LIVE.LIVER_ONLINE + access_key,
      _headers = {
        "User-Agent": Static.UA.BILIBILI
      },
      httpResult = await Lib.Http.get(_url, _headers);
    $console.info(_url);
    $console.info(_headers);
    $console.info(httpResult.data);
    if (httpResult.error) {
      $console.error(httpResult.error);
    } else if (httpResult.data) {
      const httpData = httpResult.data;
      if (httpData.code !== 0) {
        $console.error(
          `Bilibili.onlineFollower:(${httpData.code})${httpData.message}`
        );
      }
      return httpData || undefined;
    }
    return undefined;
  };
module.exports = {
  onlineLiver
};
