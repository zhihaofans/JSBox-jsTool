const Info = require("./info"),
  getVideoInfo = async Core => {
    const result = await Info.getVideoInfo({
      core: Core,
      bvid: "BV1kQ4y1o7qj"
    });
    if (result.success) {
      $console.warn(result.data);
    } else {
      $console.error(result.error_message);
    }
  },
  init = Core => {
    getVideoInfo(Core);
  };
module.exports = { init };
