let $B_user = require("./user"),
  $_Static = require("./static"),
  Comic = {
    getDetail: async comicId => {
      const accessKey = $B_user.Auth.accessKey(),
        uid = $B_user.Auth.uid(),
        cookies = $B_user.Auth.cookies(),
        postBody = {
          comicId: comicId
        },
        postHeader = {
          "Content-Type": "application/json",
          "User-Agent": $_Static.UA.COMIC.CHECK_IN,
          Cookie: cookies
        };
      if (accessKey && uid) {
        const httpPost = await $_Static.Http.postAwait(
          `${$_Static.URL.COMIC.COMIC_DETAIL}?access_key=${accessKey}`,
          postBody,
          postHeader
        );
        if (httpPost.error) {
          $console.error(httpPost.error);
          return undefined;
        } else {
          const comicDetailData = httpPost.data;
          $console.info(comicDetailData);
          return comicDetailData || undefined;
        }
      } else {
        return undefined;
      }
    }
  },
  View = {
    getComicDetail: async () => {
      const comicData = await Comic.getDetail(28654);
      $console.info(comicData);
    }
  };
module.exports = {
  View
};
