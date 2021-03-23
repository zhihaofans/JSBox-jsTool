let mainList = ["66mz8/phoneWallpaper", "neeemooo"],
  initListView = () => {
    $ui.push({
      props: {
        title: "杂烩"
      },
      views: [
        {
          type: "list",
          props: {
            data: mainList
          },
          layout: $layout.fill,
          events: {
            didSelect: function (_sender, indexPath, _data) {
              switch (_data) {
                case "66mz8/phoneWallpaper":
                  api66mz8_PhoneWallpaper();
                  break;
                case "neeemooo":
                  neeemooo();
                  break;
                default:
                  $ui.toast("暂不支持该功能，请等待更新");
              }
            }
          }
        }
      ]
    });
  },
  api66mz8_PhoneWallpaper = () => {
    $ui.preview({
      title: "66mz8/phoneWallpaper",
      url: "https://api.66mz8.com/api/rand.img.php?type=%E5%A3%81%E7%BA%B8"
    });
  },
  neeemooo = () => {
    const images = [
        "不想努力了.png",
        "别骂了别骂了.png",
        "发呆.png",
        "吃瘪.png",
        "嚣张.png",
        "天才.png",
        "彩色的希望.png",
        "早上好.png",
        "星星眼.png",
        "晚上好.png",
        "生气.png",
        "疑惑.png",
        "病娇.png",
        "睡觉.png",
        "砸电脑.png",
        "线上对喷，带我一个！.png",
        "问好.png",
        "震撼鸟神.png",
        "鸟神的赐福.png"
      ],
      fileName = images[Math.floor(Math.random() * 18)],
      url = "https://neeemooo.com/hanon/" + encodeURI(fileName);
    $console.info(url);
    $ui.preview({
      title: fileName,
      url: url
    });
  };
module.exports = {
  init: initListView
};
