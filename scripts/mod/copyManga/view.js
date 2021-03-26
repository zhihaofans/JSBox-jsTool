const _Comic = require("./comic"),
  Comic = {
    getDetails: async () => {
      try {
        await _Comic.getDetails("gigant");
      } catch (error) {
        $console.error(error);
        $ui.alert({
          title: "trycatch",
          message: error.message
        });
      }
    }
  };

module.exports = { Comic };
