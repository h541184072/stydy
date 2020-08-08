// 给定一个可能包含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
//
// 说明：解集不能包含重复的子集。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */

var helper = function(nums, res, arr, j) {
    res.push([...arr]);
    for (let i = j, len = nums.length; i < len; i++) {
        if (i > j && nums[i] === nums[i - 1]) continue;
        arr.push(nums[i]);
        helper(nums, res, arr, i + 1);
        arr.pop();
    }
};

var subsetsWithDup = function(nums) {
    const res = [];
    helper(nums.sort((a, b) => a - b), res, [], 0);
    return res;
};
