function checkIfUrl(str) {
    if (str.length > 0) {
        const linkList = $detector.link(str);
        return linkList.length == 1 && linkList[0] == str;
    } else {
        return false;
    }
}

function copy(str) {
    $clipboard.copy({
        "text": str,
        "ttl": 30,
        "locally": true
    });
}

function getQrcode(str) {
    return $qrcode.encode(str);
}

function remove(str, keyword) {
    return str.replace(keyword, "");
}

function startsWithList(str, keyList) {
    $console.info(`startsWith.sourceString:${str}`);
    var hasTrue = false;
    keyList.map(key => {
        if (str.startsWith(key)) {
            hasTrue = true;
        }
        $console.info(`hasTrue:${hasTrue}\nkey:${key}`);
    });
    $console.info(`hasTrue.return:${hasTrue}`);
    return hasTrue;
}
module.exports = {
    checkIfUrl,
    copy,
    getQrcode,
    remove,
    startsWithList
};