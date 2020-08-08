// 给定一个可包含重复数字的序列，返回所有不重复的全排列。
//
// 示例:
//
// 输入: [1,1,2]
// 输出:
// [
//   [1,1,2],
//   [1,2,1],
//   [2,1,1]
// ]
//

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function helper(list, arr, nums, hashArr) {
    if (arr.length === nums.length) {
        return list.push([...arr]);
    }
    for (let i = 0, len = nums.length; i < len; i++) {
        if (hashArr[i]) continue;
        // 下面这个难点
        if (i > 0 && nums[i] === nums[i - 1] && hashArr[i - 1]) continue;
        arr.push(nums[i]);
        hashArr[i] = true;
        helper(list, arr, nums, hashArr);
        hashArr[i] = false;
        arr.pop();
    }
}

var permuteUnique = function(nums) {
    const list = [];
    helper(list, [], nums.sort((a, b) => a - b), []);
    return list;
};
