let $B_user = require("./user"),
  $_Static = require("./static"),
  JSDialogs = require("JSDialogs"),
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
  Ticket = {
    getTicketStates: async () => {
      const accessKey = $B_user.Auth.accessKey,
        cookie = $B_user.Auth.cookies(),
        postHeader = {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": $_Static.UA.COMIC.CHECK_IN,
          Cookie: cookie
        };
      $console.info(postHeader);
      if (accessKey && cookie) {
        const httpPost = await $_Static.Http.postAwait(
          $_Static.URL.COMIC.TICKET_STATES,
          undefined,
          postHeader
        );
        if (httpPost.error) {
          $console.error(httpPost.error);
          return undefined;
        } else {
          const TicketData = httpPost.data;
          $console.info(TicketData);
          return TicketData && TicketData.code === 0 ? TicketData : undefined;
        }
      } else {
        return undefined;
      }
    }
  },
  View = {
    showTicketStatesList: async () => {
      $ui.loading(true);
      const ticketStatesResult = await Ticket.getTicketStates();
      if (ticketStatesResult && ticketStatesResult.code === 0) {
        const ticketStatesData = ticketStatesResult.data;
        await JSDialogs.showPlainAlert(
          "Bilibili漫画券",
          JSON.stringify(ticketStatesData)
        );
      } else {
        await JSDialogs.showPlainAlert(
          "Bilibili漫画券获取失败",
          ticketStatesResult.msg
        );
      }
      $ui.loading(false);
    },
    getComicDetail: async () => {
      const comicData = await Comic.getDetail(28654);
      $console.info(comicData);
    }
  };
module.exports = {
  Ticket,
  View
};
