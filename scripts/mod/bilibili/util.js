const table = "fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF",
    tr = new Object(),
    s = [11, 10, 3, 8, 4, 6],
    xor = 177451812,
    add = 8728348608,
    AVBV = {
        getAv: bv => {
            let r = 0;
            for (let i = 0; i < 6; i++) {
                r += tr[bv[s[i]]] * 58 ** i;
            }
            return (r - add) ^ xor;
        },
        getBv: av => {
            av = (av ^ xor) + add;
            let r = "BV1  4 1 7  ".split("");
            for (let i = 0; i < 6; i++) {
                r[s[i]] = table[Math.floor(av / 58 ** i) % 58];
            }
            return r.join("");
        }
    };
for (let i = 0; i < 58; i++) {
    tr[table[i]] = i;
}
module.exports = {
    AVBV
};