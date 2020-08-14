/*
*
* Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*
* */


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let i = 0, len = nums.length;
    for (; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }
};

// Time complexity : O(n^2)
// Space complexity : O(1).

//2次-哈希
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum2 = function (nums, target) {
    let len = nums.length;
    let map = new Map();
    for (let i = 0; i < len; i++) {
        map.set(nums[i], i)
    }
    for (let i = 0; i < len; i++) {
        let secondIndex = map.get(target - nums[i])
        if (secondIndex) {
            return [map.get(nums[i]), secondIndex]
        }
    }
};

// Time complexity : O(n)
// Space complexity : O(n).

//1次-哈希
var twoSum3 = function (nums, target) {
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
