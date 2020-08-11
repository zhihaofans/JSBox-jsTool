function customCache(id, value) {
    $console.info(`${id}:${value}`);
    $cache.set(id, value);
}
module.exports = {
    customCache
};