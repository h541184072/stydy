// 给定一个整数数组和一个整数 k，你需要找到该数组中和为 k 的连续的子数组的个数。
//
// 示例 1 :
//
// 输入:nums = [1,1,1], k = 2
// 输出: 2 , [1,1] 与 [1,1] 为两种不同的情况。
//
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// s(n)-s(x)
var subarraySum = function(nums, k) {
    const hash = {};
    let acc = 0;
    let count = 0;
    for (let i = 0, len = nums.length; i < len; i++) {
        acc += nums[i];

        if (acc === k) count++;

        // void 0 === undefined
        if (hash[acc - k] !== void 0) {
            count += hash[acc - k];
        }

        if (hash[acc] === void 0) {
            hash[acc] = 1;
        } else {
            hash[acc] += 1;
        }
    }

    return count;
};

// 0053.最大子序列和.js  ---有点像
