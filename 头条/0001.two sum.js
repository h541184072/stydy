/*
*
* Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*
* */

//1次-哈希
var twoSum = function (nums, target) {
    let len = nums.length;
    let map = {};
    for (let i = 0; i < len; i++) {
        if (map[nums[i]] >= 0) {
            return [map[nums[i]] ,i]
        }
        map[target - nums[i]] = i
    }
};

// Time complexity : O(n)
// Space complexity : O(n).
