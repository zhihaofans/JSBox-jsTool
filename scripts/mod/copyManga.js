const View = require("./copyManga/view"),
  init = () => {
    $ui.push({
      props: {
        title: "拷贝漫画"
      },
      views: [
        {
          type: "list",
          props: {
            data: [
              {
                title: "",
                rows: ["获取漫画详情"]
              }
            ]
          },
          layout: $layout.fill,
          events: {
            didSelect: function (_sender, indexPath, _data) {
              switch (indexPath.section) {
                case 0:
                  switch (indexPath.row) {
                    case 0:
                      View.Comic.getDetails();
                      break;
                  }
                  break;
              }
            }
          }
        }
      ]
    });
  };

module.exports = {
  init
};
