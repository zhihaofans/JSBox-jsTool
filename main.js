let main = require("./scripts/main"),
  mod = require("./scripts/mod_index"),
  l10nInit = require("./strings/l10n_init"),
  loadMod = modId => {
    mod.initMod(modId);
  },
  init = () => {
    $app.strings = l10nInit.init();
    const query = $context.query;
    $console.info(query);
    if (query) {
      switch (query.type) {
        case "mod":
          if (query.mod_id) {
            loadMod(query.mod_id);
          } else {
            $ui.error("空白mod id");
          }
          break;
        default:
          main.loadMainView();
      }
    } else {
      main.loadMainView();
    }
  };
init();
