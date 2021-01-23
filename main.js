let page = require("./scripts/page_init"),
    main = require("./scripts/view/main"),
    init = () => {
        var query = $context.query;
        if (query.mod) {
            page.contextOpen(query);
        } else if ($context.link) {
            page.gotoUrl($context.link);
        } else {
            main.loadMainView();
        }
    };
init();