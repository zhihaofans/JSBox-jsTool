let $_ = require("$_"),
    ModV4 = new $_.ModV4("/scripts/mod/ModV3/mod.js"),
    init = () => {
        $console.warn(ModV4.indexJs);
        $console.error(ModV4);
    };
module.exports = {
    init
};