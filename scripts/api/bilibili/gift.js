let _BILIURL = require("./api_url.js").BILIBILI,
    _UA = require("../user-agent.js"),
    _USER = require("./user.js"),
    _CACHE = require("./cache.js");

function GiftData(_giftId, _bagId, _number, _giftName) {
    this.giftId = _giftId;
    this.bagId = _bagId;
    this.number = _number;
    this.gift_name = _giftName;
}

function getGiftListByGiftId(giftData, giftId) {

}

function getGiftListByExp(giftData, exp) {
    if (exp == 0) {
        return [];
    }
    var needExp = exp;
    $console.info(`needExp.start:${needExp}`);
    var giftList = [];
    for (g in giftData) {
        if (needExp == 0) {
            return giftList;
        } else {
            const thisGift = giftData[g];
            $console.info(thisGift);
            if (thisGift.corner_mark == "永久") {
                $console.error("跳过永久礼物");
            } else {
                var giftNum = 0;
                switch (thisGift.gift_id) {
                    case 6:
                        if (needExp >= 10) {
                            if (thisGift.gift_num * 10 > needExp) {
                                giftNum = Math.floor(needExp / 10);
                            } else {
                                giftNum = Math.floor(thisGift.gift_num / 10);
                            }
                            // giftNum = thisGift.gift_num > Math.floor(needExp / 10) ? Math.floor(needExp / 10) : Math.floor(thisGift.gift_num / 10);
                            if (giftNum > 0) {
                                giftList.push(new GiftData(thisGift.gift_id, thisGift.bag_id, giftNum, thisGift.gift_name));
                                needExp = needExp - giftNum * 10;
                            } else {
                                $console.error("跳过0个的礼物");
                            }
                        }
                        break;
                    case 30607:
                        if (needExp >= 50) {
                            if (thisGift.gift_num * 50 > needExp) {
                                giftNum = Math.floor(needExp / 50);
                            } else {
                                giftNum = Math.floor(thisGift.gift_num / 50);
                            }
                            // giftNum = thisGift.gift_num > Math.floor(needExp / 50) ? Math.floor(needExp / 50) : Math.floor(thisGift.gift_num / 50);
                            if (giftNum > 0) {
                                giftList.push(new GiftData(thisGift.gift_id, thisGift.bag_id, giftNum, thisGift.gift_name));
                                needExp = needExp - giftNum * 50;
                            } else {
                                $console.error("跳过0个的礼物");
                            }
                        }
                        break;
                    case 1:
                        if (thisGift.gift_num > needExp) {
                            giftNum = needExp;
                        } else {
                            giftNum = thisGift.gift_num;
                        }
                        // giftNum = thisGift.gift_num > needExp ? needExp : thisGift.gift_num;
                        if (giftNum > 0) {
                            giftList.push(
                                new GiftData(thisGift.gift_id, thisGift.bag_id, giftNum, thisGift.gift_name)
                            );
                            needExp = needExp - giftNum;
                        } else {
                            $console.error("跳过0个的礼物");
                        }
                        break;
                    default:
                        $console.error("跳过不支持的礼物");
                }
                $console.info(`needExp:${needExp}`);
            }
        }
    }
    if (needExp > 0) {
        $ui.toast("礼物不足以赠送满今日亲密度");
    }
    return giftList;
}

