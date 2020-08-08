// 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值最大为 k。
//
// 示例 1:
//
// 输入: nums = [1,2,3,1], k = 3
// 输出: true
//
// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/contains-duplicate-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    let map = {};
    for (let i = 0, len = nums.length; i < len; i++) {
        const num = nums[i];
        if (map[num] !== undefined && i - map[num] <= k) {
            return true;
        }

        map[num] = i;
    }

    return false;
};
