let $$res = require("./l10n_res"),
    NOW_LANGUAGE = $device.info.language;

function l10n(str_id) {
    var result = "";
    if (str_id) {
        const str_res = $$res[str_id];
        if (str_res) {
            result = str_res[NOW_LANGUAGE] || $l10n(str_id);
        } else {
            result = $l10n(str_id);
        }
    } else {
        result = str_id;
    }
    $console.warn(result);
    return result;
}
module.exports = l10n;