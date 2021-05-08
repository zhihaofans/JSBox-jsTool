const Lib = require("../lib"),
  Static = require("../static"),
  JSDialogs = Lib.Dialogs,
  getTicketStates = async () => {
    const accessKey = Lib.Auth.getAccesskey(),
      cookie = Lib.Auth.getCookies(),
      postHeader = {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": Static.UA.COMIC.CHECK_IN,
        Cookie: cookie
      };
    $console.info(postHeader);
    if (accessKey && cookie) {
      const httpPost = await Lib.Http.post(
        Static.URL.COMIC.TICKET_STATES,
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
  },
  showTicketStatesList = async () => {
    $ui.loading(true);
    const ticketStatesResult = await getTicketStates();
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
  };

module.exports = { showTicketStatesList };
