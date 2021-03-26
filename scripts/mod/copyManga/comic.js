const $$ = require("$$"),
  $SuperClass = require("$SuperClass"),
  _Api = require("./api"),
  getDetails = async comicId => {
    $ui.loading(true);
    const url = new $SuperClass.SuperString(_Api.Comic.DETAILS),
      httpGet = await $$.Http.getAwait(url.format(comicId));
    if (httpGet.error) {
      $console.error(httpGet.error);
      $ui.alert({
        title: "Error",
        message: JSON.stringify(httpGet.error)
      });
      $ui.loading(true);
    } else {
      const resultData = httpGet.data;
      $console.info(resultData);
      $ui.alert({
        title: "",
        message: JSON.stringify(resultData)
      });
      $ui.loading(true);
    }
  };
module.exports = {
  getDetails
};
