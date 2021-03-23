const l10nRes = require("./l10n"),
  init = () => {
    let result = {};
    Object.keys(l10nRes).map(k => {
      const thisItem = l10nRes[k];
      Object.keys(thisItem).map(_k => {
        if (!result[_k]) {
          result[_k] = {};
        }
        result[_k][k] = thisItem[_k];
      });
    });
    return result;
  };
module.exports = {
  init
};
