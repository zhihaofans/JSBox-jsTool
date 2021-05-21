const Lib = require("../lib"),
  Static = require("../static"),
  getVideoInfo = async ({ core: coreFile, avid, bvid }) => {
    let _url = Static.URL.VIDEO.GET_INFO;
    if (avid) {
      _url += `?aid=${avid}`;
    } else if (bvid) {
      _url += `?bvid=${bvid}`;
    }
    const cookies = Lib.Auth.getCookies(),
      _headers = {
        Cookie: cookies,
        "User-Agent": Static.UA.BILIBILI
      },
      httpResult = await Lib.Http.get(_url, _headers);
    if (httpResult.error) {
      $console.error(httpResult.error);
      return new coreFile.Result({
        success: false,
        code: -1,
        data: httpResult.error,
        error_message: httpResult.error.message
      });
    } else if (httpResult.data) {
      const httpData = httpResult.data;
      if (httpData.code !== 0) {
        $console.error(`getVideoInfo:(${httpData.code})${httpData.message}`);
        return new coreFile.Result({
          success: false,
          code: httpData.code,
          data: httpData,
          error_message: httpData.message
        });
      } else {
        return new coreFile.Result({
          success: true,
          code: 0,
          data: httpData.data,
          error_message: undefined
        });
      }
    }
  };

module.exports = { getVideoInfo };
