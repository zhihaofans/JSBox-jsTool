// String
String.prototype.remove = function (keyword) {
    return this.replace(keyword, "");
};

String.prototype.checkIfUrl = function () {
    if (this.length > 0) {
        const linkList = $detector.link(this);
        return linkList.length == 1 && linkList[0] == this;
    } else {
        return false;
    }
};
String.prototype.copy = function () {
    $clipboard.copy({
        "text": this,
        "ttl": 30,
        "locally": true
    });
};
String.prototype.getQrcode = function () {
    return $qrcode.encode(this);
};
