let getFileList = (dir, ext = undefined) => {
    if ($file.exists(dir) && $file.isDirectory(dir)) {
        var files = [];
        const fileList = $file.list(dir);
        fileList.map(f => {
            if (!$file.isDirectory(f)) {
                if (ext) {
                    if (f.endsWith(`.${ext}`)) {
                        files.push(f);
                    }
                } else {
                    files.push(f);
                }
            }
        });
        return files;
    } else {
        $console.error(`不存在该目录或不是目录:${dir}`);
    }
};
module.exports = {
    getFileList
};