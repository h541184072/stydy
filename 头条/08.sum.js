// 实现 sum(1)(2)(3).valueOf()，实现这么一个 sum 函数，返回 6

function sum(number) {
    const temp = function(...numberArr) {
        return sum(numberArr.reduce((a, b) => a + b, number));
    };

    temp.valueOf = function() {
        return number;
    };

    return temp;
}

console.log(sum(1)(2)(3).valueOf());
console.log(sum(1)(2, 3)(3).valueOf());
