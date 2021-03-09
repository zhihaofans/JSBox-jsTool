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
    User = {
        autoCheckIn: async () => {
            const accessKey = $B_user.Auth.accessKey(),
                uid = $B_user.Auth.uid(),
                postBody = {
                    platform: "ios",
                    uid: uid,
                    access_key: accessKey
                },
                postHeader = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": $_Static.UA.COMIC.CHECK_IN
                };
            if (accessKey && uid) {
                const httpPost = await $_Static.Http.postAwait(
                    $_Static.URL.COMIC.CHECK_IN,
                    postBody,
                    postHeader
                );
                if (httpPost.error) {
                    $console.error(httpPost.error);
                    return false;
                } else {
                    const checkInData = httpPost.data;
                    $console.info(checkInData);
                    if (checkInData) {
                        return checkInData.code === 0;
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        },
        checkIn: async () => {
            const accessKey = $B_user.Auth.accessKey(),
                uid = $B_user.Auth.uid(),
                postBody = {
                    platform: "ios",
                    uid: uid,
                    access_key: accessKey
                },
                postHeader = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": $_Static.UA.COMIC.CHECK_IN
                };
            if (accessKey && uid) {
                $ui.loading(true);
                const httpPost = await $_Static.Http.postAwait(
                    $_Static.URL.COMIC.CHECK_IN,
                    postBody,
                    postHeader
                );
                if (httpPost.error) {
                    $ui.loading(false);
                    $console.error(httpPost.error);
                } else {
                    var checkInData = httpPost.data;
                    $console.info(checkInData);
                    $ui.loading(false);
                    if (checkInData) {
                        if (checkInData.code === 0) {
                            $ui.alert({
                                title: "签到结果",
                                message: "签到成功"
                            });
                        } else {
                            switch (checkInData.code) {
                                case "invalid_argument":
                                    $ui.alert({
                                        title: `错误`,
                                        message: "今天已签到"
                                    });
                                    break;
                                default:
                                    $ui.alert({
                                        title: `错误：${checkInData.code}`,
                                        message: checkInData.msg
                                    });
                            }
                        }
                    } else {
                        $ui.alert({
                            title: "签到失败",
                            message: "服务器返回空白结果"
                        });
                    }
                }
            } else {
                $ui.alert({
                    title: "哔哩哔哩漫画签到失败",
                    message: "未登录",
                    actions: [
                        {
                            title: "OK",
                            disabled: false, // Optional
                            handler: function () {}
                        }
                    ]
                });
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
                    return TicketData && TicketData.code === 0
                        ? TicketData
                        : undefined;
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
        getComicDetail: () => {
            const comicData = Comic.getDetail(28654);
            $console.info(comicData);
        }
    };
module.exports = {
    User,
    Ticket,
    View
};
