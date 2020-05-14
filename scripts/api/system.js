let getNowUnixTime = () => {
    return new Date().getTime();
};

function iso8601ToLocaltime(ISO8601) {
    const moment = require("moment");
    var date = '2017-09-28T16:00:00Z';
    var timezone = '"Asia/Shanghai';
    moment(ISO8601).tz(timezone).format('YYYY-MM-DD hh:mm:ss');
}
module.exports = {
    getNowUnixTime,
    iso8601ToLocaltime
}