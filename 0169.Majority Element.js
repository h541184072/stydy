 // Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.
 //
 // You may assume that the array is non-empty and the majority element always exist in the array.
 //
 // Example 1:
 //
 // Input: [3,2,3]
 // Output: 3
 // Example 2:
 //
 // Input: [2,2,1,1,1,2,2]
 // Output: 2

/**
 * @param {number[]} nums
 * @return {number}
 */
// 投票算法
var majorityElement = function(nums) {
    let num = nums[0];
    let count = 1;
    for (let i = 1, len = nums.length; i < len; i++) {
        if (count === 0) {
            num = nums[i];
        }
        if (num === nums[i]) {
            count++;
        } else {
            count--;
        }
    }
    return num
};

// 时间复杂度：O(n)
//
// Boyer-Moore 算法严格执行了 n次循环，所以时间复杂度是线性时间的。
//
// 空间复杂度：O(1)
//
// Boyer-Moore 只需要常数级别的额外空间。
//
