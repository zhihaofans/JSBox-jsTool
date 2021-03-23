function initView() {
  $ui.push({
    props: {
      title: "CDN"
    },
    views: [
      {
        type: "list",
        props: {
          data: [
            {
              title: "Github",
              rows: ["0-0"]
            }
          ]
        },
        layout: $layout.fill,
        events: {
          didSelect: function (_sender, indexPath, _data) {
            const section = indexPath.section;
            const row = indexPath.row;
          }
        }
      }
    ]
  });
}
module.exports = {
  init: initView
};
