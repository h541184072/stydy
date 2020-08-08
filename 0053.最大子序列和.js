/*
*
*
* Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
*
*
* */

// 解法二:前缀和+暴力
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let max = -Number.MAX_VALUE;
    let num;
    for (let i = 0, len = nums.length; i < len; i++) {
        num = 0;
        for (let j = i; j < len; j++) {
            num += nums[j];
            if (num > max) {
                max = num;
            }
        }
    }

    return max;
};

// 时间复杂度： O(n^2)
// 空间复杂度： O(n) - prefixSum 数组空间为n

// 优化前缀和 S(j) - S(i - 1)
var maxSubArray = function(nums) {
    const len = nums.length;
    let min = 0;
    let max = nums[0];
    let num = 0;
    for (let i = 0; i < len; i++) {
        num += nums[i];
        if (num - min > max) max = num - min;
        if (num < min) min = num;
    }

    return max;
};

// 时间复杂度： O(n)
// 空间复杂度： O(1)

// 分治法
var maxSubArray = function(nums) {
    return helper2(nums, 0, nums.length - 1);
};

var helper2 = function(arr, m, n) {
    if (m === n) return arr[m];
    let lMax = -Number.MAX_VALUE;
    let rMax = -Number.MAX_VALUE;
    let num = 0;
    let mid = (n + m) >> 1;
    const l = helper2(arr, m, mid);
    const r = helper2(arr, mid + 1, n);
    for (let i = mid; i >= m; i--) {
        num += arr[i];
        if (num > lMax) lMax = num;
    }

    num = 0;
    for (let i = mid + 1; i <= n; i++) {
        num += arr[i];
        if (num > rMax) rMax = num;
    }

    return Math.max(l, r, lMax + rMax);
};

// 时间复杂度： O(nlogn)
// 空间复杂度： O(1)

// 动态规划
// [-2,1,-3,4,-1,2,1,-5,4],
// currMaxSum - 累计最大和到当前位置i
//
// maxSum - 全局最大子序列和:
//
// 状态转移方程为：dp[i] = max(dp[i - 1] + nums[i], nums[i])  下面代码把nums[i]提取到后面
// currMaxSum = max(currMaxSum + nums[i], nums[i])
// maxSum = max(currMaxSum, maxSum)
var maxSubArray = function(list) {
    const len = list.length;
    let max = list[0];
    for (let i = 1; i < len; i++) {
        list[i] = Math.max(0, list[i - 1]) + list[i];
        // list[i] = Math.max(list[i], list[i - 1] + list[i]);
        if (list[i] > max) max = list[i];
    }

    return max;
};

// 时间复杂度: O(n)
// 空间复杂度: O(1)
