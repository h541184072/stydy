// 不能用乘除
/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */
// 二分法
var divide = function(dividend, divisor) {
    if (divisor === 1) return dividend;

    let max = Math.pow(2, 31);

    let isNegative = dividend > 0 !== divisor > 0;

    const res = helper(Math.abs(dividend), Math.abs(divisor));

    if (res > max - 1 || res < -1 * max) {
        return max - 1;
    }
    return isNegative ? -1 * res : res;
};

function helper(dividend, divisor) {
    if (dividend <= 0) return 0;
    if (dividend < divisor) return 0;
    if (divisor === 1) return dividend;

    let acc = divisor * 2;
    // 上面3个if排除后,肯定是至少有1个的
    let count = 1;
    while (dividend - acc > 0) {
        acc += acc; // 乘2
        count += count;
    }
    // 这里不能用 acc>>1,可能是因为数太大的时候?
    let last = dividend - Math.floor(acc / 2);

    return count + helper(last, divisor);
}
