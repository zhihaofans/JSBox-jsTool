let quicklookImageUrl = url => {
    $ui.loading(true);
    $quicklook.open({
        image: $image(url)
    });
    $ui.loading(false);
};
function quicklookUrl(url) {
    $ui.loading(true);
    $quicklook.open({
        url: url
    });
    $ui.loading(false);
}
function quicklookList(list) {
    $ui.loading(true);
    $quicklook.open({
        list: list
    });
    $ui.loading(false);
}
module.exports = {
    quicklookImageUrl,
    quicklookUrl,
    quicklookList
};