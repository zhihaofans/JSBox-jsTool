const Lib = require("../lib"),
  Static = require("../static"),
  getLottery = async () => {
    const access_key = Lib.Auth.getAccesskey(),
      header = {
        "User-Agent": Static.UA.USER.APP_IPHONE,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      httpGet = await Lib.Http.get(
        Static.URL.LIVE.CHECK_IN + access_key,
        header
      );
    if (httpGet.error) {
      $console.error(httpGet.error);
      return undefined;
    } else {
      const data = httpGet.data;
      $console.info(data);
      if (data) {
        return data.code === 0;
      } else {
        return false;
      }
    }
  };
