let checkIfUrl = str => {
        if (str.length > 0) {
            const linkList = $detector.link(str);
            return linkList.length == 1 && linkList[0] == str;
        } else {
            return false;
        }
    },
    copy = str => {
        $clipboard.copy({
            text: str,
            ttl: 30,
            locally: true
        });
    },
    getQrcode = str => {
        return $qrcode.encode(str);
    },
    toQrcode = getQrcode,
    remove = (str, keyword) => {
        return str.replace(keyword, "");
    },
    startsWithList = (str, keyList) => {
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
    },
    toJson = str => {
        return JSON.parse(str);
    },
    fromJson = json => {
        return JSON.stringify(json);
    };
module.exports = {
    checkIfUrl,
    copy,
    fromJson,
    getQrcode,
    toQrcode,
    remove,
    startsWithList,
    toJson
};