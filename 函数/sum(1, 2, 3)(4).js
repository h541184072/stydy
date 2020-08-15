function sum(a) {
    let temp = function(...rest) {
        return sum(rest.reduce((a, b) => a + b, a));
    };
    // temp.toString这里写成temp.valueOf也可以
    temp.toString = function() {
        return a;
    };
    return temp;
}

let ans = sum(1)(2)(3);
console.log(ans);
