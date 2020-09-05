function fn(str1, str2) {
    let a = str1.length;
    let b = str2.length;
    let temp = 0;
    let res = '';
    while (a || b) {
        a && (temp += +str1[--a]);
        b && (temp += +str2[--b]);

        res = (temp % 10) + res;
        if (temp > 9) {
            temp = 1;
        } else {
            temp = 0;
        }
    }

    if (temp) res = 1 + res;

    return res;
}

console.log(fn('1111','222'))
