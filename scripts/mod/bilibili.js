module.exports = {
  init: require("./bilibili/init").init,
  _SUPPORT_COREJS_: 0,
  run: () => {
    const _wallhaven = new Wallhaven();
    const ver = _wallhaven.checkCoreVersion();
    if (ver === 0) {
      _wallhaven.initView();
      return new Result({
        success: true,
        code: 0
      });
    } else {
      return new Result({
        success: false,
        code: 1,
        error_message: `need update core.js(${ver})`
      });
    }
  }
};