function getLiveGiftList(liveData = undefined, mode = 0) {
    var sendGiftToUid, sendGiftToRoom, needExp;
    if (liveData) {
        sendGiftToUid = liveData.target_id;
        sendGiftToRoom = liveData.room_id;
        needExp = liveData.day_limit - liveData.today_feed;
    }
    $ui.loading(true);
    const accessKey = _USER.checkAccessKey() ? _USER.getAccessKey() : undefined;
    if (accessKey) {
        $http.get({
            url: _BILIURL.GET_LIVE_GIFT_LIST + accessKey,
            header: {
                "User-Agent": _UA.KAAASS
            },
            handler: function (resp) {
                const giftResult = resp.data;
                if (giftResult.code == 0) {
                    const giftList = giftResult.data.list;
                    $ui.loading(false);
                    if (giftList.length) {
                        _CACHE.saveCache("getLiveGiftList", resp.rawData);
                        switch (mode) {
                            case 0:
                                $ui.push({
                                    props: {
                                        title: $l10n("BILIBILI")
                                    },
                                    views: [{
                                        type: "list",
                                        props: {
                                            data: giftList.map(gift => `${gift.gift_name}（${gift.corner_mark}）${gift.gift_num}个`)
                                        },
                                        layout: $layout.fill,
                                        events: {
                                            didSelect: function (_sender, indexPath, _data) {
                                                const thisGift = giftList[indexPath.row];
                                                if (liveData && sendGiftToUid && sendGiftToRoom) {
                                                    if (thisGift.corner_mark == "永久") {
                                                        $ui.alert({
                                                            title: "警告",
                                                            message: "这是永久的礼物，你确定要送吗",
                                                            actions: [{
                                                                    title: "取消",
                                                                    disabled: false,
                                                                    handler: function () {}
                                                                },
                                                                {
                                                                    title: "取消",
                                                                    disabled: false,
                                                                    handler: function () {}
                                                                },
                                                                {
                                                                    title: "确定",
                                                                    disabled: false,
                                                                    handler: function () {
                                                                        $input.text({
                                                                            type: $kbType.number,
                                                                            placeholder: `输入数量，1-${thisGift.gift_num}`,
                                                                            text: "",
                                                                            handler: function (
                                                                                gift_number
                                                                            ) {
                                                                                if (
                                                                                    gift_number >
                                                                                    0 &&
                                                                                    gift_number <=
                                                                                    thisGift.gift_num
                                                                                ) {
                                                                                    sendLiveGift(
                                                                                        sendGiftToUid,
                                                                                        sendGiftToRoom,
                                                                                        thisGift.gift_id,
                                                                                        thisGift.bag_id,
                                                                                        gift_number
                                                                                    );
                                                                                } else {
                                                                                    $ui.alert({
                                                                                        title: "赠送错误",
                                                                                        message: `错误数量,请输入1-${thisGift.gift_num}`
                                                                                    });
                                                                                }
                                                                            }
                                                                        });
                                                                    }
                                                                },
                                                                {
                                                                    title: "取消",
                                                                    disabled: false,
                                                                    handler: function () {}
                                                                },
                                                                {
                                                                    title: "取消",
                                                                    disabled: false,
                                                                    handler: function () {}
                                                                }
                                                            ]
                                                        });
                                                    } else {
                                                        $input.text({
                                                            type: $kbType.number,
                                                            placeholder: `输入数量，1-${thisGift.gift_num}`,
                                                            text: "",
                                                            handler: function (gift_number) {
                                                                if (gift_number > 0 && gift_number <= thisGift.gift_num) {
                                                                    sendLiveGift(sendGiftToUid, sendGiftToRoom, thisGift.gift_id, thisGift.bag_id, gift_number);
                                                                } else {
                                                                    $ui.alert({
                                                                        title: "赠送错误",
                                                                        message: `错误数量,请输入1-${thisGift.gift_num}`
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    }
                                                } else {
                                                    $ui.alert({
                                                        title: thisGift.gift_name,
                                                        message: `礼物id:${thisGift.gift_id}\n唯一id:${thisGift.bag_id}\n拥有数量:${thisGift.gift_num}个\n到期时间:${thisGift.corner_mark}`
                                                    });
                                                }
                                            }
                                        }
                                    }]
                                });
                                break;
                            case 1:
                                if (liveData) {
                                    $ui.loading(true);
                                    $ui.toast("正在计算所需的礼物");
                                    const giftExpList = getGiftListByExp(giftList, needExp);
                                    if (giftExpList.length > 0) {
                                        $console.info(giftExpList);
                                        $ui.loading(false);
                                        sendLiveGiftList(liveData, giftExpList, 0);
                                    } else {
                                        $ui.loading(false);
                                        $ui.alert({
                                            title: "自动赠送失败",
                                            message: "计算得出所需的礼物为空白"
                                        });
                                    }
                                } else {
                                    $ui.alert({
                                        title: "错误",
                                        message: "空白liver信息"
                                    });
                                }
                                break;
                            default:
                                $ui.loading(false);
                                $ui.error("未知模式");
                        }
                    } else {
                        $ui.error("你没有任何礼物");
                    }
                } else {
                    $ui.loading(false);
                    $ui.error(giftResult.message);
                }
            }
        });
    } else {
        $ui.loading(false);
        $ui.error("未登录");
    }
}

function sendLiveGift(user_id, room_id, gift_type, gift_id = undefined, gift_number = 1) {
    $ui.loading(true);
    var url = `${_BILIURL.LIVE_GIFT_SEND}?access_key=${_USER.getAccessKey()}&biz_id=${room_id}&gift_id=${gift_type}&gift_num=${gift_number}&ruid=${user_id}`;
    if (gift_id) {
        url += `&bag_id=${gift_id}`;
    }
    $http.get({
        url: url
    }).then(function (resp) {
        var data = resp.data;
        if (data.code == 0) {
            const resultData = data.data;
            $ui.loading(false);
            $ui.alert({
                title: resultData.send_tips,
                message: `${resultData.uname} ${resultData.gift_action}${resultData.gift_num}个${resultData.gift_name}`
            });
        } else {
            $ui.loading(false);
            $ui.alert({
                title: `Error ${data.code}`,
                message: data.message || data.msg || "未知错误"
            });
        }
    });
}

function sendLiveGiftList(liveData, giftList, index = 0) {
    $ui.loading(true);
    if (giftList.length > 0) {
        const thisGift = giftList[index];
        const url = `${_BILIURL.LIVE_GIFT_SEND}?access_key=${_USER.getAccessKey()}&ruid=${liveData.target_id}&biz_id=${liveData.room_id}&bag_id=${thisGift.bagId}&gift_id=${thisGift.giftId}&gift_num=${thisGift.number}`;
        if (index == 0) {
            $console.info(`共有${giftList.length}组礼物`);
        }
        $console.info(`正在赠送第${index + 1}组礼物`);
        $http.get({
            url: url
        }).then(function (resp) {
            var data = resp.data;
            if (data.code == 0) {
                const resultData = data.data;
                $console.info(`第${index + 1}组礼物(${thisGift.gift_name}${thisGift.number}个)：${resultData.send_tips}`);
                if (index == giftList.length - 1) {
                    $ui.loading(false);
                    $ui.alert({
                        title: "赠送完毕",
                        message: `尝试赠送了${giftList.length}组礼物给[${liveData.target_name}]，请查收`
                    });
                } else {
                    sendLiveGiftList(liveData, giftList, index + 1);
                }
            } else {
                $ui.loading(false);
                $ui.alert({
                    title: `Error ${data.code}`,
                    message: data.message || data.msg || "未知错误"
                });
            }
        });
    } else {
        $ui.alert({
            title: "赠送错误",
            message: "空白礼物列表"
        });
    }
}
module.exports = {
    getLiveGiftList
};