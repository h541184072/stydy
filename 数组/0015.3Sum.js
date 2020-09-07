// 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
//
// 注意：答案中不可以包含重复的三元组。
//
// 例如, 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
//
// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    if (nums.length < 3) return [];
    // 先排序 双指针
    nums.sort((a, b) => a - b);
    const list = [];
    for (let i = 0, len = nums.length; i < len; i++) {
        // 下面容易被忽略
        if (nums[i] === nums[i - 1]) continue;
        let left = i + 1;
        let right = len - 1;
        while (left < right) {
            if (nums[i] + nums[left] + nums[right] === 0) {
                list.push([nums[i], nums[left], nums[right]]);
                while (nums[left] === nums[++left]) {}
                while (nums[right] === nums[--right]) {}
            } else if (nums[i] + nums[left] + nums[right] > 0) {
                right--;
            } else {
                left++;
            }
        }
    }
    return list;
};
