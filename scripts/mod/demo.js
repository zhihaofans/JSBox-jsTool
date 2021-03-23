let $demo = require("./demo/demo"),
  init = async () => {
    const menuList = ["横向翻页", "HTTP"],
      menuResult = await $ui.menu(menuList);
    //menuResult.index , menuResult.title
    switch (menuResult.index) {
      case 0:
        $demo.gallery.showMultImage();
        break;
      case 1:
        try {
          $demo.http.init();
          $console.warn("try su");
        } catch (_error) {
          $console.error(_error.message);
        }
        break;
    }
  };

module.exports = {
  init
};
