// 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
//
// 说明：解集不能包含重复的子集。
//
// 示例:
//
// 输入: nums = [1,2,3]
// 输出:
// [
//   [3],
//   [1],
//   [2],
//   [1,2,3],
//   [1,3],
//   [2,3],
//   [1,2],
//   []
// ]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const list = [];
    backTrack(nums, list, [], 0);
    return list;
};

function backTrack(nums, list, arr, start) {
    list.push([...arr]);
    for (let i = start; i < nums.length; i++) {
        arr.push(nums[i]);
        backTrack(nums, list, arr, i + 1);
        arr.pop();
    }
}
