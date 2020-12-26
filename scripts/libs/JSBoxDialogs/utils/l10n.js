let $$res = require("./l10n_res");

function l10n(str_id) {
    var result = "";
    if (str_id) {
        const str_res = $$res[str_id];
        if (str_res) {
            result = str_res[$device.info.language] || $l10n(str_id);
        } else {
            result = $l10n(str_id);
        }
    } else {
        result = str_id;
    }
    return result;
}
module.exports = l10n;