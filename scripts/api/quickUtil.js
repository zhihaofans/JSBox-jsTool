let quicklookImageUrl = url => {
    $quicklook.open({
        image: $image(url)
    });
};

module.exports = {
    quicklookImageUrl,
};