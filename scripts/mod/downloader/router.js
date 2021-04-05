module.exports = {
  "pixiv.cat.artworks.single": {
    script: "pixiv",
    app: "pixivCat",
    func: "single",
    regex: /https:\/\/www.pixiv.net\/artworks\/(\d+)/
  },
  "pixiv.cat.artworks.mult": {
    script: "pixiv",
    app: "pixivCat",
    func: "mult",
    regex: /https:\/\/www.pixiv.net\/artworks\/(\d+)/
  }
};
