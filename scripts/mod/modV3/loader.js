let routerPath = "./mod.js",
  init = () => {
    const _router = require(routerPath);
    $console.info(_router);
    showModList(_router.title, _router.modDir, _router.mods);
  },
  showModList = (_title, modDir, listData) => {
    $console.error(modDir);
    $console.error(listData);
    $ui.push({
      props: {
        title: _title
      },
      views: [
        {
          type: "list",
          props: {
            data: listData.map(_mod => _mod.modTitle)
          },
          layout: $layout.fill,
          events: {
            didSelect: function (_sender, indexPath, _data) {
              const row = indexPath.row,
                thisMod = listData[row];
              require(modDir + thisMod.modId)[thisMod.modAction]();
            }
          }
        }
      ]
    });
  };
module.exports = {
  init
};
