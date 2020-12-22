let $demo = require("./demo/demo"),
    init = async () => {
        const menuList = ["横向翻页"],
            menuResult = await $ui.menu(menuList);
        //menuResult.index , menuResult.title
        switch (menuResult.index) {
            case 0:
                $demo.gallery.showMultImage();
                break;
        }
    };

module.exports = {
    init
};