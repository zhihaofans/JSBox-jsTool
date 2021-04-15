const main = require("./scripts/main"),
  l10nInit = require("./strings/l10n_init"),
  init = () => {
    $app.strings = l10nInit.init();
    const query = $context.query;
    if (query) {
      switch (query.type) {
        // TODO:load mod by url scheme
        /* case "mod":
          if (query.mod_id) {
            loadMod(query.mod_id);
          } else {
            $ui.error("空白mod id");
          }
          break; */
        default:
          main.loadMainView();
      }
    } else {
      main.loadMainView();
    }
  };
init();
$console.info("start");
