// 给定一个整数 (32 位有符号整数)，请编写一个函数来判断它是否是 4 的幂次方。
//
// 示例 1:
//
// 输入: 16
// 输出: true
// 示例 2:
//
// 输入: 5
// 输出: false
// 进阶：
// 你能不使用循环或者递归来完成本题吗？
//

/**
 * @param {number} num
 * @return {boolean}
 */
// 说实话，这种做法不容易想到，其实还有一种方法。 如果一个数字是 4 的幂次方，那么只需要满足：
//
// 是二的倍数
// 减去 1 是三的倍数
var isPowerOfFour = function(num) {
    return num > 0 && (num & (num - 1)) === 0 && (num - 1) % 3 === 0;
};

// 是 2 的幂次方， 就能保证最低位之外，其他位置有且仅有一个 1
// 这个 1 不在偶数位置，一定在奇数位置
var isPowerOfFour = function(num) {
    if (num <= 0) return false;
    if ((num & (num - 1)) !== 0) return false;
    return (num & 0x55555555) === num;
};
