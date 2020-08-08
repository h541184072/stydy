//给定一个没有重复数字的序列，返回其所有可能的全排列。
//
// 示例:
//
// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

// 回溯法
var helper = function(list, stack, nums) {
    if (stack.length === nums.length) return list.push([...stack]);
    for (let i = 0, len = nums.length; i < len; i++) {
        if (stack.includes(nums[i])) continue;
        stack.push(nums[i]);
        helper(list, stack, nums);
        stack.pop();
    }
};

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let list = [];
    helper(list, [], nums);
    return list;
};
