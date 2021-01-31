let showGallery = () => {
        $ui.push({
            props: {
                title: ""
            },
            views: [
                {
                    type: "gallery",
                    props: {
                        items: [
                            {
                                type: "image",
                                props: {
                                    src:
                                        "https://images.apple.com/v/iphone/home/v/images/home/limited_edition/iphone_7_product_red_large_2x.jpg"
                                }
                            },
                            {
                                type: "image",
                                props: {
                                    src:
                                        "https://images.apple.com/v/iphone/home/v/images/home/airpods_large_2x.jpg"
                                }
                            },
                            {
                                type: "image",
                                props: {
                                    src:
                                        "https://images.apple.com/v/iphone/home/v/images/home/apple_pay_large_2x.jpg"
                                }
                            }
                        ],
                        interval: 3,
                        radius: 5.0
                    },
                    layout: function (make, view) {
                        make.left.right.inset(10);
                        make.centerY.equalTo(view.super);
                        make.height.equalTo(320);
                    }
                }
            ]
        });
    },
    showNetworkImage = urlList => {
        $ui.push({
            props: {
                title: ""
            },
            views: [
                {
                    type: "gallery",
                    props: {
                        items: urlList.map(u => ({
                            type: "image",
                            props: {
                                src: u
                            }
                        })),
                        interval: 3,
                        radius: 5.0
                    },
                    layout: function (make, view) {
                        make.left.right.inset(10);
                        make.centerY.equalTo(view.super);
                        make.height.equalTo(320);
                    }
                }
            ]
        });
    },
    showMultImage = () => {
        showNetworkImage([
            "https://images.apple.com/v/iphone/home/v/images/home/limited_edition/iphone_7_product_red_large_2x.jpg",
            "https://images.apple.com/v/iphone/home/v/images/home/limited_edition/iphone_7_product_red_large_2x.jpg"
        ]);
    };
module.exports = {
    showGallery,
    showMultImage
};