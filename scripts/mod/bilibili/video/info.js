const getVideoInfo = async ({ avid, bvid }) => {
  const cookies = Lib.Auth.getCookies(),
    _url = Static.URL.VIDEO.GET_INFO,
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
