function getFileList(dir, ext = undefined) {
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
}
module.exports = {
    getFileList
};