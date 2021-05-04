const $_ = require("$_"),
  Http = new $_.Http();
module.exports = {
  getAwait: Http.get,
  postAwait: Http.post
};
